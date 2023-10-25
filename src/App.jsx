import Home from './components/Home'
import Account from './components/Account'
import {Route, Routes} from 'react-router-dom'
import './styles/App.css'
import Articles from './components/Articles'
import SingleArticle from './components/SingleArticle'
import Visuals from './components/Visuals'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element= {<Visuals />} />
        <Route path='/home' element={ < Home /> } />
        <Route path='/account' element={< Account />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/articles/:article_id' element={<SingleArticle />} />
      </Routes>
    </>
  )
}

export default App
