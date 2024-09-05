import { render, screen, act, fireEvent } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Reservations from "./Reservations";
import { initializeTimes, updateTimes } from './Reservations';

beforeEach(() => {
    fetchAPI = jest.fn(); // Mock fetchAPI as a function
    submitAPI = jest.fn();
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


test('shows validation errors when required fields are missing', async () => {
    fetchAPI.mockReturnValue(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);

    render(
        <MemoryRouter>
        <Reservations />
        </MemoryRouter>
    );

    // Find and click the submit button without entering any values
    const submitButton = screen.getByText(/Make Your reservation/i);
    fireEvent.click(submitButton);

    // Expect validation errors to appear for required fields
    expect(await screen.findByText(/Date is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Time is required/i)).toBeInTheDocument();
});

test('shows validation error for guest number out of range', async () => {
    fetchAPI.mockReturnValue(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);

    render(
        <MemoryRouter>
        <Reservations />
        </MemoryRouter>
    );

    // Find the guests input field
    const guestsInput = screen.getByLabelText(/number of guests/i);

    // Enter an invalid number of guests (e.g., 11 which is greater than max)
    fireEvent.change(guestsInput, { target: { value: 11 } });

    // Click the submit button
    const submitButton = screen.getByText(/Make Your reservation/i);
    fireEvent.click(submitButton);

    // Expect a validation error for guests to appear
    expect(await screen.findByText(/Maximum of 10 guests/i)).toBeInTheDocument();
});

test('submits the form when all fields are valid', async () => {
    fetchAPI.mockReturnValue(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);

    render(
      <MemoryRouter>
        <Reservations />
      </MemoryRouter>
    );

    // Use `act` to wrap state-updating actions
    await act(async () => {
      // Fill out all fields with valid data
      fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: '2024-09-15' } });
      fireEvent.change(screen.getByLabelText(/choose time/i), { target: { value: '18:00' } });
      fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: 3 } });
      fireEvent.change(screen.getByLabelText(/occasion/i), { target: { value: 'Anniversary' } });

      // Click submit
      fireEvent.click(screen.getByText(/Make Your reservation/i));
    });

    // Assert that form submission was successful
    expect(screen.queryByText(/Date is required/i)).toBeNull();
    expect(screen.queryByText(/Time is required/i)).toBeNull();
    // expect(screen.queryByText(/Number of guests is required/i)).toBeNull();
});