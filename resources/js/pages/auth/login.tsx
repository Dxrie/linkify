import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, Link } from "@inertiajs/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff } from "lucide-react";
import { FormEvent, useCallback, useState } from "react";

export default function Login() {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        name: "",
        password: "",
    });

    const togglePasswordVisible = useCallback(() => {
        setIsPasswordVisible((prev) => !prev);
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-dvh flex">
            {/* Left Panel */}
            <div className="w-full justify-center md:w-1/2 flex flex-col gap-11 items-center p-6">
                <div className="flex flex-col gap-3 items-center justify-center">
                    <div className="flex items-center gap-2">
                        <img draggable={false} width={50} src="./logo.png" />
                        <h1 className="text-3xl font-extrabold">Linkify</h1>
                    </div>
                    <h1 className="text-3xl">Welcome to Linkify</h1>
                </div>

                <form onSubmit={handleSubmit} className="w-[85%] lg:w-3/4 flex flex-col items-center gap-7">
                    {/* Email */}
                    <div className="flex flex-col gap-1 w-full">
                        <Label className="text-md" htmlFor="email">
                            Email
                        </Label>
                        <Input type="email" name="email" id="email" placeholder="johndoe@gmail.com"
                            value={data.email} onChange={(e) => setData("email", e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="relative flex flex-col gap-1 w-full">
                        <Label className="text-md" htmlFor="password">
                            Password
                        </Label>
                        <div className="relative w-full">
                            <Input type={isPasswordVisible ? "text" : "password"} name="password" id="password"
                                placeholder={isPasswordVisible ? "" : "●●●●●●●●●●"} className="pr-10" value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                            />
                            {isPasswordVisible ? (
                                <EyeOff onClick={togglePasswordVisible}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                                    size={18} />
                            ) : (
                                <Eye onClick={togglePasswordVisible}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                                    size={18} />
                            )}
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <Button className="w-full mt-5 text-md py-5 font-semibold" variant={"secondary"} type="submit"
                        disabled={processing}>
                        {processing ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <p>Don't have an account? {" "}
                    <Link className="text-[#4F4FF9] underline" href={route('register')}>Sign up</Link>
                </p>
            </div>

            {/* Right Panel */}
            <div
                className="hidden md:flex w-1/2 pt-16 relative flex-col justify-start items-center bg-primary text-primary-foreground p-8 bg-[url('./waves.png')] bg-no-repeat bg-bottom bg-contain">
                {/* Logo top left */}
                <div className="absolute top-6 left-6 flex items-center gap-2">
                    <img draggable={false} width={35} src="./logo.png" />
                    <h1 className="text-2xl font-extrabold">Linkify</h1>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center text-center max-w-md gap-6">
                    {/* Hero Lottie animation */}
                    <DotLottieReact src="./welcome.lottie" loop autoplay className="w-[500px]" />

                    {/* Headline */}
                    <h1 className="text-2xl lg:text-3xl font-extrabold">
                        Introducing smarter link sharing
                    </h1>

                    {/* Supporting text */}
                    <p className="text-lg leading-relaxed opacity-90 max-w-[90%]">
                        Tracking and analyzing your shortened links helps you understand
                        engagement better. And as your reach grows, every click becomes more
                        valuable for your business.
                    </p>
                </div>
            </div>
        </div>
    );
}
