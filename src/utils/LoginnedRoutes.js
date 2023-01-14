import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import elementsRoutes from '../routes'

function LoginnedRoutes() {
  const { token } = useSelector((selector) => selector.user)
  return token ? <Outlet /> : <Navigate to={elementsRoutes.SIGN_IN} />
}

export default LoginnedRoutes
