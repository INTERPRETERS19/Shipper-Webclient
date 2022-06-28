import {useState} from 'react'
import Client from "../../api/Client"
 const AddImage = () => {
    const [newUser, setNewUser] = useState(
        {
            photo: '',
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', newUser.photo);

        Client.post('http://localhost:8080/image/add/', formData)
             .then(res => {
                console.log(res);
             })
             .catch(err => {
                console.log(err);
             });
    }
    const handlePhoto = (e) => {
        setNewUser({...newUser, photo: e.target.files[0]});
    }

  return (
    <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={handlePhoto}
            />
            <input 
                type="submit"
            />
        </form>
  )
}
export default AddImage;