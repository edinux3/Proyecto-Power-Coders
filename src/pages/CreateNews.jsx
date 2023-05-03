function CreateNews() {

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const { data } = await post({ url: '/news', body: formData, hasImages: true });
    
        if (data.status === 'error') {
          setValidationErrors(data.message);
        }
        if (data.status === 'ok') {
          navigate('/');
        }
      };

    return <form onSubmit={handleSubmit}>
    
        <input type="file" name="photo" id="" />
    </form>
}

export default CreateNews
