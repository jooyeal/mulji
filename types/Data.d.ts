type User = {
  id: number;
  name: string;
};

type Schedule = {
  id: number;
  userId: number;
  startDate: Date;
  endDate: Date;
};
