import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';
import useServer from '../hooks/useServer';
import './dashboard.css';
import logo from '../assets/images/logo192.png';
import PostNewsForm from './PostNewsForm';
import News from '../components/News';



function Dashboard() {
  const { isAuthenticated, user, logout } = useAuth();
  const { get, post, delete: destroy } = useServer();
  const [news, setNews] = useState([]);

  const getNews = async () => {
    const { data } = await get({ url: '/news' });
    const sortedNews = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setNews(sortedNews);
  };

  const handleLike = async (noticiaId) => {
    const { data } = await post({ url: `/news/like/${noticiaId}` });
    if (data.status !== 'ok') return

    const newsIndex = news.findIndex(n => n.id === noticiaId)
    news[newsIndex] = data.data
    setNews([...news])
  };

  const handleDislike = async (noticiaId) => {
    const { data } = await post({ url: `/news/dislike/${noticiaId}` });
    console.log(data);
  };

  const createPostHandler = ({ post }) => {
    setNews([post, ...news])
  }

  const handleDelete = async ({id}) => {
    const { data } = await destroy({url: ``})
    console.log(id)
  }

  useEffect(() => {
    getNews();
    console.log(user)
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
          <div className="row justify-content-md-center">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* ... */}
          </nav>
          <h2>Hola {isAuthenticated ? (<b>{user?.username}</b>):(<b>...</b>)}!! en que estas pensando ahora....!!!{' '}</h2>
          {isAuthenticated && <PostNewsForm createPostHandler={createPostHandler} />}
        </div>
      </div>
        </div>
      </div>
      {news && (
      <div>
      <div className="news-container">
      {news.map((noticia) => (
          <News key={noticia.id} noticia={noticia} handleLike={handleLike} handleDislike={handleDislike} handleDelete={handleDelete} />
      ))}
      </div>
      </div>
      )}
    </Layout>
  );
}

export default Dashboard;
