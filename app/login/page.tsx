'use client';
import React, { useEffect, useState } from 'react';
import Otp from './otp/otp';
import { sendOtp } from './api/route';

function Page() {
  const [number, setNumber] = useState(0);
  const [error, setError] = useState(false);
  const [click, setClick] = useState(false);
  const [type, setType] = useState(0);
  useEffect(() => {}, [click]);
  async function handleSubmit(e: any) {
    e.preventDefault();
    let msg = await sendOtp(`+91${number}`);
    if (msg.msg === 'error') {
      setError(true);
    } else {
      if (msg.data === 'new') {
        setType(1);
      } else {
        setType(0);
      }
      setError(false);
      setClick(true);
    }
  }
  return (
    <div>
      <div
        className={
          click
            ? 'blur-sm flex flex-col gap-1 items-center justify-items-center mt-20'
            : 'blur-none flex flex-col gap-1 items-center justify-items-center mt-20'
        }
      >
        <div className="">
          <h1 className="text-4xl tracking-widest drop-shadow-lg font-extrabold">
            SOCIALISM
          </h1>
        </div>
        <div className=" flex flex-row font-semibold ">
          <h1 className="mr-2">Community</h1>
          <h1 className="text-lightBlue">Events</h1>
          <h1 className="ml-2 text-lightPink">Groups</h1>
        </div>
        <div className="border-4 shadow-lg rounded-lg mt-56">
          <div className="join flex flex-row items-center">
            <h1 className="font-semibold ml-2">+91</h1>
            <form>
              <input
                type="text"
                typeof="number"
                className="ml-2 join-item  input bg-transparent font-semibold"
                placeholder="Mobile Number"
                onChange={(e) => {
                  e.preventDefault;
                  setNumber(parseInt(e.target.value));
                }}
              ></input>
            </form>
          </div>
        </div>
        <div className={error ? 'text-lightPink text-md' : 'hidden'}>
          <h1 className="items-end justify-items-end mt-2 drop-shadow-lg">
            Incorrect Number
          </h1>
        </div>
        <div className="flex flex-col items-center mt-36">
          <img
            src="/google-color-icon.svg"
            className="w-12 h-12"
            alt="401"
          ></img>
          <h1 className="translate-y-2 font-medium">Sign in with Google</h1>
        </div>
      </div>
      <button
        className="bottom-10 right-10 drop-shadow-md fixed "
        onClick={(e) => handleSubmit(e)}
      >
        <img src="/arrow_forward.svg" className="w-8 h-8"></img>
      </button>
      <div className={click ? '' : 'hidden'}>
        <Otp number={`+91${number}`} userType={type}></Otp>
        <button
          className="fixed bottom-10 left-10 drop-shadow-md"
          onClick={() => setClick(false)}
        >
          <img src="/arrow_forward.svg" className="rotate-180 w-8 h-8" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Page;
