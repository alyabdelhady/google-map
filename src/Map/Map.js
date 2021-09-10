import React from "react";
import { GoogleMap, Marker, InfoWindow } from "react-google-maps";
import * as messages from "../data/casita-messages.json";
import { useEffect, useState } from "react";
import "./Map.css";

const CITIES = [
  {
    city: "Cairo",
    position: [30.04442, 31.235712],
  },
  {
    city: "Nairobi",
    position: [-1.292066, 36.821945],
  },
  {
    city: "Dubai",
    position: [25.204849, 55.270782],
  },
  {
    city: "New York",
    position: [40.712776, -74.005974],
  },
  {
    city: "Jeddh",
    position: [21.487301, 39.181339],
  },
];

function Map() {
  const [messagesInfo, setMessagesInfo] = useState([]);
  const [selectedMark, setSelectedMark] = useState(null);
  const [messageFilter, setMessageFilter] = useState(null);


  const containsAny = (message, citiesList) => {
    for (var i = 0; i < citiesList.length; i++) {
      var city = citiesList[i].city;
      if (message.indexOf(city) >= 0) {
        return { id: i + 1, city: city, position: citiesList[i].position };
      }
    }
  };

  const filter = (sentiment) => {
    const list = messagesInfo.filter((mark) => {
      if (mark.sentiment === sentiment) {
        return mark;
      } else { return null}
    });
    setMessageFilter(list);
    console.log(list);
  };

  const resetMessageFilter = () => {
    setMessageFilter(null)
  }

  useEffect(() => {
   
    const data = messages.Entries.Entry.map((msg) => ({
      ...msg,
      ...containsAny(msg.message, CITIES),
    }));
    setMessagesInfo(data);
  
    console.log(data);
  }, []);

  return (
    <GoogleMap
      defaultZoom={2}
      defaultCenter={{ lat: 30.04442, lng: 31.235712 }}
    >
      {(messageFilter ? messageFilter : messagesInfo).map((msg) => (
        <Marker
          key={msg.id}
          position={{ lat: msg.position[0], lng: msg.position[1] }}
          icon={{
            url:
              msg.sentiment === "Negative"
                ? "/icon/red.png"
                : msg.sentiment === "Positive"
                ? "/icon/green.png"
                : msg.sentiment === "Neutrual"
                ? "/icon/blue.png"
                : null,
            scaledSize:
              msg.sentiment === "Negative"
                ? new window.google.maps.Size(31, 31)
                : msg.sentiment === "Positive"
                ? new window.google.maps.Size(20, 29)
                : new window.google.maps.Size(19, 25),
          }}
          onClick={() => {
            setSelectedMark(msg);
          }}
        />
      ))}
      {selectedMark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedMark(null);
          }}
          position={{
            lat: selectedMark.position[0],
            lng: selectedMark.position[1],
          }}
        >
          <div className="message">
            <h2>{selectedMark.city}</h2>
            <p>{selectedMark.message}</p>
          </div>
        </InfoWindow>
      )}
      <div className="sentiment">
        <div>
          <button onClick={() => filter("Neutrual")} className="netural-button">
            Netural
          </button>
        </div>
        <div>
          <button
            onClick={() => filter("Positive")}
            className="positive-button"
          >
            Positive
          </button>
        </div>
        <div>
          <button
            onClick={() => filter("Negative")}
            className="negative-button"
          >
            Negative
          </button>
        </div>
        <div>
          <button
            onClick={() => resetMessageFilter()}
            className="reset-button"
          >
           All
          </button>
        </div>
      </div>
    </GoogleMap>
  );
}

export default Map;
