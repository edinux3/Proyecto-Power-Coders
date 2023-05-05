import React, { useState } from 'react';
import useServer from '../hooks/useServer';

function PostNewsForm() {
  const { post } = useServer();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handlePhotoChange = (e) => setPhoto(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('photo', photo);
    await post({ url: '/news', data: formData });
    setTitle('');
    setContent('');
    setPhoto(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título:</label>
        <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} required />
      </div>
      <div>
        <label htmlFor="content">Contenido:</label>
        <textarea id="content" name="content" value={content} onChange={handleContentChange} required />
      </div>
      <div>
        <label htmlFor="photo">Foto:</label>
        <input type="file" id="photo" name="photo" accept="image/*" onChange={handlePhotoChange} required />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default PostNewsForm;
