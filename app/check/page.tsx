"use client";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { ko } from "date-fns/locale";
import { Calendar, DateRange } from "react-date-range";

type Props = {};

async function getAllUserSchedules(month: string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/check`, {
    params: {
      month,
    },
  });
  return res.data;
}

const Check = (props: Props) => {
  const currentDate = new Date();
  const [date, setDate] = useState<Date>(new Date());
  const [disabledDates, setDisableDates] = useState<string[]>();

  const onChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    try {
      const allSchedules = await getAllUserSchedules(e.target.value);
      setDate(new Date(`${currentDate.getFullYear()}-${e.target.value}`));
      setDisableDates(allSchedules);
    } catch (e) {}
  };
  return (
    <div className="h-screen pl-4 pr-4 flex flex-col items-center gap-6">
      <select className="w-full h-10 text-black" onChange={onChange}>
        <option>월 선택</option>
        <option className="text-black" value="1">
          1월
        </option>
        <option className="text-black" value="2">
          2월
        </option>
        <option className="text-black" value="3">
          3월
        </option>
        <option className="text-black" value="4">
          4월
        </option>
        <option className="text-black" value="5">
          5월
        </option>
        <option className="text-black" value="6">
          6월
        </option>
        <option className="text-black" value="7">
          7월
        </option>
        <option className="text-black" value="8">
          8월
        </option>
        <option className="text-black" value="9">
          9월
        </option>
        <option className="text-black" value="10">
          10월
        </option>
        <option className="text-black" value="11">
          11월
        </option>
        <option className="text-black" value="12">
          12월
        </option>
      </select>
      <Calendar
        locale={ko}
        date={date}
        disabledDates={
          disabledDates ? [...disabledDates.map((date) => new Date(date))] : []
        }
        showDateDisplay={false}
        onChange={() => {}}
        showMonthArrow={false}
        showMonthAndYearPickers={false}
      />
    </div>
  );
};

export default Check;
