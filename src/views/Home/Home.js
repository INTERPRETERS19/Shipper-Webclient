import React from "react";
import "./Home.css";
import SideBar from "../../components/Sidebar";

const Home = () => {
  return (
    <div>
      <SideBar />
      <div className="home">
        <h1>Home</h1>
      </div>
    </div>
  );
};

export default Home;
