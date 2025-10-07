import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      //Handle Error
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return; //if connection data is not there,dont do anything

  if (connections.length === 0) return <h1>No Connections Found!</h1>;

  return (
    <div className="text-center my-6">
      <h1 className="text-2xl font-bold">My Connections</h1>

      {connections.map((connection) => {
        const { _id,firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div key={_id} className="flex  my-4 p-4 bg-base-300 rounded-lg mx-auto w-1/2">
            <div>
              <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl} />
            </div>
            <div className="text-left mx-5">
              <h2 className="font-bold text-lg">{firstName + " " + lastName}</h2>
              {age && gender && <p>{age+", "+gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
