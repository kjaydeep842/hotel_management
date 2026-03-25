import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { hotels } from '../data/hotels';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RoomCard from '../components/RoomCard';
import BookingModal from '../components/BookingModal';
import BookingBar from '../components/BookingBar';
import InteractiveMap from '../components/InteractiveMap';
import { MapPin, Star, Wifi, Coffee, Car, Dumbbell, ShieldCheck, CheckCircle, User } from 'lucide-react';
import { motion } from 'framer-motion';

const HotelDetails = () => {
    const { id } = useParams();
    const hotel = hotels.find(h => h.id === parseInt(id));
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    // Search Params State
    const [searchParams, setSearchParams] = useState({
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        rooms: 1,
        adults: 2,
        children: 0
    });

    const handleUpdateSearch = (params) => {
        setSearchParams(params);
    };

    if (!hotel) {
        return <div className="min-h-screen flex items-center justify-center text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900">Hotel not found</div>;
    }

    const galleryImages = hotel.images && hotel.images.length > 0
        ? [hotel.image, ...hotel.images]
        : [hotel.image, hotel.image, hotel.image];

    const amenitiesList = [
        { icon: <Wifi className="h-5 w-5" />, label: 'Free High-Speed WiFi' },
        { icon: <Coffee className="h-5 w-5" />, label: 'Premium Coffee Maker' },
        { icon: <Car className="h-5 w-5" />, label: 'Valet Parking' },
        { icon: <Dumbbell className="h-5 w-5" />, label: '24/7 Fitness Center' },
        { icon: <ShieldCheck className="h-5 w-5" />, label: 'Enhanced Security' },
        { icon: <CheckCircle className="h-5 w-5" />, label: 'Housekeeping' },
    ];

    // Mock rooms data relative to hotel price
    const rooms = [
        {
            id: 1,
            name: 'Deluxe Ocean View',
            description: 'Spacious room with a private balcony overlooking the ocean.',
            price: hotel.price,
            originalPrice: hotel.price + 50,
            image: galleryImages[0] || hotel.image,
            type: 'Deluxe',
            amenities: ['King Bed', 'Ocean View', 'Breakfast', 'Free WiFi'],
            discount: true
        },
        {
            id: 2,
            name: 'Executive Suite',
            description: 'Luxury suite with separate living area and premium amenities.',
            price: hotel.price + 150,
            originalPrice: null,
            image: galleryImages[1] || hotel.image,
            type: 'Suite',
            amenities: ['King Bed', 'City View', 'Breakfast', 'Free WiFi', 'Smart TV'],
            discount: false
        }
    ];

    const handleRoomSelect = (room) => {
        setSelectedRoom(room);
        setIsBookingOpen(true);
    };

    // Calculate cancellation date (2 days before check-in)
    const getCancellationDate = () => {
        const checkInDate = new Date(searchParams.startDate);
        checkInDate.setDate(checkInDate.getDate() - 2);

        // Format: 14-Mar-2026 13:59
        const day = checkInDate.getDate();
        const month = checkInDate.toLocaleString('default', { month: 'short' });
        const year = checkInDate.getFullYear();

        return `${day}-${month}-${year} 13:59`;
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-white transition-colors duration-300">
            <Navbar />

            {/* Spacer */}
            <div className="h-20"></div>

            {/* Booking Bar */}
            <BookingBar hotelName={hotel.name} price={hotel.price} onUpdateSearch={handleUpdateSearch} />

            {/* Gallery Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                    <div className="md:col-span-2 h-full relative group cursor-pointer">
                        <img src={galleryImages[0]} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">Featured</span>
                            <h2 className="text-3xl font-bold">Main View</h2>
                        </div>
                    </div>
                    <div className="hidden md:grid grid-rows-2 gap-4 h-full">
                        <div className="relative group overflow-hidden cursor-pointer">
                            <img src={galleryImages[1] || galleryImages[0]} alt="Gallery 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="relative group overflow-hidden cursor-pointer">
                            <img src={galleryImages[2] || galleryImages[0]} alt="Gallery 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <button className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-white hover:text-gray-900 transition-colors border border-white/30">
                                View All Photos
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content */}
                    <div className="lg:w-2/3 space-y-12">

                        {/* Header & Description */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="mb-8">
                                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">{hotel.name}</h1>
                                <div className="flex flex-wrap items-center text-gray-500 dark:text-gray-400 gap-4 text-sm md:text-base">
                                    <div className="flex items-center">
                                        <MapPin className="h-5 w-5 mr-1 text-red-500" />
                                        <span>{hotel.location}</span>
                                    </div>
                                    <span className="hidden md:inline text-gray-300">|</span>
                                    <div className="flex items-center">
                                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                                        <span className="ml-1 font-bold text-gray-900 dark:text-white">{hotel.rating}</span>
                                        <span className="ml-1 text-gray-500 font-normal">({hotel.reviews} reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About this place</h3>
                                <p className="leading-relaxed">
                                    {hotel.description}
                                    <br /><br />
                                    Whether you're traveling for business or leisure, {hotel.name} offers the perfect blend of comfort and style. Enjoy our world-class amenities and let our dedicated staff take care of your every need.
                                </p>
                            </div>
                        </motion.div>

                        {/* Amenities */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="border-t border-gray-100 dark:border-gray-800 pt-8"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What this place offers</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8">
                                {(hotel.amenities && hotel.amenities.length > 0 ?
                                    hotel.amenities.map(item => ({ icon: <CheckCircle className="h-5 w-5" />, label: item }))
                                    : amenitiesList
                                ).map((amenity, idx) => (
                                    <div key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                                        <span className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg mr-3">
                                            {amenity.icon || <CheckCircle className="h-5 w-5" />}
                                        </span>
                                        <span className="font-medium">{amenity.label || amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Room Selection */}
                        <div className="border-t border-gray-100 dark:border-gray-800 pt-8" id="room-selection">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Choose your room</h3>
                            <div className="grid grid-cols-1 gap-6">
                                {rooms.map(room => (
                                    <RoomCard key={room.id} room={room} onSelect={handleRoomSelect} />
                                ))}
                            </div>
                        </div>

                        {/* Interactive Map */}
                        <div className="border-t border-gray-100 dark:border-gray-800 pt-8">
                            <InteractiveMap />
                        </div>

                    </div>

                    {/* Sticky Booking Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-28 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Deluxe Room - 1 Double Bed</h3>

                            <div className="flex items-center gap-6 mb-4 text-gray-600 dark:text-gray-300">
                                <div className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-gray-500" />
                                    <div className="leading-tight">
                                        <span className="font-bold text-lg text-gray-900 dark:text-white block">{searchParams.adults + searchParams.children}</span>
                                        <span className="text-xs font-medium">Guests</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-5 w-5 border-2 border-gray-500 rounded-sm flex items-center justify-center text-[10px] font-bold">
                                        <div className="w-3 h-0.5 bg-gray-500 rounded-full"></div>
                                    </div>
                                    <div className="leading-tight">
                                        <span className="font-bold text-lg text-gray-900 dark:text-white block">{searchParams.rooms}</span>
                                        <span className="text-xs font-medium">Rooms</span>
                                    </div>
                                </div>

                                <div className="ml-auto text-right">
                                    <span className="text-3xl font-extrabold text-gray-900 dark:text-white block">
                                        ₹{(hotel.price * searchParams.rooms + 200 * searchParams.adults + 100 * searchParams.children).toLocaleString()}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                        +₹{(399 * searchParams.rooms).toLocaleString()} taxes &amp; fees
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mt-1">
                                        {searchParams.rooms} Room{searchParams.rooms > 1 ? 's' : ''} · {searchParams.adults} Adult{searchParams.adults > 1 ? 's' : ''}{searchParams.children > 0 ? ` · ${searchParams.children} Child${searchParams.children > 1 ? 'ren' : ''}` : ''} / night
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-start gap-2 mb-6 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                <span className="text-sm font-bold">Free Cancellation Till {getCancellationDate()}</span>
                            </div>

                            <button
                                onClick={() => {
                                    // Scroll to room section or open modal
                                    const roomSection = document.getElementById('room-selection');
                                    if (roomSection) {
                                        roomSection.scrollIntoView({ behavior: 'smooth' });
                                    } else {
                                        setIsBookingOpen(true);
                                    }
                                }}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all transform hover:scale-[1.02] active:scale-95 text-lg uppercase tracking-wider flex items-center justify-center gap-2"
                            >
                                <span>View {rooms.length} Room Options</span>
                                <div className="bg-white/20 p-1 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            <div className="bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-colors">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" className="w-6 h-6" alt="WhatsApp" />
                            </div>
                            <div className="bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-colors text-orange-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.367-.366-.375-.744-.774-1.103-1.158a1 1 0 00-.104-1.971zM9.153 7.608c.268-.992.548-1.895.84-2.597.29-.699.587-1.125.822-1.272a7 7 0 014.186 11.261C14.07 13.91 12.87 13 11 13a4.99 4.99 0 01-4-2c-1-1.63-.61-5.174.153-9.392zm.59 2.133a10.038 10.038 0 01-.46 3.65 3.003 3.003 0 002.817 1.63 c.88 0 1.63-.35 2.18-.94.55-.58.82-1.33.82-2.08H10a4 4 0 00-.257-1.258z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-colors text-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                selectedRoom={selectedRoom}
                price={selectedRoom ? selectedRoom.price : hotel.price}
                searchParams={searchParams}
            />

            <Footer />
        </div>
    );
};

export default HotelDetails;
