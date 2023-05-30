import { User } from "@prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Container from "@/app/components/Container";
import PlayersTable from "./components/PlayersTable";
import TeamStatistics from "./components/TeamStatistics";
import Navbar from "@/app/user/components/Navbar";

interface PlayersParams {
  currentUser: User[] | null;
  params: {
    year: number;
    team: number;
    season: number;
  };
}

const Home = async ({ params: { year, team, season } }: PlayersParams) => {
  const currentUser = await getCurrentUser();

  return (
    <>
      <Navbar currentUser={currentUser} />
      <div className="bg-[url('../public/images/field.jpg')] w-full min-h-full">
        <Container>
          <div className="w-full text-center p-8 text-slate-300">
            Lista de Jogadores:
          </div>
          <PlayersTable currentUser={currentUser} year={year} team={team} />
          <div className="mt-20 pb-20 w-full text-center text-xl text-slate-300">
            Estatísticas do time:
          </div>
          <TeamStatistics
            currentUser={currentUser}
            year={year}
            team={team}
            season={season}
          />
        </Container>
      </div>
    </>
  );
};

export default Home;
