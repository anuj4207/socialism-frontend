"use client"
import Link from 'next/link'
import React from 'react'
interface Prop{
  nav:string;
  query:any
}
function Footer(props:any) {
  return (
    <div className='bottom-6 right-6  fixed'>
      <Link href={{
        pathname:props.nav,
        query:{number:props.query}
      }}>
      <img src='/arrow_forward.svg' alt='401' className='drop-shadow-lg w-8 h-8'></img>
      </Link>
    </div>
  )
}

export default Footer