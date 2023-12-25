import React, { useEffect, useState } from 'react';
import axios from 'axios';



const Edit = () => {
    
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

     const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log('This note id is:',id);

  const getNote = async () => {
        try {
            const {data: {title,content}} = await axios.get(`http://localhost:3000/api/v1/posts/${id}`);
            setNewTitle(title);
            setNewContent(content);
            
        } catch (error) {
            console.log(error)
        }

  }

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    try {
    const {data: {title, content}} = await axios.patch(`http://localhost:3000/api/v1/posts/${id}`,{
        title: newTitle,
        content: newContent,
    });

    setNewTitle(title);
    setNewContent(content);
    console.log(content);
    } catch (error) {
        console.error(error)
    }
  }

  useEffect(() => {
    getNote();
  },[])
  



  return (
    <div>
        <form onSubmit={handleFormSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={newTitle} onChange={(e) => {setNewTitle(e.target.value)}} />
      </label>
      <br />
      <label>
        Content:
        <textarea name="content" value={newContent} onChange={(e) => {setNewContent(e.target.value)}} />
      </label>
     <br/>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default Edit;
