import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { trpc } from "../utils/trpc";

const InputForm = (props) => {
  const utils = trpc.useContext();
  const [message, setMessage] = useState("");
  const postMessage = trpc.guestbook.postMessage.useMutation({
    onMutate: () => {
      utils.guestbook.getAll.cancel();
      const optimisticUpdate = utils.guestbook.getAll.getData();

      if (optimisticUpdate) {
        utils.guestbook.getAll.setData(optimisticUpdate);
      }
    },
    onSettled: () => {
      utils.guestbook.getAll.invalidate();
    },
  });

  const { data: sessionData } = useSession();

  // form submit handler
  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postMessage.mutate({ name: sessionData.user?.name as string, message });
    setMessage("");
  };

  return (
    <>
      <form className="ml-2 mt-5 flex w-1/3 gap-2" onSubmit={formSubmitHandler}>
        <input
          type="text"
          placeholder="Your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className=" w-full rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-md border-2 border-none bg-white/10 p-2 text-zinc-400 focus:text-white focus:outline-none"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default InputForm;
