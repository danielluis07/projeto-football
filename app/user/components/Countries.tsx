import { User } from "@prisma/client";
import Flag from "./Flag";

interface CountriesProps {
  currentUser: User | null;
}

const Countries: React.FC<CountriesProps> = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <div>
      <div>
        <Flag currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Countries;
