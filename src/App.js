import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import HomeScreen from './components/screens/HomeScreen';
import ArticlesScreen from './components/screens/ArticlesScreen';
import CommitteeScreen from './components/screens/CommitteeScreen';
import ArticleScreen from './components/screens/ArticleScreen';

import Navigation from './components/Navigation';
import Login from './components/admin/Login';
import List from './components/admin/List';
import ArticleForm from './components/admin/ArticleForm';
import MemberForm from './components/admin/MembersForm';
import MinuteForm from './components/admin/MinutesForm';
import EventForm from './components/admin/EventForm';
import AboutScreen from './components/screens/AboutScreen';
import MinutesScreen from './components/screens/MinutesScreen';
import EventsScreen from './components/screens/EventsScreen';
import Footer from './components/Footer';
import ProtectedRoute from './ProtectedRoute';
import { LoginProvider } from './LoginContext';
import { BrowserRouter } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <div className='flex flex-col items-center pt-24'>
          <Navigation />
          <div className='px-4 md:px-0 w-full flex flex-col items-center'>
            <Routes>
              <Route index element={<HomeScreen />} />
              <Route path="articles" element={<ArticlesScreen />} />
              <Route path="committee" element={<CommitteeScreen />} />
              <Route path="article/:id" element={<ArticleScreen />} />
              <Route path="minutes" element={<MinutesScreen />} />
              <Route path="events" element={<EventsScreen />} />
              <Route path="admin" element={<Login />} />
              <Route path="about" element={<AboutScreen />} />
              <Route element={<ProtectedRoute />}>
                <Route path="admin/dashboard" element={<List />} />
                <Route path="admin/article" element={<ArticleForm />} />
                <Route path="admin/member" element={<MemberForm />} />
                <Route path="admin/minute" element={<MinuteForm />} />
                <Route path="admin/event" element={<EventForm />} />
              </Route>
              {/* <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            <Route path="concerts">
              <Route index element={<ConcertsHome />} />
              <Route path=":city" element={<City />} />
              <Route path="trending" element={<Trending />} />
            </Route> */}


            </Routes>
          </div>
        </div>
        <Footer />
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;