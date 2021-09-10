import React from "react";
import Map from "./Map/Map";
import { withGoogleMap, withScriptjs } from "react-google-maps";
import "./App.css";

function App() {
  const MapWrapped = withScriptjs(withGoogleMap(Map));

  return (
    <div className="parent">
      <div className="App">
        <MapWrapped
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyClFE2DJm1cD9ntOLjfSJ_mMI06FCLaPpw&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </div>
  );
}

export default App;
