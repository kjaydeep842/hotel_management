import { useState } from 'react';
import { motion } from 'framer-motion';

const InteractiveMap = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);

    // Mock room data
    const rooms = [
        { id: 101, x: 20, y: 30, status: 'available', type: 'Standard' },
        { id: 102, x: 50, y: 30, status: 'occupied', type: 'Deluxe' },
        { id: 103, x: 80, y: 30, status: 'available', type: 'Suite' },
        { id: 201, x: 20, y: 70, status: 'maintenance', type: 'Standard' },
        { id: 202, x: 50, y: 70, status: 'available', type: 'Deluxe' },
        { id: 203, x: 80, y: 70, status: 'available', type: 'Penthouse' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'available': return 'bg-green-500 hover:bg-green-400';
            case 'occupied': return 'bg-red-500 cursor-not-allowed opacity-50';
            case 'maintenance': return 'bg-gray-500 cursor-not-allowed opacity-50';
            default: return 'bg-gray-300';
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400">🗺️</span>
                Interactive Floor Plan
            </h3>

            <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-inner border border-gray-200 dark:border-gray-800">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                {/* Rooms */}
                {rooms.map((room) => (
                    <motion.div
                        key={room.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={room.status === 'available' ? { scale: 1.1, translateY: -5 } : {}}
                        onClick={() => room.status === 'available' && setSelectedRoom(room.id)}
                        className={`group absolute w-16 h-16 md:w-24 md:h-24 rounded-lg shadow-md flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all border-2 border-white dark:border-gray-700 ${getStatusColor(room.status)} ${room.status === 'available' ? 'cursor-pointer' : ''} ${selectedRoom === room.id ? 'ring-4 ring-blue-500 shadow-blue-500/50 scale-110 z-20' : 'z-0'}`}
                        style={{ left: `${room.x}%`, top: `${room.y}%` }}
                    >
                        <div className="text-center text-white drop-shadow-md">
                            <span className="block font-extrabold text-lg">{room.id}</span>
                            <span className="text-[10px] uppercase font-bold opacity-90 tracking-wider hidden md:block">{room.type}</span>
                        </div>

                        {/* Tooltip */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                            {room.status === 'available' ? 'Click to Select' : room.status}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span> Available
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="w-3 h-3 rounded-full bg-red-500 opacity-50"></span> Occupied
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="w-3 h-3 rounded-full bg-gray-500 opacity-50"></span> Maintenance
                </div>
            </div>
        </div>
    );
};

export default InteractiveMap;
