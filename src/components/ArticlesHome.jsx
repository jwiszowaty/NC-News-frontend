import React, { useEffect, useState } from 'react'
import commentIcon from '../assets/comment-icon.png'
import axios from 'axios'
import Loading from './Loading'
import { Link, useSearchParams } from 'react-router-dom'
import '../styles/Articles.css'
function ArticlesHome() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const limitQuery = searchParams.get('limit') || 5
  useEffect(() => {
    axios
      .get('https://be-jw-news.onrender.com/api/articles')
      .then((response) => {
        setArticles(response.data.articles.slice(0, limitQuery))
        setIsLoading(false)
      })
  }, [searchParams])

  if (isLoading) return <Loading />
  return (
    <>
      <div className='all-button-container'><Link className='all-button-link' to='/articles?sort_by=created_at&order=DESC'><button className='all-button'>See all</button></Link></div>
      <section key='articles-home-section' id='articles-section'>
      <h1>Latest news</h1>
        {
          articles.map((article) => {
            const userVoted = localStorage.getItem(`hasVoted-${article.article_id}`) === 'true'
            return (
              <>
                <div key={article.article_id} id='article-card'>
                  <p className='articles-topic'>{article.topic}</p>
                  <p className='articles-author'>{article.author}</p>
                  <p className='articles-date'>{article.created_at.slice(0, 10)}</p>
                  <p className='articles-time'>{article.created_at.slice(11, 19)}</p>
                  <Link to={{ pathname: `/articles/${article.article_id}` }}>
                    <p className='articles-title'>{article.title}</p>
                  </Link>
                  <div className="article-image-container">
                    <img className='article-image' src={article.article_img_url} />
                  </div>
                  <div className="comment-div" data-article_id={article.article_id} onClick={(e) => {
                    const article_id = +e.currentTarget.getAttribute('data-article_id')
                    console.log('NoComments')
                    setSeeComments([true, article_id])
                  }}>
                    <p className='comment-count'>{article.comment_count}</p>
                    <img className='articles-comment-icon' src={commentIcon} />
                  </div>
                  <div className="vote-div">
                    <p className='vote-count'>{article.votes}</p>
                    <div className='article-vote-icon' data-voted={userVoted}></div>
                  </div>
                </div>
              </>
            )
          })
        }
      </section>
    </>
  )
}

export default ArticlesHome