"use client";

import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import GoalsChart from "./GoalsChart";

interface PlayersTableProps {
  currentUser: User | null;
  year: number;
  team: number;
  season: number;
}

interface StatisticsProps {
  parameters: {
    team: string;
    season: string;
    league: string;
  };
  response: {
    league: {
      id: number;
      name: string;
      country: string;
      logo: string;
      flag: string;
      season: number;
    };
    team: {
      id: number;
      name: number;
      logo: string;
    };
    form: string;
    fixtures: {
      played: {
        home: number;
        away: number;
        total: number;
      };
      wins: {
        home: number;
        away: number;
        total: number;
      };
      draws: {
        home: number;
        away: number;
        total: number;
      };
      loses: {
        home: number;
        away: number;
        total: number;
      };
    };
    goals: {
      for: {
        total: {
          home: number;
          away: number;
          total: number;
        };
        average: {
          home: string;
          away: string;
          total: string;
        };
        minute: {
          "0-15": {
            total: number;
            percentage: string;
          };
          "16-30": {
            total: number;
            percentage: string;
          };
          "31-45": {
            total: number;
            percentage: string;
          };
          "46-60": {
            total: number;
            percentage: string;
          };
          "61-75": {
            total: number;
            percentage: string;
          };
          "76-90": {
            total: number;
            percentage: string;
          };
          "91-105": {
            total: number;
            percentage: string;
          };
          "106-120": {
            total: number;
            percentage: string;
          };
        };
      };
      against: {
        total: {
          home: number;
          away: number;
          total: number;
        };
        average: {
          home: string;
          away: string;
          total: string;
        };
        minute: {
          "0-15": {
            total: number;
            percentage: string;
          };
          "16-30": {
            total: number;
            percentage: string;
          };
          "31-45": {
            total: number;
            percentage: string;
          };
          "46-60": {
            total: number;
            percentage: string;
          };
          "61-75": {
            total: number;
            percentage: string;
          };
          "76-90": {
            total: number;
            percentage: string;
          };
          "91-105": {
            total: number;
            percentage: string;
          };
          "106-120": {
            total: number;
            percentage: string;
          };
        };
      };
    };
    biggest: {
      streak: {
        wins: number;
        draws: number;
        loses: number;
      };
      wins: {
        home: string;
        away: string;
      };
      loses: {
        home: string;
        away: string;
      };
      goals: {
        for: {
          home: number;
          away: number;
        };
        against: {
          home: number;
          away: number;
        };
      };
    };
    clean_sheet: {
      home: number;
      away: number;
      total: number;
    };
    failed_to_score: {
      home: number;
      away: number;
      total: number;
    };
    penalty: {
      scored: {
        total: number;
        percentage: string;
      };
      missed: {
        total: number;
        percentage: string;
      };
      total: number;
    };
    lineups: Array<{
      formation: string;
      played: number;
    }>;
    cards: {
      yellow: {
        "0-15": {
          total: number;
          percentage: string;
        };
        "16-30": {
          total: number;
          percentage: string;
        };
        "31-45": {
          total: number;
          percentage: string;
        };
        "46-60": {
          total: number;
          percentage: string;
        };
        "61-75": {
          total: number;
          percentage: string;
        };
        "76-90": {
          total: number;
          percentage: string;
        };
        "91-105": {
          total: number;
          percentage: string;
        };
        "106-120": {
          total: number;
          percentage: string;
        };
      };
      red: {
        "0-15": {
          total: number;
          percentage: string;
        };
        "16-30": {
          total: number;
          percentage: string;
        };
        "31-45": {
          total: number;
          percentage: string;
        };
        "46-60": {
          total: number;
          percentage: string;
        };
        "61-75": {
          total: number;
          percentage: string;
        };
        "76-90": {
          total: number;
          percentage: string;
        };
        "91-105": {
          total: number;
          percentage: string;
        };
        "106-120": {
          total: number;
          percentage: string;
        };
      };
    };
  };
}

const PlayersTable: React.FC<PlayersTableProps> = ({
  currentUser,
  year,
  team,
  season,
}) => {
  const [data, setData] = useState<StatisticsProps | null>(null);
  const [page, setPage] = useState(1);
  const api = currentUser!.apikey;

  useEffect(() => {
    axios
      .get(
        `https://v3.football.api-sports.io/teams/statistics?league=${season}&team=${team}&season=${year}`,
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

  const regex = /[^%]/g;

  let name1 = data?.response.goals.for.minute["0-15"];
  let name2 = data?.response.goals.for.minute["16-30"];
  let name3 = data?.response.goals.for.minute["31-45"];
  let name4 = data?.response.goals.for.minute["46-60"];
  let name5 = data?.response.goals.for.minute["61-75"];
  let name6 = data?.response.goals.for.minute["76-90"];
  let name7 = data?.response.goals.for.minute["91-105"];
  let name8 = data?.response.goals.for.minute["106-120"];

  let total1 = data?.response.goals.for.minute["0-15"].total;
  let total2 = data?.response.goals.for.minute["16-30"].total;
  let total3 = data?.response.goals.for.minute["31-45"].total;
  let total4 = data?.response.goals.for.minute["46-60"].total;
  let total5 = data?.response.goals.for.minute["61-75"].total;
  let total6 = data?.response.goals.for.minute["76-90"].total;
  let total7 = data?.response.goals.for.minute["91-105"].total;
  let total8 = data?.response.goals.for.minute["106-120"].total;

  let percentage1 = data?.response.goals.for.minute["0-15"].percentage
    ?.match(regex)
    ?.join("");
  let percentage2 = data?.response.goals.for.minute["16-30"].percentage
    ?.match(regex)
    ?.join("");
  let percentage3 = data?.response.goals.for.minute["31-45"].percentage
    ?.match(regex)
    ?.join("");
  let percentage4 = data?.response.goals.for.minute["46-60"].percentage
    ?.match(regex)
    ?.join("");
  let percentage5 = data?.response.goals.for.minute["61-75"].percentage
    ?.match(regex)
    ?.join("");
  let percentage6 = data?.response.goals.for.minute["76-90"].percentage
    ?.match(regex)
    ?.join("");
  let percentage7 = data?.response.goals.for.minute["91-105"].percentage
    ?.match(regex)
    ?.join("");
  let percentage8 = data?.response.goals.for.minute["106-120"].percentage
    ?.match(regex)
    ?.join("");

  const stat = [
    {
      name: name1,
      total: total1,
      percentage: percentage1,
    },
    {
      name: name2,
      total: total2,
      percentage: percentage2,
    },
    {
      name: name3,
      total: total3,
      percentage: percentage3,
    },
    {
      name: name4,
      total: total4,
      percentage: percentage4,
    },
    {
      name: name5,
      total: total5,
      percentage: percentage5,
    },
    {
      name: name6,
      total6: total6,
      percentage: percentage6,
    },
    {
      name: name7,
      total: total7,
      percentage: percentage7,
    },
    {
      name: name8,
      total: total8,
      percentage: percentage8,
    },
  ];

  return (
    <div className="flex justify-center pt-10 pb-10 rounded-md bg-slate-300">
      <GoalsChart stat={stat} />
    </div>
  );
};

export default PlayersTable;
