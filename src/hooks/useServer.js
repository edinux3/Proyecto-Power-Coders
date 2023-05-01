//import { toast } from 'sonner'
import httpService from '../services/httpService.js'
//import useAuth from './useAuth.js'

function useServer() {

  // const  {token, setUser} = useAuth()


  // const handleResponse = ({ data, loading, error }) => {
  //   if (data?.user && data?.data.token) {
  //     setUser({...data})
  //   }

  //   if (error && error.status === 401) {
  //     toast.error('El usuario o contraseña incorrecto')
  //   } else {
  //     if (error) {
  //       toast.error(error.message)
  //     }
  //   }

  //   return { data, loading, error }
  // }
  
  return {
    get: ({ url, token }) => httpService({ method: 'GET', url, token })/*.then(handleResponse)*/,
    post: ({ url, body }) => httpService({ method: 'POST', url, body }),
    put: ({ url, token, body}) => httpService({ method: 'PUT', url, token, body })/*.then(handleResponse)*/,
    delete: ({ url, token }) => httpService({ method: 'DELETE', url, token })
  }
}

export default useServer
