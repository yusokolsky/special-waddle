import { Navigate, Outlet } from 'react-router'

const PrivateRoute = () => {
  const token = localStorage.getItem('token')
  
  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default PrivateRoute 