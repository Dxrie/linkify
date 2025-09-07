import { FormEvent } from "react"
import { useForm, Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function ForgotPassword() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const { flash } = usePage().props as {
        flash: { status?: string };
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <div className="min-h-dvh flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Forgot Password</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Enter your email and we’ll send you a link to reset your
                        password.
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
                            placeholder="you@example.com"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="w-full py-5 font-semibold"
                        disabled={processing}
                    >
                        {processing ? "Sending..." : "Send Reset Link"}
                    </Button>
                </form>

                {/* Success message */}
                {flash.status && (
                    <p className="text-green-600 text-sm text-center">
                        {flash.status}
                    </p>
                )}

                {/* Back to login */}
                <p className="text-center text-sm text-gray-600">
                    Remembered your password?{" "}
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

