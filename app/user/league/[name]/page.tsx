import getCurrentUser from "@/app/actions/getCurrentUser";
import Image from "next/image";
import Container from "@/app/components/Container";
import Link from "next/link";
import Navbar from "../../components/Navbar";

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
      <Navbar currentUser={currentUser} />
      <div className="bg-[url('../public/images/field.jpg')] w-full min-h-full">
        <Container>
          <div className="w-full text-center p-8 text-slate-300">
            Selecione uma Liga
          </div>
          <div className="pb-20 w-5/6 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
            {data?.response?.map((leagues) => (
              <div
                className="w-[100px] mt-20 bg-slate-300 border border-neutral-700 rounded-lg overflow-hidden"
                key={leagues.country.name}>
                <Image
                  src={leagues.league.logo}
                  width={200}
                  height={200}
                  alt="logo"
                />
                <Link
                  href={`/user/league/${leagues.country.name}/${leagues.league.id}`}>
                  <div className="text-center py-2 cursor-pointer hover:text-blue-500">
                    {leagues.league.name}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Home;
