'use client';
import React, { useEffect, useState } from 'react';

import { logIn, signIn } from './api/route';
import { useRouter } from 'next/navigation';

function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [click, setClick] = useState(false);
  const [type, setType] = useState(0);
  const [msg, setMsg] = useState('');
  const router = useRouter();
  useEffect(() => {}, [click, error, msg]);

  async function handleLogin(e: any) {
    e.preventDefault();
    let msg = await logIn(email, password);
    console.log(msg);
    if (msg.msg === 'error') {
      setError(true);
      setMsg(msg.error);
    } else {
      authenticate(msg);
      router.push('/home');
    }
  }
  async function signUp() {
    let msg = await signIn(email, password);
    console.log(msg);
    if (msg.msg === 'error') {
      setError(true);
      setMsg(msg.error);
    } else {
      setError(false);
      authenticate(msg);
      router.push('/profile/location/new');
    }
  }
  function authenticate(msg: any) {
    localStorage.setItem('token', msg.access_token);
    localStorage.setItem('expAt', msg.expAt);
  }
  return (
    <div
      className={
        click
          ? 'blur-sm flex flex-col gap-1 items-center justify-around h-screen'
          : 'blur-none flex flex-col items-center justify-center  border-4 gap-40 h-screen'
      }
    >
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-4xl tracking-widest drop-shadow-lg font-extrabold">
          SOCIALISM
        </h1>
        <div className=" flex flex-row font-semibold ">
          <h1 className="mr-2">Community</h1>
          <h1 className="text-lightBlue">Events</h1>
          <h1 className="ml-2 text-lightPink">Groups</h1>
        </div>
      </div>

      <form>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="ml-2  input bg-white border-text font-semibold shadow-lg rounded-md border-4"
            placeholder="Username"
            onChange={(e) => {
              e.preventDefault;
              setEmail(e.target.value);
            }}
          ></input>
          <input
            type="text"
            className="ml-2  input bg-white border-text font-semibold shadow-lg rounded-md border-4"
            placeholder="Password"
            onChange={(e) => {
              e.preventDefault;
              setPassword(e.target.value);
            }}
          ></input>
          {error ? (
            <div className="text-lightPink self-center">{msg}</div>
          ) : (
            <div></div>
          )}
        </div>
      </form>

      <button
        className="font-medium border-b-1 drop-shadow-lg"
        onClick={(e) => {
          e.preventDefault();
          signUp();
        }}
      >
        Create new account
      </button>

      <button
        className="self-end mr-10 laptop:mr-32 drop-shadow-md "
        onClick={(e) => handleLogin(e)}
      >
        <img src="/arrow_forward.svg" className="w-8 h-8"></img>
      </button>
    </div>
  );
}

export default Page;
