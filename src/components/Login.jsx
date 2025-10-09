import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux"; //hook from react-redux
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //as this fxn will make an API call,make it async.We can do API call using fetch() or we can use npm axios.(both work same way)
  //We can do axios.post/get/patch etc
  const handleLogin = async () => {
    try {
      //axios.post("API route", {data u want to send})
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(res.data);
      // console.log(res.data.data);
      dispatch(addUser(res.data)); //add the res data to our redux store
      return navigate("/"); //after login go to /
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm ">
        <div className="card-body flex ">
          <h2 className="card-title justify-center items-center">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <div className="my-3">
            {!isLogin && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-sm ">
                    First Name
                  </legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-sm ">
                    Last Name
                  </legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm ">Email ID</legend>
              <input
                type="text"
                value={emailId}
                className="input"
                onChange={(e) => setEmailId(e.target.value)} //as soon as value of input field is changing,we r changing value of emailId var
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm ">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500 my-1 px-3">{error}</p>
          <div className="card-actions justify-center items-center">
            <button
              className="btn btn-primary"
              onClick={isLogin ? handleLogin : handleSignup}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="cursor-pointer underline text-center my-3"
            onClick={() => setIsLogin((value) => !value)}
          >
            {isLogin ? "New User? Sign Up Here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
