import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyEditor from '../utils/MyEditor';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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
      navigate('/');
   
    } catch (error) {

      console.log(error);
    }

  }

   // Function to handle changes in the 'details' state (for the editor)
   const handleEditorChange = (value) => {
    setContent(value);
  };



  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={title} onChange={(e) => {setTitle(e.target.value)}} />
      </label>
     <br/>
     <MyEditor content={content} setDetailsCallback={handleEditorChange} />
     <br/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
