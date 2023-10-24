import React, { useState } from 'react'
import '../styles/Articles.css'
import NoComments from './NoComments'
import WithComments from './WithComments'


function Articles() {

  const [articles, setArticles] = useState([])

  const [seeComments, setSeeComments] = useState([false, 0])
    if (!seeComments[0]) {
      return (
        <NoComments setArticles={setArticles} articles={articles} setSeeComments={setSeeComments} />
      )
    } else {
      return (
        <WithComments setArticles={setArticles} articles={articles} setSeeComments={setSeeComments} seeComments={seeComments} />
      )
    }
}

export default Articles