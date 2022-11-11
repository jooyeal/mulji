import axios from "axios";
import UserAvatar from "../components/UserAvatar";

async function getUsers(): Promise<User[] | null> {
  const users = await axios.get(`/getUsers`);
  return users.data;
}

export default async function Home() {
  const users = await getUsers();
  return (
    <div className="flex flex-col items-center gap-4">
      {users?.map((user) => (
        <UserAvatar key={user.id} id={user.id} name={user.name} />
      ))}
    </div>
  );
}
