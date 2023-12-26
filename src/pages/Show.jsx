import {React, useEffect,useState} from 'react'
import { Navigate, useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import formatDate from '../utils/Date';
import {
   FacebookShareButton, FacebookIcon, WhatsappShareButton,WhatsappIcon,
   TwitterShareButton,TwitterIcon
 } from 'react-share';

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


const shareUrl = `http://www.localhost:5173/note?id=${id}`

  return (
    <div className='show'>
        <div className="note_flex">
            <h2>{title}</h2> 
            <div className='content' dangerouslySetInnerHTML={{ __html: content }}></div>
            <p><b>Created:</b> {formatDate(createdDate)}</p>
            <p><b>Updated:</b> {formatDate(updatedDate)}</p>
            <div className="action_btns">
              <li className='del-btn' onClick={() => handleDelete(id)}>Delete</li>
              <Link className='updt-btn' to={`/edit?id=${id}`}><li>Update</li></Link>
            </div>
        </div>
        <div className="share mt-4">
          <h4>Share:</h4>
          <div className="share-social">
          <FacebookShareButton url={shareUrl} quote="Check out this awesome note" title={title} hashtag="#mynote">
          <FacebookIcon size={35}/>
        </FacebookShareButton>

        
        <WhatsappShareButton url={shareUrl} quote="Check out this awesome note" title={title} hashtag="#mynote">
          <WhatsappIcon size={35}/>
        </WhatsappShareButton>

        <TwitterShareButton url={shareUrl} quote="Check out this awesome note" title={title} hashtag="#mynote">
          <TwitterIcon size={35}/>
        </TwitterShareButton>
          </div>
        </div>
    </div>
  )
}

export default Show