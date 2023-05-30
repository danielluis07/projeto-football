"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";

interface PlayersTableProps {
  currentUser: User | null;
  year: number;
  team: number;
}

interface PlayersProps {
  parameters: {
    season: string;
    team: string;
  };
  response: Array<{
    player: {
      id: number;
      name: string;
      firstname: string;
      lastname: string;
      age: number;
      nationality: string;
      photo: string;
      weight: string;
      height: string;
      injured: boolean;
      birth: {
        country: string;
        date: string;
        place: string;
      };
    };
    statistics: Array<{
      cards: {
        yellow: number;
        yellowred: number;
        red: number;
      };
      dribbles: {
        attempts: number;
        success: number;
        past: number;
      };
      duels: {
        total: number;
        won: number;
      };
      fouls: {
        drawn: number;
        comitted: number;
      };
      games: {
        appearences: number;
        lineups: number;
        minutes: number;
        number: number;
        position: string;
        rating: string;
      };
      goals: {
        total: number;
        conceded: number;
        assists: number;
        saves: number;
      };
      league: {
        id: number;
        name: string;
        country: string;
        logo: string;
        flag: string;
        season: number;
      };
      passes: {
        accuracy: number;
        key: number;
        total: number;
      };
      penalty: {
        commited: number;
        missed: number;
        saved: number;
        scored: number;
        won: number;
      };
      shots: {
        on: number;
        total: number;
      };
      substitutes: {
        in: number;
        out: number;
        bench: number;
      };
      tackles: {
        total: number;
        blocks: number;
        interceptions: number;
      };
      team: {
        id: number;
        logo: string;
        name: string;
      };
    }>;
  }>;
}

const PlayersTable: React.FC<PlayersTableProps> = ({
  currentUser,
  year,
  team,
}) => {
  const [data, setData] = useState<PlayersProps | null>(null);
  const [page, setPage] = useState(1);
  const api = currentUser!.apikey;

  useEffect(() => {
    axios
      .get(
        `https://v3.football.api-sports.io/players?season=${year}&team=${team}&page=${page}`,
        {
          headers: {
            "x-rapidapi-key": `${api}`,
            "x-rapidapi-host": "v3.football.api-sports.io",
          },
        }
      )
      .then(function (res) {
        setData(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [page]);

  console.log(data);

  return (
    <div className="w-5/6 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
      {data?.response.map((stat) => (
        <div
          className="w-[100px] mt-20 bg-slate-300 border border-neutral-700 rounded-lg overflow-hidden"
          key={stat.player.id}>
          <Image src={stat.player.photo} alt="photo" width={200} height={200} />
          <div className="flex flex-col gap-y-8 p-2">
            <div className="text-center py-2 cursor-pointer">
              {stat.player.name}
            </div>
            <div className="text-center py-2 cursor-pointer">
              {stat.player.age}
            </div>
            <div className="text-center py-2 cursor-pointer">
              {stat.player.nationality}
            </div>
          </div>
        </div>
      ))}
      <br />
      <div className="flex w-4/5 mx-auto flex-row gap-x-8 items-center">
        <button
          className="p-4 rounded-md bg-slate-500 text-slate-300"
          onClick={() => setPage(1)}>
          1
        </button>
        <button
          className="p-4 rounded-md bg-slate-500 text-slate-300"
          onClick={() => setPage(2)}>
          2
        </button>
        <button
          className="p-4 rounded-md bg-slate-500 text-slate-300"
          onClick={() => setPage(3)}>
          3
        </button>
      </div>
    </div>
  );
};

export default PlayersTable;
