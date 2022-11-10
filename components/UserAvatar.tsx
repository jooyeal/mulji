import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  id: number;
  name: string;
};

const UserAvatar = ({ id, name }: Props) => {
  return (
    <Link
      href={{
        pathname: "/months",
        query: {
          user: id,
        },
      }}
    >
      <div>
        <Image
          src="https://i.picsum.photos/id/382/200/200.jpg?hmac=1RBvTrTJY2s3gldIAai5u3hsPDx6IEzsQg9uUC-MARo"
          alt=""
          width={200}
          height={200}
          className="rounded-full"
        />
        <p className="text-white text-center mt-4">{name}</p>
      </div>
    </Link>
  );
};

export default UserAvatar;
