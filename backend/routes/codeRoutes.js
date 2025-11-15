import express from 'express';
import axios from 'axios';

const router = express.Router();

/**
 * @route POST /execute
 * @desc Runs code using Judge0 API
 * (Full path will be /api/execute)
 */
router.post('/execute', async (req, res) => {
  const { languageId, code, input } = req.body;

  if (!languageId || code === undefined) {
    return res.status(400).json({ error: 'Missing languageId or code.' });
  }

  // Encode for safe transmission
  const encodedCode = btoa(code);
  const encodedInput = btoa(input);

  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: {
      base64_encoded: 'true',
      wait: 'true',
      fields: '*'
    },
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },
    data: {
      language_id: languageId,
      source_code: encodedCode,
      stdin: encodedInput
    }
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    const output = {
      stdout: data.stdout ? atob(data.stdout) : null,
      stderr: data.stderr ? atob(data.stderr) : null,
      compile_output: data.compile_output ? atob(data.compile_output) : null,
      message: data.message ? atob(data.message) : null,
      status: data.status,
    };

    console.log('Execution successful:', output.status.description);
    res.json(output);

  } catch (error) {
    console.error('Error calling Judge0 API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to execute code.', details: error.message });
  }
});

export default router;