import logo from './logo.svg';
import './App.css';
import HomeScreen from './components/screens/HomeScreen';
import ArticlesScreen from './components/screens/ArticlesScreen';
import CommitteeScreen from './components/screens/CommitteeScreen';
import ArticleScreen from './components/screens/ArticleScreen';
import { Routes, Route } from "react-router";
import Navigation from './components/Navigation';

import Login from './components/admin/Login';
import List from './components/admin/List';
import ArticleForm from './components/admin/ArticleForm';
import MemberForm from './components/admin/MembersForm';
import MinuteForm from './components/admin/MinutesForm';
import EventForm from './components/admin/EventForm';


function App() {
  return (
    <div className='flex flex-col items-center pt-24'>
      <Navigation />
      <div className='max-w-screen-xl margin-auto'>
        <Routes>
          <Route index element={<HomeScreen />} />
          <Route path="articles" element={<ArticlesScreen />} />
          <Route path="committee" element={<CommitteeScreen />} />
          <Route path="article/:id" element={<ArticleScreen />} />
          <Route path="admin" element={<Login />} />
          <Route path="admin/dashboard" element={<List />} />
          <Route path="admin/article" element={<ArticleForm />} />
          <Route path="admin/member" element={<MemberForm />} />
          <Route path="admin/minute" element={<MinuteForm />} />
          <Route path="admin/event" element={<EventForm />} />

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
  );
}

export default App;
