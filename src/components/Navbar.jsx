import { useState, useEffect as import_react_useEffect } from 'react';
import { Menu, X, User, ShoppingBag, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import SignInModal from './SignInModal';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);

    import_react_useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 py-1' : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800 py-3'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-14' : 'h-20'}`}>
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
                                LuxeStay
                            </Link>
                        </div>

                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">Home</Link>
                                <Link to="/hotels" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">Hotels</Link>
                                <Link to="/deals" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">Deals</Link>
                                <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">About Us</Link>
                                <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Manager
                                </Link>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-4">
                            <button
                                onClick={toggleTheme}
                                className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none w-10 h-10 flex items-center justify-center overflow-hidden"
                                aria-label="Toggle Dark Mode"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={theme}
                                        initial={{ y: -30, opacity: 0, rotate: -90 }}
                                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                                        exit={{ y: 30, opacity: 0, rotate: 90 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                    </motion.div>
                                </AnimatePresence>
                            </button>
                            <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative group">
                                <div className="relative flex items-center justify-center">
                                    <ShoppingBag className="h-5 w-5 group-hover:animate-bounce" />
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center border border-white dark:border-gray-900">0</span>
                                </div>
                            </button>
                            <button
                                onClick={() => setIsSignInOpen(true)}
                                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <User className="h-4 w-4" />
                                <span className="text-sm font-medium">Sign In</span>
                            </button>
                        </div>

                        <div className="md:hidden flex items-center space-x-4">
                            <button
                                onClick={toggleTheme}
                                className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none w-10 h-10 flex items-center justify-center overflow-hidden"
                                aria-label="Toggle Dark Mode"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={theme}
                                        initial={{ y: -30, opacity: 0, rotate: -90 }}
                                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                                        exit={{ y: 30, opacity: 0, rotate: 90 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                    </motion.div>
                                </AnimatePresence>
                            </button>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 focus:outline-none transition-colors"
                            >
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg absolute w-full shadow-lg border-t border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out">
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 px-3 py-3 rounded-md text-base font-medium transition-colors">Home</Link>
                            <Link to="/hotels" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 px-3 py-3 rounded-md text-base font-medium transition-colors">Hotels</Link>
                            <Link to="/deals" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 px-3 py-3 rounded-md text-base font-medium transition-colors">Deals</Link>
                            <Link to="/about" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 px-3 py-3 rounded-md text-base font-medium transition-colors">About Us</Link>
                            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-800 px-3 py-3 rounded-md text-base font-medium transition-colors">Manager Dashboard</Link>
                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-4 flex flex-col space-y-3">
                                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <ShoppingBag className="h-4 w-4" />
                                    <span>Active Bookings</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        setIsSignInOpen(true);
                                    }}
                                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-blue-500/40 transition-all"
                                >
                                    <User className="h-4 w-4" />
                                    <span>Sign In</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
            <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
        </>
    );
};

export default Navbar;
