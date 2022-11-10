"use client";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { ko } from "date-fns/locale";
import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
type Props = {
  params: {
    month: string;
  };
  searchParams: {
    user: string;
  };
};

const MonthDetail = ({ params: { month }, searchParams: { user } }: Props) => {
  const currentDate = new Date();
  const [date, setDate] = useState<{ startDate: Date; endDate: Date }>({
    startDate: new Date(`${currentDate.getFullYear()}-${Number(month)}`),
    endDate: new Date(`${currentDate.getFullYear()}-${Number(month)}`),
  });

  const onClick = async () => {
    console.log(date.startDate);
    console.log(date.endDate);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/registSchedule`, {
        userId: Number(user),
        startDate: date.startDate,
        endDate: date.endDate,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="h-screen flex flex-col itemsc-center pr-4 pl-4">
      <DateRange
        locale={ko}
        ranges={[
          {
            startDate: date.startDate,
            endDate: date.endDate,
            key: "selection",
          },
        ]}
        onChange={(e) => {
          console.log(e);
          setDate({
            startDate: new Date(e.selection.startDate ?? ""),
            endDate: new Date(e.selection.endDate ?? ""),
          });
        }}
      />
      <button
        className="w-full h-10 text-xl border border-white rounded-lg mt-6 active:scale-95 active:bg-stone-800"
        onClick={onClick}
      >
        저 장
      </button>
    </div>
  );
};

export default MonthDetail;
