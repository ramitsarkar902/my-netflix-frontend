import React from "react";
import Row from "./components/Row";
import requests from "./Api-fetch/requests";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import Debug from "./components/debug";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Debug
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
    </div>
  );
}

export default App;
