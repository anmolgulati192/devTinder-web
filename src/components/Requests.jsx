import { useEffect } from "react";
import { addRequests } from "../utils/requestSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Requests = () => {
  const requests = useSelector((state) => state.requests);
  console.log("Requests:", requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(response.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Requests</h1>
      {requests && requests.length > 0 ? (
        <ul className="space-y-4">
          {requests.map(({ fromUserId }) => (
            <li
              key={fromUserId._id}
              className="p-4 border rounded-lg shadow-sm flex items-center gap-4 w-1/3 mx-auto bg-stone-100"
            >
              <img
                src={
                  fromUserId.photoUrl
                    ? fromUserId.photoUrl
                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt={`${fromUserId.firstName} ${fromUserId.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {fromUserId.firstName} {fromUserId.lastName}
                </h2>
                {fromUserId.age && fromUserId.gender && (
                  <p className="text-gray-600">
                    {fromUserId.age + ", " + fromUserId.gender}
                  </p>
                )}
                <p className="text-gray-600">{fromUserId.about}</p>
              </div>
              <div className="flex gap-2 ml-auto">
                <button className="btn btn-primary">Reject</button>
                <button className="btn btn-secondary">Accept</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No requests found.</p>
      )}
    </div>
  );
};

export default Requests;
