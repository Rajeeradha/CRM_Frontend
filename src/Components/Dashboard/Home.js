import React from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

const Home = () => {
  return (
    <>
      <div style={{display: "flex"}}>
        <Topbar />
        <Sidebar />
        <Dashboard />
      </div>
    </>
  )
}

export default Home
