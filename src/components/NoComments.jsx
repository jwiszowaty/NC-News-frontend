import React, { useEffect, useState } from 'react'
import commentIcon from '../assets/comment-icon.png'
import voteIcon from '../assets/vote-icon.png'
import axios from 'axios'
import Loading from './Loading'

function NoComments({ setArticles, articles, setSeeComments }) {

  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
          .get('https://be-jw-news.onrender.com/api/articles')
          .then((response) => {
            setArticles(response.data.articles)
            setIsLoading(false)
          })
    }, [])
  
  if (isLoading) return <Loading />
  return (
    <>
    <section key='articles-section' id='articles-section'>
        
          {
            articles.map((article) => {
              return (
                <>
                  <div  key={article.article_id} id='article-card'>
                    <p className='articles-topic'>{article.topic}</p>
                    <p className='articles-author'>{article.author}</p>
                    <p className='articles-date'>{article.created_at.slice(0, 10)}</p>
                    <p className='articles-time'>{article.created_at.slice(11, 19)}</p>
                    <p className='articles-title'>{article.title}</p>
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
                      <img className='articles-vote-icon' src={voteIcon} />
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

export default NoComments