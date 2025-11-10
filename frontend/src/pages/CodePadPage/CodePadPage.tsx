import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import styles from './CodePadPage.module.css';
import { RiCodeLine, RiPlayLine, RiUpload2Line, RiShareLine, RiTerminalBoxLine, RiFileList3Line } from 'react-icons/ri';

const languages = [
  { name: 'Python', value: 'python', version: '3.8.1', defaultCode: `print("Hello, World!")` },
  { name: 'JavaScript', value: 'javascript', version: '18.15.0', defaultCode: `console.log("Hello, World!");` },
  { name: 'C++', value: 'cpp', version: 'GCC 7.4.0', defaultCode: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!";\n    return 0;\n}` },
];

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

  const handleRunCode = () => {
    setIsLoading(true);
    setOutput('');
    setError('');

    setTimeout(() => {
      if (input) {
        setOutput(`> Program executed with input:\n${input}`);
      } else {
        setOutput('> hello, world!');
      }
      setIsLoading(false);
    }, 1500);
  };
  
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