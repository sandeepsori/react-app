import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import Plan from './pages/Plan';
import Billing from './pages/Billing';
import Transaction from './pages/Transaction';

import AddSub from './pages/subscription/AddSub';
import EditSub from './pages/subscription/EditSub';
import ListSub from './pages/subscription/ListSub';

import Bollywood from './pages/shows/Bollywood';
import Hollywood from './pages/shows/Hollywood';
import Series from './pages/shows/Series';
import Livetv from './pages/shows/Livetv';


function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/plan' element={<Plan/>} />
        <Route path='/billing' element={<Billing/>} />

        <Route path='/transaction' element={<Transaction/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/subscription-add' element={<AddSub/>} />
        <Route path='/subscription-edit' element={<EditSub/>} />
        <Route path='/subscription-list' element={<ListSub/>} />

        <Route path='/bollywood' element={<Bollywood/>} />
        <Route path='/hollywood' element={<Hollywood/>} />
        <Route path='/series' element={<Series/>} />
        <Route path='/livetv' element={<Livetv/>} />
        
    </Routes>
    </Router>
  );
}

export default App;
