import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail } from "lucide-react";

export default function VerifyNotice() {
    const [status, setStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const resendVerification = async () => {
        setLoading(true);
        try {
            const response = await fetch("/email/resend", {
                method: "POST",
                headers: { "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content }
            });

            if (response.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-card border text-card-foreground shadow-lg rounded-2xl p-10 w-full max-w-md text-center space-y-6">
                <div className="flex justify-center">
                    <Mail className="w-14 h-14 text-primary" />
                </div>
                <h1 className="text-3xl font-extrabold">Verify Your Email</h1>
                <p className="text-muted-foreground">
                    We’ve sent a verification link to your email address.
                    Please verify your account before logging in.
                </p>

                {status === "success" && (
                    <p className="text-green-600 flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" /> Verification email sent!
                    </p>
                )}

                {status === "error" && (
                    <p className="text-red-600">Something went wrong. Please try again.</p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                        onClick={resendVerification}
                        disabled={loading}
                        className="w-full sm:w-auto"
                    >
                        {loading ? "Resending..." : "Resend Email"}
                    </Button>
                    <Button
                        variant="outline"
                        asChild
                        className="w-full sm:w-auto"
                    >
                        <a href="/login">Go to Login</a>
                    </Button>
                </div>
            </div>
        </div>
    );
}

