import React, { useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { UserContext } from "./App";
interface AppProps {
  eventName: string;
  description: string;
  thumbnail: React.ImgHTMLAttributes<string>;
  eventType: string;
  eventDate: string;
  eventId: number;
  userRole: number;
  location: string;
  getAllRSVPSEvents(): void;
  //getAllRSVPSEvents: () => void;
}

const RSVPLIST = ({
  eventName,
  description,
  thumbnail,
  eventType,
  eventDate,
  eventId,
  userRole,
  getAllRSVPSEvents,
  location,
}: //getAllRSVPSEvents,
AppProps) => {
  const user: any = useContext(UserContext);
  const { role_id, id } = user;

  //patch request for deleteting an event in the database
  const deleteRsvpsEvent = () => {
    console.log("LINE 81", id, " and ", eventId);
    axios
      .delete("/events/api/user/rsvps/delete", {
        params: { id: 1, event_id: eventId },
      })
      .then((data) => {
        console.log("87 LINE ", data);
        //getAllEvents();
      })
      .catch((err) => {
        console.error("91 REQUEST FAILED", err);
      });
  };

  console.log(userRole);
  useEffect(() => {
    getAllRSVPSEvents();
  }, []);
  return (
    <div>
      {userRole > 3 ? (
        <div>TOTAL RSVP RESPONSES</div>
      ) : (
        <section className="user-rsvps">
          <h1 className="user-event-name">{eventName}</h1>
          <h1 className="user-event-type">{eventType}</h1>
          <h4 className="user-event-date">{eventDate}</h4>
          <h4 className="user-event-loc">{location}</h4>
          {role_id < 4 && (
            <button onClick={deleteRsvpsEvent}>
              Can't attend smthing came up
            </button>
          )}
        </section>
      )}
    </div>
  );
};

export default RSVPLIST;
