import useServer from '../hooks/useServer.js';
import Layout from '../components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Register() {
  const { post } = useServer();
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));
    const { data } = await post({ url: '/register', body: formData });

    console.log(data)

    if (data.status === 'error') {
      setValidationErrors(data.message);
    }
    if (data.status === 'ok') {
      navigate('/login');
    }
  };

  return (
    <Layout>
      <div className="row justify-content-md-center mt-5">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Registro</h5>
              <form onSubmit={handleSubmit}>
                {validationErrors.general && (
                  <p className="text-center">
                    <small className="text-danger">{validationErrors.general}</small>
                  </p>
                )}

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nombre
                  </label>
                  <input type="text" placeholder="Nombre Usuario" className="form-control" id="name" name="username" />
                  {validationErrors.name && (
                    <small className="text-danger">{validationErrors.name}</small>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    placeholder="hola@ejemplo.com"
                    className="form-control"
                    id="email"
                    name="email"
                    aria-describedby="emailHelp"
                  />
                  {validationErrors.email && (
                    <small className="text-danger">{validationErrors.email}</small>
                  )}
                  <div id="emailHelp" className="form-text">
                    Nunca compartiremos tu correo electrónico con nadie más.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input type="password" placeholder="******" className="form-control" id="password" name="password" />
                  {validationErrors.password && (
                    <small className="text-danger">{validationErrors.password}</small>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="******"
                    className="form-control"
                    id="confirmPassword"
                  />
                  {validationErrors.confirmPassword && (
                    <small className="text-danger">{validationErrors.confirmPassword}</small>
                  )}
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-block">
                    Registrarse
                  </button>
                  <p className="text-center">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
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

export default Register
