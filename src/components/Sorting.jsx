import React, { useEffect, useState } from 'react'
import '../styles/Sorting.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
function Sorting() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [topics, setTopics] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios
            .get('https://be-jw-news.onrender.com/api/topics')
            .then((response) => {
                setTopics(response.data.topics)
            })
    }, [])

    const setTopic = (topic) => () => {
        
        if (topic === 'all') {
            const newParams = new URLSearchParams(searchParams);
            newParams.delete('topic')
            setSearchParams(newParams)
        } else {
            const newParams = new URLSearchParams(searchParams);
            newParams.set('topic', topic);
            setSearchParams(newParams)
        }
    }
    const setSortBy = (category) => () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sort_by', category);
        setSearchParams(newParams)
    }
    const setOrder = (order) => () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('order', order);
        setSearchParams(newParams)

    }

    return (
        <>
            <section id='topics'>
                {
                    topics.map((topic) => {
                        return (
                            <div key={topic.slug} onClick={setTopic(topic.slug)}>{topic.slug}</div>
                        )
                    })
                }
                <div className='topic-slug' onClick={setTopic('all')}>all</div>
            </section>
            <section id='sorting-section'>
                <p id='sort_by-tag'>sort by:</p>
                <div id="options-sort_by">
                    <div className='option' onClick={setSortBy('created_at')}>date</div>
                    <div className='option' onClick={setSortBy('comment_count')}>comment count</div>
                    <div className='option' onClick={setSortBy('votes')}>votes</div>
                </div>
                <p id='order-tag'>order:</p>
                <div id="options-order">
                    <div className='option' onClick={setOrder('DESC')}>descending</div>
                    <div className='option' onClick={setOrder('ASC')}>ascending</div>
                </div>
            </section>
        </>
    )
}

export default Sorting