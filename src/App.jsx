import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";

//basename is the root of ur applicationa and all the routing inside BrowserRouter will work *relative to this path. i.e if u write basename="/app" then all routes should start with /app/user,/app/signup etc
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          {/* <Route path="/" element={<div>Home Page</div>} />   OR -> see below */}
          <Route path="/" element={<Body />}>
            {" "}
            {/*creating children routes inside Body.So the Parent(Body) will render these child inside an Outlet */}
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
