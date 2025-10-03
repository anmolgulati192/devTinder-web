import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error("Failed to fetch feed", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (feed && feed.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h2 className="text-2xl">No new users in feed !!!</h2>
      </div>
    );
  }

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard feed={feed[0]} />
      </div>
    )
  );
};

export default Feed;
