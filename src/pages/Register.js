import useServer from '../hooks/useServer.js'
import { Link, useNavigate} from "react-router-dom"
import Layout from "../components/Layout"
  
function Register() {

    const { post } = useServer()
    const navigate = useNavigate()
    const handleSubmit = async e => {
    e.preventDefault()
    
    const newUser = Object.fromEntries(new FormData(e.target))
    const { data } = await post({ url: '/register', body: newUser })
    console.log(data)
    if (data.data) return navigate('/dashboard')
    }

    return (
        <Layout>
            <div className="row justify-content-md-center mt-5">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Registro</h5>
                            <form  onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label 
                                        htmlFor="name"
                                        className="form-label">Nombre de usuario
                                    </label>
                                    <input 
                                        type="text"
                                        placeholder= "Usuario"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        //value={username}
                                        //onChange={(e)=>{setName(e.target.value)}}
                                    />
                                    {/*validationErrors.name != undefined &&
                                        <div className="flex flex-col">
                                            <small  className="text-danger">
                                            {validationErrors.name[0]}
                                            </small >
                                        </div>
                                    */}
                                     
                                </div>
                                <div className="mb-3">
                                    <label 
                                        htmlFor="email"
                                        className="form-label">Correo Electrónico
                                    </label>
                                    <input 
                                        type="email"
                                        placeholder="hola@ejemplo.com"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        //value={email}
                                       // onChange={(e)=>{setEmail(e.target.value)}}
                                    />
                                    {/* {validationErrors.email != undefined &&
                                        <div className="flex flex-col">
                                            <small  className="text-danger">
                                            {validationErrors.email[0]}
                                            </small >
                                        </div>
                                    } */}
                                     
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
                                       // value={password}
                                        //onChange={(e)=>setPassword(e.target.value)}
                                    />
                                    {/* {validationErrors.password != undefined &&
                                        <div className="flex flex-col">
                                            <small  className="text-danger">
                                            {validationErrors.password[0]}
                                            </small >
                                        </div>
                                    } */}
                                </div>
                                
                                {/* <div className="mb-3">
                                    <label 
                                        htmlFor="confirm_password"
                                        className="form-label">Confirmar Contraseña
                                    </label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        id="confirm_password"
                                        name="confirm_password"
                                        //value={confirmPassword}
                                        //onChange={(e)=>setConfirmPassword(e.target.value)}
                                    />
                                </div> */}
                                <div className="d-grid gap-2">
                                    <button 
                                       // disabled={isSubmitting}
                                        type="submit"
                                        className="btn btn-primary btn-block">Registarme ahora
                                    </button>
                                    <p 
                                        className="text-center">Ya tengo una cuenta <Link to="/">Inicia sesión aquí</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
   
export default Register;