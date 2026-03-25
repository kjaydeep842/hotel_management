import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Calendar, Users, Home, ChevronDown, Minus, Plus, Info } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';

const BookingBar = ({ hotelName, price, onUpdateSearch }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));

    // Guest Selection State
    const [isOpen, setIsOpen] = useState(false);
    const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Auto-update search params when local state changes
    useEffect(() => {
        if (onUpdateSearch) {
            onUpdateSearch({ startDate, endDate, rooms, adults, children });
        }
    }, [startDate, endDate, rooms, adults, children, onUpdateSearch]);

    const handleIncrement = (setter, value, max = 20) => {
        if (value < max) setter(value + 1);
    };

    const handleDecrement = (setter, value, min = 0) => {
        if (value > min) setter(value - 1);
    };

    return (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600 p-4 shadow-lg sticky top-20 z-40 transform transition-all duration-300">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-end gap-4">

                {/* Hotel Name / Location */}
                <div className="flex-1 w-full">
                    <label className="text-white text-xs font-bold uppercase mb-1 block">Area, Landmark or Property Name</label>
                    <div className="relative">
                        <Home className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            value={hotelName}
                            readOnly
                            className="w-full pl-10 pr-4 py-2.5 rounded-md bg-white text-gray-900 border-none focus:ring-2 focus:ring-white/50 font-bold truncate"
                        />
                    </div>
                </div>

                {/* Check-in Date */}
                <div className="w-full lg:w-48">
                    <label className="text-white text-xs font-bold uppercase mb-1 block">Check-in</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400 z-10" />
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            minDate={new Date()}
                            monthsShown={2}
                            wrapperClassName="w-full"
                            className="w-full pl-10 pr-4 py-2.5 rounded-md bg-white text-gray-900 border-none focus:ring-2 focus:ring-white/50 font-bold cursor-pointer"
                            dateFormat="MMM d, yyyy"
                        />
                    </div>
                </div>

                {/* Check-out Date */}
                <div className="w-full lg:w-48">
                    <label className="text-white text-xs font-bold uppercase mb-1 block">Check-out</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400 z-10" />
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            monthsShown={2}
                            wrapperClassName="w-full"
                            className="w-full pl-10 pr-4 py-2.5 rounded-md bg-white text-gray-900 border-none focus:ring-2 focus:ring-white/50 font-bold cursor-pointer"
                            dateFormat="MMM d, yyyy"
                        />
                    </div>
                </div>

                {/* Guests & Rooms - Custom Popover */}
                <div className="w-full lg:w-72 relative" ref={dropdownRef}>
                    <label className="text-white text-xs font-bold uppercase mb-1 block">Guest & Rooms</label>
                    <div className="relative">
                        <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400 z-10" />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-md bg-white text-gray-900 border-none focus:ring-2 focus:ring-white/50 font-bold flex items-center justify-between"
                        >
                            <span className="truncate">
                                {adults} Adults . {children > 0 ? `${children} Child . ` : ''}{rooms} Rooms
                            </span>
                            <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Content */}
                        {isOpen && (
                            <div className="absolute top-full right-0 mt-2 w-full min-w-[380px] bg-white rounded-xl shadow-2xl p-6 z-50 ring-1 ring-black ring-opacity-5 animate-in fade-in zoom-in duration-200">

                                {/* Header */}
                                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                                    <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">Guests & Rooms</h3>
                                    <span className="text-blue-600 font-bold text-lg">{adults} Adults | {rooms} Room</span>
                                </div>

                                {/* Controls */}
                                <div className="flex justify-between items-start gap-2 mb-8 text-center">
                                    {/* Rooms */}
                                    <div className="flex flex-col items-center flex-1">
                                        <span className="text-xs font-bold text-gray-500 mb-3 h-8 flex items-center justify-center">Rooms (Max 20)</span>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => handleDecrement(setRooms, rooms, 1)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-sm" disabled={rooms <= 1}>
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="text-lg font-bold w-6">{rooms}</span>
                                            <button onClick={() => handleIncrement(setRooms, rooms, 20)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-sm" disabled={rooms >= 20}>
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Adults */}
                                    <div className="flex flex-col items-center flex-1 border-x border-gray-100 px-2">
                                        <span className="text-xs font-bold text-gray-500 mb-3 h-8 flex items-center justify-center text-center">Adults (17+ yr)</span>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => handleDecrement(setAdults, adults, 1)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-sm" disabled={adults <= 1}>
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="text-lg font-bold w-6">{adults}</span>
                                            <button onClick={() => handleIncrement(setAdults, adults, 30)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all font-bold shadow-sm">
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Children */}
                                    <div className="flex flex-col items-center flex-1">
                                        <span className="text-xs font-bold text-gray-500 mb-3 h-8 flex items-center justify-center">Children (0-17 yr)</span>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => handleDecrement(setChildren, children, 0)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-sm" disabled={children <= 0}>
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="text-lg font-bold w-6">{children}</span>
                                            <button onClick={() => handleIncrement(setChildren, children, 10)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all font-bold shadow-sm">
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Info Box */}
                                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 flex items-start gap-4 mb-4">
                                    <Info className="h-6 w-6 text-cyan-500 flex-shrink-0 mt-0.5" />
                                    <div className="text-xs text-gray-600 leading-relaxed">
                                        <p className="font-bold text-cyan-800 mb-1 text-sm">Travelling with children?</p>
                                        <p>Make sure to add the correct number of children and their ages for the best room options and prices.</p>
                                    </div>
                                </div>

                                {/* Live Price Preview */}
                                {price && (
                                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Price Summary</span>
                                            <span className="text-xs text-orange-600 font-semibold">Per Night</span>
                                        </div>

                                        {/* Room charge */}
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-sm text-gray-600">
                                                ₹{price.toLocaleString()} × {rooms} Room{rooms > 1 ? 's' : ''}
                                            </span>
                                            <span className="text-sm font-bold text-gray-900">
                                                ₹{(price * rooms).toLocaleString()}
                                            </span>
                                        </div>

                                        {/* Adult charge */}
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-sm text-gray-600">
                                                ₹200 × {adults} Adult{adults > 1 ? 's' : ''}
                                            </span>
                                            <span className="text-sm font-bold text-gray-900">
                                                ₹{(200 * adults).toLocaleString()}
                                            </span>
                                        </div>

                                        {/* Child charge (only if children > 0) */}
                                        {children > 0 && (
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="text-sm text-gray-600">
                                                    ₹100 × {children} Child{children > 1 ? 'ren' : ''}
                                                </span>
                                                <span className="text-sm font-bold text-gray-900">
                                                    ₹{(100 * children).toLocaleString()}
                                                </span>
                                            </div>
                                        )}

                                        {/* Taxes */}
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-500">Taxes & fees</span>
                                            <span className="text-sm text-gray-500">+₹{(399 * rooms).toLocaleString()}</span>
                                        </div>

                                        {/* Grand Total */}
                                        <div className="border-t border-orange-200 pt-2 flex items-center justify-between">
                                            <span className="text-sm font-extrabold text-gray-900">Total / night</span>
                                            <span className="text-xl font-extrabold text-orange-600">
                                                ₹{(price * rooms + 200 * adults + 100 * children + 399 * rooms).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Done Button */}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all uppercase tracking-widest text-sm"
                                >
                                    Done
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Update Button */}
                <div className="w-full lg:w-auto">
                    <button
                        onClick={() => onUpdateSearch && onUpdateSearch({ startDate, endDate, rooms, adults, children })}
                        className="w-full bg-white hover:bg-gray-100 text-blue-600 font-bold py-2.5 px-6 rounded-md shadow-md transition-colors uppercase tracking-wide"
                    >
                        Update Search
                    </button>
                </div>

            </div>
        </div>
    );
};

export default BookingBar;
