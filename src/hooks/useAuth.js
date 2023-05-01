import { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'

/*
  {
      user,
      token,
      isAuthenticated,
      setUser,
      logout
  }
*/

function useAuth() {
  return useContext(AuthContext)
}

export default useAuth
