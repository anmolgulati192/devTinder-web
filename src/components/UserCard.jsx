const UserCard = ({ feed }) => {
  const { firstName, lastName, about, photoUrl, age, gender } = feed;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={
            photoUrl
              ? photoUrl
              : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          }
          alt="User"
          className="h-96 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
