import { useNavigate } from "react-router-dom"
 

const CreatePostButton = () => {

  const navigate = useNavigate()

  function handleClick() {
    navigate("/postnewsform");
  }
  return (
    <>
      <div className='nav-container_division'>
        <button onClick={handleClick}>
          Crear post
        </button>
      </div>
    </>
  )
}
export default CreatePostButton