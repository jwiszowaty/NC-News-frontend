import Home from './components/Home'
import Account from './components/Account'
import {Route, Routes} from 'react-router-dom'
import './styles/App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ < Home /> } />
        <Route path='/account' element={< Account />} />
      </Routes>
    </>
  )
}

export default App
