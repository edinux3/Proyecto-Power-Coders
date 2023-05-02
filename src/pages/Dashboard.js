import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';
import useServer from '../hooks/useServer';
import { apiURL } from "../config"
import "./dashboard.css"

function Dashboard() {
  const { isAuthenticated, logout } = useAuth();
  const { get} = useServer();
  const [news, setNews] = useState([]);

  const getNews = async () => {
    const { data } = await get({ url: '/news' });
    const sortedNews = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setNews(sortedNews);
  };
  

  useEffect(() => {
    getNews();
  }, []);

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
                      {isAuthenticated && (
                        <Link to="/" onClick={logout}>
                          Cerrar Sesión
                        </Link>
                      )}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <h2 className="text-center mt-5">
            Hola..!! en que estas pensado ahora....!!! 😁{' '}
          </h2>
        </div>
      </div>
      {news && (
  <div>
    <div className="news-container">
  {news.map((noticia) => (
    <div key={noticia.id} className="news-item">
      {noticia.photo && (
        <img
          src={`${apiURL}/photos/${noticia.photo}`}
          alt={noticia.title}
          className="news-image"
        />
      )}
      <h3 className="news-title">{noticia.title}</h3>
      <p className="news-content">{noticia.content}</p>
    </div>
  ))}
</div>
  </div>
)}

    </Layout>
  );
}

export default Dashboard;
