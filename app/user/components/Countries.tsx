"use client";

import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import worldFlag from "../../../public/images/world.jpg";
import Link from "next/link";
import Container from "@/app/components/Container";

import { User } from "@prisma/client";

interface FlagsProps {
  currentUser: User | null;
}

interface CountriesProps {
  response: Array<{
    name: string;
    code: string;
    flag: string;
  }>;
}

const Countries: React.FC<FlagsProps> = ({ currentUser }) => {
  const [data, setData] = useState<CountriesProps | null>(null);
  const api = currentUser?.apikey;

  useEffect(() => {
    axios
      .get("https://v3.football.api-sports.io/countries", {
        headers: {
          "x-rapidapi-key": `${api}`,
          "x-rapidapi-host": "v3.football.api-sports.io",
        },
      })
      .then(function (res) {
        setData(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  console.log(data);

  return (
    <div className="bg-[url('../public/images/field.jpg')] w-full min-h-full">
      <Container>
        <div className="w-full text-center p-8 text-slate-300">
          Selecione um País
        </div>
        <div className="pb-20 w-5/6 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {data?.response.map((country) => (
            <div
              key={country.code}
              className="w-[100px] mt-20 bg-slate-300 border border-neutral-700 rounded-lg overflow-hidden">
              <Image
                src={country.flag || worldFlag}
                alt="image"
                width={200}
                height={200}
              />
              <Link href={`/user/league/${country.name}`}>
                <div className="text-center py-2 cursor-pointer hover:text-green-500">
                  {country.name}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
export default Countries;
