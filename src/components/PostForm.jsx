import React, { useState } from 'react';

function PostForm({ post = {}, handleFormSubmit }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [theme, setTheme] = useState(post.theme);
  const [photo, setPhoto] = useState(null);

  const handleTitleChange = ({ target }) => setTitle(target.value);
  const handleContentChange = ({ target }) => setContent(target.value);
  const handlePhotoChange = ({ target }) => setPhoto(target.files[0]);
  const handleThemeChange = ({ target }) => setTheme(target.value)

  const handleSubmit = (e) => {
    const submitted = handleFormSubmit(e)
    if (!submitted) return

    setTitle('');
    setContent('');
    setPhoto(null);
    setTheme('');
  }

  return <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="title">Título:</label>
      <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} />
    </div>
    <div>
      <label htmlFor="content">Contenido:</label>
      <textarea id="content" name="content" value={content} onChange={handleContentChange} />
    </div>
    <div>
      <label htmlFor="photo">Foto:</label>
      <input type="file" id="photo" name="photo" accept="image/*" onChange={handlePhotoChange} />
    </div>
    <div>
      <label htmlFor="theme">Tema:</label>
      <select name="theme" id="theme" value={theme} onChange={handleThemeChange}>
        <option value="">Todos los temas</option>
        <option value="sports">Deportes</option>
        <option value="politics">Política</option>
        <option value="economy">Economía</option>
        <option value="education">Educación</option>
        <option value="society">Sociedad</option>
        <option value="technology">Tecnología</option>
        <option value="culture">Cultura</option>
        <option value="science">Ciencia</option>
        <option value="gaming">Videojuegos</option>
        <option value="medicine">Medicina</option>
      </select>
    </div>
    <button type="submit">Enviar</button>
  </form>
}

export default PostForm
