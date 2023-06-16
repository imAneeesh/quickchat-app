import React from "react";
import Chat from "../componants/Chat";
import Sidebar from "../componants/Sidebar";

const Home = () => {
    return (
      <div className='home'>
        <div className="container">
          <Sidebar/>
          <Chat/>
        </div>
      </div>
    )
  }
  
  export default Home