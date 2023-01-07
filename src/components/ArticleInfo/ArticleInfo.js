import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { format } from 'date-fns'

import Likes from '../Likes'

import styles from './ArticleInfo.module.scss'

function ArticleInfo({ title, slug, tagList, authorImage, authorUsername, favorited, favoritesCount, createdAt }) {
  const [errorImageLoading, setErrorImageLoading] = useState(false)
  const { slug: slugParam } = useParams()

  const isEnoughPage = !!slugParam
  return (
    <div className={styles.info}>
      <div>
        <div className={styles.row}>
          <Link to={`/articles/${slug}`} className={styles.infoHead}>
            {!isEnoughPage && title?.length > 110 ? `${title.slice(0, 100)}...` : title}
          </Link>
          <div className={styles.likes}>
            <Likes />
          </div>
        </div>
        <div className={styles.tags}>
          {tagList
            .filter((tag) => tag !== '')
            .slice(0, !isEnoughPage ? 8 : 100)
            .map((tag) => (
              <span className={styles.tag} key={Math.random()}>
                {!isEnoughPage && tag?.length > 20 ? `${tag.slice(0, 20)}...` : tag}
              </span>
            ))}
          {!isEnoughPage && tagList.length > 8 && <span className={styles.tag}>...</span>}
        </div>
      </div>
      <div className={styles.userInfo}>
        <div>
          <div className={styles.userName}>{authorUsername}</div>
          <div className={styles.createdDate}>{format(new Date(createdAt), 'PP')}</div>
        </div>
        <img
          src={errorImageLoading ? 'https://platform.kata.academy/images/profile-big-photo.png' : authorImage}
          alt='user-image'
          onError={() => setErrorImageLoading(true)}
          className={styles.userImage}
        />
      </div>
    </div>
  )
}

export default ArticleInfo
