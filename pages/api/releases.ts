import type { NextApiRequest, NextApiResponse } from "next";
import { spotifyApi } from "../../utils/spotifyApi";

type Data = {
  albums: {
    href: string;
    items: object[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  } | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { axiosInstance } = spotifyApi();
    const instance = await axiosInstance();
    const response = await instance.get("/browse/new-releases");
    res.status(200).json(response.data);
  } catch (e: any) {
    console.error(e);
    return null;
  }
}
