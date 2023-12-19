'use client';

import Search from '@/app/components/search/search';
import { Location } from '@/public/location';
import { tagDrop, tags } from '@/public/tag';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createEvent } from '../../api/route';
import { checkAuthentication } from '@/app/utils/Auth';

export default function Page({ params }: { params: { slug: string[] } }) {
  const [address, setAddress] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState(0);
  const [privacy, setPrivacy] = useState(false);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [tag, setTag] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!checkAuthentication()) {
      router.push('/');
    }
  });
  useEffect(() => {}, [
    tag,
    address,
    title,
    description,
    members,
    privacy,
    time,
    date,
    success,
  ]);
  async function handleSubmit() {
    let d = new Date(date + 'T' + time + ':00');
    let msg = await createEvent({
      address: address,
      title: title,
      description: description,
      maxMembers: members,
      eventType: privacy,
      time: time,
      date: d,
      tag: tag,
      city: params.slug[0],
      state: params.slug[1],
    });
    console.log(msg);

    if (msg.msg === 'success') {
      console.log(msg.msg);

      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div
        className={
          success ? 'hidden' : 'flex flex-col laptop:items-center basis-5/6'
        }
      >
        {/* heading */}
        <div className="basis-1/6">
          <Search
            first="Create"
            second="Event"
            image="/calendar_event.svg"
          ></Search>
        </div>
        {/* form */}
        <div className="mt-10 laptop:mt-24 basis-4/6 laptop:w-2/5">
          <form className="flex flex-col gap-2  laptop:gap-8 ml-4 mr-4">
            {/* interest */}
            <div className="flex flex-row border-b-2 pb-1 gap-1">
              <img
                src="/tag.svg"
                className="w-8 h-8 opacity-70 self-center"
              ></img>

              <div>
                <select
                  id="state"
                  className=" input input-bordered   w-full  bg-transparent"
                >
                  <option disabled>Select Interest</option>
                  {tagDrop.map((v, i) => {
                    return v.map((vv, ii) => {
                      if (ii == 0) {
                        return (
                          <option key={ii * 10 + i} disabled value={vv}>
                            {vv}
                          </option>
                        );
                      } else {
                        return (
                          <option
                            key={ii * 10 + i}
                            value={vv}
                            onClick={(e) => {
                              e.preventDefault();
                              setTag(vv);
                            }}
                          >
                            {vv}
                          </option>
                        );
                      }
                    });
                  })}
                  ;
                </select>
              </div>
            </div>
            {/* location */}
            <div className="flex flex-row border-b-2 pb-1 gap-1  ">
              <img
                src="/location.svg"
                className="w-8 h-8 opacity-70 self-center"
                alt=""
              />

              <div>
                <input
                  type="text"
                  className="input input-bordered   w-full  bg-transparent"
                  placeholder="Address"
                  onChange={(e) => {
                    e.preventDefault();
                    setAddress(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* title */}
            <div className="flex flex-row border-b-2 pb-1 gap-1  ">
              <img
                src="/title.svg"
                className="w-8 h-8 opacity-70 self-center"
                alt=""
              />

              <div>
                <input
                  type="text"
                  className="input input-bordered  font-semibold   w-full  bg-transparent"
                  placeholder="Title"
                  onChange={(e) => {
                    e.preventDefault();
                    setTitle(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* description */}
            <div className="flex flex-row border-b-2 pb-1 gap-1  ">
              <img
                src="/description.svg"
                className="w-8 h-8 opacity-70 self-center"
                alt=""
              />

              <div>
                <input
                  type="text"
                  className="input input-bordered    w-full  bg-transparent"
                  placeholder="Description"
                  onChange={(e) => {
                    e.preventDefault();
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* members */}
            <div className="flex flex-row border-b-2 pb-1 gap-1  ">
              <img
                src="/member.svg"
                className="w-8 h-8 opacity-70 self-center"
                alt=""
              />

              <div>
                <input
                  type="text"
                  typeof="number"
                  pattern="^[0-9]*$"
                  className="input input-bordered    w-2/3  bg-transparent"
                  placeholder="Max. members"
                  onChange={(e) => {
                    e.preventDefault();
                    setMembers(parseInt(e.target.value));
                  }}
                />
              </div>
            </div>
            {/* privacy */}
            <div className="flex flex-row border-b-2 pb-1 gap-1  ">
              <img
                src="/privacy.svg"
                className="w-8 h-8 opacity-70 self-center"
                alt=""
              />

              <div className="flex flex-row gap-3">
                <div className="flex flex-col justify-center">
                  <label className="label cursor-pointer">
                    <input
                      type="checkbox"
                      className="toggle bg-lightBlue "
                      checked={privacy}
                      onChange={(e) => {
                        console.log();

                        setPrivacy(!privacy);
                      }}
                    />
                  </label>
                </div>
                <div className="self-center opacity-60">Privacy</div>
              </div>
            </div>
            {/* time */}
            <div className="flex flex-row border-b-2 pb-1 gap-1  ">
              <img
                src="/time.svg"
                className="w-8 h-8 opacity-70 self-center"
                alt=""
              />

              <div>
                <input
                  type="time"
                  className="input input-bordered    w-full bg-transparent"
                  onChange={(e) => {
                    e.preventDefault();
                    setTime(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* date */}
            <div className="flex flex-row border-b-2 pb-1 gap-1  ">
              <img
                src="/date.svg"
                className="w-8 h-8 opacity-70 self-center"
                alt=""
              />

              <div>
                <input
                  type="date"
                  className="input input-bordered  w-full bg-transparent"
                  onChange={(e) => {
                    e.preventDefault();
                    setDate(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* submit */}
      <div className={success ? 'hidden' : 'basis-1/6 flex flex-row bottom-10'}>
        <div className="flex drop-shadow-md ml-10 laptop:ml-32  mt-6 basis-1/2 ">
          <button
            onClick={(e) => {
              e.preventDefault();
              router.push('/home');
            }}
          >
            <img src="/arrow_forward.svg" className="w-8 h-8 rotate-180"></img>
          </button>
        </div>
        <div className=" flex drop-shadow-md  mr-10 laptop:mr-32 mt-6 basis-1/2 justify-end">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <img src="/arrow_forward.svg" className="w-8 h-8 "></img>
          </button>
        </div>
      </div>
      {/* msg */}
      <div
        className={
          success ? 'flex flex-col h-screen justify-center w-screen' : 'hidden'
        }
      >
        <div className="border-2 p-4 ml-6 mr-6 self-center">Event created</div>
      </div>
      <div className={success ? 'bottom-10 fixed' : 'hidden'}>
        <div className=" flex flex-row drop-shadow-md  laptop:mr-32 mt-6 basis-1/2 w-screen justify-end">
          <button
            onClick={(e) => {
              e.preventDefault();
              router.push('/home');
            }}
          >
            <img
              src="/arrow_forward.svg"
              className="w-8 h-8 mr-10 laptop:mr-32"
            ></img>
          </button>
        </div>
      </div>
    </div>
  );
}
