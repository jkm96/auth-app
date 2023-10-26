"use client";
import {Button, Input} from "@nextui-org/react";
import {useState} from "react";
import {loginUser} from "@/libs/auth/authService";
import {LoginUserRequest} from "@/interfaces/auth/loginUserInterface";
import {EyeFilledIcon, EyeSlashFilledIcon} from "@nextui-org/shared-icons";
import {StoreTokenRequest, TokenResponse} from "@/interfaces/token/tokenInterface";
import {storeAccessToken} from "@/libs/token/tokenService";
import {validateLoginFormInputErrors} from "@/helpers/validationHelpers";

const initialFormState: LoginUserRequest = {
    email: "", password: ""
};

export function LoginForm() {
    const [isVisible, setIsVisible] = useState(false);
    const [backendError, setBackendError] = useState("");
    const [inputErrors, setInputErrors] = useState({
        email: "", password: "",
    });
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [loginFormData, setLoginFormData] = useState(initialFormState);

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setLoginFormData({...loginFormData, [name]: value});
    }

    const handleLoginSubmit = async (e: any) => {
        e.preventDefault();
        setBackendError("");

        const inputErrors = validateLoginFormInputErrors(loginFormData);

        if (inputErrors && Object.keys(inputErrors).length > 0) {
            setInputErrors(inputErrors);
            return;
        }

        if (
            loginFormData.email.trim() === "" ||
            loginFormData.password.trim() === ""
        ) {
            return;
        }

        let response = await loginUser(loginFormData);

        if (response.statusCode === 200) {
            setLoginFormData(initialFormState)
            let resData: TokenResponse = response.data;
            const cookieRequest: StoreTokenRequest = {
                storeToken: false,
                accessToken: resData.token,
                expiresAt: resData.expiresAt,
                refreshToken: resData.refreshToken
            };

            await storeAccessToken(cookieRequest);
        } else {
            setBackendError(response.message ?? "Unknown error occurred");
        }
    };

    return (
        <div className="grid m-4 place-items-center">

            <h3>Login To Account</h3>

            <form onSubmit={handleLoginSubmit} className="w-4/12">
                <div className="flex flex-wrap md:flex-nowrap gap-4 m-2">
                    <Input type="text"
                           onChange={handleChange}
                           value={loginFormData.email}
                           label="email"
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
                    <Input type={isVisible ? "text" : "password"}
                           onChange={handleChange}
                           value={loginFormData.password}
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
                <div className="m-2">
                    {backendError && <p className="text-danger">{backendError}</p>}
                </div>
                <div className="text-center">
                    <Button type={"submit"} color="primary">
                        Login
                    </Button>
                </div>

            </form>
        </div>
    );
}