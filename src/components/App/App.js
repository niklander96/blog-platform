import { Route, Routes } from 'react-router-dom'

import ArticleList from '../../pages/ArticleList'

import './App.scss'
import { useDispatch } from 'react-redux'

import Header from '../Header'
import ArticleItem from '../../pages/ArticleItem'

function App() {
  const dispatch = useDispatch()

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path={'/'} element={<ArticleList />} />
        <Route path={'/articles'} element={<ArticleList />} />
        <Route path={'/articles/:slug'} element={<ArticleItem />} />
      </Routes>
    </div>
  )
}

export default App
