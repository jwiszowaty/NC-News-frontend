import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../styles/Topics.css'
import { Link, useNavigate } from 'react-router-dom'

function Topics() {
  const [topics, setTopics] = useState([])
  useEffect(() => {
    axios
      .get('https://be-jw-news.onrender.com/api/topics')
      .then((response) => {
        console.log(response);
      setTopics(response.data.topics)
    })
  }, [])
  
  return (
    <section id='topics'>
      {
         topics.map((topic) => {
           return(
           <Link to={{ pathname: '/articles', search: `topic=${topic.slug}` }}>
             <div className='topic-slug'>{topic.slug}</div>
           </Link>)
        })
      }
    </section>
  )
}

export default Topics