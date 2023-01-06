import { Link } from 'react-router-dom'

import styles from './Article.module.scss'
import ArticleInfo from '../ArticleInfo'

function Article({ article }) {
  return (
    <div className={styles.articleCard}>
      <ArticleInfo
        title={article.title}
        slug={article.slug}
        tagList={article.tagList}
        description={article.description}
        createdAt={article.createdAt}
        authorUsername={article.author.username}
        authorImage={article.author.image}
        favoritesCount={article.favoritesCount}
        favorited={article.favorited}
      />
    </div>
  )
}

export default Article
