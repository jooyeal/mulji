"use client";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div
      className={`fixed w-full h-16 bg-black text-white flex justify-between items-center pl-4 pr-4 z-40 transition-all`}
    >
      <Link href="/check">
        <p>일정확인</p>
      </Link>
      <Link href="/">
        <p>안되는날짜등록</p>
      </Link>
    </div>
  );
};

export default Header;
