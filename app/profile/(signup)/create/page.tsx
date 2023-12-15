'use client';
import Search from '@/app/components/search/search';
import { checkAuthentication } from '@/app/utils/Auth';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { createProfile } from '../api/route';

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [error, setError] = useState('');
  const [warn, setWarn] = useState(false);
  useEffect(() => {
    if (!checkAuthentication()) {
      router.push('/');
    }
  });
  useEffect(() => {}, [name, about, error, warn]);

  async function submitForm() {
    if (name.length == 0 || about.length == 0) {
      setWarn(true);
    } else {
      let msg = await createProfile({ name: name, about: about });
      if (msg.msg === 'success') {
        setError('');
        router.push('/profile/interest');
      } else {
        setError('Something went wrong');
      }
    }
  }
  return (
    <div className="flex flex-col h-screen">
      <div className="basis-1/6">
        <Search first="Create" second="Profile" image="/profile.svg"></Search>
      </div>

      <div className="basis-1/6 flex flex-col items-center">
        <div className="border-2 w-32 h-32 rounded-full bg-lightBlue">
          <img
            src="/profile.svg"
            className="w-20 h-20 mt-4 ml-5 opacity-40"
          ></img>
        </div>
        <div>
          <button
            className="underline underline-offset-2 hover:drop-shadow-xl"
            onClick={(e) => {
              e.preventDefault();
              console.log('add api route for cloud upload');
            }}
          >
            Upload Picture
          </button>
        </div>
      </div>

      <div className="basis-4/6 ">
        <div className="m-6 mt-28 laptop:mt-44 ">
          <form>
            <div className="flex flex-col gap-4 items-center  laptop:gap-12">
              <input
                type="text"
                name="name"
                className="bg-white border-4 shadow-lg rounded-lg p-2 w-3/4 laptop:w-1/3"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              ></input>
              <textarea
                className="textarea border-text bg-white border-4 shadow-lg rounded-lg p-2 w-3/4 laptop:w-1/3"
                name="about"
                placeholder="About you"
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
              <div
                className={
                  error === 'Something went wrong' || warn
                    ? 'text-lightPink text-xs font-normal drop-shadow-lg items-center pl-2   w-3/4 laptop:w-1/3'
                    : 'hidden'
                }
              >
                Fill details first
              </div>
            </div>

            <button
              className="fixed bottom-10 right-10 drop-shadow-md"
              onClick={(e) => {
                e.preventDefault();
                submitForm();
              }}
            >
              <img src="/arrow_forward.svg" className=" w-8 h-8" alt="" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
