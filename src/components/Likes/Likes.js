import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import articleApi from '../../service/articleApi'

import styles from './Likes.module.scss'

function Likes({ favorited, favoritesCount, slug }) {
  const [likeArticle, { isError: isLikeError }] = articleApi.useLikeArticleMutation()
  const [removeLikeArticle, { isError: isRemoveLikedError }] = articleApi.useRemoveLikeFromArticleMutation()

  const { username } = useSelector((selector) => selector.user)
  useEffect(() => {
    if (isLikeError || isRemoveLikedError) {
      toast.error('Article is no liked!')
    }
  }, [isLikeError, isRemoveLikedError])

  const loggedToLike = () => {
    if (!username) {
      toast.info('Please log in to like it.')
      return
    }
    if (!favorited) {
      likeArticle(slug)
    } else {
      removeLikeArticle(slug)
    }
  }

  return (
    <div className={styles.likes}>
      <label htmlFor={`${slug}`} className={styles.icons}>
        <input
          type='checkbox'
          className={styles.likeCheckbox}
          id={`${slug}`}
          checked={favorited && !!username}
          onChange={() => {}}
          disabled={!username}
        />
        <span className={styles.noLikeCheckbox} onClick={loggedToLike} onKeyDown={loggedToLike} />
      </label>
      <span className={styles.likesCount}>{favoritesCount}</span>
    </div>
  )
}

export default Likes
