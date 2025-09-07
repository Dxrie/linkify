import { FormEvent } from "react";
import { useForm, Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { props } = usePage();
    const { errors } = props;

    const { data, setData, post, processing } = useForm({
        token,
        email: email || "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("password.store"));
    };

    return (
        <div className="min-h-dvh flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Reset Password</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Enter your new password below.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="email" className="text-sm">
                            Email Address
                        </Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="password" className="text-sm">
                            New Password
                        </Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            required
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="password_confirmation" className="text-sm">
                            Confirm Password
                        </Label>
                        <Input
                            type="password"
                            name="password_confirmation"
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />
                        {errors.password_confirmation && (
                            <p className="text-sm text-red-500">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="w-full py-5 font-semibold"
                        disabled={processing}
                    >
                        {processing ? "Resetting..." : "Reset Password"}
                    </Button>
                </form>

                {/* Back to login */}
                <p className="text-center text-sm text-gray-600">
                    Changed your mind?{" "}
                    <Link
                        href={route("login")}
                        className="text-[#4F4FF9] underline"
                    >
                        Back to login
                    </Link>
                </p>
            </div>
        </div>
    );
}
