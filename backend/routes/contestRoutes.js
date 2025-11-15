import express from 'express';
import axios from 'axios';

const router = express.Router();

// --- API URLs ---
const codolioURL = 'https://node.codolio.com/api/contest-calendar/v1/all/get-upcoming-contests';
const HACKERRANK_API_URL = 'https://www.hackerrank.com/community/engage/events';
const CODE360_API_URL = 'https://www.naukri.com/code360/api/v4/public_section/contest_list?page_size=10&page=1&participate=true&request_differentiator=1762515871887&app_context=publicsection&naukri_request=true';

const code360Config = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
  }
};

// --- Helper Functions ---
function toReadableTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
}

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
    if (allEvents.length === 0) return [];
    const publishedEvents = allEvents.filter(event =>
      event.attributes && event.attributes.status.toLowerCase() === 'published'
    );
    const formattedEvents = publishedEvents.map(event => ({
      id: event.id,
      type: event.type,
      ...event.attributes
    }));
    console.log(`HackerRank API: Found ${formattedEvents.length} published events.`);
    return formattedEvents;
  } catch (error) {
    console.error('\n--- Error fetching HackerRank data: ---');
    console.error('This error is expected because the HACKERRANK_API_URL is incorrect.');
    return [];
  }
}

async function fetchCode360Contests() {
  try {
    console.log(`Fetching data from Code 360...`);
    const response = await axios.get(CODE360_API_URL, code360Config);
    if (response.data && response.data.data && response.data.data.events) {
      const allEvents = response.data.data.events;
      const openContests = allEvents.filter(
        event => event.registration_status === 'REGISTRATIONS_OPEN'
      );
      if (openContests.length > 0) {
        const formattedContests = openContests.map(contest => ({
          name: contest.name,
          start_time: toReadableTime(contest.event_start_time),
          end_time: toReadableTime(contest.event_end_time),
          url: `https://www.naukri.com/code360/contests/${contest.slug}`,
          platform: 'Code 360'
        }));
        console.log(`Code 360 API: Found ${formattedContests.length} open contests.`);
        return formattedContests;
      } else {
        return [];
      }
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching Code 360 data:', error.message);
    return [];
  }
}

/**
 * @route GET /contests
 * @desc Gets contest data from all sources
 * (Full path will be /api/contests)
 */
router.get('/contests', async (req, res) => {
  console.log('Frontend requested data. Fetching from Codolio, HackerRank, and Code 360...');
  try {
    const codolioPromise = fetch(codolioURL);
    const hackerrankPromise = fetchHackerrankEvents();
    const code360Promise = fetchCode360Contests();

    const [
      codolioResponse,
      hackerrankEvents,
      code360Contests
    ] = await Promise.all([
      codolioPromise,
      hackerrankPromise,
      code360Promise
    ]);

    if (!codolioResponse.ok) {
      throw new Error(`Codolio HTTP error! Status: ${codolioResponse.status}`);
    }
    const codolioData = await codolioResponse.json();

    const combinedData = {
      ...codolioData,
      hackerrank: hackerrankEvents,
      code360: code360Contests
    };
    
    res.json(combinedData);

  } catch (error) {
    console.error('Error in combined API endpoint:', error.message);
    res.status(500).json({ error: 'Failed to fetch all data' });
  }
});

export default router;