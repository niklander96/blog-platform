import { Link } from 'react-router-dom'

import styles from './Article.module.scss'

function Article({ article }) {
  return (
    <div className={styles.articleCard}>
      <Link>{article.title}</Link>
    </div>
  )
}

export default Article
