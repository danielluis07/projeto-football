import getCurrentUser from "@/app/actions/getCurrentUser";
import Container from "@/app/components/Container";
import Navbar from "@/app/user/components/Navbar";
import Link from "next/link";

interface SeasonParams {
  params: {
    season: number;
  };
}

interface Seasons {
  response: Array<{
    country: {
      code: string;
      flag: string;
      name: string;
    };
    league: {
      id: number;
      logo: string;
      name: string;
      type: string;
    };
    seasons: Array<{
      coverage: {
        fixtures: {
          events: boolean;
          lineups: boolean;
          statistics_fixtures: boolean;
          statistics_players: boolean;
        };
        standings: boolean;
        players: boolean;
        top_scorers: boolean;
        top_assists: boolean;
        top_cards: boolean;
        injuries: boolean;
        predictions: boolean;
        odds: boolean;
      };
      year: number;
      start: string;
      end: string;
      current: boolean;
    }>;
  }>;
}

const Home = async ({ params: { season } }: SeasonParams) => {
  const currentUser = await getCurrentUser();
  const api = currentUser!.apikey;
  const data: Seasons = await fetch(
    `https://v3.football.api-sports.io/leagues?id=${season}`,
    {
      headers: {
        "x-rapidapi-key": `${api}`,
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    }
  ).then((res) => res.json());

  console.log(data);

  return (
    <>
      <Navbar currentUser={currentUser} />
      <div className="bg-[url('../public/images/field.jpg')] w-full min-h-full">
        <Container>
          <div className="w-full text-center p-8 text-slate-300">
            Selecione uma Temporada
          </div>
          {data.response.map((seasons) => (
            <div
              className="mt-20 pb-20 flex flex-col gap-y-8"
              key={seasons.league.id}>
              {seasons.seasons.map((year) => (
                <div
                  className="w-full text-xl text-center rounded-md bg-slate-700 text-slate-300 hover:bg-slate-400 hover:text-slate-500"
                  key={year.year}>
                  <Link
                    href={`/user/league/${seasons.country.name}/${seasons.league.id}/${year.year}`}>
                    <div className="py-4">{year.year}</div>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </Container>
      </div>
    </>
  );
};

export default Home;
