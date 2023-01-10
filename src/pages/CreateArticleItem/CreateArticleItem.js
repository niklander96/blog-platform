import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import articleService from '../../service/articleService'
import ArticleForm from '../../components/ArticleForm'

import styles from './CreateArticleItem.module.scss'
import '../../index.scss'

function CreateArticleItem() {
  const [createArticle, { data, isSuccess, error }] = articleService.useCreateArticleMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess && data) {
      toast.success('Article has created!')
      navigate('/')
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
