import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { login } from "../../services/auth.service";
import { loginSuccess } from "../../redux/auth/authSlice";

const Login = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {

        try {

            const response = await login(data);

            // console.log(response.data.data.userData)
            dispatch(loginSuccess(response.data.data));

            toast.success("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Login Failed"
            );

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <Card className="w-[420px]">

                <CardHeader>

                    <CardTitle className="text-center text-3xl">

                        HRMS Login

                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >

                        <div>

                            <Label>Email</Label>

                            <Input
                                type="email"
                                placeholder="Enter Email"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                            />

                            <p className="text-red-500 text-sm">

                                {errors.email?.message}

                            </p>

                        </div>

                        <div>

                            <Label>Password</Label>

                            <Input
                                type="password"
                                placeholder="Enter Password"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                            />

                            <p className="text-red-500 text-sm">

                                {errors.password?.message}

                            </p>

                        </div>

                        <Button
                            className="w-full"
                            disabled={isSubmitting}
                        >

                            {
                                isSubmitting
                                    ? "Logging In..."
                                    : "Login"
                                }

                        </Button>

                    </form>

                </CardContent>

            </Card>

        </div>

    );
};

export default Login;