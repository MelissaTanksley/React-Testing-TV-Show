import React, { useState, useEffect } from 'react'
import Dropdown from 'react-dropdown'
import Select from 'react-dropdown-select'
import parse from 'html-react-parser'
import { formatSeasons } from './utils/formatSeasons'
import {fetchShow} from './api/fetchShow'
import Episodes from './components/Episodes'
import './styles.css'

export default function App() {
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const episodes = seasons[selectedSeason] || [];
  const [options] = useState([]);

  useEffect(() => {
    fetchShow()
    .then(res => {
      console.log('Response from App', res)
      setShow(res.data)
      setSeasons(formatSeasons(res.data._embedded.episodes))})
    .catch(err => {
      console.log(err)
    })
  }, []);


  
  const handleSelect = e => {
    setSelectedSeason(e.value);
  };

  if (!show) {
    return <h2>Fetching data...</h2>;
  }
    return (
      <div data-testid='container'className="App">
        <img className="poster-img" src={show.image.original} alt={show.name} />
        <h1>{show.name}</h1>
        {parse(show.summary)}
        <Episodes episodes={episodes} />
        <Select options={options} onChange={(values) => this.setValues(values)} />S
      </div>
    
  );


}