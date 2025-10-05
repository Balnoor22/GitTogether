import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return; //if feed data is already there in redux store,dont make API call
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      //Handle error
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && ( //If feed is present then only load this page
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]}/>
      </div>
    )
  );
};

export default Feed;
