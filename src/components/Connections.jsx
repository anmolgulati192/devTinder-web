import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((state) => state.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(response.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="fleex justify-center my-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Connections</h1>
      {connections && connections.length > 0 ? (
        <ul className="space-y-4">
          {connections.map((conn) => (
            <li
              key={conn._id}
              className="p-4 border rounded-lg shadow-sm flex items-center gap-4 w-1/3 mx-auto bg-stone-100"
            >
              <img
                src={
                  conn.photoUrl
                    ? conn.photoUrl
                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt={`${conn.firstName} ${conn.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {conn.firstName} {conn.lastName}
                </h2>
                {conn.age && conn.gender && (
                  <p className="text-gray-600">
                    {conn.age + ", " + conn.gender}
                  </p>
                )}
                <p className="text-gray-600">{conn.about}</p>
              </div>
              <Link to={"/chat/" + conn._id} className="ml-auto">
                <button className="btn btn-primary">Chat</button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No connections found.</p>
      )}
    </div>
  );
};

export default Connections;
