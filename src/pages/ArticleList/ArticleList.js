import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Pagination, Spin } from 'antd'

import Article from '../../components/Article/Article'
import articleService from '../../service/articleService'

import styles from './ArticleList.module.scss'

function ArticleList() {
  const limitArticles = 5
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(Number(searchParams.get('page') || 1))
  const { data, isLoading, isError } = articleService.useGetArticlesQuery({
    page,
    limit: limitArticles,
  })

  const navigate = useNavigate()

  useEffect(() => {
    navigate(`/articles?page=${page}`)
  }, [])
  // const allArticles = useSelector((state) => state.data.articles)
  return (
    <div>
      {isLoading ? (
        <Spin size='large' />
      ) : (
        data?.articles.map((article) => (
          <Article article={article} key={`${article.author} ${article.slug} ${article.tagList}`} />
        ))
      )}
      <Pagination
        className={styles.pagination}
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
  )
}

export default ArticleList
