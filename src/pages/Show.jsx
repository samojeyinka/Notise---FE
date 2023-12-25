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
            <div className="image_box"></div>
            {/* <p>{content}</p> */}
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
            <p>{formatDate(createdDate)}</p>
            <p>{formatDate(updatedDate)}</p>
            <div className="action_btns">
              <li onClick={() => handleDelete(id)}>Delete</li>
              <Link to={`/edit?id=${id}`}><li>Update</li></Link>
              <li>Share</li>
            </div>
        </div>

        <FacebookShareButton url={shareUrl} quote="Check out this awesome content!" title={title} hashtag="#mynote">
          <FacebookIcon size={40}/>
        </FacebookShareButton>

        
        <WhatsappShareButton url={shareUrl} quote="Check out this awesome content!" title={title} hashtag="#mynote">
          <WhatsappIcon size={40}/>
        </WhatsappShareButton>

        <TwitterShareButton url={shareUrl} quote="Check out this awesome content!" title={title} hashtag="#mynote">
          <TwitterIcon size={40}/>
        </TwitterShareButton>
    </div>
  )
}

export default Show