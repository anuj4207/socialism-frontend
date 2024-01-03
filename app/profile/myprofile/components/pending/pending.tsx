'use client';

import { useEffect, useState } from 'react';
import { confirmUserEvent, fetchPendingUser } from '../../api/route';
import { useRouter } from 'next/navigation';

export default function Pending(props: any) {
  const [user, setUser] = useState([]);
  const router = useRouter();
  useEffect(() => {
    pendingUser();
  }, []);
  useEffect(() => {}, [user]);
  async function pendingUser() {
    let msg = await fetchPendingUser(props.id);
    if (msg.msg === 'success') {
      setUser(msg.data);
    }
  }
  async function confirmUser(id: number) {
    let msg = await confirmUserEvent({ id: props.id, uId: id });
  }
  async function cancelUser(id: number) {
    let msg = await confirmUserEvent({ id: props.id, uId: id });
  }
  return (
    <div className="flex flex-col gap-1 overflow-y-scroll h-full w-full m-4">
      {user.map((v, i) => {
        return (
          <div className="flex flex-row gap-2 border-b-1 pb-1" key={i}>
            <div className="rounded-full w-6 h-6 bg-lightBlue flex items-center justify-around">
              <img src="/profile.svg" className="opacity-60 w-4 h-4"></img>
            </div>
            <div className="">{v.name}</div>
            <button
              className="drop-shadow-2xl p-0.5"
              onClick={(e) => {
                e.preventDefault();
                router.push(
                  `/profile/otherprofile/${props.adminId}/${props.uId}`,
                );
              }}
            >
              <img src="/info.svg" alt="" className="w-4 h-4" />
            </button>
            <div className="flex flex-row gap-2 grow justify-end ml-4 ">
              <button
                className="opacity-70 drop-shadow-2xl"
                onClick={(e) => {
                  e.preventDefault();
                  confirmUser(v.id);
                }}
              >
                <img src="/join.svg" alt="" />
              </button>
              <button
                className="opacity-60 drop-shadow-2xl "
                onClick={(e) => {
                  e.preventDefault();
                  cancelUser(v.id);
                }}
              >
                <img src="/cancel.svg" alt="" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
