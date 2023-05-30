"use client";

import { signOut } from "next-auth/react";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <div>Navbar</div>
      <br />
      <button onClick={() => signOut()}>Sair</button>
    </div>
  );
};

export default Navbar;
