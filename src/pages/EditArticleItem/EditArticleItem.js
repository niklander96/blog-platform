import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Spin } from 'antd'

import articleApi from '../../service/articleApi'
import styles from '../CreateArticleItem/CreateArticleItem.module.scss'
import ArticleForm from '../../components/ArticleForm'
import elementsRoutes from '../../routes'

function EditArticleItem() {
  const { slug } = useParams()
  const { data: fetchedArticles, isLoading: articleLoading } = articleApi.useGetArticleQuery({
    slug,
  })

  const { username } = useSelector((selector) => selector.user)

  const [editArticleRequest, { data, isSuccess: isArticleCreated, error: editError }] =
    articleApi.useEditArticleMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (isArticleCreated && data) {
      toast.success('Article has edited!')
      navigate(`${elementsRoutes.HOME}`)
    }
  }, [isArticleCreated])

  useEffect(() => {
    if (editError) {
      toast.error('Article has not edited!')
    }
  }, [editError])

  const submitHandler = (article) => {
    if (slug) editArticleRequest({ body: article, slug })
  }

  if (articleLoading || !fetchedArticles) {
    return (
      <div>
        <Spin size='large' />
      </div>
    )
  }

  if (username !== fetchedArticles.article.author.username) {
    return (
      <div className='page-error'>
        <p>You cannot edit other articles!</p>
      </div>
    )
  }

  return (
    <div className='window-article'>
      <div className={styles.article}>
        <h3 className={styles.title}>Edit article</h3>
        <ArticleForm
          submitHandler={submitHandler}
          fetchedArticles={{
            title: fetchedArticles.article.title,
            description: fetchedArticles.article.description,
            text: fetchedArticles.article.body,
            tagList: fetchedArticles.article.tagList.map((tag) => ({ name: tag })),
          }}
        />
      </div>
    </div>
  )
}

export default EditArticleItem
