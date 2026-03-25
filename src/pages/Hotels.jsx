import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, SlidersHorizontal, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HotelCard from '../components/HotelCard';
import { hotels } from '../data/hotels';

const PRICE_RANGES = [
    { label: 'Any Price', min: 0, max: Infinity },
    { label: 'Under $250', min: 0, max: 250 },
    { label: '$250 – $450', min: 250, max: 450 },
    { label: '$450+', min: 450, max: Infinity },
];

const SORT_OPTIONS = [
    { label: 'Recommended', value: 'recommended' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Top Rated', value: 'rating' },
];

const Hotels = () => {
    const [search, setSearch] = useState('');
    const [priceRange, setPriceRange] = useState(0);
    const [sortBy, setSortBy] = useState('recommended');

    const filtered = useMemo(() => {
        let result = hotels.filter(h => {
            const matchesSearch =
                h.name.toLowerCase().includes(search.toLowerCase()) ||
                h.location.toLowerCase().includes(search.toLowerCase());
            const range = PRICE_RANGES[priceRange];
            const matchesPrice = h.price >= range.min && h.price < range.max;
            return matchesSearch && matchesPrice;
        });

        if (sortBy === 'price_asc') result = [...result].sort((a, b) => a.price - b.price);
        else if (sortBy === 'price_desc') result = [...result].sort((a, b) => b.price - a.price);
        else if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);

        return result;
    }, [search, priceRange, sortBy]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <Navbar />

            {/* Hero Banner */}
            <div className="relative pt-20 bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight"
                    >
                        Find Your Perfect Stay
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-blue-100 text-lg md:text-xl font-light mb-8"
                    >
                        {hotels.length} handpicked luxury hotels across the globe
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by hotel name or destination..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-14 pr-12 py-4 rounded-2xl text-gray-900 bg-white shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-base"
                            />
                            {search && (
                                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <X className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Filters & Sort Bar */}
            <div className="sticky top-20 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
                    {/* Price Filters */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        <SlidersHorizontal className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        {PRICE_RANGES.map((range, idx) => (
                            <button
                                key={idx}
                                onClick={() => setPriceRange(idx)}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${priceRange === idx
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        className="py-1.5 px-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                    >
                        {SORT_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Hotel Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-8">
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                        Showing <span className="font-bold text-gray-900 dark:text-white">{filtered.length}</span> {filtered.length === 1 ? 'hotel' : 'hotels'}
                        {search && <> for <span className="font-bold text-blue-600">"{search}"</span></>}
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {filtered.length > 0 ? (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filtered.map((hotel, index) => (
                                <motion.div
                                    key={hotel.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.07 }}
                                >
                                    <HotelCard hotel={hotel} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-24"
                        >
                            <div className="text-6xl mb-4">🏨</div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No hotels found</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your search or filters</p>
                            <button
                                onClick={() => { setSearch(''); setPriceRange(0); }}
                                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Clear filters
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Footer />
        </div>
    );
};

export default Hotels;
