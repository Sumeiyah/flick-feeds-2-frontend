import React from 'react';
import LandingPage from './Components/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Profile from './Components/Profile';
import ExploreMovie from './Components/ExploreMovie';
import MovieClubs from './Components/MovieClubs';
import About from './Components/About';


function App() {
  return (
    <div>
      <BrowserRouter>
          <LandingPage/>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/profile' element={<Profile/>}/>
            <Route exact path='/Explore Movie' element={<ExploreMovie/>}/>
            <Route exact path='/Movie Clubs' element={<MovieClubs/>}/>
            <Route exact path='/About' element={<About/>}/>

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
