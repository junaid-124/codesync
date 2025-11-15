import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import styles from './CodePadPage.module.css';
import { RiCodeLine, RiPlayLine, RiTerminalBoxLine, RiFileList3Line } from 'react-icons/ri';

// --- UPDATED LANGUAGES ARRAY ---
// Based on the Piston API /runtimes endpoint data
const languages = [
  { 
    name: 'Python', 
    value: 'python', 
    version: '3.10.0', // From your list
    defaultCode: `print("Hello, World!")` 
  },
  { 
    name: 'JavaScript (Node)', 
    value: 'javascript', 
    version: '18.15.0', // From your list (runtime: node)
    defaultCode: `console.log("Hello, World!");` 
  },
  { 
    name: 'C++', 
    value: 'cpp', // <--- This is for Monaco syntax highlighting
    pistonLang: 'c++', // <--- This is for the Piston API
    version: '10.2.0', 
    defaultCode: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!";\n    return 0;\n}` 
  },
  { 
    name: 'Java', 
    value: 'java', 
    version: '15.0.2', // From your list
    defaultCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}` 
  },
  { 
    name: 'C# (Mono)', 
    value: 'csharp', 
    version: '6.12.0', // From your list (runtime: mono)
    defaultCode: `using System;\n\npublic class Program {\n    public static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}` 
  },
  { 
    name: 'Go', 
    value: 'go', 
    version: '1.16.2', // From your list
    defaultCode: `package main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}` 
  },
  { 
    name: 'Rust', 
    value: 'rust', 
    version: '1.68.2', // UPDATED from your list
    defaultCode: `fn main() {\n    println!("Hello, World!");\n}` 
  },
  { 
    name: 'PHP', 
    value: 'php', 
    version: '8.2.3', // From your list
    defaultCode: `<?php\n\necho "Hello, World!";\n` 
  },
  { 
    name: 'Ruby', 
    value: 'ruby', 
    version: '3.0.1', // From your list
    defaultCode: `puts "Hello, World!"` 
  },
  { 
    name: 'Swift', 
    value: 'swift', 
    version: '5.3.3', // UPDATED from your list
    defaultCode: `print("Hello,World!")` // Note: Swift 5.3 needs no space
  },
  { 
    name: 'C', 
    value: 'c', 
    version: '10.2.0', // From your list (runtime: gcc)
    defaultCode: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!");\n    return 0;\n}` 
  },
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

  // --- UPDATED API CALL FOR PISTON ---
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
        // --- CHANGE: Send 'language' and 'version' ---
       body: JSON.stringify({
          // This logic checks for the new field first
          language: (language as any).pistonLang || language.value,
          version: language.version,
          code: code,
          input: input,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to run code');
      }

      // --- CHANGE: Parse the Piston API response structure ---
      const result = await response.json();
      // The result object now looks like: { run: {...}, compile: {...} }

      let fullOutput = '';

      // 1. Check for compilation errors
      if (result.compile && result.compile.stderr) {
        fullOutput += `[Compile Error]:\n${result.compile.stderr}`;
        setError(fullOutput);
      } 
      // 2. Check for runtime errors
      else if (result.run && result.run.stderr) {
        fullOutput += `[Runtime Error]:\n${result.run.stderr}`;
        setError(fullOutput);
      } 
      // 3. Check for successful output
      else if (result.run && result.run.stdout !== undefined) {
        fullOutput = result.run.stdout;
        setOutput(fullOutput);
      } 
      // 4. Handle cases with no output
      else {
        setOutput('Execution finished with no output.');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  // --- END OF UPDATED API CALL ---
  
  // --- No changes needed in the JSX below ---
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
              <button 
                onClick={handleRunCode} 
                disabled={isLoading} 
                className={styles.iconButton}
                title={isLoading ? "Running..." : "Run Code"}
              >
                <RiPlayLine />
              </button>
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