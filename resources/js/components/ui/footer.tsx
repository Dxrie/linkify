import { Link } from "@inertiajs/react";
import { Github, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-background border-t border-border py-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Linkify</h3>
                        <p className="text-muted-foreground text-sm">
                            Simplify your links, amplify your reach. Create short, memorable URLs that drive more clicks.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github size={20} />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Features</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    Link Analytics
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    Custom URLs
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    QR Codes
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    API Access
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Contact</h3>
                        <div className="flex items-center space-x-2">
                            <Mail size={16} className="text-muted-foreground" />
                            <span className="text-muted-foreground text-sm">support@linkify.com</span>
                        </div>
                        <div className="pt-4">
                            <h4 className="text-sm font-medium mb-2">Subscribe to our newsletter</h4>
                            <form className="flex">
                                <input 
                                    type="email" 
                                    placeholder="Your email" 
                                    className="bg-background border border-border rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
                                />
                                <button 
                                    type="submit" 
                                    className="bg-primary text-primary-foreground rounded-r-md px-3 py-2 text-sm hover:bg-primary/90 transition-colors"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-muted-foreground text-sm">
                        © {new Date().getFullYear()} Linkify. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                            Terms of Service
                        </Link>
                        <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                            Privacy Policy
                        </Link>
                        <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}