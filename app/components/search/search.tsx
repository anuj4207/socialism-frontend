export default function Search(props: any) {
  return (
    <div>
      <div className="mt-2 h-1/6 border-b-2 w-screen ">
        <div className="flex flex-row ">
          <div className="flex flex-col ml-10 laptop:ml-32 basis-1/2">
            <div className="text-base font-normal translate-y-2">
              {props.first}
            </div>
            <div className="mb-2 text-xl font-bold drop-shadow-md">
              {props.second}
            </div>
          </div>
          <div
            className={
              props.image !== 'na'
                ? 'mt-3 basis-1/2 flex justify-end mr-10 laptop:mr-32'
                : 'hidden'
            }
          >
            <img src={props.image} className=" w-8 h-8  " alt="401"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
