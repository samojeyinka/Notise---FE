import { useEffect,useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import formatDate from '../utils/Date';


const Home = () => {

  const [notes,setNotes] = useState([])
  const fetchNotes = async () => {

    try {
      const response = await axios.get("http://localhost:3000/api/v1/posts");
      const notes = response.data.reverse()
      console.log(notes);
      setNotes(notes)

    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  
  
  useEffect(()=> {
    fetchNotes();
  },[])

  const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength) + '...';
  };

  const filterHtmlTags = (htmlString) => {
    
const allowedTags = ['p', 'a', 'br', 'em', 'strong','h1','h2','h3','h4','h5','h6']; 
    const regex = new RegExp(`<\\/?(${allowedTags.join('|')})(\\s[^>]*?>|>)`, 'gi');

return htmlString.replace(regex, '');
  };

  

  
  return (
    <div className='posts_con'>
      {
        notes.map(note=> (
          <div className="note_box" key={note.id}>
          
          {/* Display only 80 characters of the title and also convert every character to uppercase */}
            <Link to={`note?id=${note.id}`}><h2>{truncateString(note.title,80).charAt(0).toUpperCase()}
            {truncateString(note.title,80).slice(1)}</h2></Link>

               {/* Display only 100 characters of the content*/}

               <p dangerouslySetInnerHTML={{ __html: filterHtmlTags(truncateString(note.content, 100)) }}></p>

              <small>{formatDate(note.created_at)}</small>
          </div>
        ))
      }
      <h2></h2>
      <p></p>
    </div>
  )
}

export default Home