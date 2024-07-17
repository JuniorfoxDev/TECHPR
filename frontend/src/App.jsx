import React from 'react';
import './App.css';
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import ProjectList from './pages/ProjectList/ProjectList'
import Project from './pages/Project/Project'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
function App() {
    return (
        <BrowserRouter>
            <Routes>
             <Route path='/dashboard' exact element={<Home/>}/>
             <Route path='/' exact element={<Login/>}/>
             <Route path='/SignUp' exact element={<SignUp/>}/>
             <Route path='/create-project' exact element={<Project/>}/>
             <Route path='/all-project' exact element={<ProjectList/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;