'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cancelEvent, joinEvent } from '../../api/route';

export default function Event(props: any) {
  let data = props.details;
  let dateMonth = data.date.slice(5, 7);
  let dateDate = data.date.slice(8, 10);
  const [joinError, setJoinError] = useState(false);
  const router = useRouter();

  useEffect(() => {}, [joinError]);
  async function joinEventReq() {
    let msg = await joinEvent(data.id);
    if (msg === 'error') {
      setJoinError(true);
    } else {
      setJoinError(false);
      router.push('/home');
    }
  }
  async function cancelEventReq() {
    let msg = await cancelEvent(data.id);

    if (msg === 'error') {
      setJoinError(true);
    } else {
      setJoinError(false);
      router.push('/home');
    }
  }
  function month(mon: string) {
    switch (mon) {
      case '01':
        return 'Jan';
      case '02':
        return 'Feb';
      case '03':
        return 'Mar';
      case '04':
        return 'Apr';
      case '05':
        return 'May';
      case '06':
        return 'Jun';
      case '07':
        return 'Jul';
      case '08':
        return 'Aug';
      case '09':
        return 'Sep';
      case '10':
        return 'Oct';
      case '11':
        return 'Nov';
      case '12':
        return 'Dec';
    }
  }
  function cancelDiv() {
    return (
      <button
        className=" bg-lightPink text-white text-xs border-1 border-text drop-shadow-lg rounded-lg"
        onClick={(e) => {
          e.preventDefault();
          cancelEventReq();
        }}
      >
        <img src="/cancel.svg" className="w-6 h-6 opacity-60"></img>
      </button>
    );
  }
  function joinDiv() {
    console.log(props.uId, data.adminId);

    if (
      props.uId == data.adminId ||
      data.confirmedUser.filter((v) => v == props.uId).length == 1
    ) {
      return cancelDiv();
    } else if (data.pendingUser.filter((v) => v == props.uId).length == 0) {
      return (
        <button
          className="p-1  bg-lightBlue text-white text-xs border-1 border-text drop-shadow-lg rounded-lg "
          onClick={(e) => {
            e.preventDefault();
            joinEventReq();
          }}
        >
          <img src="/join.svg" className="w-4 h-4 opacity-60"></img>
        </button>
      );
    } else {
      return (
        <button className="p-1 bg-lightBlue text-white text-xs border-1 border-text drop-shadow-lg rounded-lg ">
          <img src="/time.svg" className="w-4 h-4 opacity-60"></img>
        </button>
      );
    }
  }
  function showProfile() {
    if (data.adminId != props.uId) {
      return (
        <button
          className="drop-shadow-2xl p-0.5"
          onClick={(e) => {
            e.preventDefault();
            router.push(`/profile/otherprofile/${data.adminId}/${props.uId}`);
          }}
        >
          <img src="/info.svg" alt="" className="w-4 h-4" />
        </button>
      );
    }
  }
  function basisDiv() {
    return (
      <div className="flex flex-col items-start w-full m-2 mt-1 ">
        <div className="flex flex-row w-full ">
          <div className="text-lg font-semibold">{data.title}</div>
          <div className=" flex justify-end w-full ">
            <div className=" rounded-md pb-0.5 text-sm border-1 px-1 text-text m-1">
              {data.tag}
            </div>
          </div>
        </div>
        <div className="-translate-y-1 font-light text-sm w-full border-b-1">
          {data.description}
        </div>
        <div className="flex flex-row  w-full justify-start">
          <div className="flex flex-col ">
            <div className="flex flex-row gap-2 items-center ">
              <img src="/time.svg" className="w-4 h-4 opacity-60" alt="404" />
              <div className="text-sm">{data.time}</div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <img
                src="/location.svg"
                className="w-4 h-4 opacity-60"
                alt="404"
              />
              <div className="text-sm">{data.address}</div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <img
                src="/group.svg"
                className="w-4 h-4 opacity-60 -translate-y-1"
                alt="404"
              />
              <div className="text-sm -translate-y-1">{data.maxMembers}</div>
            </div>
          </div>
          <div className="flex flex-col  w-full items-end justify-around">
            <div className="">{showProfile()}</div>
            <div className="self-end">{joinDiv()}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 rounded-md border-lightBlueBg shadow-md h-32 flex flex-row my-2">
      <div className="h-full  bg-lightBlueBg">
        <div className="flex flex-col gap-1 m-2 items-center">
          <div className="font-medium text-white mt-0">{month(dateMonth)}</div>
          <div className="font-bold text-white text-2xl">{dateDate}</div>
        </div>
      </div>
      {joinError ? (
        <div className="flex w-full items-center justify-around text-lightPink font-thin">
          400 Something Went Wrong
        </div>
      ) : (
        basisDiv()
      )}
    </div>
  );
}
