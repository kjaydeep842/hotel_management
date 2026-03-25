import React from 'react';
import { motion } from 'framer-motion';

const RoomGrid = ({ rooms, selectedRoomId, onRoomSelect }) => {
    // Helper function to color the rooms based on status
    const getStatusColor = (status) => {
        switch (status) {
            case 'available': return 'bg-green-500 hover:bg-green-600';
            case 'occupied': return 'bg-red-400 hover:bg-red-500';
            case 'maintenance': return 'bg-gray-400 hover:bg-gray-500';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {rooms.map((room) => {
                    const isSelected = selectedRoomId === room.id;
                    return (
                        <motion.button
                            key={room.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onRoomSelect && onRoomSelect(room.id)}
                            className={`
                                aspect-square flex flex-col items-center justify-center rounded-2xl text-white shadow-md transition-all duration-200
                                ${getStatusColor(room.status)}
                                ${isSelected ? 'ring-4 ring-blue-500 ring-offset-4 ring-offset-white dark:ring-offset-gray-800 scale-105 shadow-xl' : ''}
                            `}
                        >
                            <span className="text-3xl font-black mb-1 drop-shadow-sm">{room.id}</span>
                            <span className="text-xs font-bold uppercase tracking-wider opacity-90 drop-shadow-sm">{room.type}</span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};

export default RoomGrid;
