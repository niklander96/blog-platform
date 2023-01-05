import { Route, Routes } from 'react-router-dom'

import ArticleList from '../../pages/ArticleList'

import './App.scss'
import { useDispatch } from 'react-redux'
import Header from '../Header'

function App() {
  const dispatch = useDispatch()

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path={'/'} element={<ArticleList />} />
        <Route path={'/articles'} element={<ArticleList />} />
      </Routes>
    </div>
  )
}

export default App
