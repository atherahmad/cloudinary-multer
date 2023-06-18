import './App.css';
import {useState} from "react"
import axios from 'axios'

function App() {

  const [images, setImages] = useState([])

  const fileChangeHandler = (e) => {
    const tempArray = []
    for(let i =0 ; i < e.target.files.length ; i++){
      tempArray.push(e.target.files[i])
    }
    setImages(tempArray)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('userName', e.target['userName'].value)
    images.forEach(img => data.append('images',img))

    axios.post('http://localhost:5000/upload', data)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
  return (
    <div className="App">
      <header className="App-header">
        <h3>Image upload React App</h3>
        <form onSubmit={submitHandler}>
          <div>
            <input type="text" name='userName' />
          </div>
          <div>
            <input type="file" multiple accept="image/png, image/gif, image/jpeg, image/jpg" onChange={fileChangeHandler}/>  
          </div>
          <div>
            <input type="file"  accept="image/png, image/gif, image/jpeg, image/jpg" onChange={fileChangeHandler}/>
          </div>
          <div>   
            <input type='submit' value='Submit' />
          </div>
        </form>
          <div>
            {images.map(item=><img src={URL.createObjectURL(item)} alt={item.name} height={100} key={item.name}/>)}
          </div>
      <img src='http://res.cloudinary.com/fbw-e09/image/upload/v1687118732/2.jfif.jpg' alt='test' style={{border: '2px solid green', height:'200px', width:'200px'}} />
      </header>

    </div>
  );
}

export default App;
