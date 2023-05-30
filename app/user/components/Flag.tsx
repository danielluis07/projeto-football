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
  }> | null;
}

const Flag: React.FC<FlagsProps> = ({ currentUser }) => {
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

  return (
    <>
      <Container>
        <div className="w-5/6 mx-auto grid grid-cols-5 gap-10">
          {data?.response?.map((country) => (
            <div
              className="w-[100px] border border-neutral-700 rounded-lg overflow-hidden"
              key={country.name}>
              <Link href={`/leagues/${country.name}`}>
                <Image
                  src={country?.flag || worldFlag}
                  alt="flag"
                  width={200}
                  height={200}
                />
                <div className="text-center py-2">{country.name}</div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};
export default Flag;
