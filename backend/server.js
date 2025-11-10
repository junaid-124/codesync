// --- Imports ---
const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors'); // Already here, perfect
const app = express();
app.use(cors());
const port = 3000;

// --- API URLs ---
const codolioURL = 'https://node.codolio.com/api/contest-calendar/v1/all/get-upcoming-contests';

// HackerRank URL (as provided)
const HACKERRANK_API_URL = 'https://www.hackerrank.com/community/engage/events'; 

// --- ADDED: Code 360 URL and Config ---
const CODE360_API_URL = 'https://www.naukri.com/code360/api/v4/public_section/contest_list?page_size=10&page=1&participate=true&request_differentiator=1762515871887&app_context=publicsection&naukri_request=true';
const code360Config = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
  }
};
// ----------------------------------------

// --- ADDED: Helper function for Code 360 ---
/**
 * Helper function to convert UNIX timestamp (in seconds) to a
 * readable human date and time.
 */
function toReadableTime(timestamp) {
  // The timestamp is in seconds, JavaScript Date needs milliseconds
  return new Date(timestamp * 1000).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
}

// --- This is your HackerRank function ---
async function fetchHackerrankEvents() {
    const browserHeaders = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        'Accept': 'application/json'
    };

    try {
        console.log(`Fetching JSON from HackerRank API: ${HACKERRANK_API_URL}`);
        const { data: jsonData } = await axios.get(HACKERRANK_API_URL, { headers: browserHeaders });

        const ongoingEvents = jsonData?.data?.events?.ongoing_events;
        const pastEvents = jsonData?.data?.events?.past_events;
        const allEvents = [...(ongoingEvents || []), ...(pastEvents || [])];

        if (allEvents.length === 0) {
            console.log('HackerRank API: No events found.');
            return []; // Return empty array
        }

        const publishedEvents = allEvents.filter(event => 
            event.attributes && event.attributes.status.toLowerCase() === 'published'
        );

        // Format the data
        const formattedEvents = publishedEvents.map(event => ({
            id: event.id,
            type: event.type,
            ...event.attributes
        }));
        
        console.log(`HackerRank API: Found ${formattedEvents.length} published events.`);
        return formattedEvents; // RETURN the data

    } catch (error) {
        console.error('\n--- Error fetching HackerRank data: ---');
        if (error.response) {
            console.error(`Status: ${error.response.status} (${error.response.statusText})`);
        } else {
            console.error(error.message);
        }
        console.error('This error is expected because the HACKERRANK_API_URL is incorrect.');
        console.log('-------------------------------------------');
        return []; // RETURN empty array on failure
    }
}

// --- ADDED: Your Code 360 script, refactored as a function ---
async function fetchCode360Contests() {
  try {
    console.log(`Fetching data from Code 360...`);
    
    const response = await axios.get(CODE360_API_URL, code360Config);

    if (response.data && response.data.data && response.data.data.events) {
      
      const allEvents = response.data.data.events;
      
      // 1. Filter for open contests
      const openContests = allEvents.filter(
        event => event.registration_status === 'REGISTRATIONS_OPEN'
      );

      if (openContests.length > 0) {
        // 2. Map the data to a clean format
        const formattedContests = openContests.map(contest => {
          const contestUrl = `https://www.naukri.com/code360/contests/${contest.slug}`;
          return {
            name: contest.name,
            start_time: toReadableTime(contest.event_start_time),
            end_time: toReadableTime(contest.event_end_time),
            url: contestUrl,
            platform: 'Code 360'
          };
        });
        
        console.log(`Code 360 API: Found ${formattedContests.length} open contests.`);
        return formattedContests; // <-- RETURN the data
      } else {
        console.log('Code 360 API: No contests are currently open for registration.');
        return [];
      }

    } else {
      console.error('Code 360 API: Unexpected data structure received.');
      return [];
    }

  } catch (error) {
    console.error('Error fetching Code 360 data:', error.message);
    return []; // <-- RETURN empty array on failure
  }
}
// -----------------------------------------------------------


// --- This is your MODIFIED API endpoint ---
app.get('/api/contests', async (req, res) => {
    console.log('Frontend requested data. Fetching from Codolio, HackerRank, and Code 360...');
    
    try {
        // 1. Set up ALL THREE fetch requests to run in parallel
        const codolioPromise = fetch(codolioURL);
        const hackerrankPromise = fetchHackerrankEvents();
        const code360Promise = fetchCode360Contests(); // <-- ADDED

        // 2. Wait for all of them to finish
        const [
          codolioResponse, 
          hackerrankEvents, 
          code360Contests // <-- ADDED
        ] = await Promise.all([
            codolioPromise,
            hackerrankPromise,
            code360Promise // <-- ADDED
        ]);

        // 3. Process Codolio data
        if (!codolioResponse.ok) {
            throw new Error(`Codolio HTTP error! Status: ${codolioResponse.status}`);
        }
        const codolioData = await codolioResponse.json();
        
        // 4. Combine ALL the data
        const combinedData = {
            ...codolioData,              // Spread all of Codolio's platforms
            hackerrank: hackerrankEvents, // Add HackerRank platform data
            code360: code360Contests      // <-- ADDED Code 360 platform data
        };
        
        // 5. Send the single, combined JSON response
        res.json(combinedData);

    } catch (error) {
        console.error('Error in combined API endpoint:', error.message);
        res.status(500).json({ error: 'Failed to fetch all data' });
    }
});
// ------------------------------------------

// --- This line tells Express to serve your index.html ---
app.use(express.static(path.join(__dirname, 'public')));

// --- Start the server ---
app.listen(port, () => {
    console.log(`✅ Server is running!`);
    console.log(``); // Adds a blank line
    console.log(`--- Your App URLs ---`);
    console.log(`🏠 Frontend (HTML): http://localhost:${port}`);
    console.log(`📋 JSON API (Data): http://localhost:${port}/api/contests`);
    console.log(``);
    console.log(`(Hold Ctrl or Cmd and click a link to open in your browser)`);
});