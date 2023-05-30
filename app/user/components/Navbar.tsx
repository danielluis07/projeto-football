"use client";

import { signOut } from "next-auth/react";

const Navbar: React.FC<UserProps> = ({ currentUser }) => {
  return (
    <div>
      <div>Navbar</div>
      <br />
      <button onClick={() => signOut()}>Sair</button>
    </div>
  );
};

export default Navbar;
