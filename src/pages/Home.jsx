import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Correct import path
import Footer from '../components/Footer'; // Correct import path
import HotelCard from '../components/HotelCard'; // Correct import path
import Hero from '../components/Hero';
import { hotels as featuredHotels } from '../data/hotels';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <Hero />

            {/* Popular Destinations Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-end mb-12"
                >
                    <div>
                        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">Featured Places to Stay</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">Popular hotels that travelers love</p>
                    </div>
                    <Link to="/hotels" className="hidden sm:flex items-center text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 dark:hover:text-blue-300 transition-colors group">
                        See All Hotels <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredHotels.map((hotel, index) => (
                        <motion.div
                            key={hotel.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <HotelCard hotel={hotel} />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center sm:hidden">
                    <Link to="/hotels" className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 w-full shadow-lg shadow-blue-500/30 transition-all">
                        See All Hotels
                    </Link>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-white dark:bg-black py-24 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-100 dark:bg-grid-slate-900 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,black,rgba(0,0,0,0.6))] -z-0 opacity-50"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">Why Book With LuxeStay?</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-xl font-light">We provide the best experience for our customers with transparent pricing and premium support.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Best Price Guarantee', desc: 'Find a lower price? We match it.', icon: '💰' },
                            { title: '24/7 Customer Support', desc: 'Here for you anytime, day or night.', icon: '🎧' },
                            { title: 'Handpicked Hotels', desc: 'Only the highest quality accommodations.', icon: '🏨' },
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="text-center p-10 rounded-3xl bg-gray-50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800 hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-800 group"
                            >
                                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-md">{feature.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="max-w-7xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] shadow-2xl overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-12 md:p-20">
                        <div className="text-white mb-8 md:mb-0 max-w-2xl text-center md:text-left">
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">Ready for your next adventure?</h2>
                            <p className="text-blue-100 text-xl font-light">Join thousands of travelers who have found their perfect stay with us today.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <Link to="/hotels" className="px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-2xl hover:bg-blue-50 transition-colors shadow-xl text-center">
                                Get Started
                            </Link>
                            <Link to="/about" className="px-10 py-5 bg-blue-700/50 border border-blue-400/30 text-white font-bold text-lg rounded-2xl hover:bg-blue-700 transition-colors backdrop-blur-sm text-center">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
