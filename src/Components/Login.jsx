import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";  //hook from react-redux
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("noorroby22@gmail.com");
  const [password, setPassword] = useState("Jattdesi@45");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //as this fxn will make an API call,make it async.We can do API call using fetch() or we can use npm axios.(both work same way)
  //We can do axios.post/get/patch etc
  const handleLogic = async () => {
    try {
      //axios.post("API route", {data u want to send})
      const res =await axios.post(
        BASE_URL+"/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(res);
      dispatch(addUser(res.data));  //add the res data to our redux store
      return navigate("/"); //after login go to /
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm ">
        <div className="card-body flex ">
          <h2 className="card-title justify-center items-center">Login</h2>
          <div className="my-3">
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
          <div className="card-actions justify-center items-center">
            <button className="btn btn-primary" onClick={handleLogic}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
