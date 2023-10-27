import React, { useEffect, useState } from 'react'
import voteIcon from '../assets/vote-icon.png'
import axios from 'axios'
import '../styles/Comments.css'
import Loading from './Loading'
import PostComment from './PostComment'
import { useContext } from 'react'
import { UserDataContext } from '../contexts/User'
import { useAsyncError } from 'react-router-dom'

function Comments({ article_id }) {

    const { userData, setUserData } = useContext(UserDataContext)

    const [isLoading, setIsLoading] = useState(true);
    const [deleted, setDeleted] = useState({status: false, id: 'id'})

    const [comments, setComments] = useState([])
    const handleDelete = (comment_id) => {
        if (deleted.status === true) return;
        setDeleted({ status: true, id: comment_id})
        axios 
        .delete(`https://be-jw-news.onrender.com/api/comments/${comment_id}`)
            .then(() => {
                console.log('comment deleted');
                setTimeout(() => {
                 setDeleted({ status: false, id: 'id'})   
                },2000)
        })
    }
    useEffect(() => {
        
        axios
            .get(`https://be-jw-news.onrender.com/api/articles/${article_id}/comments`)
            .then((response) => {
                setIsLoading(false)
                setTimeout(() => {
                    setComments(response.data.comments)
                },1000)
                
            })
    }, [comments])

    if (isLoading) return <Loading />
    return (
        <>
            <PostComment article_id={article_id} comments={comments} setComments={setComments} />
            <section id='comments-section'>
                {
                    comments.map((comment) => {
                        if (comment.comment_id === deleted.id) {
                            return (
                                <div key={comment.comment_id} id='comment-card'>
                                    {deleted.id === comment.comment_id && <h1>Comment deleted successfully!</h1>}
                                </div>
                            )
                        } else {
                            return (
                                <div key={comment.comment_id} id='comment-card'>
                                    <p className='comments-author'>{comment.author}</p>
                                    <p className='comments-date'>{comment.created_at.slice(0, 10)}</p>
                                    <p className='comments-time'>{comment.created_at.slice(11, 19)}</p>
                                    <p className='comments-body'>{comment.body}</p>
                                    <div className="vote-div">
                                        <div className='vote-count'><p className='votes'>{comment.votes}</p></div>
                                        <img className='comments-vote-icon' src={voteIcon} />
                                    </div>
                                    {deleted.id === comment.comment_id && <h1>Comment deleted successfully!</h1>}
                                    {comment.author === userData.username && <button onClick={() => handleDelete(comment.comment_id)}>Delete</button>}
                                </div>
                            )
                        }
                            
                    })
                }
            </section>

        </>
    )
}

export default Comments