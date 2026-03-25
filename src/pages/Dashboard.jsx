import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, LogOut, Settings, Clock, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RoomGrid from '../components/RoomGrid';
import BookingModal from '../components/BookingModal';

// Initial dummy data
const initialRooms = [
    { id: '101', type: 'STANDARD', status: 'available', guestName: null, checkInTime: null },
    { id: '102', type: 'DELUXE', status: 'occupied', guestName: 'Alice Smith', checkInTime: '2026-03-05 14:30' },
    { id: '103', type: 'SUITE', status: 'available', guestName: null, checkInTime: null },
    { id: '201', type: 'STANDARD', status: 'maintenance', guestName: null, checkInTime: null },
    { id: '202', type: 'DELUXE', status: 'available', guestName: null, checkInTime: null },
    { id: '203', type: 'PENTHOUSE', status: 'available', guestName: null, checkInTime: null },
];

const Dashboard = () => {
    const [rooms, setRooms] = useState(initialRooms);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const selectedRoom = rooms.find(r => r.id === selectedRoomId);

    // Color definitions based on the image (used in the sidebar header)
    const getStatusColor = (status) => {
        switch (status) {
            case 'available': return 'bg-green-500 hover:bg-green-600';
            case 'occupied': return 'bg-red-400 hover:bg-red-500';
            case 'maintenance': return 'bg-gray-400 hover:bg-gray-500';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

    const handleAction = (roomId, action, details = null) => {
        setRooms(rooms.map(room => {
            if (room.id !== roomId) return room;

            // Simple State Machine for demo purposes
            if (action === 'check-in') {
                return {
                    ...room,
                    status: 'occupied',
                    guestName: details?.guestName || 'Walk-in Guest',
                    checkInTime: details?.checkInTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
            }
            if (action === 'check-out') {
                return { ...room, status: 'maintenance', guestName: null, checkInTime: null };
            }
            if (action === 'mark-cleaned') {
                return { ...room, status: 'available' };
            }
            if (action === 'set-maintenance') {
                return { ...room, status: 'maintenance' };
            }

            return room;
        }));
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
            <Navbar />

            <div className="flex-1 flex pt-20 h-[calc(100vh-80px)] overflow-hidden">

                {/* Main Content (Grid) */}
                <div className={`flex-1 p-8 overflow-y-auto transition-all duration-300 ${selectedRoom ? 'mr-80 lg:mr-96' : ''}`}>
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8 flex justify-between items-end">
                            <div>
                                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Manager Dashboard</h1>
                                <p className="text-gray-500 dark:text-gray-400">Real-time room status tracking.</p>
                            </div>

                            {/* Legend */}
                            <div className="flex gap-4 text-sm font-bold bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="text-gray-700 dark:text-gray-300">Available</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <span className="text-gray-700 dark:text-gray-300">Occupied</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                                    <span className="text-gray-700 dark:text-gray-300">Maintenance</span>
                                </div>
                            </div>
                        </div>

                        {/* Room Grid Component */}
                        <RoomGrid
                            rooms={rooms}
                            selectedRoomId={selectedRoomId}
                            onRoomSelect={setSelectedRoomId}
                        />
                    </div>
                </div>

                {/* Sidebar (Details Panel) */}
                <AnimatePresence>
                    {selectedRoom && (
                        <motion.div
                            initial={{ x: '100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%', opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="w-80 lg:w-96 fixed right-0 top-20 bottom-0 bg-white dark:bg-gray-800 shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-gray-100 dark:border-gray-700 z-40 flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900 dark:text-white">Room {selectedRoom.id}</h2>
                                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{selectedRoom.type}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedRoomId(null)}
                                    className="p-2 bg-white dark:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full shadow-sm border border-gray-200 dark:border-gray-600 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Status Info */}
                            <div className="p-6 flex-1 overflow-y-auto space-y-6">

                                <div className="flex items-center gap-3">
                                    <div className={`w-4 h-4 rounded-full ${getStatusColor(selectedRoom.status).split(' ')[0]}`}></div>
                                    <span className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                                        {selectedRoom.status}
                                    </span>
                                </div>

                                {/* Dynamic Details based on status */}
                                {selectedRoom.status === 'occupied' && (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5 border border-blue-100 dark:border-blue-800/30 space-y-4">
                                        <div className="flex items-start gap-3">
                                            <User className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-0.5">Guest Name</p>
                                                <p className="font-extrabold text-gray-900 dark:text-white">{selectedRoom.guestName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Clock className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-0.5">Check-in Time</p>
                                                <p className="font-extrabold text-gray-900 dark:text-white">{selectedRoom.checkInTime}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedRoom.status === 'maintenance' && (
                                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-5 text-sm text-gray-600 dark:text-gray-300 font-medium">
                                        This room requires cleaning or maintenance before it can be assigned to a new guest.
                                    </div>
                                )}

                                {selectedRoom.status === 'available' && (
                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-5 text-sm text-green-700 dark:text-green-400 font-bold border border-green-200 dark:border-green-800/30">
                                        Room is completely ready for a new guest!
                                    </div>
                                )}

                            </div>

                            {/* Actions Footer */}
                            <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    {selectedRoom.status === 'available' && (
                                        <>
                                            <button
                                                onClick={() => setIsBookingModalOpen(true)}
                                                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-colors"
                                            >
                                                <User className="h-5 w-5" /> Walk-in Check-in
                                            </button>
                                            <button
                                                onClick={() => handleAction(selectedRoom.id, 'set-maintenance')}
                                                className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold py-3.5 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm transition-colors"
                                            >
                                                <Settings className="h-5 w-5 text-gray-400" /> Need Maintenance
                                            </button>
                                        </>
                                    )}

                                    {selectedRoom.status === 'occupied' && (
                                        <button
                                            onClick={() => handleAction(selectedRoom.id, 'check-out')}
                                            className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/20 transition-colors"
                                        >
                                            <LogOut className="h-5 w-5" /> Check-out Guest
                                        </button>
                                    )}

                                    {selectedRoom.status === 'maintenance' && (
                                        <button
                                            onClick={() => handleAction(selectedRoom.id, 'mark-cleaned')}
                                            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-500/20 transition-colors"
                                        >
                                            <CheckCircle className="h-5 w-5" /> Mark as Cleaned & Ready
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Booking Modal Integration */}
            {selectedRoom && (
                <BookingModal
                    isOpen={isBookingModalOpen}
                    onClose={() => setIsBookingModalOpen(false)}
                    selectedRoom={{
                        id: selectedRoom.id,
                        name: `Room ${selectedRoom.id} - ${selectedRoom.type}`,
                        type: selectedRoom.type,
                        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
                    }}
                    price={
                        selectedRoom.type === 'STANDARD' ? 150 :
                            selectedRoom.type === 'DELUXE' ? 250 :
                                selectedRoom.type === 'SUITE' ? 400 : 800
                    }
                    searchParams={{
                        startDate: new Date(),
                        endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
                        rooms: 1,
                        adults: 2,
                        children: 0
                    }}
                    onBookingComplete={(details) => {
                        handleAction(selectedRoom.id, 'check-in', details);
                    }}
                />
            )}
        </div>
    );
};

export default Dashboard;
