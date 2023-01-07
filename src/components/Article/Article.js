import ArticleInfo from '../ArticleInfo'

import styles from './Article.module.scss'

function Article({ article }) {
  return (
    <div className={styles.articleCard}>
      <ArticleInfo
        title={article.title}
        slug={article.slug}
        tagList={article.tagList}
        createdAt={article.createdAt}
        authorUsername={article.author.username}
        authorImage={article.author.image}
        favoritesCount={article.favoritesCount}
        favorited={article.favorited}
      />
      <p className={styles.description}>
        {article.description.length > 300 ? `${article.description.slice(0, 300)}...` : article.description}
      </p>
    </div>
  )
}

export default Article
