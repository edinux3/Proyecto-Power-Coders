import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

import Layout from "../components/Layout"
import useAuth from '../hooks/useAuth'
import useServer from '../hooks/useServer'
  
function Dashboard() {
    const { isAuthenticated, logout } = useAuth()
    const { get } = useServer()
    const [news, setNews] = useState([])

    const getNews = async () => {
        const { data } = await get({ url: '/news' })
        setNews(data.data)
    }

    useEffect(() => {
        getNews()
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log(news)
    }, [news])


    return (
        <Layout>
           <div className="row justify-content-md-center">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <h3>News Reddit</h3>
                            <div className="d-flex">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                    <p className="text-center">
                                        {isAuthenticated && <Link to="/" onClick={logout}>Cerrar Sesión</Link>}
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <h2 className="text-center mt-5">Hola..!! en que estas pensado ahora....!!! 😁 </h2>{/* <h2 className="text-center mt-5">Bienvenido {data.data.username}, somos el equipo C!</h2  > */}
                </div>
            </div>
            <div>
                {news && <ul>
                    {news.map(noticia => <li>{noticia.title}</li>)}
                </ul>}
            </div>
        </Layout>
    )
}
   
export default Dashboard;