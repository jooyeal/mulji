"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import UserAvatar from "../components/UserAvatar";

async function getUsers(): Promise<User[] | null> {
  const users = await axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/getUsers`);
  return users.data;
}

export default function Home() {
  const [users, setUsers] = useState<User[] | null>();
  useEffect(() => {
    const init = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    init();
  }, []);
  return (
    <div className="flex min-h-screen flex-col items-center gap-4">
      {users?.map((user) => (
        <UserAvatar key={user.id} id={user.id} name={user.name} />
      ))}
    </div>
  );
}
