// 'use client';
// import React, { useState } from 'react';
// import { verifyOtp } from '../api/route';
// import { redirect } from 'next/navigation';
// import { useRouter } from 'next/navigation';

// interface Prop {
//   number: string;
//   userType: number;
// }
// function Otp(prop: Prop) {
//   const [otp, setOtp] = useState(['0', '0', '0', '0', '0', '0']);
//   const [error, setError] = useState(false);
//   const router = useRouter();
//   async function verify() {
//     let cOtp = '';
//     otp.forEach((v) => {
//       cOtp += v;
//     });
//     //verify otp

//     let status = await verifyOtp(prop.number, cOtp);

//     if (status.msg === 'error') {
//       setError(true);
//     } else if (status.msg === 'success') {
//       setError(false);

//       localStorage.setItem('token', status.access_token);
//       localStorage.setItem('expAt', status.expAt);
//       console.log(
//         'saving,.........',
//         localStorage.getItem('token'),
//         localStorage.getItem('expAt'),
//       );
//     }
//     //if new user redirect to location -> nearby interest -> create profile
//     if (prop.userType == 1) {
//       router.push('/profile/location');
//     } else {
//       router.push('/home');
//     }
//     //if existed user -> redirect to home page
//   }
//   function handleOtp(e: any, n: string, i: number) {
//     e.preventDefault();
//     let nOtp = otp;
//     nOtp[i] = n;
//     setOtp(nOtp);
//   }
//   return (
//     <div className="bottom-0 fixed h-1/3 w-screen bg-lightBlueBg flex flex-col">
//       <div className=" mt-12 ml-12 laptop:ml-0 laptop:self-center">
//         <h1 className=" font-semibold text-xl text-neutral-50 ">Enter OTP</h1>
//       </div>

//       <form>
//         <div className="mt-4 flex flex-row gap-1 justify-center">
//           <input
//             type="text"
//             maxLength={1}
//             className="input-md bg-lightBlue ml-1 w-10 h-10"
//             onChange={(e) => {
//               handleOtp(e, e.target.value, 0);
//             }}
//           ></input>
//           <input
//             type="text"
//             maxLength={1}
//             className="input-md bg-lightBlue ml-1 w-10 h-10"
//             onChange={(e) => {
//               handleOtp(e, e.target.value, 1);
//             }}
//           ></input>
//           <input
//             type="text"
//             maxLength={1}
//             className="input-md bg-lightBlue ml-1 w-10 h-10"
//             onChange={(e) => {
//               handleOtp(e, e.target.value, 2);
//             }}
//           ></input>
//           <input
//             type="text"
//             maxLength={1}
//             className="input-md bg-lightBlue ml-1 w-10 h-10"
//             onChange={(e) => {
//               handleOtp(e, e.target.value, 3);
//             }}
//           ></input>
//           <input
//             type="text"
//             maxLength={1}
//             className="input-md bg-lightBlue ml-1 w-10 h-10"
//             onChange={(e) => {
//               handleOtp(e, e.target.value, 4);
//             }}
//           ></input>
//           <input
//             type="text"
//             maxLength={1}
//             className="input-md bg-lightBlue ml-1 w-10 h-10"
//             onChange={(e) => {
//               handleOtp(e, e.target.value, 5);
//             }}
//           ></input>
//         </div>
//       </form>
//       <div className="self-end mt-4 mr-12 laptop:mr-32">
//         <h1 className=" drop-shadow-sm text-neutral-950 font-normal ">
//           Resend OTP
//         </h1>
//       </div>

//       <button
//         className="fixed bottom-10 right-10 drop-shadow-md"
//         onClick={() => verify()}
//       >
//         <img src="/arrow_forward.svg" className="w-8 h-8" alt="" />
//       </button>
//     </div>
//   );
// }

// export default Otp;
