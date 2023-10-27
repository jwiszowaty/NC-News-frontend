import React, { useState } from 'react'
import Header from './Header'
import Search from './Search'
import Sorting from './Sorting'
import ArticlesHome from './ArticlesHome'
function Home() {
  return (
    <section id='home-section'>
      <Header />
      <ArticlesHome/>
    </section>
  )
}

export default Home