'use client';

import { checkAuthentication } from '@/app/utils/Auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchMyProfile } from './api/route';
import { myDetails } from '@/app/utils/dto';
export default function Page() {
  const router = useRouter();
  const [myDetail, setMyDetail] = useState({});
  useEffect(() => {
    if (!checkAuthentication()) {
      router.push('/');
    } else {
      getProfileDetails();
    }
  }, []);
  useEffect(() => {
    console.log(myDetail);
  }, [myDetail]);
  async function getProfileDetails() {
    let msg = await fetchMyProfile();
    if (msg.msg === 'success') {
      setMyDetail(msg.data);
    }
  }
  return (
    <div className="flex flex-col items-center h-screen gap-2 laptop:ml-64 laptop:mr-64">
      <div className="flex flex-col w-full">
        <div className="basis-1/6 border-2 w-full flex flex-row justify-around laptop:justify-center laptop:gap-32 items-center">
          <div className="w-20 h-20 bg-lightBlue rounded-full flex justify-center border-2 border-white drop-shadow-2xl">
            <img
              src="/profile.svg"
              className="w-12 h-12 self-center opacity-50 "
            ></img>
          </div>
          <div className="-my-1 flex flex-col laptop:text-4xl text-xl">
            <div className="font-semibold">{myDetail.name}</div>
            <div className="text-lg">{myDetail.about}</div>
          </div>
          <button>
            <img src="/edit.svg" alt="404" className="w-8 h-8 opacity-70" />
          </button>
        </div>
        <div className="mt-2 flex flex-row justify-around laptop:justify-center gap-6 laptop:gap-24  items-center">
          <div>Rating</div>
          <div>Followers</div>
          <div>Following</div>
        </div>
      </div>
      <div className="basis-1/6 border-2"></div>
      <div className="basis-3/6 border-2"></div>
      <button
        className="basis-1/6 fixed bottom-10 right-10 drop-shadow-md"
        onClick={() => {}}
      >
        <img src="/arrow_forward.svg" className="w-8 h-8" alt="" />
      </button>
    </div>
  );
}
