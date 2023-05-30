import React from "react";
import Navbar from "./components/Navbar";
import getCurrentUser from "../actions/getCurrentUser";
import Countries from "./components/Countries";

const Home = async () => {
  const currentUser = await getCurrentUser();
  console.log(currentUser);
  return (
    <div>
      <Navbar currentUser={currentUser} />
      <Countries currentUser={currentUser} />
    </div>
  );
};

export default Home;
