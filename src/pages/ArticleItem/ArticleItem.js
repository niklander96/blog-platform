import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import styles from './ArticleItem.module.scss'
import articleService from "../../service/articleService";
import ArticleInfo from "../../components/ArticleInfo";
import { Spin } from "antd";

function ArticleItem() {
  const { slug } = useParams()
  const {
    data,
    isLoading,
    isError: notAvailable,
  } = articleService.useGetArticlesQuery({ slug })
  const navigate = useNavigate()
  const { article } = data ?? {}

  return (
    <div className={styles.articleItem}>
      {isLoading && <Spin size='large' />}
      {!isLoading && article && (
        <div className={styles.articleInfo}>
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

          <div>
            <p className={styles.shortDescription}>{article.description}</p>
          </div>
          <div className={styles.fullDescription}>
            <ReactMarkdown className={styles.articleBody}>{article.body}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}

export default ArticleItem
