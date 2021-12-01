import React, { useEffect,useState } from 'react';
import './App.css';
import DisplayComponent from './DisplayComponent'
const axios = require('axios')

const App = ()=> {
  const [banners,setBanners] = useState([])

  const fetchApi = async ()=>{
    let obj = await axios.get('/api/banners')
    setBanners(obj.data.banners)
  }

  useEffect(()=>{ 
    fetchApi()
  },[])

  return (
    <div className="app-container">
      <header>
        <DisplayComponent data={banners}/>
      </header>
    </div>
  );
}

export default App;
