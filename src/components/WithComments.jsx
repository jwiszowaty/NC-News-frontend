import React, { useEffect, useState } from 'react'
import commentIcon from '../assets/comment-icon.png'
import voteIcon from '../assets/vote-icon.png'
import axios from 'axios'
import '../styles/WithComments.css'
import '../styles/Articles.css'
import Loading from './Loading'

function WithComments({ setArticles, articles, setSeeComments, seeComments }) {

    const [isLoading, setIsLoading] = useState(true);

    const [comments, setComments] = useState([])

    useEffect(() => {
        const filteredArticle = articles.filter((article) => article.article_id === seeComments[1])
        setArticles(filteredArticle)
        axios
            .get(`https://be-jw-news.onrender.com/api/articles/${seeComments[1]}/comments`)
            .then((response) => {
                setComments(response.data.comments)
                setIsLoading(false)
            })
    }, [])
    
    
    return (
        <>
            <section key='articles-section' id='articles-section'>
                    {
                    articles.map((article) => {
                            if (isLoading) return <Loading />
                            return (
                                <>
                                    <div key={article.article_id} id='article-card'>
                                        <p className='articles-topic'>{article.topic}</p>
                                        <p className='articles-author'>{article.author}</p>
                                        <p className='articles-date'>{article.created_at.slice(0, 10)}</p>
                                        <p className='articles-time'>{article.created_at.slice(11, 19)}</p>
                                        <p className='articles-title'>{article.title}</p>
                                        <div className="article-image-container">
                                            <img className='article-image' src={article.article_img_url} />
                                        </div>
                                        <div className="comment-div" data-article_id={article.article_id} onClick={(e) => {
                                            const article_id = e.currentTarget.getAttribute('data-article_id')
                                            console.log('WithComments')
                                            setSeeComments([false, 0])
                                        }}>
                                            <button>Back</button>
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
            <section id='comments-section'>
                    {
                    comments.map((comment) => {
                            if (isLoading) return <Loading />
                            return (
                                <>
                                    <div key={comment.comment_id} id='comment-card'>
                                        <p className='comments-author'>{comment.author}</p>
                                        <p className='comments-date'>{comment.created_at.slice(0, 10)}</p>
                                        <p className='comments-time'>{comment.created_at.slice(11, 19)}</p>
                                        <p className='comments-body'>{comment.body}</p>
                                        <div className="vote-div">
                                            <div className='vote-count'><p className='votes'>{comment.votes}</p></div>
                                            <img className='comments-vote-icon' src={voteIcon} />
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

export default WithComments