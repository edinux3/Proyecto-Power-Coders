import useServer from '../hooks/useServer.js'
import { Link, useNavigate} from "react-router-dom"
import Layout from "../components/Layout"
  
function Login() {
    const { post } = useServer()
    const navigate = useNavigate()

    const handleSubmit = async e => {
    e.preventDefault()

    const credentials = Object.fromEntries(new FormData(e.target))
    
    const { data } = await post({ url: '/login', body: credentials })
    console.log(data.data)
    if (data.data) return navigate('/dashboard')
     }

    return (
        <Layout>
            <div className="row justify-content-md-center mt-5">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Inicio de Sesión</h5>
                            <form onSubmit={handleSubmit}>
                                {/* {Object.keys(validationErrors).length != 0 &&
                                     <p className='text-center '><small className='text-danger'>Incorrect Email or Password</small></p>
                                } */}
                                
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
                                        //value={email}
                                        //onChange={(e)=>{setEmail(e.target.value)}}
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
                                        //value={password}
                                        //onChange={(e)=>{setPassword(e.target.value)}}
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button 
                                        //disabled={isSubmitting}
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