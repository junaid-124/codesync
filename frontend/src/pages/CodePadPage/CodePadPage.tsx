import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import styles from './CodePadPage.module.css';
import { RiCodeLine, RiPlayLine, RiUpload2Line, RiShareLine, RiTerminalBoxLine, RiFileList3Line } from 'react-icons/ri';

// --- UPDATED LANGUAGES ARRAY ---
// We add 'apiId' for Judge0 and 'value' for the Monaco Editor
const languages = [
  { name: 'Python', value: 'python', version: '3.10.0', apiId: 71, defaultCode: `print("Hello, World!")` },
  { name: 'JavaScript (Node)', value: 'javascript', version: '18.15.0', apiId: 93, defaultCode: `console.log("Hello, World!");` },
  { name: 'C++', value: 'cpp', version: 'GCC 11.1.0', apiId: 54, defaultCode: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!";\n    return 0;\n}` },
  { name: 'Java', value: 'java', version: '15.0.2', apiId: 62, defaultCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}` },
  { name: 'C#', value: 'csharp', version: '6.12.0', apiId: 51, defaultCode: `using System;\n\npublic class Program {\n    public static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}` },
  { name: 'Go', value: 'go', version: '1.16.2', apiId: 60, defaultCode: `package main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}` },
  { name: 'Rust', value: 'rust', version: '1.55.0', apiId: 73, defaultCode: `fn main() {\n    println!("Hello, World!");\n}` },
  { name: 'PHP', value: 'php', version: '8.0.0', apiId: 68, defaultCode: `<?php\n\necho "Hello, World!";\n` },
  { name: 'Ruby', value: 'ruby', version: '3.0.1', apiId: 72, defaultCode: `puts "Hello, World!"` },
  { name: 'Swift', value: 'swift', version: '5.3.1', apiId: 83, defaultCode: `print("Hello, World!")` },
];
// --- END OF UPDATED ARRAY ---

const CodePadPage = () => {
  const [language, setLanguage] = useState(languages[0]);
  const [code, setCode] = useState(language.defaultCode);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = languages.find(lang => lang.value === e.target.value);
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
      setCode(selectedLanguage.defaultCode);
    }
  };

  // --- UPDATED API CALL ---
  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput('');
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          languageId: language.apiId,
          code: code,
          input: input,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to run code');
      }

      const result = await response.json();

      if (result.status?.id > 2) { // 1=Queued, 2=Processing. >2 is an error/result.
        let fullOutput = '';
        
        // Handle compile errors
        if (result.compile_output) {
          fullOutput += `[Compile Error]:\n${result.compile_output}\n\n`;
          setError(fullOutput);
        } 
        // Handle runtime errors
        else if (result.stderr) {
          fullOutput += `[Runtime Error]:\n${result.stderr}\n`;
          setError(fullOutput);
        }
        // Handle "message" (e.g., Time Limit Exceeded)
         else if (result.message) {
          fullOutput += `[Execution Message]:\n${result.message}\n`;
          setError(fullOutput);
        }
        // Handle successful output
         else {
          fullOutput = result.stdout || '';
          setOutput(fullOutput);
        }
      } else {
        // This shouldn't happen with wait=true, but good to handle
        setOutput('Execution is still processing...');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  // --- END OF UPDATED API CALL ---
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1>CodePad</h1>
        <p>Write, test, and share your code snippets online</p>
      </div>

      <div className={styles.editorLayout}>
        <div className={`${styles.panel} ${styles.editorPanel}`}>
          <div className={styles.panelHeader}>
            <div className={styles.headerLeft}>
              <RiCodeLine />
              <span>Code Editor</span>
            </div>
            <div className={styles.headerRight}>
              <select value={language.value} onChange={handleLanguageChange} className={styles.languageSelect}>
                {languages.map(lang => (
                  <option key={lang.value} value={lang.value}>{lang.name}</option>
                ))}
              </select>
              <span className={styles.versionTag}>{language.version}</span>
            </div>
          </div>
          <div className={styles.editorContainer}>
            <Editor
              height="100%"
              language={language.value}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{ fontSize: 16, minimap: { enabled: false } }}
            />
          </div>
          <div className={styles.panelFooter}>
            <button onClick={handleRunCode} disabled={isLoading} className={styles.runButton}>
              <RiPlayLine /> {isLoading ? 'Running...' : 'Run Code'}
            </button>
            <div className={styles.footerActions}>
              <button className={styles.iconButton}><RiUpload2Line /></button>
              <button className={styles.iconButton}><RiShareLine /></button>
            </div>
          </div>
        </div>

        <div className={styles.ioPanel}>
          <div className={`${styles.panel} ${styles.inputPanel}`}>
            <div className={styles.panelHeader}>
              <div className={styles.headerLeft}>
                <RiTerminalBoxLine />
                <span>Input</span>
              </div>
            </div>
            <textarea
              className={styles.ioTextarea}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input for your program..."
            />
          </div>
          <div className={`${styles.panel} ${styles.outputPanel}`}>
            <div className={styles.panelHeader}>
              <div className={styles.headerLeft}>
                <RiFileList3Line />
                <span>Output</span>
              </div>
            </div>
            <pre className={`${styles.outputContent} ${error ? styles.error : ''}`}>
              {isLoading ? 'Executing...' : (error || output || 'Run your code to see output here...')}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePadPage;