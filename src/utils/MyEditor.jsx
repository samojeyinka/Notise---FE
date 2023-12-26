import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function MyEditor({ content, setDetailsCallback }) {
  const [editorValue, setEditorValue] = useState('');

  useEffect(() => {
    // Set the editor value when the 'details' prop changes
    setEditorValue(content);
  }, [content]);

  const handleEditorChange = (value) => {
    setEditorValue(value);

    // Call the callback function to update 'details' in the parent component (Tasks)
    if (setDetailsCallback) {
      setDetailsCallback(value);
    }
  };

  return (
    <ReactQuill
    className='content-input'
    placeholder='What are you planning?'
      value={editorValue}
      onChange={handleEditorChange}
      required
      modules={{
        toolbar: [
          [{ header: [1, 2,3,,4,5,6, false] }],
          ['bold', 'italic', 'underline'],
          ['code-block', 'link'],
        ],
      }}
      theme="snow"
    />
  );
}

export default MyEditor;