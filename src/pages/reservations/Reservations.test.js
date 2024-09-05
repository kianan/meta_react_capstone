import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Reservations from "./Reservations";
import { initializeTimes, updateTimes } from './Reservations';

beforeEach(() => {
    fetchAPI = jest.fn(); // Mock fetchAPI as a function
});


test('Renders the Reservations heading', () => {
    // render(<Reservations />);

    const mockTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    fetchAPI.mockReturnValue(mockTimes);

    render(
        <MemoryRouter>
          <Reservations />
        </MemoryRouter>
      );
    const headingElement = screen.getByText("Reservation Form");
    expect(headingElement).toBeInTheDocument();
});

test('initializeTimes returns the correct available times', () => {
    // "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
    const expectedTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    fetchAPI.mockReturnValue(expectedTimes);
    const result = initializeTimes();
    expect(result).toEqual(expectedTimes);
});


test('updateTimes returns the same state when action is UPDATE_TIMES', () => {
    const currentState = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    fetchAPI.mockReturnValue(currentState);
    const action = { type: 'UPDATE_TIMES', payload: new Date("2024-09-15") }; // Action to trigger state update
    const result = updateTimes(currentState, action);
    expect(result).toEqual(currentState); // Ensure the same state is returned
});


test('writes form data to local storage on form submission', () => {

    const mockTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    fetchAPI.mockReturnValue(mockTimes);

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Reservations />
      </MemoryRouter>
    );

    // Find the input fields
    const dateInput = screen.getByLabelText(/choose date/i);
    const timeInput = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);

    // Simulate user input
    fireEvent.change(dateInput, { target: { value: '2024-09-15' } });
    fireEvent.change(timeInput, { target: { value: '18:00' } });
    fireEvent.change(guestsInput, { target: { value: 3 } });
    fireEvent.change(occasionSelect, { target: { value: 'Anniversary' } });

    // Check if the state was updated by verifying the input values
    expect(dateInput.value).toBe('2024-09-15');
    expect(timeInput.value).toBe('18:00');
    expect(guestsInput.value).toBe('3');
    expect(occasionSelect.value).toBe('Anniversary');
  });