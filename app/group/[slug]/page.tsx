'use client';

import { useRouter } from 'next/navigation';

export default function Page(props: any) {
  const router = useRouter();
  return (
    <div className="flex flex-col w-screen ">
      {/* navbar */}
      <div className="mt-2 basis-1/6 border-b-2 w-screen">
        <div
          className="flex flex-row justify-around laptop:justify-start laptop:
         items-center ml-6 mr-6 gap-6 mb-2"
        >
          {/* profile */}
          <div>
            <button
              className="bg-lightBlue drop-shadow-xl w-8 h-8 rounded-full flex justify-center border-2 border-text"
              onClick={(e) => {
                e.preventDefault();
                router.push('/profile/myprofile');
              }}
            >
              <img
                src="/profile.svg"
                className="w-6 h-6 opacity-60 self-center "
              ></img>
            </button>
          </div>
          {/* search */}
          <div className="border-2 rounded-md flex flex-row grow">
            <input
              type="text"
              onChange={(e) => {
                e.preventDefault();
              }}
              placeholder="Group"
              className="drop-shadow-xl text-text w-11/12 bg-white   border-text p-1 "
            ></input>
            <button className="bg-white">
              <img
                src="/search.svg"
                className="w-6 h-6 self-center mr-2 laptop:place-self-end"
              ></img>
            </button>
          </div>

          {/* create */}
          <div>
            <img
              src="/add.svg"
              className="drop-shadow-xl w-10 h-10 opacity-70"
            ></img>
          </div>
        </div>
      </div>
      <div></div>
      {/* footer */}
    </div>
  );
}
