"use client";

import { signOut } from "next-auth/react";
import { User } from "@prisma/client";

interface NavbarProps {
  currentUser: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <div>
      <div>Navbar</div>
      <br />
      <button onClick={() => signOut()}>Sair</button>
    </div>
  );
};

export default Navbar;
