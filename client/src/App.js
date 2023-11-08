import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom'
import { RequireAuth } from 'react-auth-kit'
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './Components/Landing'
import Login from './Components/Login'; 
import Signup from './Components/Signup';
import Home from './Components/Home'
import Profile from './Components/Profile'
import ExploreMovie from './Components/ExploreMovie'
import About from './Components/About'
import PostCard from './Components/PostCard';
import Clubs from './Components/Clubs';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Landing/> } /> 
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        
        {/* <Route path='dashboard' element={<Home />} /> */}

        <Route path='dashboard' element={ 
          <RequireAuth loginPath='/login'>
            <Home/>
          </RequireAuth>
         } />

        {/* <Route path='profile' element={<Profile />} /> */}

        <Route path='profile' element={ 
          <RequireAuth loginPath='/profile'>
            <Profile/>
          </RequireAuth>
         } />

   {/* <Route path='explore-movies' element={<ExploreMovies />}/>  */}

        <Route path='explore-movies' element={ 
          <RequireAuth loginPath='/explore-movies'>
            <ExploreMovie/>
          </RequireAuth>
         } />


  {/* <Route path='movie-clubs' element={<MovieClub />} />  */}

        <Route path='movie-clubs' element={ 
          <RequireAuth loginPath='/movie-clubs'>
            <Clubs/>
          </RequireAuth>
         } />

  {/* <Route path='movie-clubs' element={<PostCard />} />  */}

        <Route path='post-cards' element={ 
          <RequireAuth loginPath='/post-cards'>
            <PostCard/>
          </RequireAuth>
         } />
  
        <Route path='about' element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
