import React, { useEffect, useState } from 'react'
import commentIcon from '../assets/comment-icon.png'
import voteIcon from '../assets/vote-icon.png'
import axios from 'axios'
import Loading from './Loading'
import { Link,  useParams } from 'react-router-dom'
import '../styles/SingleArticle.css'
import Header from './Header'
import Explore from './Explore'
import Comments from './Comments'

function SingleArticle() {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([])
  const [showComments, setShowComments] = useState(false)
  const { article_id } = useParams()
  useEffect(() => {
    axios
      .get(`https://be-jw-news.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setArticles([response.data.article])
        setIsLoading(false)
      })
  }, [voted])

  const toggleComments = () => {
    if (showComments) {
      setShowComments(false)
    } else {
      setShowComments(true)
    }
  }
  if (isLoading) return <Loading />
  return (
    <>
      <Header />
      <Explore />
      <section key='article-section' id='single-article-section'>

        {
          articles.map((article) => {
            return (
              <>
                <div key={article.article_id} id='single-article-card'>
                  <p className='article-topic'>{article.topic}</p>
                  <p className='article-author'>{article.author}</p>
                  <p className='article-date'>{article.created_at.slice(0, 10)}</p>
                  <p className='article-time'>{article.created_at.slice(11, 19)}</p>
                  <p className='article-title'>{article.title}</p>
                  <div className="article-image-container">
                    <img className='article-image' src={article.article_img_url} />
                  </div>
                  <div className="comment-div" onClick={toggleComments}>
                    <p className='comment-count'>{+article.comment_count}</p>
                    <img className='article-comment-icon' src={commentIcon} />
                  </div>
                  <div className="vote-div">
                    <p className='vote-count'>{article.votes}</p>
                    <img className='article-vote-icon' src={voteIcon} />
                  </div>
                  <div className='article-body'>{article.body}</div>
                </div>
              </>
            )
          })
        }
      </section>
      <section id="comments-section">
        {showComments && <Comments article_id={article_id} />}
      </section>
      <div className='more-button-container'><Link className='more-button-link' to='/articles'><button className='more-button'>all articles</button></Link></div>
    </>
  )
}

export default SingleArticle