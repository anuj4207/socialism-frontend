'use client';
import Search from '@/app/components/search/search';
import { tags } from '@/public/tag';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addInterest } from '../api/route';
import { checkAuthentication } from '@/app/utils/Auth';

export default function Page() {
  const [tag, setTag] = useState(['']);
  const router = useRouter();
  function selected(b: string) {
    let c = tag.filter((v) => v === b);
    let d = tag.filter((v) => v !== b);
    if (c.length == 0) {
      d.push(b);
      setTag(d);
    } else if (c.length == 1) {
      setTag(d);
    }
  }
  async function handleSubmit() {
    let msg = await addInterest({ tag: tag });
    if (msg.msg === 'success') {
      router.push('/home');
    }
  }
  useEffect(() => {
    if (!checkAuthentication()) {
      router.push('/');
    }
  });
  useEffect(() => {}, [tag]);
  return (
    <div className="flex flex-col h-screen">
      <div className="basis-1/6">
        <Search first="Select" second="Interest" image="/search.svg"></Search>
      </div>
      <div className="basis-4/6 ml-10 mr-10 laptop:ml-32 laptop:mr-32 flex flex-col">
        <div className="mt-6">
          {tags.map((v, i) => {
            // return <Interest tag={v[0]} tags={v[1]} key={i}></Interest>
            return (
              <div key={i}>
                <div className="flex flex-col gap-2 flex-nowrap">
                  <div className="text-xl font-medium drop-shadow-lg mt-2">
                    {v[0]}
                  </div>
                  <div className="flex flex-row flex-wrap gap-2 border-b-1 pb-4">
                    {typeof v[1] !== 'string'
                      ? v[1].map((vv: string, ii: number) => {
                          return (
                            <div
                              key={ii + 10 * i}
                              className={
                                tag.filter((va) => va === vv).length == 1
                                  ? 'border-2  rounded-lg p-1 bg-lightPink'
                                  : 'border-2  rounded-lg p-1 '
                              }
                            >
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  selected(vv);
                                }}
                              >
                                {vv}
                              </button>
                            </div>
                          );
                        })
                      : 'hidden'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="basis-1/6 flex flex-row ">
        <button
          className="pb-10 flex drop-shadow-md ml-10 laptop:ml-32  mt-6 basis-1/2 "
          onClick={(e) => {
            e.preventDefault();
            router.push('/profile/create');
          }}
        >
          <img src="/arrow_forward.svg" className="w-8 h-8 rotate-180"></img>
        </button>
        <div className="pb-10 flex drop-shadow-md  mr-10 laptop:mr-32 mt-6 basis-1/2 justify-end">
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
    </div>
  );
}
