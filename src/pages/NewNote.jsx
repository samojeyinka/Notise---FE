import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyEditor from '../utils/MyEditor';
import Error from '../utils/Error';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [alertText, setAlertText] = useState('');

  const navigate = useNavigate();

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const post = await axios.post("http://localhost:3000/api/v1/posts", {
        title,
        content
      
      });
      console.log(post);
      setTitle('');
      setContent('');
      setAlertText('Note created successfully');
      navigate('/');
   
    } catch (error) {
      Error(error, setAlertText);
    }

    setTimeout(() =>{
      setAlertText('');
    },3000);

  }

   // Function to handle changes in the 'details' state (for the editor)
   const handleEditorChange = (value) => {
    setContent(value);
  };



  return (
    <div className="new">
      <div className={alertText ? 'err-box' : ''}>
        <p>{alertText}</p>
      </div>
      
    <form onSubmit={handleFormSubmit}>
  
        <input type="text" name="title"
        placeholder='Plan title...'
        value={title} onChange={(e) => {setTitle(e.target.value)}} />
     <br/>
     <MyEditor content={content} setDetailsCallback={handleEditorChange} />
     <br/>
     <br/>
      <button type="submit">Add note</button>
    </form>
    </div>
  );
};

export default PostForm;
