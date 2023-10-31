"use client";
import {Button, Input} from "@nextui-org/react";
import {useState} from "react";
import {registerUser} from "@/libs/auth/authService";
import {RegisterUserRequest} from "@/interfaces/auth/registerUserInterface";
import {EyeFilledIcon, EyeSlashFilledIcon} from "@nextui-org/shared-icons";
import {useRouter} from "next/navigation";
import {validateRegisterFormInputErrors} from "@/helpers/validationHelpers";

const initialFormState: RegisterUserRequest = {
    name: "", password: "", email: "", userName: ""
};

export function RegisterForm() {
    const router = useRouter()
    const [isVisible, setIsVisible] = useState(false);
    const [backendError, setBackendError] = useState("");
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [registerFormData, setRegisterFormData] = useState(initialFormState);
    const [inputErrors, setInputErrors] = useState({
        email: "", userName: "", name: "", password: "",
    });

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setRegisterFormData({...registerFormData, [name]: value});
    }

    const handleRegisterSubmit = async (e: any) => {
        e.preventDefault();
        setBackendError("");

        const inputErrors = validateRegisterFormInputErrors(registerFormData);

        if (inputErrors && Object.keys(inputErrors).length > 0) {
            setInputErrors(inputErrors);
            return;
        }

        if (
            registerFormData.email.trim() === "" ||
            registerFormData.userName.trim() === "" ||
            registerFormData.name.trim() === "" ||
            registerFormData.password.trim() === ""
        ) {
            return;
        }

        let response = await registerUser(registerFormData);
        console.log("register response", response)
        if (response.statusCode === 200) {
            setRegisterFormData(initialFormState)
            router.push('/login')
        } else {
            setBackendError(response.message ?? "Unknown error occurred");
        }
    };

    return (
        <div className="grid m-4 place-items-center">

            <h3>Register An Account</h3>

            <form onSubmit={handleRegisterSubmit} className="w-4/12">

                <div className="flex flex-wrap md:flex-nowrap gap-4 m-2">
                    <Input type="email"
                           onChange={handleChange}
                           value={registerFormData.email}
                           label="Email"
                           name="email"
                           variant={"bordered"}
                           placeholder="Enter your email"
                           onInput={() => {
                               setInputErrors({...inputErrors, email: ""});
                           }}
                           isInvalid={inputErrors.email !== ""}
                           errorMessage={inputErrors.email}/>
                </div>

                <div className="flex flex-wrap md:flex-nowrap gap-4 m-2">
                    <Input type="text"
                           onChange={handleChange}
                           value={registerFormData.userName}
                           label="Username"
                           name="userName"
                           variant={"bordered"}
                           placeholder="Enter your username"
                           onInput={() => {
                               setInputErrors({...inputErrors, userName: ""});
                           }}
                           isInvalid={inputErrors.userName !== ""}
                           errorMessage={inputErrors.userName}/>
                </div>

                <div className="flex flex-wrap md:flex-nowrap gap-4 m-2">
                    <Input type="text"
                           onChange={handleChange}
                           value={registerFormData.name}
                           label="Name"
                           name="name"
                           variant={"bordered"}
                           placeholder="Enter your full name"
                           onInput={() => {
                               setInputErrors({...inputErrors, name: ""});
                           }}
                           isInvalid={inputErrors.name !== ""}
                           errorMessage={inputErrors.name}/>
                </div>

                <div className="flex flex-wrap md:flex-nowrap gap-4 m-2">
                    <Input type={isVisible ? "text" : "password"}
                           onChange={handleChange}
                           value={registerFormData.password}
                           label="Password"
                           name="password"
                           variant="bordered"
                           placeholder="Enter your password"
                           onInput={() => {
                               setInputErrors({...inputErrors, password: ""});
                           }}
                           isInvalid={inputErrors.password !== ""}
                           errorMessage={inputErrors.password}
                           endContent={
                               <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                   {isVisible ? (
                                       <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                   ) : (
                                       <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                   )}
                               </button>
                           }
                    />
                </div>
                {backendError && <p className="text-danger">{backendError}</p>}
                <div className="text-center">
                    <Button type={"submit"} color="primary" className="mt-1">
                        Register
                    </Button>
                </div>

            </form>
        </div>
    );
}