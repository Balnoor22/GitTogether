const UserCard = ({ user }) => {
  // console.log(user);
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  return (
    <div className="card bg-base-300 w-78 shadow-sm">
      <figure className="flex justify-center items-center">
        <img
          src={user.photoUrl}
          alt="Photo"
          className="w-full h-auto object-contain rounded-t-lg"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", "+gender}</p>} {/*If age n gender are present then only show them*/}
        <p>{about}</p>
        <div className="card-actions flex justify-between my-3">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
