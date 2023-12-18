'use client';

import { checkAuthentication } from '@/app/utils/Auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  fetchOtherProfile,
  fetchUpcomingEvent,
  follow,
  unFollow,
} from '../api/route';
import Event from '@/app/home/components/event/event';

export default function Page(props: any) {
  const router = useRouter();
  const [nav, setNav] = useState('event');
  const [subnav, setSubnav] = useState('upcoming');
  const [myDetail, setMyDetail] = useState({});
  const [event, setEvent] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!checkAuthentication()) {
      router.push('/');
    } else {
      getProfileDetails();
    }
  }, []);
  useEffect(() => {
    getEvents();
  }, [myDetail]);
  useEffect(() => {}, [nav, subnav, event, error]);
  async function getProfileDetails() {
    let msg = await fetchOtherProfile(props.params.slug[0]);
    if (msg.msg === 'success') {
      setMyDetail(msg.data);
    }
  }
  async function getEvents() {
    let msg = await fetchUpcomingEvent(props.params.slug[0]);
    if (msg.msg === 'success') {
      if (msg.data.length > 0) {
        setEvent(msg.data);
      }
    }
  }
  async function followUser() {
    let msg = await follow(props.params.slug[0]);
    if (msg.msg === 'success') {
      setError(false);
    } else {
      setError(true);
    }
  }
  async function unFollowUser() {
    let msg = await unFollow(props.params.slug[0]);
    if (msg.msg === 'success') {
      setError(false);
    } else {
      setError(true);
    }
  }
  function fetchEvent(type: string) {
    if (type === 'upcoming') {
      return event.filter((v) => v.adminId != props.params.slug[0]);
    } else if (type === 'hosted') {
      return event.filter((v) => v.adminId == props.params.slug[0]);
    } else if (type === 'completed') {
      return event.filter(
        (v) => new Date(v.date).getTime() < new Date().getTime,
      );
    }
  }
  function subNav(v: string) {
    if (v === 'upcoming') {
      return (
        <div className="flex flex-col h-72 mx-4 overflow-y-scroll">
          {fetchEvent(v)?.length > 0 ? (
            fetchEvent(v)?.map((v, i) => {
              return (
                <div>
                  <Event
                    details={v}
                    key={i * 10 + i}
                    uId={props.params.slug[1]}
                    type="upcoming"
                  ></Event>
                </div>
              );
            })
          ) : (
            <div className="border-2 border-dashed flex flex-col gap-2 items-center m-2 ml-6 mr-6 laptop:ml-4 laptop:mr-4 p-2">
              <img src="cry.svg" className="w-10 h-10 opacity-50"></img>
              <div className="text-md"> No Upcoming Events</div>
              <div className="flex flex-row items-center gap-2">
                <button
                  className="bg-lightBlueBg text-white font-semibold p-1 rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(
                      `/event/create/${myDetail.city}/${myDetail.state}`,
                    );
                  }}
                >
                  Host
                </button>
                <div className="font-semibold">Event</div>
              </div>
            </div>
          )}
        </div>
      );
    } else if (v === 'hosted') {
      return (
        <div className="flex flex-col h-72 overflow-y-scroll mx-4">
          {fetchEvent(v)?.length > 0 ? (
            fetchEvent(v)?.map((v, i) => {
              return (
                <div>
                  <Event
                    details={v}
                    key={i}
                    uId={props.params.slug[1]}
                    type="hosted"
                  ></Event>
                </div>
              );
            })
          ) : (
            <div className="border-2 border-dashed flex flex-col gap-2 items-center m-2 ml-6 mr-6 laptop:ml-4 laptop:mr-4 p-2">
              <img src="cry.svg" className="w-10 h-10 opacity-50"></img>
              <div className="text-md">Don't be anxious</div>
              <div className="flex flex-row items-center gap-2">
                <button
                  className="bg-lightBlueBg text-white font-semibold p-1 rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(
                      `/event/create/${myDetail.city}/${myDetail.state}`,
                    );
                  }}
                >
                  Host
                </button>
                <div className="font-semibold">Event</div>
              </div>
            </div>
          )}
        </div>
      );
    } else if (v === 'completed') {
      return <div className="mx-6"></div>;
    } else if (v === 'mypost') {
      return <div>mypost</div>;
    } else if (v === 'feed') {
      return <div>feed</div>;
    } else {
      return <div>N/A</div>;
    }
  }
  function myNav(v: string) {
    if (v === 'event') {
      return (
        <div className="flex flex-col">
          <div className="flex gap-8 flex-row border-b-2 mx-6 pb-1 border-b-lightGrey text-xs opacity-70">
            <button
              className="focus:font-semibold"
              onClick={(e) => {
                e.preventDefault();
                setSubnav('upcoming');
              }}
            >
              Upcoming
            </button>
            <button
              className="focus:font-semibold"
              onClick={(e) => {
                e.preventDefault();
                setSubnav('hosted');
              }}
            >
              Hosted
            </button>
            <button
              className="focus:font-semibold"
              onClick={(e) => {
                e.preventDefault();
                setSubnav('completed');
              }}
            >
              Completed
            </button>
          </div>
          {subNav(subnav)}
        </div>
      );
    } else if (v === 'group') {
      return <div className="flex flex-col"></div>;
    } else if (v === 'post') {
      return (
        <div className="flex flex-col">
          <div className="flex gap-8 flex-row border-b-2 mx-6 pb-1 border-b-lightGrey text-xs opacity-70">
            <button
              className="focus:font-semibold"
              onClick={(e) => {
                e.preventDefault();
                setSubnav('mypost');
              }}
            >
              My Post
            </button>
            <button
              className="focus:font-semibold"
              onClick={(e) => {
                e.preventDefault();
                setSubnav('feed');
              }}
            >
              Feed
            </button>
          </div>
          {subNav(subnav)}
        </div>
      );
    }
  }
  return (
    <div className="flex flex-col h-screen gap-2 laptop:ml-64 laptop:mr-64 ">
      {/* profile details */}
      <div className="flex flex-col w-full mt-2">
        <div className=" flex flex-row justify-around laptop:justify-around laptop:gap-32 items-center">
          <div className="flex flex-row gap-2 laptop:gap-8 w-full mx-4">
            <div className="w-20 h-20 bg-lightBlue rounded-full flex justify-center border-2 border-white drop-shadow-2xl">
              <img
                src="/profile.svg"
                className="w-12 h-12 self-center opacity-50 "
              ></img>
            </div>
            <div className="-my-1 flex flex-col laptop:text-2xl text-xl self-center">
              <div className="font-semibold">{myDetail.name}</div>
              <div className="text-lg">{myDetail.about}</div>
            </div>
          </div>

          {'followerId' in myDetail ? (
            myDetail.followerId.filter((v: number) => v == props.params.slug[1])
              .length > 0 ? (
              <div className="mr-6 flex flex-col items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    unFollowUser();
                  }}
                >
                  <img
                    className="w-8 h-8 opacity-70 drop-shadow-md"
                    src="/cancel.svg"
                  ></img>
                </button>
                <div className="text-xs">Unfollow</div>
              </div>
            ) : (
              <div className="mr-6 flex flex-col items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    followUser();
                  }}
                >
                  <img
                    className="w-8 h-8 opacity-70 drop-shadow-md"
                    src="/add.svg"
                  ></img>
                </button>
                <div className="text-xs">Follow</div>
              </div>
            )
          ) : null}
        </div>
        <div className="mt-2 flex flex-row justify-around laptop:justify-around gap-6 laptop:gap-24  items-center">
          <div className="flex flex-col items-center">
            <div>
              {'followerId' in myDetail ? myDetail.followerId.length : 0}
            </div>
            <div>Rating</div>
          </div>
          <div className="flex flex-col items-center">
            <div>
              {'followerId' in myDetail ? myDetail.followerId.length : 0}
            </div>
            <div>Follower</div>
          </div>
          <div className="flex flex-col items-center">
            <div>{'followId' in myDetail ? myDetail.followId.length : 0}</div>
            <div>Following</div>
          </div>
        </div>
      </div>
      {/* interest */}
      <div className="basis-1/6  flex flex-col gap-2 laptop:gap-4 mt-2 border-4 border-lightGrey rounded-md mx-4 p-4">
        <div className="flex flex-row w-full ">
          <div className="text-lg laptop:text-xl font-bold">Interest</div>
          <button
            className="w-full flex justify-end items-center"
            onClick={(e) => {
              e.preventDefault();
              router.push('/profile/interest');
            }}
          >
            <img src="/edit.svg" alt="404" className="w-4 h-4 opacity-70 " />
          </button>
        </div>
        <div className="flex flex-row flex-wrap gap-4 ">
          {'tags' in myDetail ? (
            myDetail.tags.map((v: any, i: number) => {
              if (i > 0) {
                return (
                  <div
                    key={i * 10 + i}
                    className="border-1 bg-lightPink font-medium p-1 text-xs rounded-md drop-shadow-lg"
                  >
                    {v}
                  </div>
                );
              }
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {/* feed */}
      <div className="basis-3/6 flex flex-col gap-2 mt-2">
        <div className="flex flex-row gap-4 justify-around border-b-2 border-lightBlueBg pb-1">
          <button
            className="focus:font-semibold focus:text-text"
            onClick={(e) => {
              e.preventDefault();
              setNav('event');
              setSubnav('upcoming');
            }}
          >
            Events
          </button>
          <button
            className="focus:font-semibold focus:text-text"
            onClick={(e) => {
              e.preventDefault();
              setNav('group');
            }}
          >
            Groups
          </button>
          <button
            className="focus:font-semibold focus:text-text"
            onClick={(e) => {
              e.preventDefault();
              setNav('post');
              setSubnav('mypost');
            }}
          >
            Post
          </button>
        </div>
        {myNav(nav)}
      </div>
      {/* footer */}
      <button
        className="basis-1/6 fixed bottom-10 left-10 drop-shadow-md"
        onClick={(e) => {
          e.preventDefault();
          router.push('/home');
        }}
      >
        <img src="/arrow_forward.svg" className="w-8 h-8 rotate-180" alt="" />
      </button>
    </div>
  );
}
