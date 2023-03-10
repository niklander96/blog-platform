import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { removeToken } from '../../utils/getToken'
import { logOut } from '../../store/usersSlice'
import elementsRoutes from '../../routes'

import styles from './Header.module.scss'

function Header() {
  const { username, token, image } = useSelector((select) => select.user)
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorImageLoading, setErrorImageLoading] = useState(false)
  return (
    <div className={styles.header}>
      <Link className={styles.head} to={`${elementsRoutes.ARTICLES}?page=${searchParams.get('page') || 1}`}>
        Realworld Blog
      </Link>
      <div className={styles.rightSide}>
        {token ? (
          <>
            <Link className={styles.createArticleButton} to={`${elementsRoutes.CREATE_ARTICLE}`}>
              Create article
            </Link>

            <div className={styles.profile}>
              <Link className={styles.profileUsername} to={`${elementsRoutes.PROFILE}`}>
                {username}
                <img
                  src={
                    !errorImageLoading && image ? image : 'https://platform.kata.academy/images/profile-big-photo.png'
                  }
                  alt='user-image'
                  onError={() => {
                    setErrorImageLoading(true)
                  }}
                  className={styles.userImage}
                />
              </Link>
            </div>
            <button
              className={styles.logOutButton}
              type='button'
              onClick={() => {
                dispatch(logOut())
                removeToken()
                navigate('/')
                toast.info('User is logged out.')
              }}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link className={styles.signInButton} to={`${elementsRoutes.SIGN_IN}`}>
              Sign In
            </Link>
            <Link className={styles.signUpButton} to={`${elementsRoutes.SIGN_UP}`}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
