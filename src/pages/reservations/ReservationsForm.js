import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation


const ReservationsForm = ({
  date,
  setDate,
  time,
  setTime,
  guests,
  setGuests,
  occasion,
  setOccasion,
  availableTimes,
  handleSubmit,
  dispatch
}) => {


  const handleDateChange = (e) => {
    setDate(e.target.value);
    dispatch({ type: "UPDATE_TIMES", payload: e.target.value });
  };

  // Define Yup validation schema
  const validationSchema = Yup.object({
    date: Yup.string().required("Date is required"),
    time: Yup.string().required("Time is required"),
    guests: Yup.number()
      .min(1, "At least 1 guest is required")
      .max(10, "Maximum of 10 guests")
      .required("Number of guests is required"),
    occasion: Yup.string().required("Occasion is required"),
  });

  // Formik hook for managing form state and validation
  const formik = useFormik({
    initialValues: {
      date: date || "",
      time: time || "",
      guests: guests || 1,
      occasion: occasion || "Birthday",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values); // Call the parent handleSubmit function
    },

    validateOnChange: true,
    validateOnBlur: true,

    // Synchronize Formik's state with the parent state
    // handleChange: (e) => {
    //   const { name, value } = e.target;
    //   formik.setFieldValue(name, value); // Update Formik's state
    //   console.log(name);

    //   // Synchronize the parent state
    //   if (name === "date") {
    //     setDate(value); // Update date in parent component
    //     dispatch({ type: "UPDATE_TIMES", payload: value }); // Update available times based on date
    //   } else if (name === "time") {
    //     setTime(value); // Update time in parent component
    //   } else if (name === "guests") {
    //     console.log("guests");
    //     setGuests(value); // Update guests in parent component
    //   } else if (name === "occasion") {
    //     setOccasion(value); // Update occasion in parent component
    //   }
    // },
  });

  return (
    <form
      style={{ display: "grid", maxWidth: "200px", gap: "20px" }}
      onSubmit={formik.handleSubmit}
      aria-labelledby="reservation-form-title"
    >
      <h2 id="reservation-form-title">Reservation Form</h2>

      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        value={formik.values.date}
        onChange={handleDateChange}
        // onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        aria-required="true"
        required // This makes the date field mandatory
        min={new Date().toISOString().split("T")[0]} // Ensures you can't pick a date in the past
      />
      {formik.touched.date && formik.errors.date ? (
        <span style={{ color: "red" }}>{formik.errors.date}</span>
      ) : null}

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={formik.values.time}
        onChange={(e) => setTime(e.target.value)}
        // onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        aria-required="true"
        required
      >
        <option value="">Select a time</option>
        {availableTimes.map((availableTime) => (
          <option key={availableTime} value={availableTime}>
            {availableTime}
          </option>
        ))}
      </select>
      {formik.touched.time && formik.errors.time ? (
        <span style={{ color: "red" }}>{formik.errors.time}</span>
      ) : null}

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        placeholder="1"
        min="1"
        max="10"
        id="guests"
        value={formik.values.guests}
        onBlur={formik.handleBlur}
        // onChange={formik.handleChange}
        onChange={(e) => setGuests(e.target.value)}
        aria-required="true"
        aria-label="Enter number of guests"
        required
      />
      {formik.touched.guests && formik.errors.guests ? (
        <span style={{ color: "red" }}>{formik.errors.guests}</span>
      ) : null}

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={formik.values.occasion}
        onChange={(e) => setOccasion(e.target.value)}
        // onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        aria-required="true"
        required
      >
        <option>Birthday</option>
        <option>Anniversary</option>
      </select>

      <input type="submit" value="Make Your reservation" aria-label="Submit reservation" />
    </form>
  );
};

export default ReservationsForm;