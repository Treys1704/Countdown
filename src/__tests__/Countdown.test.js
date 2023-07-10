import { render } from "@testing-library/react"
import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/dom'
import React from "react"
import Countdown from "../Countdown";
import { format } from "date-fns"

describe('Countdown component', () => {
    it('should render the initial countdown value', () => {
        render(<Countdown />);
        const countdownValue = screen.getByText('01');
        expect(countdownValue).toBeInTheDocument();
    });

    it('should open the modal when the "Edit Date" button is clicked', () => {
        render(<Countdown />);
        const editButton = screen.getByText(/Editer la date/i);
        fireEvent.click(editButton);
        const modal = screen.getByRole('dialog');
        expect(modal).toBeInTheDocument();
    });

    it('should update the target date when a new date is selected', () => {
        render(<Countdown />);
        const editButton = screen.getByText(/Editer la date/i);
        fireEvent.click(editButton);
        const datePickerInput = screen.getByLabelText(/Nouvelle Date/i);
        const newDate = new Date('2023-12-31T00:00:00');
        fireEvent.change(datePickerInput, { target: { value: format(newDate, 'MM/dd/yyyy') } });
        expect(datePickerInput.value).toBe(format(newDate, 'MM/dd/yyyy'));
    });

    it('should close the modal when the "Cancel" button is clicked', () => {
        render(<Countdown />);
        const editButton = screen.getByText(/Editer la date/i);
        fireEvent.click(editButton);
        const modal = screen.getByRole('dialog');
        expect(modal).toBeInTheDocument();
        const cancelButton = screen.getByText(/Cancel/i);
        fireEvent.click(cancelButton);
        // Use waitForElementToBeRemoved to wait for the modal to be removed from the document
        waitForElementToBeRemoved(() => screen.getByRole('dialog')).then(() => {
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
    });

    // it('should talk that the date has passed', () => {
    //     render(<Countdown />);
    //     const editButton = screen.getByText(/Editer la date/i);
    //     fireEvent.click(editButton);
    //     const elapsedTime = screen.getByText(/Temps écoulé/i);
    //     const datePickerInput = screen.getByLabelText(/Nouvelle Date/i);
    //     const newDate = new Date('2023-06-31T00:00:00');
    //     fireEvent.change(datePickerInput, { target: { value: format(newDate, 'MM/dd/yyyy') } });
    //     if (newDate < datePickerInput.value) {
    //         expect(elapsedTime).toBeInTheDocument();
    //     }
    //     expect(elapsedTime).toBeInTheDocument();
    // });

})
