import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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
      
   
    } catch (error) {

      console.log(error);
    }

  }



  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={title} onChange={(e) => {setTitle(e.target.value)}} />
      </label>
      <br />
      <label>
        Content:
        <textarea name="content" value={content} onChange={(e) => {setContent(e.target.value)}} />
      </label>
     <br/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
