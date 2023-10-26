import {RegisterUserRequest} from "@/interfaces/auth/registerUserInterface";
import {LoginUserRequest} from "@/interfaces/auth/loginUserInterface";

export function isEmailValid (email: string): boolean{
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailPattern.test(email);
}

export function validateRegisterFormInputErrors(formData: RegisterUserRequest) {
    const errors:RegisterUserRequest = {
        email: "",
        userName: "",
        name: "",
        password: "",
    }

    if (formData.email.trim() === "") {
        errors.email = "Email cannot be empty";
    } else if (!isEmailValid(formData.email.trim())) {
        errors.email = "Invalid email address";
    }

    if (formData.userName.trim() === "") {
        errors.userName = "Username cannot be empty";
    } else if (formData.userName.trim().length < 4) {
        errors.userName = "Username must be at least 4 characters long";
    }

    if (formData.name.trim() === "") {
        errors.name = "Name cannot be empty";
    } else if (formData.name.trim().length < 4) {
        errors.name = "Name must be at least 4 characters long";
    }

    if (formData.password.trim() === "") {
        errors.password = "Password cannot be empty";
    } else if (formData.password.trim().length < 6) {
        errors.password = "Password must be at least 6 characters long";
    }

    // Check if there are any errors and return null if all input is valid
    for (const key in errors) {
        if (errors[key as keyof RegisterUserRequest] !== "") {
            return errors;
        }
    }

    return null;
}

export function validateLoginFormInputErrors(formData: LoginUserRequest) {
    const errors:LoginUserRequest = {
        email: "",
        password: "",
    }

    if (formData.email.trim() === "") {
        errors.email = "Email cannot be empty";
    } else if (!isEmailValid(formData.email.trim())) {
        errors.email = "Invalid email address";
    }

    if (formData.password.trim() === "") {
        errors.password = "Password cannot be empty";
    } else if (formData.password.trim().length < 6) {
        errors.password = "Password must be at least 6 characters long";
    }

    // Check if there are any errors and return null if all input is valid
    for (const key in errors) {
        if (errors[key as keyof LoginUserRequest] !== "") {
            return errors;
        }
    }

    return null;
}