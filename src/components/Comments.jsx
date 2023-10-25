import React, { useEffect, useState } from 'react'
import voteIcon from '../assets/vote-icon.png'
import axios from 'axios'
import '../styles/Comments.css'
import Loading from './Loading'

function Comments({ article_id }) {

    const [isLoading, setIsLoading] = useState(true);

    const [comments, setComments] = useState([])

    useEffect(() => {
        axios
            .get(`https://be-jw-news.onrender.com/api/articles/${article_id}/comments`)
            .then((response) => {
                setComments(response.data.comments)
                setIsLoading(false)
            })
    }, [])

    if (isLoading) return <Loading />
    return (
        <>
            <section id='comments-section'>
                {
                    comments.map((comment) => {
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

export default Comments