import { toast } from 'sonner'
import httpService from '../services/httpService.js'
import useAuth from './useAuth.js'

function useServer() {
  const { token, setUser } = useAuth()


  const handleResponse = ({ data, loading, error }) => {
    console.log(data)

    if (data.status === 'ok' && data?.data?.token) {
      setUser({token: data.data.token})
    }

    if (data.status === 'ok' && data?.data?.email) {
      setUser({user: data.data})
    }

    if (error && error.status === 401) {
      toast.error('El usuario o contraseña incorrecto')
    } else {
      if (error) {
        toast.error(error.message)
      }
    }

    return { data, loading, error }
  }

  return {
    get: ({ url }) => httpService({ method: 'GET', url, token }).then(handleResponse),
    post: ({ url, body, hasImage }) => httpService({ method: 'POST', url, token, body, hasImage }).then(handleResponse),
    put: ({ url, body}) => httpService({ method: 'PUT', url, token, body }).then(handleResponse),
    delete: ({ url }) => httpService({ method: 'DELETE', url, token })
  }
}

export default useServer
