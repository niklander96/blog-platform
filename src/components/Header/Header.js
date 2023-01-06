import styles from './Header.module.scss'
import { Link, useSearchParams } from "react-router-dom";

function Header() {

  const [searchParams] = useSearchParams()
  return (
    <div className={styles.header}>
      <Link className={styles.head} to={`/articles?page=${searchParams.get('page') || 1}`}>Realworld Blog</Link>
    </div>
  )
}

export default Header
