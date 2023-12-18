'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page(props: any) {
  const router = useRouter();
  const [search, setSearch] = useState(props.params.slug[0]);
  const [filter, setFilter] = useState(props.params.slug[1]);

  useEffect(() => {}, [search, filter]);
  return (
    <div className="w-screen">
      <div className="flex flex-col">
        {/* navbar */}
        <div className="mt-2 basis-1/6 border-b-2 w-screen">
          <div
            className="flex flex-row justify-around laptop:justify-start laptop:
         items-center ml-6 mr-6 gap-6 mb-2"
          >
            {/* profile */}
            <div>
              <button
                className="bg-lightBlue drop-shadow-xl w-8 h-8 rounded-full flex justify-center"
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
            <div className="border-1 rounded-xs flex flex-row grow">
              <input
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  setSearch(e.target.value);
                }}
                value={search}
                placeholder="Events, people .."
                className="drop-shadow-xl text-text w-11/12 bg-white   border-text p-1 "
              ></input>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/search/${search}/${filter}`);
                }}
              >
                <img
                  src="/search.svg"
                  className="w-6 h-6 self-center mr-2 laptop:place-self-end "
                ></img>
              </button>
            </div>

            {/* home */}
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push('/home');
              }}
            >
              <img
                src="/home.svg"
                className="drop-shadow-xl w-10 h-10 opacity-60"
              ></img>
            </button>
          </div>
        </div>
        <div className="laptop:mx-64  mx-6 flex flex-col gap-2 laptop:gap-6">
          {/* filter */}
          <div className="font-semibold mt-4 laptop:mt-10">Filter</div>
          <div className="flex flex-row gap-6 laptop:gap-10 border-b-2 pb-2 laptop:pb-4">
            <button
              className="border-1 p-0.5 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                router.push(`/search/${search}/group`);
              }}
            >
              Group
            </button>
            <button
              className="border-1 p-0.5 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                router.push(`/search/${search}/people`);
              }}
            >
              People
            </button>
            <button
              className="border-1 p-0.5 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                router.push(`/search/${search}/event`);
              }}
            >
              Event
            </button>
            <button
              className="border-1 p-0.5 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                router.push(`/search/${search}/interest`);
              }}
            >
              Interest
            </button>
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
}
