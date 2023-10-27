import React, { useEffect, useState } from 'react'
import commentIcon from '../assets/comment-icon.png'
import axios from 'axios'
import Loading from './Loading'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../styles/SingleArticle.css'
import Header from './Header'
import Search from './Search'
import Comments from './Comments'

function SingleArticle() {

  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([])
  const { article_id } = useParams()
  const commentsToggleLocal = localStorage.getItem(`showComments-${article_id}`) === 'true'
  const [showComments, setShowComments] = useState(commentsToggleLocal);
  const userVoted = localStorage.getItem(`hasVoted-${article_id}`) === 'true'
  const [voted, setVoted] = useState(userVoted)
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    
    axios
      .get(`https://be-jw-news.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setArticles([response.data.article])
        setIsLoading(false)
      })
  }, [showComments])

  const toggleComments = () => {
    setShowComments(!showComments)
    localStorage.setItem(`showComments-${article_id}`, commentsToggleLocal ? 'false' : 'true')
  }

  const updateVote = async () => {
    setDisabled(true)
    if (disabled) return;
    articles[0].votes = articles[0].votes += voted ? -1 : 1
    try {
      await axios
        .patch(`https://be-jw-news.onrender.com/api/articles/${article_id}`, { inc_vote: userVoted ? -1 : 1 })
      localStorage.setItem(`hasVoted-${article_id}`, (!userVoted).toString())
      setVoted(!userVoted)
      setTimeout(() => {
        setDisabled(false);
      }, 500);
    } catch (error) {
      console.log(`Error occured while voting :${error}`);
      setDisabled(false)
    }
  }

  if (isLoading) return <Loading />
  return (
    <>
      <Header />
      <Search />
      <div className='all-button-container' onClick={()=>navigate(-1)}><button className='all-button'>Back</button></div>
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
                  <div className="vote-div" onClick={updateVote}>
                    <p className='vote-count'>{article.votes}</p>
                    <div className='article-vote-icon' data-voted={voted}></div>
                  </div>
                  {voted && <p className='voted-response' data-voted={voted}>Love it!</p>}
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