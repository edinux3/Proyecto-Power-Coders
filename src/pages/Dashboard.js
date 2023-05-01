import React,{ useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import useServer from '../hooks/useServer.js'
import { apiURL } from '../config'
  
function Dashboard() {  
// no funciona
    // const { get } = useServer()
    // const navigate = useNavigate()

    //const { data } =  get({ url: 'apiURL', token: ' ' })
    // console.log(data)
    // if (!data.status) return navigate('/')

    return (
        <Layout>
           <div className="row justify-content-md-center">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#"><h3>News Reddit</h3></a>
                            <div className="d-flex">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                    <p className="text-center"><Link to="/">Cerrar Sesión</Link></p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <h2 className="text-center mt-5">Hola..!! en que estas pensado ahora....!!! 😁 </h2>{/* <h2 className="text-center mt-5">Bienvenido {data.data.username}, somos el equipo C!</h2  > */}
                </div>
            </div>
            <div>

            </div>
        </Layout>
    );
}
   
export default Dashboard;