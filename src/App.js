import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from 'react-router';
import { ToastContainer } from 'react-toastify';
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
import SoonScreen from './components/screens/SoonScreen';
import GalleryScreen from './components/screens/GalleryScreen';

const Layout = () => (
  <div className="flex flex-col items-center pt-24">
    <ToastContainer />
    <Navigation />
    <ScrollRestoration />
    <div className="px-4 md:px-0 w-full flex flex-col items-center">
      <Outlet /> {/* This renders the child routes */}
    </div>
    <Footer />

  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: 'projects', element: <ArticlesScreen /> },
      { path: 'committee', element: <CommitteeScreen /> },
      { path: 'article/:id', element: <ArticleScreen /> },
      { path: 'minutes', element: <MinutesScreen /> },
      { path: 'events', element: <EventsScreen /> },
      { path: 'admin', element: <Login /> },
      { path: 'about', element: <AboutScreen /> },
      { path: 'soon', element: <SoonScreen /> },
      { path: 'gallery', element: <GalleryScreen /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'admin/dashboard/:type', element: <List /> },
          { path: 'admin/article', element: <ArticleForm /> },
          { path: 'admin/member', element: <MemberForm /> },
          { path: 'admin/minute', element: <MinuteForm /> },
          { path: 'admin/event', element: <EventForm /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  );
}

export default App;