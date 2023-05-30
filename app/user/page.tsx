import React from "react";
import Navbar from "./components/Navbar";
import getCurrentUser from "../actions/getCurrentUser";

const Home = async () => {
  const currentUser = await getCurrentUser();
  console.log(currentUser);
  return (
    <div>
      <div>hello</div>
      <Navbar currentUser={currentUser} />
    </div>
  );
};

export default Home;
