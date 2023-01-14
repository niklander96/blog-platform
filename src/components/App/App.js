import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'
import ArticleList from '../../pages/ArticleList'
import '../../index.scss'
import Header from '../Header'
import ArticleItem from '../../pages/ArticleItem'
import userApi from '../../service/userApi'
import { getToken } from '../../utils/getToken'
import { setUser } from '../../store/usersSlice'
import Registration from '../../pages/Registration'
import Login from '../../pages/Login'
import Profile from '../../pages/Profile'
import CreateArticleItem from '../../pages/CreateArticleItem'
import EditArticleItem from '../../pages/EditArticleItem/EditArticleItem'
import elementsRoutes from '../../routes'
import LoginnedRoutes from '../../utils/LoginnedRoutes'

function App() {
  const [getUser] = userApi.useLazyGetUserQuery()
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
  }, [])

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
        <Route element={<LoginnedRoutes />}>
          <Route path={`${elementsRoutes.PROFILE}`} element={<Profile />} />
          <Route path={`${elementsRoutes.CREATE_ARTICLE}`} element={<CreateArticleItem />} />
          <Route path={`${elementsRoutes.ARTICLES}/:slug${elementsRoutes.EDIT}`} element={<EditArticleItem />} />
        </Route>
        <Route path={`${elementsRoutes.HOME}`} element={<ArticleList />} />
        <Route path={`${elementsRoutes.ARTICLES}`} element={<ArticleList />} />
        <Route path={`${elementsRoutes.ARTICLES}/:slug`} element={<ArticleItem />} />
        <Route path={`${elementsRoutes.SIGN_IN}`} element={<Login />} />
        <Route path={`${elementsRoutes.SIGN_UP}`} element={<Registration />} />
      </Routes>
    </div>
  )
}

export default App
