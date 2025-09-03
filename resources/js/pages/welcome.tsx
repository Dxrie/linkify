import Navbar from "@/components/ui/navbar";
import Waves from "@/components/waves";
<<<<<<< HEAD
=======
import { Shield, Zap, BarChart3, ArrowRight } from "lucide-react"
import { Link } from "@inertiajs/react";
>>>>>>> 52c326267f3c89fed936da8feeec2851fd254f06
import ShortenerForm from "@/components/shortener_form";
import Footer from "@/components/ui/footer";
import { Link } from "@inertiajs/react";
import { Shield, Zap, BarChart3, ArrowRight } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

// Benefits Section
function Benefits() {
    return (
        <section className="relative z-10 text-white py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Why choose <span className="text-accent">Linkify</span>?
                </h2>

                <div className="text-black grid gap-6 sm:gap-8 md:grid-cols-3">
                    {/* Card 1 */}
                    <div className="bg-card rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
                        <Shield className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
                        <p className="text-muted-foreground">
                            Protect your links with reliable shortening that prevents tampering
                            and misuse.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-card rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
                        <Zap className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Fast & Simple</h3>
                        <p className="text-muted-foreground">
                            Generate short links in seconds with a smooth, minimal workflow.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-card rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
                        <BarChart3 className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Trackable</h3>
                        <p className="text-muted-foreground">
                            Get insights with click analytics and see how your links perform.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Link
                        href={route("register")}
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:bg-primary/80 transition"
                    >
                        <span>Start simplifying your links</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

// FAQ Section
function Faq() {
    return (
        <section className="relative z-10 py-16 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <h2 className="text-3xl font-bold text-center mb-8 text-primary bg-white rounded-2xl p-5 shadow-lg">
                    Frequently Asked Questions
                </h2>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {/* Item 1 */}
                    <AccordionItem
                        value="item-1"
                        className="bg-primary shadow-md overflow-hidden rounded-2xl "
                    >
                        <AccordionTrigger className="text-lg font-medium px-5 py-3">
                            What is Linkify?
                        </AccordionTrigger>
                        <AccordionContent className="text-black bg-white p-5 ">
                            Linkify is a URL shortening service that transforms long,
                            complex URLs into short, memorable links that are easier to
                            share and track.
                        </AccordionContent>
                    </AccordionItem>

                    {/* Item 2 */}
                    <AccordionItem
                        value="item-2"
                        className="bg-primary rounded-2xl shadow-md overflow-hidden"
                    >
                        <AccordionTrigger className="text-lg font-medium px-5 py-3">
                            Is Linkify free to use?
                        </AccordionTrigger>
                        <AccordionContent className="text-black bg-white p-5">
                            Yes, Linkify offers a free tier with basic link shortening
                            features. Premium plans with advanced analytics and custom
                            domains are also available.
                        </AccordionContent>
                    </AccordionItem>

                    {/* Item 3 */}
                    <AccordionItem
                        value="item-3"
                        className="bg-primary rounded-2xl shadow-md overflow-hidden"
                    >
                        <AccordionTrigger className="text-lg font-medium px-5 py-3">
                            How long do shortened links last?
                        </AccordionTrigger>
                        <AccordionContent className="text-black bg-white p-5">
                            Links created with Linkify don't expire and will remain active
                            as long as your account is active. Premium users can set
                            custom expiration dates if needed.
                        </AccordionContent>
                    </AccordionItem>

                    {/* Item 4 */}
                    <AccordionItem
                        value="item-4"
                        className="bg-primary rounded-2xl shadow-md overflow-hidden"
                    >
                        <AccordionTrigger className="text-lg font-medium px-5 py-3">
                            Can I customize my shortened links?
                        </AccordionTrigger>
                        <AccordionContent className="text-black bg-white p-5">
                            Yes, registered users can create custom aliases for their
                            links instead of using randomly generated codes, making them
                            more memorable and brand-friendly.
                        </AccordionContent>
                    </AccordionItem>

                    {/* Item 5 */}
                    <AccordionItem
                        value="item-5"
                        className="bg-primary rounded-2xl shadow-md overflow-hidden"
                    >
                        <AccordionTrigger className="text-lg font-medium px-5 py-3">
                            Do you provide click analytics?
                        </AccordionTrigger>
                        <AccordionContent className="text-black p-5 bg-white">
                            Yes, Linkify provides basic click tracking for all shortened
                            links. Premium users get access to detailed analytics
                            including geographic data, referral sources, and device
                            information.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    );
}

// Main Welcome Page
export default function Welcome() {
    return (
        <div className="min-h-dvh bg-gradient-to-br from-primary from-10% via-secondary via-30% to-blue-400 to-90% text-white animate-gradient-x relative z-10">
            <Navbar />

            {/* Hero */}
            <div className="text-center pt-32 sm:pt-40 text-shadow-md px-4">
                <h1 className="text-3xl sm:text-4xl font-bold max-w-2xl mx-auto">
                    Make every link simple
                </h1>
                <h2 className="text-lg sm:text-2xl max-w-2xl mx-auto mt-4 leading-snug">
                    Easily turn long URLs into short, memorable links. Clean, simple, and
                    perfect for sharing anywhere.
                </h2>
            </div>

            {/* Form */}
            <ShortenerForm />

            {/* Benefits Section */}
            <Benefits />

            {/* FAQ Section */}
            <Faq />

            {/* Footer & Waves */}
            <Footer />
            <Waves />
        </div>
    );
}
<<<<<<< HEAD
=======


>>>>>>> 52c326267f3c89fed936da8feeec2851fd254f06
