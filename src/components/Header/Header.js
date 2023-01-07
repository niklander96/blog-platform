import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { removeToken } from '../../utils/getToken'

import styles from './Header.module.scss'

function Header() {
  const { username, token, image} = useSelector(state => state.user)
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorImageLoading, setErrorImageLoading] = useState(false)
  return (
    <div className={styles.header}>
      <Link className={styles.head} to={`/articles?page=${searchParams.get('page') || 1}`}>
        Realworld Blog
      </Link>
      <div className={styles.rightSide}>
        {token ? (
          <>
            <Link className={styles.createArticleButton} to={'/create-article'} >Create article</Link>

            <div className={styles.Profile}>
              <Link className={styles.Profile} to={'/profile'}>
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
              className={styles.LogOutButton}
              type='button'
              onClick={() => {
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
            <Link className={styles.signInButton} to={'/sign-in'}>
              Sign In
            </Link>
            <Link className={styles.signUpButton} to={'/sign-up'}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
