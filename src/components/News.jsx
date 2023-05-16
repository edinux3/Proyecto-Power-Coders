import { useState } from "react";
import { apiURL } from "../config";
import useAuth from "../hooks/useAuth";
function News({noticia, handleLike, handleDislike, handleDelete, handleEdit}) {
    const [expanded, setExpanded] = useState(false)
    const { isAuthenticated, user } = useAuth()
    const isOwner = user?.id === noticia?.ownerId
    return <div key={noticia?.id} className="news-item">
        <p>{noticia?.theme}</p>
        {noticia?.photo && (
            <img
                src={`${apiURL}/photos/${noticia?.photo}`}
                alt={noticia?.title}
                className="news-image"
            />
        )}
        <h3 className="news-title">{noticia?.title}</h3>
        <p className={`news-content ${expanded ? 'news-content-expanded' : ''}`}>
            {noticia?.content}
        </p>
        {noticia?.content?.length > 50 && (
            <div className="news-more">
                <button onClick={() => setExpanded(prev => !prev) }>
                    {expanded ? 'Leer menos' : 'Leer más'}
                </button>
            </div>
        )}
        {isAuthenticated && (
            <div>
                <button onClick={() => handleLike(noticia?.id)}>Me gusta ({noticia?.likes})</button>
                <button onClick={() => handleDislike(noticia?.id)}>No me gusta</button>
                {isOwner && <button onClick={() => handleEdit({id: noticia?.id})}>Editar</button>}
                {isOwner && <button onClick={() => handleDelete({id: noticia?.id})}>Borrar</button>}
            </div>
        )}
    </div>
}
export default News