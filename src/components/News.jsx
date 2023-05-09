import { useState } from "react";
import { apiURL } from "../config";
import useAuth from "../hooks/useAuth";

function News({noticia, handleLike, handleDislike}) {
    const [expanded, setExpanded] = useState(false)
    const { isAuthenticated } = useAuth()

    return <div key={noticia.id} className="news-item">
        {noticia.photo && (
            <img
                src={`${apiURL}/photos/${noticia.photo}`}
                alt={noticia.title}
                className="news-image"
            />
        )}
        <h3 className="news-title">{noticia.title}</h3>
        <p className={`news-content ${expanded ? 'news-content-expanded' : ''}`}>
            {noticia.content}
        </p>
        {noticia.content.length > 50 && (
            <div className="news-more">
                <button onClick={() => setExpanded(prev => !prev) }>
                    {expanded ? 'Leer menos' : 'Leer más'}
                </button>
            </div>
        )}
        {isAuthenticated && (
            <div>
                <button onClick={() => handleLike(noticia.id)}>Me gusta ({noticia.likes})</button>
                <button onClick={() => handleDislike(noticia.id)}>No me gusta</button>
            </div>
        )}
    </div>
}

export default News