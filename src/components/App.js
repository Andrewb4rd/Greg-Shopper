import React, { useState, useEffect } from "react";
import Header from "./Header";
import Body from "./Body";

const App = () => {
  const [user, setUser] = useState({ username: "Guest" });
  const [token, setToken] = useState("");

  useEffect(() => {
    console.log("Token: ", token);
  }, [token]);

  useEffect(() => {
    console.log("User: ", user);
  }, [user]);

  return (
    <div className="App">
      <Header setToken={setToken} user={user} setUser={setUser} />
      <Body user={user} />
    </div>
  );
};

export default App;
