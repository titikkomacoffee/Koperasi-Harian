import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
export default function ProtectedRoute({ children, allowedRoles }){
  const { user, role } = useAuth()
  if(!user){
    const hasSession = localStorage.getItem('sb-eiosyymlsfxxsdgnxqif-auth-token')
    if(!hasSession) return <Navigate to="/auth/login" />
  }
  if(allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" />
  return children
}
