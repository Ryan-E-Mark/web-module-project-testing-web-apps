import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    //Arrange
    render(<ContactForm />)
    //Act
    const formHeader = screen.getByText(/contact form/i);
    //Assert
    expect(formHeader).toBeInTheDocument();
    expect(formHeader).toHaveTextContent("Contact Form");

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    //Arrange
    render(<ContactForm />)
    //Act 
    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstNameInput, "Ry");

    const firstNameError = screen.getByText(/error: firstname must have at least 5 characters./i);
    //Assert
    expect(firstNameError).toBeInTheDocument();
    expect(firstNameError).toHaveTextContent(/error: firstname must have at least 5 characters./i);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    //Arrange
    render(<ContactForm />)
    //Act
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const Error1 = screen.getByText(/error: firstname must have at least 5 characters./i);
    const Error2 = screen.getByText(/Error: lastName is a required field./i);
    const Error3 = screen.getByText(/Error: email must be a valid email address./i);
    //Assert
    expect(Error1).toBeInTheDocument();
    expect(Error2).toBeInTheDocument();
    expect(Error3).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    //Arrange
    render(<ContactForm />)
    //Act
    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstNameInput, "Robert");

    const lastNameInput = screen.getByPlaceholderText(/burke/i);
    userEvent.type(lastNameInput, "Williamson");

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);
     
    const emailError = screen.getByText(/Error: email must be a valid email address./i);
    //Assert
    expect(emailError).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    //Arrange
    render(<ContactForm />)
    //Act
    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(emailInput, "something");

    const emailError = screen.getByText(/Error: email must be a valid email address./i);
    //Assert
    expect(emailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    //Arrange
    render(<ContactForm />)
    //Act
    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstNameInput, "Robert");

    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(emailInput, "something@something.com");

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const lastNameError = screen.getByText(/Error: lastName is a required field./i);
    //Assert
    expect(lastNameError).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    //Arrange
    render(<ContactForm />)
    //Act
    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstNameInput, "Robert");

    const lastNameInput = screen.getByPlaceholderText(/burke/i);
    userEvent.type(lastNameInput, "Williamson");

    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(emailInput, "something@something.com");

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const messageText = screen.getByText(/message:/i);
    //Assert
    expect(messageText).toBeFalsy();
});

test('renders all fields text when all fields are submitted.', async () => {
    //Arrange
    render(<ContactForm />)
    //Act
    // const firstNameInput = screen.getByPlaceholderText(/edd/i);
    // userEvent.type(firstNameInput, "Robert");

    // const lastNameInput = screen.getByPlaceholderText(/burke/i);
    // userEvent.type(lastNameInput, "Williamson");

    // const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    // userEvent.type(emailInput, "something@something.com");

    // const submitButton = screen.getByRole("button");
    // userEvent.click(submitButton);
});