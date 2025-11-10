import React, { useState, useEffect, useCallback } from 'react';
// --- 1. MODIFIED: Import 'Views' ---
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import {enUS} from 'date-fns/locale/en-US';
import styles from './ContestsPage.module.css';

// --- Setup the localizer for date-fns (Unchanged) ---
const locales = {
  'en-US': enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// --- Type Definitions (Unchanged) ---
type CodolioContest = {
  platform: string;
  contestName: string;
  contestStartDate: string;
  contestEndDate: string;
  contestUrl: string;
};
type HackerRankContest = {
  name: string;
  start_time: string | number;
  end_time: string | number;
  microsite_url: string;
};
type Code360Contest = {
  name: string;
  start_time: string;
  end_time: string;
  url: string;
};
type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  platform: string;
  url: string; 
};

// --- Helper Date Functions (Unchanged) ---
function parseCode360Date(dateStr: string): Date {
  if (!dateStr) return new Date(0);
  try {
    const [datePart, timePart] = dateStr.split(', ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [time, ampm] = timePart.split(' ');
    let [hours, minutes, seconds] = time.split(':').map(Number);
    if (ampm && ampm.toLowerCase() === 'pm' && hours !== 12) hours += 12;
    if (ampm && ampm.toLowerCase() === 'am' && hours === 12) hours = 0;
    return new Date(year, month - 1, day, hours, minutes, seconds);
  } catch (e) {
    console.warn(`Could not parse Code360 date: ${dateStr}`);
    return new Date(0);
  }
}
function parseStandardDate(dateInput: string | number): Date {
  if (typeof dateInput === 'number') return new Date(dateInput * 1000);
  if (typeof dateInput === 'string') return new Date(dateInput);
  return new Date(0);
}

// --- The React Component ---
const ContestsPage = () => {
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- 2. NEW: State for controlling the calendar ---
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.MONTH);
  // --- END NEW ---

  // --- Data Fetching Effect (Unchanged) ---
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/contests');
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
        const data = await response.json();

        // (Normalization code is unchanged)
        const codolio = (data.data || []).map((c: CodolioContest) => ({
          title: c.contestName,
          start: new Date(c.contestStartDate),
          end: new Date(c.contestEndDate),
          platform: c.platform,
          url: c.contestUrl,
        }));
        const hackerrank = (data.hackerrank || []).map((c: HackerRankContest) => ({
          title: c.name,
          start: parseStandardDate(c.start_time),
          end: parseStandardDate(c.end_time),
          platform: 'HackerRank',
          url: c.microsite_url,
        }));
        const code360 = (data.code360 || []).map((c: Code360Contest) => ({
          title: c.name,
          start: parseCode360Date(c.start_time),
          end: parseCode360Date(c.end_time),
          platform: 'Code 360',
          url: c.url,
        }));
        const combined: CalendarEvent[] = [...codolio, ...hackerrank, ...code360];

        const platformSet = new Set(combined.map(c => c.platform));
        setPlatforms(['all', ...Array.from(platformSet).sort()]);
        
        setAllEvents(combined);
        setFilteredEvents(combined);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  // --- Filtering Effect (Unchanged) ---
  useEffect(() => {
    if (selectedPlatform === 'all') {
      setFilteredEvents(allEvents);
    } else {
      setFilteredEvents(allEvents.filter(event => event.platform === selectedPlatform));
    }
  }, [selectedPlatform, allEvents]);

  // --- 3. MODIFIED: Calendar Event Handlers ---
  const handleSelectEvent = useCallback((event: CalendarEvent) => {
    window.open(event.url, '_blank', 'noopener,noreferrer');
  }, []);

  const eventPropGetter = useCallback((event: CalendarEvent) => {
    const platformClass = styles[event.platform.toLowerCase().replace(/[^a-z0-9]/g, '')] || styles.defaultEvent;
    return { className: `${styles.event} ${platformClass}` };
  }, []);

  // --- NEW: Handlers to control the calendar state ---
  const handleNavigate = useCallback((newDate: Date) => setDate(newDate), [setDate]);
  // We are using 'any' here because the 'View' type from the library is broad
  const handleView = useCallback((newView: any) => setView(newView), [setView]);
  // --- END NEW ---

  // --- Render Logic (Unchanged) ---
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlatform(e.target.value);
  };

  if (loading) return <div className={styles.loading}>Loading contests...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Contest Calendar</h1>
        <div className={styles.filterContainer}>
          <label htmlFor="platformFilter">Filter: </label>
          <select 
            id="platformFilter"
            value={selectedPlatform}
            onChange={handleFilterChange}
          >
            {platforms.map(platform => (
              <option key={platform} value={platform}>
                {platform === 'all' ? 'All Platforms' : platform}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.calendarContainer}>
        {/* --- 4. MODIFIED CALENDAR --- */}
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventPropGetter}
          popup
          
          // --- ADD THESE PROPS TO FIX BUTTONS ---
          date={date}
          view={view}
          onNavigate={handleNavigate}
          onView={handleView}
          // --- END OF FIX ---
        />
      </div>
    </div>
  );
};

export default ContestsPage;