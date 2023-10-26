"use client";
import {Button, Input} from "@nextui-org/react";
import {useState} from "react";
import {loginUser} from "@/libs/auth/authService";
import {LoginRequest} from "@/interfaces/auth/loginInterface";

const initialFormState: LoginRequest = {
    email: "", username: ""
};

export function LoginForm() {
    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleLoginSubmit = async (e: any) => {
        e.preventDefault();
        let response = await loginUser(formData);
        console.log(response)
        if (response.message === "success") {
            setFormData(initialFormState)
        }
    };

    return (
        <div className="grid m-4 place-items-center text-center">

            <h3>Login To Account</h3>

            <form onSubmit={handleLoginSubmit} className="w-4/12">
                <div className="flex flex-wrap md:flex-nowrap gap-4 m-2">
                    <Input type="email"
                           onChange={handleChange}
                           value={formData.email}
                           label="Email"
                           name="email"
                           variant={"bordered"}
                           placeholder="Enter your email"/>
                </div>

                <div className="flex flex-wrap md:flex-nowrap gap-4 m-2">
                    <Input type="text"
                           onChange={handleChange}
                           value={formData.username}
                           label="Username"
                           name="username"
                           variant={"bordered"}
                           placeholder="Enter your username"/>
                </div>

                <Button type={"submit"} color="primary" className="mt-1">
                    Login
                </Button>
            </form>
        </div>
    );
}