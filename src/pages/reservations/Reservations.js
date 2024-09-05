import React, { useState, useEffect, useReducer, act } from "react";
import ReservationsForm from "./ReservationsForm"; // Child component (BookingForm)

export const initializeTimes = (actionDate) => {
    // TODO: maybe refactor to have initial timing here
    const date = new Date(actionDate);
    try{
        /* global fetchAPI */
        const availableTimes = fetchAPI(date);
        return availableTimes;
    }
    catch(error)
    {
        console.error("Error fetching available times:", error);
        return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    }
};


// Step 2: Define a reducer function to update available times based on the selected date
export const updateTimes = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMES":
      return initializeTimes(action.payload);
    default:
      return state;
  }
};

const Reservations = () => {
  // Step 3: Use useReducer to manage availableTimes
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  // State for the rest of the form
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      date,
      time,
      guests,
      occasion
    });
  };

  return (
    <div>
      <ReservationsForm
        date={date}
        setDate={setDate}
        time={time}
        setTime={setTime}
        guests={guests}
        setGuests={setGuests}
        occasion={occasion}
        setOccasion={setOccasion}
        availableTimes={availableTimes}
        handleSubmit={handleSubmit}
        dispatch={dispatch} // Pass the dispatch function to the child component
      />
    </div>
  );
};

export default Reservations;