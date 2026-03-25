import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, CheckCircle, ChevronRight, CreditCard, Bed } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, selectedRoom, price, searchParams, onBookingComplete }) => {
    const [step, setStep] = useState(1); // 1 = Summary, 2 = Confirmed
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    if (!isOpen) return null;

    // Use searchParams from BookingBar, fallback to defaults
    const checkIn = searchParams?.startDate ? new Date(searchParams.startDate) : new Date();
    const checkOut = searchParams?.endDate ? new Date(searchParams.endDate) : new Date(Date.now() + 86400000);
    const rooms = searchParams?.rooms || 1;
    const adults = searchParams?.adults || 2;
    const children = searchParams?.children || 0;

    // Calculate nights
    const nights = Math.max(1, Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24)));

    const roomPrice = price || 0;
    const baseTotal = roomPrice * rooms * nights;
    const taxes = 399 * rooms * nights;
    const grandTotal = baseTotal + taxes;

    const formatDate = (date) => date.toLocaleDateString('en-IN', {
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
    });

    const handleConfirm = (e) => {
        e.preventDefault();
        setStep(2);
        if (onBookingComplete) {
            onBookingComplete({
                guestName: name,
                checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
        }
    };

    const handleClose = () => {
        setStep(1);
        setName('');
        setEmail('');
        setPhone('');
        onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
                className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-gray-800 rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-lg relative flex flex-col max-h-[92vh]"
                >
                    {/* Header — always visible */}
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white relative flex-shrink-0">
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full hover:bg-white/20 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        {step === 1 ? (
                            <>
                                <p className="text-blue-100 text-sm font-semibold uppercase tracking-wider mb-1">Booking Step 1 of 2</p>
                                <h2 className="text-2xl font-extrabold">Review Your Stay</h2>
                            </>
                        ) : (
                            <>
                                <p className="text-blue-100 text-sm font-semibold uppercase tracking-wider mb-1">Booking Confirmed!</p>
                                <h2 className="text-2xl font-extrabold">You're all set! 🎉</h2>
                            </>
                        )}
                    </div>

                    {/* Scrollable body */}
                    <div className="p-6 md:p-8 overflow-y-auto flex-1">
                        {step === 1 ? (
                            <>
                                {/* Room Summary */}
                                {selectedRoom && (
                                    <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-600">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                            <img src={selectedRoom.image} alt={selectedRoom.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full uppercase">
                                                    {selectedRoom.type}
                                                </span>
                                            </div>
                                            <h3 className="font-extrabold text-gray-900 dark:text-white text-base leading-tight truncate">{selectedRoom.name}</h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">₹{roomPrice.toLocaleString()}/night</p>
                                        </div>
                                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-xl flex-shrink-0">
                                            <CheckCircle className="h-4 w-4" />
                                            <span className="text-xs font-bold">Free Cancel</span>
                                        </div>
                                    </div>
                                )}

                                {/* Booking Details Summary (from BookingBar) */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <Calendar className="h-4 w-4 text-blue-500" />
                                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Check-in</span>
                                        </div>
                                        <p className="font-extrabold text-gray-900 dark:text-white text-sm leading-tight">{formatDate(checkIn)}</p>
                                    </div>
                                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-100 dark:border-orange-800/30">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <Calendar className="h-4 w-4 text-orange-500" />
                                            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Check-out</span>
                                        </div>
                                        <p className="font-extrabold text-gray-900 dark:text-white text-sm leading-tight">{formatDate(checkOut)}</p>
                                    </div>
                                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-100 dark:border-purple-800/30">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <Users className="h-4 w-4 text-purple-500" />
                                            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Guests</span>
                                        </div>
                                        <p className="font-extrabold text-gray-900 dark:text-white text-sm">
                                            {adults} Adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-800/30">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <Bed className="h-4 w-4 text-green-500" />
                                            <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">Stay Duration</span>
                                        </div>
                                        <p className="font-extrabold text-gray-900 dark:text-white text-sm">
                                            {rooms} Room{rooms > 1 ? 's' : ''} · {nights} Night{nights > 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>

                                {/* Guest Details Form */}
                                <form onSubmit={handleConfirm} className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            placeholder="e.g. Rahul Sharma"
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">Email</label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                placeholder="you@example.com"
                                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">Phone</label>
                                            <input
                                                type="tel"
                                                required
                                                value={phone}
                                                onChange={e => setPhone(e.target.value)}
                                                placeholder="+91 98765 43210"
                                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Price Breakdown */}
                                    <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-2 space-y-2">
                                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                                            <span>₹{roomPrice.toLocaleString()} × {rooms} room{rooms > 1 ? 's' : ''} × {nights} night{nights > 1 ? 's' : ''}</span>
                                            <span className="font-semibold text-gray-700 dark:text-gray-300">₹{baseTotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                                            <span>Taxes & fees</span>
                                            <span className="font-semibold text-gray-700 dark:text-gray-300">₹{taxes.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                                            <span className="font-extrabold text-gray-900 dark:text-white">Total Amount</span>
                                            <span className="text-2xl font-black text-blue-600 dark:text-blue-400">₹{grandTotal.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-extrabold py-4 rounded-2xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02] active:scale-95 text-base uppercase tracking-wide mt-2"
                                    >
                                        <CreditCard className="h-5 w-5" />
                                        Confirm Booking — ₹{grandTotal.toLocaleString()}
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </form>
                            </>
                        ) : (
                            /* Confirmation Step */
                            <div className="text-center py-4">
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
                                    <CheckCircle className="h-10 w-10 text-green-500" />
                                </div>
                                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">Booking Confirmed!</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-6">
                                    Thank you, <strong className="text-gray-700 dark:text-gray-200">{name}</strong>! A confirmation has been sent to <strong className="text-gray-700 dark:text-gray-200">{email}</strong>.
                                </p>

                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-5 text-left space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400 font-medium">Room</span>
                                        <span className="font-bold text-gray-900 dark:text-white">{selectedRoom?.name}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400 font-medium">Check-in</span>
                                        <span className="font-bold text-gray-900 dark:text-white">{formatDate(checkIn)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400 font-medium">Check-out</span>
                                        <span className="font-bold text-gray-900 dark:text-white">{formatDate(checkOut)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400 font-medium">Guests</span>
                                        <span className="font-bold text-gray-900 dark:text-white">{adults + children} guest{adults + children > 1 ? 's' : ''}</span>
                                    </div>
                                    <div className="flex justify-between text-sm border-t border-gray-200 dark:border-gray-600 pt-3">
                                        <span className="text-gray-500 dark:text-gray-400 font-bold uppercase text-xs tracking-wider">Total Paid</span>
                                        <span className="font-black text-blue-600 dark:text-blue-400 text-lg">₹{grandTotal.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleClose}
                                    className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 rounded-2xl hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white transition-all"
                                >
                                    Done
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default BookingModal;
