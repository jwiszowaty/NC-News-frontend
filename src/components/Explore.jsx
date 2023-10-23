import React from 'react'
import Search from './Search'
import Topics from './Topics'
import '../styles/Explore.css'

function Explore() {
  return (
    <section id='explore-section' className='explore'>
        < Search />
        < Topics />
    </section>
  )
}

export default Explore