// --- Main Imports ---
import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // Loads .env variables
import path from 'path';
import { fileURLToPath } from 'url';

// --- Route Imports ---
import codeRoutes from './routes/codeRoutes.js';
import contestRoutes from './routes/contestRoutes.js';
// --- ESM Workaround for __dirname ---
// This is needed for express.static
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- App & Port Setup ---
const app = express();
// Use port 8080 or 3000, just be consistent. 8080 is good.
const PORT = process.env.PORT || 8080; 

// --- Core Middleware ---
// Allow your React app (running on localhost:5173) to make requests
app.use(cors({ origin: 'http://localhost:5173' })); 
// Parse JSON request bodies (needed for /api/execute)
app.use(express.json()); 
// Serve your static public folder (from your scraper setup)
app.use(express.static(path.join(__dirname, 'public')));

// --- Main Routes ---
// Use the imported routers
app.use('/api', codeRoutes);      // Handles /api/execute
app.use('/api', contestRoutes);   // Handles /api/contests

// Root route
app.get('/', (req, res) => {
  res.send('CodeSync Backend is running!');
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`✅ CodeSync Backend is running!`);
  console.log(``);
  console.log(`--- Your App URLs ---`);
  console.log(`🏠 Main Server: http://localhost:${PORT}`);
  console.log(`📋 Contests API: http://localhost:${PORT}/api/contests`);
  console.log(`⚡ Code API: http://localhost:${PORT}/api/execute`);
  console.log(``);
});