import {React, useEffect,useState} from 'react'
import { Navigate, useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import formatDate from '../utils/Date';

const Show = () => {

const [title, setTitle] = useState('');
const [content, setContent] = useState('');
const [image, setImage] = useState([]);
const [createdDate, setCreatedDate] = useState('');
const [updatedDate, setUpdatedDate] = useState('');

const navigate = useNavigate();


const params = new URLSearchParams(window.location.search);
const id = params.get('id');
console.log('This note id is:',id);


const getNote = async() =>{
    try{
    const res = await axios.get(`http://localhost:3000/api/v1/posts/${id}`);
    const note = res.data;
    setTitle(note.title);
    setContent(note.content);
    setImage(note.image_url);
    setCreatedDate(note.created_at || '');
    setUpdatedDate(note.updated_at || '');
    } catch (e) {
        console.error(e);
    }
}

const handleDelete = async(id) => {
try {
  await axios.delete(`http://localhost:3000/api/v1/posts/${id}`);
 navigate('/')
  console.log(`deleted ${id}`);

} catch (error) {
  console.error("Unable to delete", error)
}
}

useEffect(() =>{
getNote()
},[])




  return (
    <div className='show'>
        <div className="note_flex">
            <h2>{title}</h2>
            <div className="image_box"></div>
            <p>{content}</p>
            <p>{formatDate(createdDate)}</p>
            <p>{formatDate(updatedDate)}</p>
            <div className="action_btns">
              <li onClick={() => handleDelete(id)}>Delete</li>
              <Link to={`/edit?id=${id}`}><li>Update</li></Link>
              <li>Share</li>
            </div>
        </div>
    </div>
  )
}

export default Show