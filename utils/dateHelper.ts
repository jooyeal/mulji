export const dateFormatToKr = (date: Date): Date => {
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const dateUtc = date.getTime();
  return new Date(dateUtc + KR_TIME_DIFF);
};

export const getAmongDate = (startDate: Date, endDate: Date): number[] => {
  const dateArray = [];
  for (let i = startDate.getDate(); i <= endDate.getDate(); i++) {
    dateArray.push(i);
  }
  return dateArray;
};

export const createCurrentDates = (dates: number[], month: number): Date[] => {
  const currentDate = new Date();
  const formatted: Date[] = dates
    .map((date) => new Date(`${currentDate.getFullYear()}-${month}-${date}`))
    .map((date) => dateFormatToKr(date));
  return formatted;
};

export const deleteDuplication = (dates: Date[]): Date[] => {
  let newArray: string[] = [];
  for (let i = 0; i < dates.length; i++) {
    if (!newArray.includes(String(dates[i]))) {
      newArray.push(String(dates[i]));
    }
  }
  const newDateArray = newArray.map((dateString) =>
    dateFormatToKr(new Date(dateString))
  );
  return newDateArray;
};
