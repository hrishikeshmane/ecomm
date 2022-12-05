import { useSession } from "next-auth/react";
import React from "react";
import { trpc } from "../utils/trpc";

const Guestbook = (props) => {
  const { data: messages, isLoading } = trpc.guestbook.getAll.useQuery();

  if (isLoading) {
    return <main className="flex flex-col items-center pt-4">Loading...</main>;
  }

  return (
    <div className="my-5 w-1/3">
      {messages?.map((msg, index) => {
        return (
          <div
            className="relative m-2 flex w-full flex-col gap-4 rounded-md border border-zinc-700 p-2"
            key={index}
          >
            <p>{msg.message}</p>
            <span className="absolute right-1 bottom-1 text-gray-500">
              - {msg.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Guestbook;
