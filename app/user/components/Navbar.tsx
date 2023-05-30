"use client";

import { signOut } from "next-auth/react";
import { User } from "@prisma/client";

interface NavbarProps {
  currentUser: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <div className="w-full p-8 flex items-center justify-between bg-slate-700">
      <div className="flex items-center gap-x-8">
        <p className="font-extrabold text-slate-300 cursor-default">
          Bem, vindo!
        </p>
        <p className="text-green-500 cursor-default">{currentUser?.name}</p>
      </div>
      <button
        className="p-2 rounded-md cursor-pointer hover:text-slate-500 bg-green-500 text-slate-200"
        onClick={() => signOut()}>
        Sair
      </button>
    </div>
  );
};

export default Navbar;
