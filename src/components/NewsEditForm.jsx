import React, { useState, useEffect } from 'react';


function NewsEditForm({ news }) {
  const [title, setTitle] = useState(news.title);
  const [content, setContent] = useState(news.content);
  
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newsData = {
      title,
      content,
      image,
    };
    NewsService.updateNews(news.id, newsData).then(() => {
      window.location.reload();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título:</label>
        <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <label htmlFor="content">Contenido:</label>
        <textarea id="content" name="content" value={content} onChange={handleContentChange} />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
}

export default NewsEditForm
