import React from 'react';
import useServer from '../hooks/useServer';

import './PostNewsCss.css';
import PostForm from '../components/PostForm';


function PostNewsForm({createPostHandler}) {
  const { post } = useServer();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { data } = await post({ url: '/news', body: formData, hasImage: true });
    if (data.status !== 'ok') return false

    createPostHandler({post: data.data})
    return true
  };

  return (
    <PostForm handleFormSubmit={handleSubmit} />
  );
}

export default PostNewsForm;
