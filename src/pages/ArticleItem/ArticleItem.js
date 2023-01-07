import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Spin } from 'antd'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

import articleService from '../../service/articleService'
import ArticleInfo from '../../components/ArticleInfo'

import styles from './ArticleItem.module.scss'

function ArticleItem() {
  const { slug } = useParams()
  const { data, loading, isError: notAvailable } = articleService.useGetArticleQuery({ slug })
  const navigate = useNavigate()
  const [deleteArticleRequest, { isSuccess, isError }] = articleService.useDeleteArticleMutation()

  const { username } = useSelector((state) => state.user)
  const { article } = data ?? {}

  useEffect(() => {
    if (isSuccess && data) {
      toast.success('Article was deleted successfully.')
      navigate('/')
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      toast.error('Article has not deleted.')
    }
  }, [isError])

  const deleteArticle = () => {
    if (slug) deleteArticleRequest(slug)
  }

  if (notAvailable) {
    return (
      <div>
        <p>Server error! Article is not available.</p>
      </div>
    )
  }
  return (
    <div className='articleItem'>
      {loading && <Spin size='large' />}
      {!loading && article && (
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
