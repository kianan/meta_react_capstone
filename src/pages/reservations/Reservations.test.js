import { render, screen } from "@testing-library/react";
import Reservations from "./Reservations";
import { initializeTimes, updateTimes } from './Reservations';


test('Renders the Reservations heading', () => {
    render(<Reservations />);
    const headingElement = screen.getByText("Reservation Form");
    expect(headingElement).toBeInTheDocument();
});

test('initializeTimes returns the correct available times', () => {
    // "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
    const expectedTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    const result = initializeTimes();
    expect(result).toEqual(expectedTimes);
});


test('updateTimes returns the same state when action is UPDATE_TIMES', () => {
    const currentState = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    const action = { type: 'UPDATE_TIMES' }; // Action to trigger state update
    const result = updateTimes(currentState, action);
    // The reducer should return the same state, as no logic is implemented yet
    expect(result).toEqual(currentState); // Ensure the same state is returned
});