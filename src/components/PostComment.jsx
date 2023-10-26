import React, { useContext, useState } from 'react'
import { UserDataContext } from '../contexts/User';
import axios from 'axios';

function PostComment({article_id, comments, setComments}) {
    const [comment, setComment] = useState('')
    const { userData, setUserData } = useContext(UserDataContext)
    const handlePosting = async (e) => {
        e.preventDefault();
        await axios
        .post(`https://be-jw-news.onrender.com/api/articles/${article_id}/comments`, {
            "body": comment,
            "article_id": article_id,
            "author": userData.username,
        })
        .then((response) => {
            setComment('added')
            setComments([...comments, response.data.comment])
        })
        setTimeout(() => {
            setComment('')
        }, 4000)
    }
    if (comment === 'added') return (
        <>
            <h2>Comments ({comments.length})</h2>
            <h1>Comment added!</h1>
    </>
    )
    return (
        <>
            <h2>Comments ({comments.length})</h2>
            <section id='comment-text'>
            
                <form onSubmit={handlePosting}>
                <textarea name="comment" id="post-comment" cols="30" rows="5" placeholder='Write a comment...' onChange={(e)=>{setComment(e.target.value)}}></textarea>
                <button type='submit'>Post</button>
                </form>
            </section>
        </>
    )
}

export default PostComment