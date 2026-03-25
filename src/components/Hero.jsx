import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const Hero = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const getDateDisplay = () => {
        if (startDate && endDate) {
            return `${format(startDate, 'MMM d')} – ${format(endDate, 'MMM d, yyyy')}`;
        } else if (startDate) {
            return `${format(startDate, 'MMM d, yyyy')} – ?`;
        }
        return null;
    };

    return (
        <div ref={targetRef} className="relative h-[800px] flex items-center justify-center bg-gray-900">
            {/* Background Video */}
            <motion.div style={{ scale, opacity }} className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transform scale-105"
                    poster="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black/50 dark:bg-black/70 z-10 backdrop-blur-[1px]"></div>
            </motion.div>

            {/* Hero Content */}
            <motion.div
                style={{ y }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-20 text-center px-4 max-w-5xl mx-auto"
            >
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-2xl">
                    Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Luxury</span> <br /> Like Never Before
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light drop-shadow-lg">
                    Immerse yourself in breathtaking destinations and curated stays.
                </p>
            </motion.div>

            {/* Glassmorphism Search Bar at Bottom */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute bottom-10 left-0 right-0 z-30 px-4 max-w-6xl mx-auto"
            >
                <div className="rounded-[2.5rem] bg-white/20 dark:bg-black/30 backdrop-blur-xl border border-white/30 dark:border-white/10 p-3 mx-auto shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex flex-col md:flex-row gap-2">

                    {/* Location Input */}
                    <div className="flex-1 bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl px-6 py-4 flex flex-col justify-center transition-colors group hover:bg-white/90 dark:hover:bg-gray-800/80 border border-white/40 dark:border-gray-700/50">
                        <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">Destination</label>
                        <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 group-hover:animate-bounce" />
                            <input
                                type="text"
                                placeholder="Where to?"
                                className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 font-bold text-lg outline-none"
                            />
                        </div>
                    </div>

                    {/* Date Range Picker */}
                    <div className="flex-1 bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl px-6 py-4 flex flex-col justify-center transition-colors group hover:bg-white/90 dark:hover:bg-gray-800/80 border border-white/40 dark:border-gray-700/50 relative z-50">
                        <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">Dates</label>
                        <div className="flex items-center">
                            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
                            <DatePicker
                                selectsRange
                                startDate={startDate}
                                endDate={endDate}
                                onChange={handleDateChange}
                                minDate={new Date()}
                                monthsShown={1}
                                placeholderText="Add dates"
                                dateFormat="MMM d, yyyy"
                                value={getDateDisplay()}
                                className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 font-bold text-lg cursor-pointer caret-transparent outline-none"
                                popperPlacement="top-start"
                                popperModifiers={[
                                    { name: 'offset', options: { offset: [0, 8] } },
                                    { name: 'preventOverflow', options: { boundary: 'viewport' } }
                                ]}
                                showPopperArrow={false}
                            />
                        </div>
                    </div>

                    {/* Guests Input */}
                    <div className="flex-1 bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl px-6 py-4 flex flex-col justify-center transition-colors group hover:bg-white/90 dark:hover:bg-gray-800/80 border border-white/40 dark:border-gray-700/50">
                        <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">Guests</label>
                        <div className="flex items-center">
                            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
                            <select className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-gray-100 font-bold text-lg cursor-pointer appearance-none outline-none">
                                <option className="dark:bg-gray-800">2 Adults</option>
                                <option className="dark:bg-gray-800">1 Adult</option>
                                <option className="dark:bg-gray-800">Family</option>
                            </select>
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className="w-full md:w-auto p-1">
                        <button className="w-full md:w-24 h-full min-h-[80px] bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-3xl font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center active:scale-95 group border border-white/20">
                            <Search className="h-7 w-7 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                </div>
            </motion.div>

            {/* Custom DatePicker Styles */}
            <style>{`
                .react-datepicker-popper {
                    z-index: 9999 !important;
                }
                .react-datepicker {
                    font-family: inherit;
                    border: none;
                    border-radius: 20px;
                    box-shadow: 0 25px 60px rgba(0,0,0,0.2);
                    padding: 16px;
                    background: #ffffff;
                    width: max-content;
                }
                .react-datepicker__month-container {
                    padding: 0 8px;
                }
                .react-datepicker__header {
                    background: #ffffff;
                    border-bottom: 1px solid #f1f5f9;
                    padding-top: 12px;
                    border-radius: 0;
                }
                .react-datepicker__current-month {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #1e293b;
                    margin-bottom: 8px;
                }
                .react-datepicker__day-name {
                    color: #94a3b8;
                    font-weight: 600;
                    font-size: 0.75rem;
                    width: 2.5rem;
                    line-height: 2.5rem;
                    margin: 0.2rem;
                    display: inline-block;
                }
                .react-datepicker__day {
                    width: 2.5rem;
                    line-height: 2.5rem;
                    margin: 0.2rem;
                    display: inline-block;
                    border-radius: 50%;
                    color: #1e293b;
                    font-size: 0.875rem;
                    font-weight: 500;
                    transition: all 0.15s ease;
                }
                .react-datepicker__day:hover {
                    background-color: #dbeafe;
                    color: #1d4ed8;
                    border-radius: 50%;
                }
                .react-datepicker__day--selected,
                .react-datepicker__day--range-start,
                .react-datepicker__day--range-end {
                    background-color: #2563eb !important;
                    color: white !important;
                    border-radius: 50% !important;
                    font-weight: 700;
                }
                .react-datepicker__day--in-range {
                    background-color: #dbeafe;
                    color: #1d4ed8;
                    border-radius: 0;
                }
                .react-datepicker__day--in-selecting-range {
                    background-color: #bfdbfe;
                    color: #1d4ed8;
                    border-radius: 0;
                }
                .react-datepicker__day--range-start {
                    border-radius: 50% 0 0 50% !important;
                }
                .react-datepicker__day--range-end {
                    border-radius: 0 50% 50% 0 !important;
                }
                .react-datepicker__day--range-start.react-datepicker__day--range-end {
                    border-radius: 50% !important;
                }
                .react-datepicker__day--disabled {
                    color: #cbd5e1;
                    cursor: not-allowed;
                }
                .react-datepicker__day--disabled:hover {
                    background: transparent;
                    color: #cbd5e1;
                }
                .react-datepicker__navigation {
                    top: 24px;
                }
                .react-datepicker__navigation--previous {
                    left: 16px;
                }
                .react-datepicker__navigation--next {
                    right: 16px;
                }
                .react-datepicker__navigation-icon::before {
                    border-color: #2563eb;
                    border-width: 2px 2px 0 0;
                    width: 8px;
                    height: 8px;
                }
                .react-datepicker__input-container input {
                    width: 100%;
                    background: transparent;
                    border: none;
                    outline: none;
                    font-weight: 700;
                    font-size: 1.125rem;
                    color: #1e293b;
                    cursor: pointer;
                }
                .react-datepicker__input-container input::placeholder {
                    color: #9ca3af;
                }
                .react-datepicker__day--today {
                    font-weight: 700;
                    color: #2563eb;
                }
                .react-datepicker__day--today.react-datepicker__day--selected {
                    color: white;
                }

                /* Dark Mode Overrides */
                :is(.dark) .react-datepicker {
                    background: #1e293b;
                    box-shadow: 0 25px 60px rgba(0,0,0,0.5);
                }
                :is(.dark) .react-datepicker__header {
                    background: #1e293b;
                    border-bottom-color: #334155;
                }
                :is(.dark) .react-datepicker__current-month {
                    color: #f1f5f9;
                }
                :is(.dark) .react-datepicker__day-name {
                    color: #94a3b8;
                }
                :is(.dark) .react-datepicker__day {
                    color: #e2e8f0;
                }
                :is(.dark) .react-datepicker__day:hover {
                    background-color: #334155;
                    color: #60a5fa;
                }
                :is(.dark) .react-datepicker__day--disabled {
                    color: #475569;
                }
                :is(.dark) .react-datepicker__day--disabled:hover {
                    background: transparent;
                    color: #475569;
                }
                :is(.dark) .react-datepicker__day--in-range,
                :is(.dark) .react-datepicker__day--in-selecting-range {
                    background-color: #3b82f640;
                    color: #93c5fd;
                }
                :is(.dark) .react-datepicker__input-container input {
                    color: #f8fafc;
                }
                :is(.dark) .react-datepicker__input-container input::placeholder {
                    color: #94a3b8;
                }
            `}</style>
        </div>
    );
};

export default Hero;
