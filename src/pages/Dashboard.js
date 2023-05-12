import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from "react-router-dom";

import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';
import useServer from '../hooks/useServer';
import './dashboard.css';
import logo from '../assets/images/logo192.png';
import CreatePostButton from './CreatePostButton';
import News from '../components/News';
import PostNewsForm from './PostNewsForm';


function Dashboard() {
  const { isAuthenticated, user, logout } = useAuth();
  const { get, post, delete: destroy } = useServer();
  const [news, setNews] = useState([]);
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all');


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
  
  };

  const createPostHandler = ({ post }) => {
    setNews([post, ...news]) 
  }

  const handleDelete = async ({id}) => {
    const { data } = await destroy({url: `/news/${id}`})
  
  }

  useEffect(() => {
    getNews();
  }, []);

  const filteredNews = filter === 'all' ? news : news.filter(noticia => noticia.category === filter);

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
          <div className="row justify-content-center">
        <div className="col-12">
          <div className="filter-buttons">
            <button className={`filter-button ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Todas</button>
            <button className={`filter-button ${filter === 'Sports' ? 'active' : ''}`} onClick={() => setFilter('Sports')}>Deportes</button>
            <button className={`filter-button ${filter === 'Politics' ? 'active' : ''}`} onClick={() => setFilter('Politics')}>Política</button>
            <button className={`filter-button ${filter === 'Economy' ? 'active' : ''}`} onClick={() => setFilter('Economy')}>Economia</button>
            <button className={`filter-button ${filter === 'Education' ? 'active' : ''}`} onClick={() => setFilter('Education')}>Educacion</button>
            <button className={`filter-button ${filter === 'Technology' ? 'active' : ''}`} onClick={() => setFilter('Technology')}>Tecnologia</button>
            <button className={`filter-button ${filter === 'Culture' ? 'active' : ''}`} onClick={() => setFilter('Culture')}>Cultura</button>
            <button className={`filter-button ${filter === 'Science' ? 'active' : ''}`} onClick={() => setFilter('Science')}>Ciencia</button>
            <button className={`filter-button ${filter === 'Gaming' ? 'active' : ''}`} onClick={() => setFilter('Gaming')}>Juegos</button>
            <button className={`filter-button ${filter === 'Medicine' ? 'active' : ''}`} onClick={() => setFilter('Medicine')}>Medicina</button> 
            <button className={`filter-button ${filter === 'Society' ? 'active' : ''}`} onClick={() => setFilter('Society')}>Sociedad</button> 
          </div>
        </div>
      </div>
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
      <div>
          <div className="news-container">
          {filteredNews.map((noticia) => (
          <News
             key={noticia.id}
             noticia={noticia}
             handleLike={handleLike}
             handleDislike={handleDislike}
             handleDelete={handleDelete}
          />
          ))}
        </div>
        </div>

    </Layout>
  )
}

export default Dashboard;
