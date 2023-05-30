import getCurrentUser from "@/app/actions/getCurrentUser";
import Image from "next/image";
import Container from "@/app/components/Container";
import Link from "next/link";

interface NameParams {
  params: {
    name: string;
  };
}

interface LeaguesProps {
  response: Array<{
    league: {
      id: number;
      name: string;
      type: string;
      logo: string;
    };
    country: {
      name: string;
      code: string;
      flag: string;
    };
    seasons: Array<{
      year: number;
      start: string;
      end: string;
      current: boolean;
    }>;
  }> | null;
}

const Home = async ({ params: { name } }: NameParams) => {
  const currentUser = await getCurrentUser();
  const api = currentUser!.apikey;

  const data: LeaguesProps = await fetch(
    `https://v3.football.api-sports.io/leagues?country=${name}`,
    {
      headers: {
        "x-rapidapi-key": `${api}`,
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    }
  ).then((res) => res.json());

  return (
    <>
      <Container>
        <div className="grid grid-cols-5 gap-10">
          {data?.response?.map((leagues) => (
            <div
              className="w-[100px] border border-neutral-700 rounded-lg"
              key={leagues.country.name}>
              <Image
                src={leagues.league.logo}
                width={200}
                height={200}
                alt="logo"
              />
              <Link href={``}>
                <div className="text-center py-2">{leagues.league.name}</div>
                <div>{leagues.league.id}</div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Home;
