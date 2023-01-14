import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import articleApi from '../../service/articleApi'
import ArticleForm from '../../components/ArticleForm'

import styles from './CreateArticleItem.module.scss'

import '../../index.scss'
// eslint-disable-next-line import/order
import elementsRoutes from '../../routes'

function CreateArticleItem() {
  const [createArticle, { data, isSuccess, error }] = articleApi.useCreateArticleMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess && data) {
      toast.success('Article has created!')
      navigate(`${elementsRoutes.HOME}`)
    }
  }, [isSuccess])

  useEffect(() => {
    if (error) {
      toast.error('Article not created!')
    }
  }, [error])

  const submitHandler = (article) => {
    createArticle(article)
  }

  return (
    <div className='window-article'>
      <div className={styles.article}>
        <h3 className={styles.title}>Create new article</h3>
        <ArticleForm submitHandler={submitHandler} />
      </div>
    </div>
  )
}

export default CreateArticleItem
