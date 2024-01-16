import React, { useState } from "react";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dummyUser = {
    username: "user",
    password: "password",
  };

  const handleLogin = () => {
    if (username === dummyUser.username && password === dummyUser.password) {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  if (isLoggedIn) {
    return <div>Welcome!</div>;
  }

  return (
    <div>
      <input
        type="
        text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Auth;
