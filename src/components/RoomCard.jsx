import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, User, Droplets, Utensils, Wifi, Monitor } from 'lucide-react';

const amenitiesIcons = {
    'King Bed': <User className="h-5 w-5" />,
    'Ocean View': <Droplets className="h-5 w-5" />,
    'Breakfast': <Utensils className="h-5 w-5" />,
    'Free WiFi': <Wifi className="h-5 w-5" />,
    'Smart TV': <Monitor className="h-5 w-5" />,
};

const RoomCard = ({ room, onSelect }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group flex flex-col md:flex-row h-full"
        >
            {/* Image Side */}
            <div className="md:w-2/5 relative overflow-hidden">
                <img
                    src={room.image}
                    alt={room.name}
                    className="h-64 md:h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                    {room.type}
                </div>
            </div>

            {/* Content Side */}
            <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{room.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2">{room.description}</p>

                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8">
                        {room.amenities.map((amenity, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <span className="p-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-500 rounded-full mr-2">
                                    {amenitiesIcons[amenity] || <Check className="h-4 w-4" />}
                                </span>
                                {amenity}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-gray-100 dark:border-gray-700 pt-6 mt-4">
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Price per night</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-extrabold text-gray-900 dark:text-white">${room.price}</span>
                            {room.discount && (
                                <span className="text-sm text-red-500 line-through decoration-2">${room.originalPrice}</span>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => onSelect(room)}
                        className="w-full sm:w-auto px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white transition-all transform hover:scale-105 shadow-xl shadow-gray-200 dark:shadow-none"
                    >
                        Select Room
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default RoomCard;
