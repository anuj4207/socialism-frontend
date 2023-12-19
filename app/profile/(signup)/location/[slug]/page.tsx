'use client';

import Search from '@/app/components/search/search';
import { checkAuthentication } from '@/app/utils/Auth';
import { Location } from '@/public/location';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { updateLocaiton } from '../../api/route';

function Page(props: any) {
  const router = useRouter();
  const [state, setState] = useState('Select State');
  const [city, setCity] = useState('Select City');

  async function handleSubmit() {
    let msg = await updateLocaiton({ state: state, city: city });
    if (msg.msg === 'success') {
      if (props.params.slug === 'new') {
        router.push('/profile/create');
      } else if (props.params.slug === 'update') {
        router.push('/home');
      }
    }
  }
  useEffect(() => {
    if (!checkAuthentication()) {
      router.push('/');
    }
  });
  useEffect(() => {}, [state, city]);
  return (
    <div className="flex flex-col h-screen">
      <div className="basis-1/6">
        <Search
          first="Select"
          second="Location"
          image="/google-map-icon.svg"
        ></Search>
      </div>
      <div className="basis-4/6">
        <div className="flex flex-col items-center gap-10 mt-6">
          <img
            src="/google-map-icon.svg"
            className=" w-48 h-48"
            alt="401"
          ></img>
          <select
            id="state"
            className="mt-6 p-2 border-4 shadow-lg rounded-lg w-full max-w-xs bg-white"
          >
            <option disabled value="state">
              select state
            </option>
            {Location.map((v, i) => {
              return (
                <option
                  key={i}
                  value={v[0]}
                  onClick={(e) => {
                    e.preventDefault();
                    setState(v[0]);
                  }}
                >
                  {v[0]}
                </option>
              );
            })}
          </select>
          <select
            id="city"
            className="p-2 border-4 shadow-lg rounded-lg w-full max-w-xs bg-white"
          >
            <option disabled value="city">
              select city
            </option>
            {Location.map((v) => {
              <h1>{v[0]}</h1>;
              if (v[0] == state) {
                console.log(v[0]);
                return v.map((vv, ii) => {
                  if (ii > 0) {
                    return (
                      <option
                        value={vv}
                        key={ii}
                        onClick={(e) => {
                          e.preventDefault();

                          setCity(vv);
                        }}
                      >
                        {vv}
                      </option>
                    );
                  }
                });
              }
            })}
          </select>
        </div>
      </div>
      <div className="basis-1/6 ">
        <button
          className="fixed bottom-10 right-10 drop-shadow-md"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <img src="/arrow_forward.svg" className=" w-8 h-8" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Page;
