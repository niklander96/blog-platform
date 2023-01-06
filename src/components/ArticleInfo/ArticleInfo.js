import { Link, useParams } from "react-router-dom";
import styles from './ArticleInfo.module.scss'

function ArticleInfo({ title, slug, description, ta }) {
  const { slug: slugParam } = useParams()

  const isEnoughPage = !!slugParam
  return (
    <div className={styles.info}>
      <div>
        <Link to={`/articles/${slug}`} className={styles.infoHead}>
          {!isEnoughPage && title?.length > 110 ? `${title.slice(0, 100)}...` : title}
        </Link>
      </div>
    </div>
  )
}

export default ArticleInfo