'use client';

export default function Event() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-10 justify-start ml-6 border-b-1 text-xs mx-4 pb-1 opacity-70">
        <button className="focus:font-semibold focus:text-text">
          Upcoming
        </button>
        <button className="focus:font-semibold focus:text-text">
          My Events
        </button>
        <button className="focus:font-semibold focus:text-text">
          Completed
        </button>
      </div>
    </div>
  );
}
