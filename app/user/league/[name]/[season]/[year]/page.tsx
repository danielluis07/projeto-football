import getCurrentUser from "@/app/actions/getCurrentUser";
import Image from "next/image";
import Container from "@/app/components/Container";
import Link from "next/link";
import Navbar from "@/app/user/components/Navbar";

interface TeamsParams {
  params: {
    season: number;
    year: number;
  };
}

interface TeamsProps {
  response: Array<{
    team: {
      id: number;
      code: string;
      country: string;
      founded: number;
      logo: string;
      name: string;
      national: boolean;
    };
    venue: {
      address: string;
      capacity: number;
      city: string;
      id: number;
      image: string;
      name: string;
      surface: string;
    };
  }>;
}

const Home = async ({ params: { season, year } }: TeamsParams) => {
  const currentUser = await getCurrentUser();
  const api = currentUser!.apikey;

  const data: TeamsProps = await fetch(
    `https://v3.football.api-sports.io/teams?league=${season}&season=${year}`,
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
            Selecione um Time
          </div>
          <div className="pb-20 w-5/6 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
            {data.response.map((stat) => (
              <div
                className="w-[100px] mt-20 bg-slate-300 border border-neutral-700 rounded-lg overflow-hidden"
                key={stat.team.id}>
                <Image
                  src={stat.team.logo}
                  alt="logo"
                  width={200}
                  height={200}
                />
                <Link
                  href={`/user/league/${stat.team.country}/${season}/${year}/${stat.team.id}`}>
                  <div className="text-center py-2 cursor-pointer hover:text-blue-500">
                    {stat.team.name}
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
