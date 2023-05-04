import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import useServer from '../hooks/useServer';

function NewNews() {
  const { user } = useAuth();
  const { post } = useServer();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [photo, setPhoto] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('photo', photo);
    formData.append('userId', user.id);
    await post({ url: '/news', data: formData });
    window.location.reload();
  };

  const onFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <div className="row justify-content-md-center">
      <div className="col-md-8">
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título</label>
            <input type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`} {...register("title", { required: true })} id="title" />
            {errors.title && <div className="invalid-feedback">El título es requerido</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Contenido</label>
            <textarea className={`form-control ${errors.content ? 'is-invalid' : ''}`} {...register("content", { required: true })} id="content" />
            {errors.content && <div className="invalid-feedback">El contenido es requerido</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="photo" className="form-label">Foto</label>
            <input type="file" className={`form-control ${errors.photo ? 'is-invalid' : ''}`} {...register("photo", { required: true })} id="photo" onChange={onFileChange} accept=".jpg,.jpeg,.png" />
            {errors.photo && <div className="invalid-feedback">La foto es requerida</div>}
          </div>
          <button type="submit" className="btn btn-primary">Crear Noticia</button>
        </form>
      </div>
    </div>
  );
}

export default NewNews;
