import React from 'react'
import Header from './Header'
import Search from './Search'
import Sorting from './Sorting'
import Articles from './Articles'
import { useSearchParams } from 'react-router-dom'
function Main() {
    return (
        <section id='main-section'>
            <Header />
            <Search />
            <Sorting/>
            <Articles/>
        </section>
    )
}

export default Main