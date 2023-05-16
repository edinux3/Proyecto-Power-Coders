import { useEffect, useState } from 'react';

import useServer from '../hooks/useServer';
import PostForm from '../components/PostForm';
import isEmpty from '../helpers/isEmpty';

import './PostNewsCss.css';

function EditNewsForm({ postId, editPostHandler }) {
  const [id] = useState(postId)
  const [post, setPost] = useState({})
  const { get, patch } = useServer();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { data } = await patch({ url: `/news/${id}`, body: formData, hasImage: true });
    if (data.status !== 'ok') return false

    editPostHandler({ post: data.data })
    return true
  };

  const getPost = async () => {
    const { data } = await get({url: `/news/${id}` })
    if (data.status !== 'ok') return false

    setPost(data.data)
  }

  useEffect(() => {
    getPost()

    // eslint-disable-next-line
  }, [id])

  return (
    !isEmpty(post) && <PostForm post={post} handleFormSubmit={handleSubmit} />
  );
}

export default EditNewsForm
