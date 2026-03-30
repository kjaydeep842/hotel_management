import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { Tag, Clock, Zap, Gift, ArrowRight, Star, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const CountdownTimer = ({ expiresDate }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            const difference = +new Date(expiresDate) - +new Date();
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [expiresDate]);

    return (
        <div className="flex gap-2 text-xs font-bold text-red-600 dark:text-red-400 mt-3 mb-4">
            <div className="flex flex-col items-center bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg border border-red-100 dark:border-red-900/30">
                <span className="text-lg">{timeLeft.days}</span><span className="text-[9px] uppercase tracking-wider">Days</span>
            </div>
            <div className="flex flex-col items-center bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg border border-red-100 dark:border-red-900/30">
                <span className="text-lg">{timeLeft.hours}</span><span className="text-[9px] uppercase tracking-wider">Hrs</span>
            </div>
            <div className="flex flex-col items-center bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg border border-red-100 dark:border-red-900/30">
                <span className="text-lg">{timeLeft.minutes}</span><span className="text-[9px] uppercase tracking-wider">Min</span>
            </div>
            <div className="flex flex-col items-center bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg border border-red-100 dark:border-red-900/30">
                <span className="text-lg">{timeLeft.seconds}</span><span className="text-[9px] uppercase tracking-wider">Sec</span>
            </div>
        </div>
    );
};

const deals = [
    {
        id: 1,
        tag: 'Summer Special',
        discount: '20% OFF',
        title: 'Maldives Overwater Villa',
        description: 'Escape to paradise with our exclusive summer package. Includes breakfast and airport transfer.',
        location: 'Maldives',
        originalPrice: 450,
        salePrice: 360,
        rating: 4.9,
        expires: 'July 31, 2026',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
        hotelId: 1,
        badge: 'bg-orange-500',
        hot: true,
    },
    {
        id: 2,
        tag: 'Weekend Flash',
        discount: '15% OFF',
        title: 'Santorini Sunset Suites',
        description: 'Book any weekend stay and get wine tasting & sunset cruise included. Limited availability.',
        location: 'Santorini, Greece',
        originalPrice: 600,
        salePrice: 510,
        rating: 4.9,
        expires: 'Mar 31, 2026',
        image: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&q=80&w=800',
        hotelId: 6,
        badge: 'bg-purple-500',
        hot: true,
    },
    {
        id: 3,
        tag: 'Early Bird',
        discount: '25% OFF',
        title: 'Tropical Paradise Bali',
        description: 'Book 60 days in advance and save big. Includes yoga classes and organic breakfast.',
        location: 'Bali, Indonesia',
        originalPrice: 180,
        salePrice: 135,
        rating: 4.6,
        expires: 'Jun 15, 2026',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800',
        hotelId: 4,
        badge: 'bg-green-500',
        hot: false,
    },
    {
        id: 4,
        tag: 'Heritage Package',
        discount: '10% OFF',
        title: 'Royal Palace of Rajasthan',
        description: 'Live like royalty with our curated heritage experience — cultural shows & royal dining included.',
        location: 'Jaipur, India',
        originalPrice: 250,
        salePrice: 225,
        rating: 4.9,
        expires: 'Apr 30, 2026',
        image: 'https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&q=80&w=800',
        hotelId: 5,
        badge: 'bg-yellow-500',
        hot: false,
    },
];

const perks = [
    { icon: <Tag className="h-7 w-7" />, title: 'Best Price Guarantee', desc: 'We match any lower price you find, guaranteed.' },
    { icon: <Zap className="h-7 w-7" />, title: 'Instant Confirmation', desc: 'Get your booking confirmed instantly with no waiting.' },
    { icon: <Gift className="h-7 w-7" />, title: 'Exclusive Member Perks', desc: 'Sign in to unlock member-only deals and rewards.' },
    { icon: <Clock className="h-7 w-7" />, title: 'Flash Deals Every Week', desc: 'New limited-time offers every Friday at 12 PM.' },
];

const Deals = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <Navbar />

            {/* Hero */}
            <div className="relative pt-20 bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-4 py-2 rounded-full mb-6 border border-white/30"
                    >
                        <Zap className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                        Limited Time Offers — Updated Weekly
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight"
                    >
                        Exclusive Deals & Offers
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-indigo-100 text-lg md:text-xl font-light max-w-2xl mx-auto"
                    >
                        Hand-picked discounts on our finest hotels. Book today before they're gone.
                    </motion.p>
                </div>
            </div>

            {/* Perks Strip */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {perks.map((perk, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-3"
                        >
                            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex-shrink-0">
                                {perk.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{perk.title}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{perk.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Deals Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10"
                >
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Today's Best Deals</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">All prices shown are per night. Taxes not included.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {deals.map((deal, index) => (
                        <motion.div
                            key={deal.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Image */}
                            <div className="relative aspect-[16/9] overflow-hidden">
                                <img
                                    src={deal.image}
                                    alt={deal.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className={`${deal.badge} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                                        {deal.tag}
                                    </span>
                                    {deal.hot && (
                                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                            🔥 Hot Deal
                                        </span>
                                    )}
                                </div>

                                {/* Discount Badge */}
                                <div className="absolute top-4 right-4 bg-white text-gray-900 font-extrabold text-sm px-3 py-1 rounded-full shadow-lg">
                                    {deal.discount}
                                </div>

                                {/* Expires */}
                                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-xs bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <Clock className="h-3 w-3" />
                                    Expires {deal.expires}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{deal.title}</h3>
                                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                                            <MapPin className="h-4 w-4 mr-1 text-red-400" />
                                            {deal.location}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2.5 py-1 rounded-full">
                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                        <span className="text-sm font-bold text-yellow-700 dark:text-yellow-400">{deal.rating}</span>
                                    </div>
                                </div>

                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed">
                                    {deal.description}
                                </p>

                                <CountdownTimer expiresDate={deal.expires} />

                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">${deal.salePrice}</span>
                                            <span className="text-gray-400 line-through text-sm">${deal.originalPrice}</span>
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">per night</span>
                                    </div>
                                    <Link
                                        to={`/hotel/${deal.hotelId}`}
                                        className="w-full sm:w-auto flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 group"
                                    >
                                        Book Now
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Never Miss a Deal</h2>
                        <p className="text-indigo-200 text-lg mb-8 font-light">Sign in to get personalized deal alerts and member-only discounts straight to you.</p>
                        <button className="bg-white text-indigo-700 font-bold px-8 py-4 rounded-2xl hover:bg-indigo-50 transition-colors shadow-xl text-lg">
                            Sign In for Member Deals
                        </button>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default Deals;
