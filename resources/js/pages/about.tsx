import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, BarChart3, Mail, Users, Globe } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-dvh bg-gradient-to-br from-primary from-10% via-secondary via-30% to-blue-400 to-90% text-white animate-gradient-x relative z-10">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About Linkify</h1>
                    <p className="text-xl text-white max-w-3xl mx-auto">
                        Simplifying link management with powerful, user-friendly tools for everyone.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-4 bg-background text-foreground">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                At Linkify, we believe in making the web more accessible and manageable. Our mission is to provide a reliable, secure, and intuitive platform for shortening, sharing, and tracking links.
                            </p>
                            <p className="text-lg text-muted-foreground">
                                Whether you're a social media manager, a digital marketer, or just someone who wants to share cleaner links, we've built Linkify with you in mind.
                            </p>
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-xl border-2">
                            <img
                                src="/waves.png"
                                alt="Linkify Mission"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">What Makes Us Different</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card>
                            <CardHeader>
                                <Shield className="w-12 h-12 text-primary mb-4" />
                                <CardTitle>Security First</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    We prioritize the security of your links and data, implementing robust measures to prevent misuse and protect your information.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <Zap className="w-12 h-12 text-primary mb-4" />
                                <CardTitle>Lightning Fast</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Our infrastructure is optimized for speed, ensuring your shortened links load quickly and redirect instantly.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <BarChart3 className="w-12 h-12 text-primary mb-4" />
                                <CardTitle>Detailed Analytics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Gain valuable insights with our comprehensive analytics, tracking clicks, geographic data, and referral sources.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <Globe className="w-12 h-12 text-primary mb-4" />
                                <CardTitle>Global Reach</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Our distributed infrastructure ensures your links work reliably around the world with minimal latency.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <Users className="w-12 h-12 text-primary mb-4" />
                                <CardTitle>Team Collaboration</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Work together seamlessly with team features that allow for shared link management and analytics.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <Mail className="w-12 h-12 text-primary mb-4" />
                                <CardTitle>Dedicated Support</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Our support team is always ready to help with any questions or issues you might encounter.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-card rounded-xl p-6 shadow-lg">
                            <div className="w-32 h-32 rounded-full bg-primary/20 mx-auto mb-6 flex items-center justify-center">
                                <Users className="w-16 h-16 text-primary" />
                            </div>
                            <h3 className="text-xl text-primary font-semibold mb-2">Dxrie</h3>
                            <p className="text-primary mb-4">Fullstack Developer</p>
                            <p className="text-muted-foreground">
                                Dxrie is a fullstack developer with a passion for creating web applications.
                            </p>
                        </div>

                        <div className="bg-card rounded-xl p-6 shadow-lg">
                            <div className="w-32 h-32 rounded-full bg-primary/20 mx-auto mb-6 flex items-center justify-center">
                                <Users className="w-16 h-16 text-primary" />
                            </div>
                            <h3 className="text-xl text-primary font-semibold mb-2">Carlo</h3>
                            <p className="text-primary mb-4">Frontend Developer</p>
                            <p className="text-muted-foreground">
                                Carlo is a frontend developer with a passion for creating user-friendly interfaces.
                            </p>
                        </div>

                        <div className="bg-card rounded-xl p-6 shadow-lg">
                            <div className="w-32 h-32 rounded-full bg-primary/20 mx-auto mb-6 flex items-center justify-center">
                                <Users className="w-16 h-16 text-primary" />
                            </div>
                            <h3 className="text-xl text-primary font-semibold mb-2">Nevan</h3>
                            <p className="text-primary mb-4">UI/UX Designer</p>
                            <p className="text-muted-foreground">
                                Nevan is a UI/UX designer with a passion for creating intuitive and visually appealing interfaces.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}