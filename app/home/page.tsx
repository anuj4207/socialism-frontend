'use client';

import { useEffect, useState } from 'react';
import {
  fetchMyProfile,
  fetchNearbyEvent,
  fetchUpcomingEvent,
} from './api/route';
import Event from './components/event/event';
import { useRouter } from 'next/navigation';
import Post from './components/post/post';

export default function Page() {
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [event, setEvent] = useState([]);
  const [nearbyE, setNearbyE] = useState([]);
  const [tag, setTag] = useState([]);
  const [countUpcoming, setCountUpcoming] = useState(0);
  const [post, setPost] = useState(1);
  const router = useRouter();
  useEffect(() => {
    getDetails();
    myEvent();
    nearbyEvent();
  }, []);
  useEffect(() => {}, [nearbyE, name, city, state, event, countUpcoming, tag]);
  async function getDetails() {
    let msg = await fetchMyProfile();
    if (msg.msg === 'success') {
      setName(msg.data.name);
      setCity(msg.data.city);
      setState(msg.data.state);
      setTag(msg.data.tags);
    }
  }
  async function myEvent() {
    let upcoming = await fetchUpcomingEvent();
    if (upcoming.msg === 'success') {
      if (upcoming.data.length > 0) {
        setCountUpcoming(0);
        setEvent(upcoming.data);
      }
    }
  }
  async function nearbyEvent() {
    let nearby = await fetchNearbyEvent();
    if (nearby.msg === 'success') {
      console.log(nearby);
      if (nearby.data.length > 0) {
        setNearbyE(nearby.data);
      }
    }
  }
  // function nearbyType(type: string) {
  //   return nearbyE.filter((v) => v.tag === tag);
  // }
  return (
    <div className="w-screen">
      {/* main */}
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
                placeholder="Events, people .."
                className="drop-shadow-xl text-white w-11/12 bg-white   border-text p-1 "
              ></input>
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <img
                  src="/search.svg"
                  className="w-6 h-6 self-center mr-2 laptop:place-self-end"
                ></img>
              </button>
            </div>
            {/* location */}
            <div>
              <img
                src="/location.svg"
                className="drop-shadow-xl w-10 h-10"
              ></img>
            </div>
            {/* chat */}
            <div>
              <img src="/chat.svg" className="drop-shadow-xl w-10 h-10"></img>
            </div>
          </div>
        </div>
        {/* upcoming */}
        <div className="mt-2 flex flex-col ml-0 mr-0  laptop:justify-center laptop:ml-64 laptop:mr-64 gap-2 ">
          <div className="flex flex-col ml-8 mr-8 laptop:mb-2 laptop:p-2 laptop:mx-12">
            <div className="font-medium">Hi {name}</div>
            <div className="font-bold text-lg -mt-2">Upcoming Events</div>
          </div>
          <div className="laptop:p-4 ">
            {event.length > 0 ? (
              <div className="flex flex-row laptop:gap-28 justify-center ">
                <div
                  className={
                    countUpcoming > 0 ? 'visible self-center' : 'invisible'
                  }
                >
                  <button>
                    <img
                      src="/arrow_forward.svg"
                      className="w-6 h-6 opacity-50 rotate-180"
                      onClick={(e) => {
                        e.preventDefault();
                        setCountUpcoming(countUpcoming - 1);
                      }}
                    ></img>
                  </button>
                </div>
                <div className="basis-5/6 ml-2 mr-2 ">
                  <Event details={event[countUpcoming]}></Event>
                </div>
                <div
                  className={
                    countUpcoming < event.length - 1
                      ? 'visible self-center'
                      : 'invisible'
                  }
                >
                  <button>
                    <img
                      src="/arrow_forward.svg"
                      className="w-6 h-6 opacity-50"
                      onClick={(e) => {
                        e.preventDefault();
                        setCountUpcoming(countUpcoming + 1);
                      }}
                    ></img>
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-2 rounded-md  bg-lightBlueBg flex flex-col gap-2 items-center m-2 ml-6 mr-6 laptop:ml-4 laptop:mr-4 p-2">
                {/* <img src="cry.svg" className="w-10 h-10 opacity-50"></img> */}
                <div className="text-md text-white "> No Upcoming Events</div>
                {/* <div className="flex flex-row items-center gap-2">
                  <button
                    className="bg-lightBlueBg text-white font-semibold p-1 rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push('/event/create');
                    }}
                  >
                    Host
                  </button>
                  <div className="font-semibold">Event</div>
                </div> */}
              </div>
            )}
          </div>
        </div>
        {/* nearby */}
        <div className="mt-2 flex flex-col ml-0 mr-0  laptop:justify-center laptop:ml-64 laptop:mr-64  ">
          <div className="flex flex-col ml-8 mr-8 laptop:mb-2 laptop:p-2 laptop:mx-12">
            <div className="font-bold text-lg -mt-2">Nearby</div>
            <div className="flex flex-row gap-4 border-b-1 text-sm pb-1">
              {tag.map((v, i) => {
                if (i > 0 && i < 4) {
                  return (
                    <button key={i} onClick={() => {}}>
                      {v}
                    </button>
                  );
                }
              })}
            </div>
          </div>
          <div className="laptop:p-4 ">
            {nearbyE.length > 0 ? (
              <div
                className={
                  post == 0
                    ? 'h-80 flex flex-row laptop:gap-28 justify-center snap-center overflow-y-scroll'
                    : 'h-44 flex flex-row laptop:gap-28 justify-center snap-center overflow-y-scroll'
                }
              >
                {/* <div
                  className={
                    countUpcoming > 0 ? 'visible self-center' : 'invisible'
                  }
                >
                  <button>
                    <img
                      src="/arrow_forward.svg"
                      className="w-6 h-6 opacity-50 rotate-180"
                      onClick={(e) => {
                        e.preventDefault();
                        setCountUpcoming(countUpcoming - 1);
                      }}
                    ></img>
                  </button>
                </div> */}
                <div className="basis-5/6 ml-2 mr-2 pt-2 ">
                  {nearbyE.map((v, i) => {
                    return <Event details={v} key={i}></Event>;
                  })}
                </div>
                {/* <div
                  className={
                    countUpcoming < event.length - 1
                      ? 'visible self-center'
                      : 'invisible'
                  }
                >
                  <button>
                    <img
                      src="/arrow_forward.svg"
                      className="w-6 h-6 opacity-50"
                      onClick={(e) => {
                        e.preventDefault();
                        setCountUpcoming(countUpcoming + 1);
                      }}
                    ></img>
                  </button>
                </div> */}
              </div>
            ) : (
              <div className="border-2 border-dashed flex flex-col gap-2 items-center m-2 ml-6 mr-6 laptop:ml-4 laptop:mr-4 p-2">
                <img src="cry.svg" className="w-10 h-10 opacity-50"></img>
                <div className="text-md"> No Nearby Events</div>
                <div className="flex flex-row items-center gap-2">
                  <button
                    className="bg-lightBlueBg text-white font-semibold p-1 rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push('/event/create');
                    }}
                  >
                    Host
                  </button>
                  <div className="font-semibold">Event</div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* post */}
        <div
          className={
            post == 0
              ? 'invisible'
              : 'mt-2 flex flex-col laptop:justify-center laptop:ml-64 laptop:mr-64 '
          }
        >
          <img src="fire.png" className="w-6 h-6 self-center mt-2"></img>
          <div className="laptop:p-4 ">
            <div
              className={
                'h-36 laptop:h-72 flex flex-row laptop:gap-28 justify-center snap-center overflow-y-scroll'
              }
            >
              <div className="basis-5/6 ml-2 mr-2 pt-2 ">
                {nearbyE.map((v, i) => {
                  return <Post key={i}></Post>;
                })}
              </div>
            </div>
          </div>
        </div>
        {/* footer */}
        <div className="fixed bottom-0 flex flex-row h-16 bg-text justify-around w-screen items-center">
          <div className="flex flex-col items-center">
            <button
              className="opacity-75 focus:opacity-100 focus:drop-shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                router.push(`/event/create/${city}/${state}`);
              }}
            >
              <img src="/calendar_event.svg" className="w-10 h-10"></img>
            </button>
            <div className="text-white opacity-75">Host</div>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="opacity-60 focus:opacity-100 focus:drop-shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                router.push('/post');
              }}
            >
              <img src="/post.svg" className="w-10 h-10 "></img>
            </button>
            <div className="text-white opacity-75">Post</div>
          </div>
          <div className="flex flex-col items-center">
            <button className="opacity-75 focus:opacity-100 focus:drop-shadow-lg">
              <img src="/group.svg" className="w-10 h-10 "></img>
            </button>
            <div className="text-white opacity-75">Group</div>
          </div>
        </div>
      </div>
    </div>
  );
}
