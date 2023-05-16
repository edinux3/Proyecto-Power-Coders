import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import Layout from "../components/Layout";
import useAuth from "../hooks/useAuth";
import useServer from "../hooks/useServer";
import logo from "../assets/images/logo192.png";
import News from "../components/News";
import PostNewsForm from "./PostNewsForm";
import FilterButton from "../components/FilterButton";
import { filterButtons } from "../config";

import "./dashboard.css";
import EditNewsForm from "./EditNewsForm";

function Dashboard() {
  const { isAuthenticated, user, logout } = useAuth();
  const { get, post, delete: destroy } = useServer();
  const [news, setNews] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filteredNews, setFilteredNews] = useState([]);
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState()

  const getNews = async () => {
    const { data } = await get({ url: "/news" });
    const sortedNews = data.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setNews(sortedNews);
  };

  const handleLike = async (noticiaId) => {
    const { data } = await post({ url: `/news/like/${noticiaId}` });
    if (data.status !== "ok")
      toast.error("No se pudo hacer el like, por favor vuelva a intentar");

    const newsIndex = news.findIndex((n) => n.id === noticiaId);
    news[newsIndex] = data.data;
    setNews([...news]);
  };

  const filterButtonHandler = (option) => {
    setFilter(option);
  };

  const handleDislike = async (noticiaId) => {
    const { data } = await post({ url: `/news/dislike/${noticiaId}` });
    if (data.status !== "ok")
      toast.error("No se pudo hacer el dislike, por favor vuelva a intentar");

    const newsIndex = news.findIndex((n) => n.id === noticiaId);
    news[newsIndex] = data.data;
    setNews([...news]);
  };

  const createPostHandler = ({ post }) => {
    setNews([post, ...news]);
  };

  const editPostHandler = ({ post }) => {
    const postIndex = news.findIndex(n => n.id === post.id);
    news[postIndex] = post;

    setNews([...news]);
  };

  const handleEdit = ({id}) => {
    setEditId(id)
    setIsEditing(true)
  }

  const handleDelete = async ({ id }) => {
    const { data } = await destroy({ url: `/news/${id}` });
    if (data.status !== "ok")
      toast.error("No se pudo borrar la noticia, por favor vuelva a intentar");

    const newsFiltered = news.filter((n) => n.id !== id);
    setNews(newsFiltered);
  };

  useEffect(() => {
    getNews();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const elems =
      filter === "all"
        ? news
        : news.filter((noticia) => noticia.theme === filter);

    setFilteredNews(elems);
  }, [filter, news]);

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
                    <p className="text-center">
                      {!isAuthenticated && (
                        <Link to="/register">Registrarse</Link>
                      )}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="filter-buttons">
                {filterButtons.map(({ id, name }) => (
                  <FilterButton
                    key={id}
                    filter={filter}
                    option={name}
                    setFilter={filterButtonHandler}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-12">
              <nav className="navbar navbar-expand-lg navbar-light bg-light"></nav>
              <h2>
                Hola {isAuthenticated ? <b>{user?.username}</b> : <b>...</b>}!!
                en que estas pensando ahora....!!!{" "}
              </h2>
              {isAuthenticated && !isEditing && (
                <PostNewsForm createPostHandler={createPostHandler} />
              )}
              {isAuthenticated && isEditing && (
                <EditNewsForm key={editId} postId={editId} editPostHandler={editPostHandler} />
              )}
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
              handleEdit={handleEdit}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
