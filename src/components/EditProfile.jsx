import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      //update our store with this data
      dispatch(addUser(res?.data?.data));
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <div className="flex justify-centre my-10 mx-80">
      <div className="flex justify-center my-3 mx-20">
        <div className="card bg-base-300 w-96 shadow-sm ">
          <div className="card-body flex ">
            <h2 className="card-title justify-center items-center">
              Edit Profile
            </h2>
            <div className="my-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm ">First Name</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm ">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  className="input"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm ">Photo URL</legend>
                <input
                  type="text"
                  value={photoUrl}
                  className="input"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm ">Age</legend>
                <input
                  type="text"
                  value={age}
                  className="input"
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm ">Gender</legend>
                <input
                  type="text"
                  value={gender}
                  className="input"
                  onChange={(e) => setGender(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm ">About</legend>
                <input
                  type="text"
                  value={about}
                  className="input"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
            </div>
            <p className="text-red-500 my-1 px-3">{error}</p>
            <div className="card-actions justify-center items-center">
              <button
                className="btn btn-primary px-10 font-bold"
                onClick={saveProfile}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="my-30 mx-20">
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
