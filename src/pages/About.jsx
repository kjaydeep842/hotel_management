import { motion } from 'framer-motion';
import { Globe, Heart, Shield, Users, Award, Linkedin, Twitter, Instagram } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const stats = [
    { value: '500+', label: 'Hotels Worldwide' },
    { value: '50K+', label: 'Happy Travelers' },
    { value: '120+', label: 'Destinations' },
    { value: '4.9★', label: 'Average Rating' },
];

const values = [
    {
        icon: <Heart className="h-7 w-7" />,
        title: 'Passion for Hospitality',
        desc: 'Every hotel we list is personally vetted by our team to ensure it meets our high standards of comfort and luxury.',
        color: 'bg-red-50 dark:bg-red-900/20 text-red-500',
    },
    {
        icon: <Shield className="h-7 w-7" />,
        title: 'Trust & Transparency',
        desc: 'No hidden fees. No surprises. What you see is exactly what you get — honest pricing, always.',
        color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-500',
    },
    {
        icon: <Globe className="h-7 w-7" />,
        title: 'Global Reach',
        desc: 'From mountainside retreats to city-center skyscrapers, our curated network spans over 120 destinations.',
        color: 'bg-green-50 dark:bg-green-900/20 text-green-500',
    },
    {
        icon: <Users className="h-7 w-7" />,
        title: 'People First',
        desc: 'Our 24/7 concierge team is dedicated to making every step of your journey seamless and unforgettable.',
        color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-500',
    },
];

const team = [
    {
        name: 'Priya Sharma',
        role: 'Founder & CEO',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300',
        bio: 'Former luxury hotel consultant with 15 years of experience shaping world-class hospitality.',
    },
    {
        name: 'Aryan Mehta',
        role: 'Head of Curation',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
        bio: 'Traveled to 80+ countries personally vetting every hotel in our portfolio.',
    },
    {
        name: 'Sofia Patel',
        role: 'Chief Experience Officer',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300&h=300',
        bio: 'Obsessed with creating seamless, human-centered digital travel experiences.',
    },
];

const milestones = [
    { year: '2019', title: 'Founded', desc: 'LuxeStay was born from a vision to make luxury travel accessible to everyone.' },
    { year: '2021', title: 'Global Expansion', desc: 'Expanded to 50+ countries with partnerships with 200+ luxury properties.' },
    { year: '2023', title: '50K Travelers', desc: 'Crossed 50,000 happy guests and launched our award-winning mobile experience.' },
    { year: '2025', title: 'AI-Powered Stays', desc: 'Launched personalized AI concierge and smart recommendation engine.' },
];

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <Navbar />

            {/* Hero */}
            <div className="relative pt-20 overflow-hidden">
                <div className="absolute inset-0 h-[520px] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
                <div className="absolute inset-0 h-[520px] opacity-20"
                    style={{ background: 'radial-gradient(ellipse at 60% 40%, #3b82f6 0%, transparent 60%)' }}
                />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 text-sm font-bold px-4 py-2 rounded-full mb-6 border border-blue-500/30"
                    >
                        <Award className="h-4 w-4" />
                        Trusted by 50,000+ travelers worldwide
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight"
                    >
                        We're Redefining <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Luxury Travel</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-blue-100 text-xl max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        LuxeStay connects discerning travelers with the world's finest hotels —
                        curated with care, priced with fairness, and supported with heart.
                    </motion.p>
                </div>
            </div>

            {/* Stats Band */}
            <div className="relative -mt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100 dark:divide-gray-700"
                >
                    {stats.map((stat, idx) => (
                        <div key={idx} className="text-center py-10 px-6">
                            <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-1">{stat.value}</div>
                            <div className="text-gray-500 dark:text-gray-400 font-medium text-sm">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Our Story */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">Our Story</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4">
                            LuxeStay was founded in 2019 with a simple belief: that extraordinary travel experiences
                            shouldn't require extraordinary effort to discover.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4">
                            Our founders, seasoned travelers and hospitality veterans, were frustrated by the noise —
                            thousands of hotels, endless reviews, and still the wrong choice. They built LuxeStay
                            to change that.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                            Today, every hotel in our collection has been personally vetted by our curation team.
                            We don't list everything — we list the <span className="font-bold text-gray-900 dark:text-white">best</span>.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=500"
                            alt="Luxury hotel"
                            className="rounded-3xl h-56 w-full object-cover shadow-xl"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1571896349842-6e5a513e610a?auto=format&fit=crop&q=80&w=500"
                            alt="Hotel room"
                            className="rounded-3xl h-56 w-full object-cover shadow-xl mt-8"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&q=80&w=500"
                            alt="Resort view"
                            className="rounded-3xl h-56 w-full object-cover shadow-xl"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=500"
                            alt="Pool"
                            className="rounded-3xl h-56 w-full object-cover shadow-xl mt-8"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-24 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-extrabold mb-6 tracking-tight">Our Mission</h2>
                        <p className="text-xl md:text-2xl font-light leading-relaxed italic text-blue-50">
                            "To curate the world's most extraordinary stays and make them seamlessly accessible to discerning travelers everywhere. We believe that a great hotel doesn't just offer a bed—it provides a gateway to unforgettable experiences, unparalleled comfort, and genuine human connection. LuxeStay exists to turn your travel dreams into tangible, luxurious realities."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Values */}
            <section className="bg-white dark:bg-gray-800 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">What We Stand For</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-light max-w-xl mx-auto">
                            Our values guide every decision we make — from which hotels we list to how we support our customers.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((val, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-8 hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
                            >
                                <div className={`inline-flex p-3 rounded-2xl ${val.color} mb-5`}>{val.icon}</div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{val.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{val.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">Our Journey</h2>
                </motion.div>
                <div className="relative">
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full" />
                    <div className="space-y-10">
                        {milestones.map((m, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="relative flex gap-8 pl-20"
                            >
                                <div className="absolute left-4 top-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0 z-10">
                                    <div className="w-3 h-3 bg-white rounded-full" />
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700 flex-1 hover:shadow-lg transition-shadow">
                                    <span className="inline-block text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">{m.year}</span>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{m.title}</h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{m.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="bg-white dark:bg-gray-800 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">Meet the Team</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-light">
                            The people behind your perfect stay.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                className="text-center group"
                            >
                                <div className="relative w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden shadow-xl ring-4 ring-blue-100 dark:ring-blue-900 group-hover:ring-blue-400 transition-all">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                                <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-3">{member.role}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">{member.bio}</p>
                                <div className="flex justify-center gap-3 mt-4">
                                    {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                                        <button key={i} className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors">
                                            <Icon className="h-4 w-4" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to explore the world?</h2>
                        <p className="text-blue-100 text-lg mb-8 font-light">Start your journey with LuxeStay today and discover hotels you'll love.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/hotels" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-colors shadow-xl text-base">
                                Browse Hotels
                            </a>
                            <a href="/deals" className="px-8 py-4 bg-blue-700/50 border border-blue-400/30 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors backdrop-blur-sm text-base">
                                View Deals
                            </a>
                        </div>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
