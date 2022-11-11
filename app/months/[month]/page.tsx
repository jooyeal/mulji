"use client";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { ChakraProvider, useToast } from "@chakra-ui/react";
import { DateRange } from "react-date-range";
import { ko } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

async function getSchedules(userId: string, month: string) {
  const res = await axios.get(`/getSchedule`, {
    params: {
      userId,
      month,
    },
  });
  return res.data;
}

const MonthDetail = () => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const month = path?.substring(8, 9);
  const user = searchParams.get("user");
  const toast = useToast();
  const router = useRouter();
  const currentDate = new Date();
  const [schedules, setSchedules] = useState<Date[] | null>(null);
  const [date, setDate] = useState<{ startDate: Date; endDate: Date }>({
    startDate: new Date(`${currentDate.getFullYear()}-${Number(month)}`),
    endDate: new Date(`${currentDate.getFullYear()}-${Number(month)}`),
  });

  useEffect(() => {
    if (month && user) {
      const init = async () => {
        const data = await getSchedules(user, month);
        setSchedules(data);
      };
      init();
    }
  }, [month, user]);
  const onClick = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/registSchedule`, {
        userId: Number(user),
        startDate: date.startDate,
        endDate: date.endDate,
      });
      toast({
        title: "저장에 성공했습니다.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      router.push(`/months?user=${user}`);
    } catch (e) {
      console.log(e);
      toast({
        title: "저장에 실패했습니다.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <div className="h-screen flex flex-col itemsc-center pr-4 pl-4 font-Jua">
        <DateRange
          locale={ko}
          ranges={[
            {
              startDate: date.startDate,
              endDate: date.endDate,
              key: "selection",
            },
          ]}
          disabledDates={
            schedules
              ? [...schedules.map((schedule) => new Date(schedule))]
              : []
          }
          showDateDisplay={false}
          showMonthArrow={false}
          showMonthAndYearPickers={false}
          onChange={(e) => {
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
    </ChakraProvider>
  );
};

export default MonthDetail;
