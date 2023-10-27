import voteIcon from '../assets/vote-icon.png'
import commentIcon from '../assets/comment-icon.png'
import '../styles/Articles.css'
import axios from 'axios'
import React, {useEffect, useState } from 'react'
import { Link, useSearchParams} from 'react-router-dom'
import Loading from './Loading'
function Articles() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([])
  const [count, setCount] = useState(5)
    const topicQuery = searchParams.get('topic')
    const sortByQuery = searchParams.get('sort_by')
    const orderQuery = searchParams.get('order')
  
  useEffect(() => {
    axios
      .get(topicQuery ? `https://be-jw-news.onrender.com/api/articles?sort_by=${sortByQuery}&order=${orderQuery}&topic=${topicQuery}` : `https://be-jw-news.onrender.com/api/articles?sort_by=${sortByQuery}&order=${orderQuery}`)
      .then((response) => {
        setArticles(response.data.articles.slice(0, count))
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [searchParams, count])

  const addArticles = () => {
    const increase = count + 5
    setCount(increase)
  }

  if (isLoading) return <Loading />
  return (
    <>
      <section key='articles-section' id='articles-section'>

        {
          articles.map((article) => {
            return (
              <>
                  <div key={article.article_id} id='article-card'>
                    <p className='articles-topic'>{article.topic}</p>
                    <p className='articles-author'>{article.author}</p>
                    <p className='articles-date'>{article.created_at.slice(0, 10)}</p>
                    <p className='articles-time'>{article.created_at.slice(11, 19)}</p>
                    <Link to={{pathname:`/article/${article.article_id}`}}><p className='articles-title'>{article.title}</p></Link>
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