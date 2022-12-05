import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import Guestbook from "./Guestbook";
import InputForm from "./InputForm";

const Home: NextPage = (props) => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Guestbook | ihrishi</title>
        <meta name="description" content="Guestbook by and for ihrishi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="m-4 flex flex-col items-center justify-center">
        <div className="relative">
          <h1
            className=" mb-2 animate-text bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-300 bg-clip-text 
          text-5xl font-extrabold text-transparent"
          >
            Guestbook
          </h1>
          <span className="absolute top-1 right-0 translate-x-full">
            ihrishi
          </span>
        </div>
        <AuthShowcase />
        <Guestbook />
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : `Sign in`}
      </button>
      <p className="text-md text-center text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>

      {sessionData && <InputForm />}
    </>
  );
};
