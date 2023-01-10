import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'
import ArticleList from '../../pages/ArticleList'
import '../../index.scss'
import Header from '../Header'
import ArticleItem from '../../pages/ArticleItem'
import userService from '../../service/userService'
import { getToken } from '../../utils/getToken'
import { setUser } from '../../store/usersSlice'
import Registration from '../../pages/Registration'
import Login from '../../pages/Login'
import Profile from '../../pages/Profile'

function App() {
  const [getUser] = userService.useLazyGetUserQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    if (getToken()) {
      getUser(null, true)
        .unwrap()
        .then((data) => {
          const { username, email, token, image } = data.user
          if (data) dispatch(setUser({ username, email, token, image: image || null }))
        })
    }
  })
  return (
    <div className='App'>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Header />
      <Routes>
        <Route path={'/'} element={<ArticleList />} />
        <Route path={'/articles'} element={<ArticleList />} />
        <Route path={'/articles/:slug'} element={<ArticleItem />} />
        <Route path={'/sign-in'} element={<Login />} />
        <Route path={'/sign-up'} element={<Registration />} />
        <Route path={'/profile'} element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
