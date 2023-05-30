import AuthForm from "./components/AuthForm";

const Home = () => {
  return (
    <div className="bg-[url('../public/images/gabigol.jpg')] bg-cover flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-[150px] h-[150px] mx-auto"></div>
        <h2 className="mt-6 text-white text-center text-3xl font-bold tracking-tight cursor-default">
          Meu Time
        </h2>
      </div>
      <AuthForm />
    </div>
  );
};

export default Home;
