import useServer from '../hooks/useServer.js'
import { Link, useNavigate} from "react-router-dom"
import Layout from "../components/Layout"
import { useEffect } from 'react'
import useAuth from '../hooks/useAuth.js'
  
function Login() {
    const { token } = useAuth()
    const { post, get } = useServer()
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()

        const credentials = Object.fromEntries(new FormData(e.target))
        await post({ url: '/login', body: credentials })

        /*
        // Para enviar un formulario con una imagen
        const credentials = new FormData(e.target)
        await post({ url: '/login', body: credentials, hasImage: true })
        
        */
    }

    useEffect(() => {
        if (!token) return

        const user = get({ url: '/profile' })
        if (user) return navigate('/dashboard')

    }, [token])

    return (
        <Layout>
            <div className="row justify-content-md-center mt-5">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Inicio de Sesión</h5>
                            <form onSubmit={handleSubmit}>                            
                                <div className="mb-3">
                                    <label 
                                        htmlFor="email"
                                        className="form-label">
                                            Correo Electrónico
                                    </label>
                                    <input 
                                        type="email"
                                        placeholder="hola@ejemplo.com"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label 
                                        htmlFor="password"
                                        className="form-label">Contraseña
                                    </label>
                                    <input 
                                        type="password"
                                        placeholder="******"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button 
                                        type="submit"
                                        className="btn btn-primary btn-block">Iniciar Sesión</button>
                                    <p className="text-center">¿No tienes cuenta? <Link to="/register">Registrate aquí</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
   
export default Login;