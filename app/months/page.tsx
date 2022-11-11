"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";

const Month = () => {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  return (
    <div className="min-h-screen text-white">
      {months.map((month, index) => (
        <div key={index} className="p-4">
          <Link
            href={{
              pathname: `/months/${index + 1}`,
              query: {
                user,
              },
            }}
          >
            <div className="border-b flex justify-between">
              <p>{month}</p>
              <BiRightArrowAlt />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Month;
