"use client"
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';


const CodeEditor = () => {
  const [code, setCode] = useState('// Write your code here');

  return (
    <div className={`w-full h-full`}>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue={code}
        theme="vs-dark"
        onChange={(value) => setCode(value || '')}
      />
    </div>
  );
};

export default CodeEditor;
