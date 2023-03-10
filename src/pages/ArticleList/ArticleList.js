import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Pagination, Spin } from 'antd'

import Article from '../../components/Article/Article'
import articleApi from '../../service/articleApi'

import styles from './ArticleList.module.scss'

import '../../index.scss'
// eslint-disable-next-line import/order
import elementsRoutes from '../../routes'
function ArticleList() {
  const limitArticles = 5
  const [searchParams, setSearchParams] = useSearchParams()

  const [page, setPage] = useState(Number(searchParams.get('page') || 1))
  const { data, isLoading, isError } = articleApi.useGetArticlesQuery({
    page,
    limit: limitArticles,
  })

  const navigate = useNavigate()

  useEffect(() => {
    navigate(`${elementsRoutes.ARTICLES}?page=${page}`)
  }, [])

  return (
    <div className='window-article'>
      {isError && <h3>An error occurred while loading data. Please refresh the page!</h3>}
      {isLoading ? (
        <Spin size='large' />
      ) : (
        <>
          {data?.articles.map((article) => (
            <Article
              article={article}
              key={`${article.author} ${article.updatedAt} ${article.slug} ${article.tagList.join()}`}
            />
          ))}
          {data?.articles?.length && (
            <div className={styles.pagination}>
              <Pagination
                pageSize={limitArticles}
                current={page}
                showSizeChanger={false}
                total={data?.articlesCount}
                onChange={(newPage) => {
                  setPage(newPage)
                  const params = new URLSearchParams({
                    page: newPage,
                  })
                  setSearchParams(params)
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ArticleList
