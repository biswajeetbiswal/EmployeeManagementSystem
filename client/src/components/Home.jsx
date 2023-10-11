import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
const Home = () => {
  return (
    <>
      <div className="frontpage">
        <div>
          <h1>Employee Management System</h1>
          <Link to="/dashboard" className="link">
            Dashboard
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
