import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Popconfirm, Spin } from 'antd'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import articleApi from '../../service/articleApi'
import ArticleInfo from '../../components/ArticleInfo'
import elementsRoutes from '../../routes'

import styles from './ArticleItem.module.scss'

function ArticleItem() {
  const { slug } = useParams()
  const { data, isLoading, isError: notAvailable } = articleApi.useGetArticleQuery({ slug })
  const navigate = useNavigate()
  const [deleteArticleRequest, { isSuccess, error }] = articleApi.useDeleteArticleMutation()

  const { username } = useSelector((selector) => selector.user)
  const { article } = data ?? {}

  useEffect(() => {
    if (isSuccess && data) {
      toast.success('Article was deleted successfully.')
      navigate(`${elementsRoutes.HOME}`)
    }
  }, [isSuccess])

  useEffect(() => {
    if (error) {
      toast.error('Article has not deleted.')
    }
  }, [error])

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
    <div className='window-article'>
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
          <div className={styles.description}>
            <p className={styles.shortDescription}>{article.description}</p>
            {article.author.username === username && (
              <div>
                <Popconfirm
                  title='Are you sure to delete this article?'
                  okText='Yes'
                  cancelText='No'
                  placement='right'
                  onConfirm={() => deleteArticle()}
                >
                  <input type='button' value='Delete' className={classNames(styles.button, styles.buttonDelete)} />
                </Popconfirm>
                <Link to={`${elementsRoutes.ARTICLES}/${slug}${elementsRoutes.EDIT}`}>
                  <input type='button' value='Edit' className={classNames(styles.button, styles.buttonEdit)} />
                </Link>
              </div>
            )}
          </div>
          <div className={styles.fullDescription}>
            <ReactMarkdown className={styles.body}>{article.body}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}

export default ArticleItem
