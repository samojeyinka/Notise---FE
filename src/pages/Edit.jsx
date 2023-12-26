import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyEditor from '../utils/MyEditor';



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

    // Function to handle changes in the 'details' state (for the editor)
    const handleEditorChange = (value) => {
      setNewContent(value);
    };
  

  useEffect(() => {
    getNote();
  },[])
  



  return (
    <div className='new'>
        <form onSubmit={handleFormSubmit}>

        <input type="text" name="title" value={newTitle} onChange={(e) => {setNewTitle(e.target.value)}} />
      <br />
      
      <MyEditor content={newContent} setDetailsCallback={handleEditorChange} />
     <br/>
     <br/>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default Edit;
