import getCurrentUser from "@/app/actions/getCurrentUser";
import Container from "@/app/components/Container";
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
    <div>
      <div>
        {data.response.map((seasons) => (
          <div key={seasons.league.id}>
            <div>
              {seasons.seasons.map((year) => (
                <div key={year.year}>
                  <Link href={``}>
                    <div>{year.year}</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
