import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';
import useServer from '../hooks/useServer';
import { apiURL } from '../config';
import './dashboard.css';
import logo from '../assets/images/logo192.png';

function Dashboard() {
  const { isAuthenticated, user, logout } = useAuth();
  const { get, post } = useServer();
  const [news, setNews] = useState([]);

  const getNews = async () => {
    const { data } = await get({ url: '/news' });
    const sortedNews = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setNews(sortedNews);
  };

  const handleLike = async (noticiaId) => {
    const { data } = await post({ url: `/news/${noticiaId}/like` });
    console.log(data);
  };

  const handleDislike = async (noticiaId) => {
    const { data } = await post({ url: `/news/${noticiaId}/dislike` });
    console.log(data);
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
              <img src={logo} alt="News Reddit" className="navbar-logo" />
              <h3>News Reddit Pirate </h3>
              <div className="d-flex">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <p className="text-center">
                      {isAuthenticated ? (
                        <>
                          <Link to="/" onClick={logout}>
                            Cerrar Sesión
                          </Link>
                          <div></div>
                        </>
                      ) : (
                        <Link to="/login">Iniciar Sesión</Link>
                      )}
                    </p>
                  </li>
                  <li className="nav-item">
                    <p className="text-center">{!isAuthenticated && <Link to="/register">Registrarse</Link>}</p>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <h2>Hola {isAuthenticated ? (<b>{user?.username}</b>):(<b>...</b>)}!! en que estas pensando ahora....!!!{' '}</h2>
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
                    <p className={`news-content ${noticia.expanded ? 'news-content-expanded' : ''}`}>
                      {noticia.content}
                    </p>
                    {noticia.content.length > 100 && (
                      <div className="news-more">
                        <button onClick={() => setNews((prevNews) => prevNews.map((n) => {
                          if (n.id === noticia.id) {
                            return {
                              ...n,
                              expanded: !n.expanded // cambia la propiedad "expanded" del objeto de la noticia
                            };
                          }
                          return n;
                        }))}>
                          {noticia.expanded ? 'Leer menos' : 'Leer más'}
                        </button>
                      </div>
                    )}
                    {isAuthenticated && (
                      <div>
                        <button onClick={() => handleLike(noticia.id)}>Me gusta</button>
                        <button onClick={() => handleDislike(noticia.id)}>No me gusta</button>
                      </div>
                    )}
                  </div>
                ))}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Dashboard;
