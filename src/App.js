import "./App.css";
import Login from "./components/Login";
import Player from "./components/Player";
import { useEffect, useState } from "react";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";

function App() {
  const [token, setToken] = useState("");
  const spotify = new SpotifyWebApi();
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);

      spotify.setAccessToken(_token);
      spotify
        .getMe()
        .then((user) => {
          console.log("👦", user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return <div className="App">{token ? <Player /> : <Login />}</div>;
}

export default App;
