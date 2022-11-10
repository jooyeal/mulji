"use client";
import React from "react";

type Props = {};

const Check = (props: Props) => {
  return (
    <div className="h-screen pl-4 pr-4">
      <select className="w-full h-10 text-black">
        <option>월 선택</option>
        <option className="text-black">1월</option>
        <option className="text-black">2월</option>
        <option className="text-black">3월</option>
        <option className="text-black">4월</option>
        <option className="text-black">5월</option>
        <option className="text-black">6월</option>
        <option className="text-black">7월</option>
        <option className="text-black">8월</option>
        <option className="text-black">9월</option>
        <option className="text-black">10월</option>
        <option className="text-black">11월</option>
        <option className="text-black">12월</option>
      </select>
    </div>
  );
};

export default Check;
