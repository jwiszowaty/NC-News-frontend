import React, { useEffect, useState } from 'react'
import commentIcon from '../assets/comment-icon.png'
import voteIcon from '../assets/vote-icon.png'
import axios from 'axios'
import Loading from './Loading'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Articles.css'
import Header from './Header'
import Explore from './Explore'

function Articles() {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(5)

  useEffect(() => {
    axios
      .get('https://be-jw-news.onrender.com/api/articles')
      .then((response) => {
        setArticles(response.data.articles.slice(0, count))
        setIsLoading(false)
      })
  }, [count])

  const addArticles = () => {
    const increase = count + 5
    setCount(increase)
  }

  if (isLoading) return <Loading />
  return (
    <>
      <Header />
      <Explore />
      <section key='articles-section' id='articles-section'>

        {
          articles.map((article) => {
            return (
              <>
                <Link to={{ pathname: `/articles/${article.article_id}` }}>
                  <div key={article.article_id} id='article-card'>
                    <p className='articles-topic'>{article.topic}</p>
                    <p className='articles-author'>{article.author}</p>
                    <p className='articles-date'>{article.created_at.slice(0, 10)}</p>
                    <p className='articles-time'>{article.created_at.slice(11, 19)}</p>
                    <p className='articles-title'>{article.title}</p>
                    <div className="article-image-container">
                      <img className='article-image' src={article.article_img_url} />
                    </div>
                    <div className="comment-div">
                      <p className='comment-count'>{article.comment_count}</p>
                      <img className='articles-comment-icon' src={commentIcon} />
                    </div>
                    <div className="vote-div">
                      <p className='vote-count'>{article.votes}</p>
                      <img className='articles-vote-icon' src={voteIcon} />
                    </div>
                  </div>
                </Link>
              </>
            )
          })
        }
        <div className='more-button-container'><button className='more-button' onClick={addArticles}>more</button></div>
      </section>
    </>
  )
}

export default Articles