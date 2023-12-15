'use client';
export default function Event(props: any, key: number) {
  let data = props.details;
  let dateMonth = data.date.slice(5, 7);
  let dateDate = data.date.slice(8, 10);
  function month(mon: string) {
    switch (mon) {
      case '01':
        return 'Jan';
      case '02':
        return 'Feb';
      case '03':
        return 'Mar';
      case '04':
        return 'Apr';
      case '05':
        return 'May';
      case '06':
        return 'Jun';
      case '07':
        return 'Jul';
      case '08':
        return 'Aug';
      case '09':
        return 'Sep';
      case '10':
        return 'Oct';
      case '11':
        return 'Nov';
      case '12':
        return 'Dec';
    }
  }
  return (
    <div className="border-2 rounded-md border-lightBlueBg shadow-md h-32 flex flex-row my-2">
      <div className="h-full  bg-lightBlueBg">
        <div className="flex flex-col gap-1 m-2 items-center">
          <div className="font-medium text-white mt-0">{month(dateMonth)}</div>
          <div className="font-bold text-white text-2xl">{dateDate}</div>
        </div>
      </div>
      <div className=" flex flex-col items-start w-full m-2 mt-1 ">
        <div className="text-lg font-semibold">{data.title}</div>
        <div className="-translate-y-1 font-light text-sm w-full border-b-1">
          {data.description}
        </div>
        <div className="flex flex-row gap-2 items-center ">
          <img src="/time.svg" className="w-4 h-4 opacity-60" alt="404" />
          <div className="text-sm">{data.time}</div>
        </div>
        <div className="flex flex-row gap-2 items-end ">
          <img src="/location.svg" className="w-4 h-4 opacity-60" alt="404" />
          <div className="text-sm">{data.address}</div>
        </div>
        <div className="flex flex-row gap-2 items-end  w-full">
          <img
            src="/group.svg"
            className="w-4 h-4 opacity-60 -translate-y-1"
            alt="404"
          />
          <div className="text-sm -translate-y-1">{data.maxMembers}</div>
          <div className="grow flex justify-end -translate-y-1">
            <button className="p-1 bg-lightBlue text-white text-xs border-1 border-text drop-shadow-lg rounded-lg ">
              See Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}