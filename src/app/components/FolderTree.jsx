"use client"
import React, { useEffect, useState } from 'react';
import mockFileData from './mockdata';

const FolderTree = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setFiles(mockFileData); 
  }, []);

  return (
    <div>
      <h2>Project Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            <strong>📁{file.path}</strong>
            {/* <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '6px' }}>
              {file.data}
            </pre> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderTree;
