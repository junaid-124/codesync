import express from 'express';
import axios from 'axios';

const router = express.Router();

/**
 * @route POST /execute
 * @desc Runs code using Piston API
 * (Full path will be /api/execute)
 */
router.post('/execute', async (req, res) => {
  // --- CHANGE: Destructure language, version, code, input ---
  const { language, version, code, input } = req.body;

  // --- CHANGE: Validate new fields ---
  if (!language || !version || code === undefined) {
    return res.status(400).json({ error: 'Missing language, version, or code.' });
  }

  // --- CHANGE: Set up Piston API options ---
  const options = {
    method: 'POST',
    url: 'https://emkc.org/api/v2/piston/execute',
    headers: {
      'content-type': 'application/json',
    },
    // --- CHANGE: Piston API data structure ---
    data: {
      language: language,
      version: version,
      files: [
        {
          // The name is not critical for simple execution
          name: "main", 
          content: code,
        }
      ],
      stdin: input || '' // Ensure stdin is a string
    }
  };

  try {
    const response = await axios.request(options);
    
    // --- CHANGE: Send the raw Piston response back to the frontend ---
    // The frontend will handle parsing the `run` and `compile` objects
    console.log('Execution successful');
    res.json(response.data);

  } catch (error) {
    console.error('Error calling Piston API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to execute code.', details: error.message });
  }
});

export default router;