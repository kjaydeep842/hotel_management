import { Link } from 'react-router-dom';
import { MapPin, Star, Wifi, Coffee, Heart } from 'lucide-react';

const HotelCard = ({ hotel }) => {
    return (
        <div className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 m-2">

            {/* Hotel Image Section */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-red-500 transition-all duration-300 z-10">
                    <Heart className="h-5 w-5 fill-transparent hover:fill-current" />
                </button>
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center shadow-md">
                    <Star size={12} className="fill-orange-600 dark:fill-orange-400 mr-1" /> {hotel.rating}
                </div>
            </div>

            {/* Details Section */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-1">{hotel.name}</h3>
                    <div className="flex flex-col items-end">
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">${hotel.price}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">/night</span>
                    </div>
                </div>

                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                    <MapPin size={16} className="mr-1 text-red-500" />
                    <span className="line-clamp-1">{hotel.location}</span>
                </div>

                {/* Amenities Preview */}
                <div className="flex gap-4 mb-6 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <div className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-full mr-2">
                            <Wifi size={14} className="text-gray-600 dark:text-gray-300" />
                        </div>
                        <span className="text-xs uppercase tracking-wide">Free Wifi</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <div className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-full mr-2">
                            <Coffee size={14} className="text-gray-600 dark:text-gray-300" />
                        </div>
                        <span className="text-xs uppercase tracking-wide">Breakfast</span>
                    </div>
                </div>

                {/* Action Button */}
                <Link
                    to={`/hotel/${hotel.id}`}
                    className="block w-full text-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-2xl transition-all duration-300 shadow-lg shadow-orange-500/20 transform hover:scale-[1.02]"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default HotelCard;
