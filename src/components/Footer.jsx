import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            LuxeStay
                        </h3>
                        <p className="text-gray-400 max-w-sm">
                            Discover the world's most luxurious hotels and resorts. Experience comfort like never before.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-full hover:bg-blue-600">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-full hover:bg-sky-500">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-full hover:bg-pink-600">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-full hover:bg-blue-700">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-gray-100">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Our Services</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Destinations</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Book a Stay</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Contact Support</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-gray-100">Services</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Airport Pickup</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Tour Guides</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Luxury Dining</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Spa & Wellness</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Event Hosting</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-gray-100">Get in Touch</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-blue-500 mt-1" />
                                <span className="text-gray-400">123 Luxury Avenue, Golden Coast, CA 90210</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-blue-500" />
                                <span className="text-gray-400">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-blue-500" />
                                <span className="text-gray-400">support@luxestay.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} LuxeStay. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Cookie Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
