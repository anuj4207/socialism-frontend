'use client';

import { tagDrop } from '@/public/tag';
import Search from '../../components/search/search';
import { fetchUpcomingEvent } from '@/app/home/api/route';
import { useEffect, useState } from 'react';
import { checkAuthentication } from '@/app/utils/Auth';
import { useRouter } from 'next/navigation';
import { uploadMedia } from '../api/route';

export default function Page(props: any) {
  const [event, setEvent] = useState([]);
  const [image, setImage] = useState();
  const router = useRouter();
  useEffect(() => {
    fetchEvent();
  }, []);
  useEffect(() => {
    if (!checkAuthentication()) {
      router.push('/');
    }
  });
  useEffect(() => {}, [event]);
  async function fetchEvent() {
    let msg = await fetchUpcomingEvent(props.params.slug);
    console.log(msg);

    if (msg.msg === 'success') {
      setEvent(msg.data);
      console.log(msg.data);
    }
  }
  async function uploadImage() {
    let msg = await uploadMedia(image);
  }
  return (
    <div className="flex flex-col ">
      <Search first="Create" second="Post" image="/post.svg"></Search>

      <div className="flex flex-col  mx-10  ">
        <form className="flex flex-col mt-20 laptop:self-center laptop:w-2/5">
          {/* title */}
          <div className="flex flex-row border-b-2 pb-2 gap-1  ">
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
                }}
              />
            </div>
          </div>
          {/* Description */}
          <div className="flex flex-row border-b-2 pb-2 gap-1  mt-2 ">
            <img
              src="/description.svg"
              className="w-8 h-8 opacity-70 self-center"
              alt=""
            />

            <div>
              <textarea
                className="input input-bordered h-20  font-semibold   w-full  bg-transparent"
                placeholder="Description"
                onChange={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
          </div>
          {/* interest */}
          <div className="flex flex-row border-b-2 pb-2 gap-1 mt-2">
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
          {/* event */}
          <div className="flex flex-row border-b-2 pb-2 gap-1 mt-2">
            <img
              src="/calendar_event.svg"
              className="w-8 h-8 opacity-70 self-center"
            ></img>
            <div>
              <select
                className=" input input-bordered   w-full  bg-transparent"
                id="event"
              >
                <option disabled>Tag Event</option>
                {event.map((v, i) => {
                  return (
                    <option key={i} value={v.title}>
                      {v.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* media */}
          <div className="flex flex-col border-b-2 pb-2 gap1 mt-2 h-48 justify-center">
            <img
              src="/upload.svg"
              className="w-8 h-8 opacity-70 self-center"
            ></img>
            <input type="file" accept="image/jpeg" onChange={() => {}} />
            <button>Upload Image</button>
          </div>
        </form>
      </div>

      <button
        className="self-end bottom-0 fixed mb-10 mr-10 laptop:mr-32 drop-shadow-md "
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <img src="/arrow_forward.svg" className="w-8 h-8"></img>
      </button>
    </div>
  );
}
