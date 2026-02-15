'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Command, Home, Crown, Info, Disc, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Handle scroll effect for background
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/commands', label: 'Commands', icon: Command },
        { href: '/premium', label: 'Premium', icon: Crown },
        { href: '/status', label: 'Status', icon: Zap },
        { href: '/support', label: 'Support', icon: Info },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed w-full z-[100] transition-all duration-500 px-6 ${scrolled ? 'top-4' : 'top-0'
                }`}
        >
            <div className={`max-w-6xl mx-auto transition-all duration-500 border ${scrolled
                ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-white/10 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]'
                : 'bg-transparent border-transparent py-4'
                }`}>
                <div className="px-6 h-16 flex items-center justify-between">

                    {/* Logo Section */}
                    <Link href="/" className="flex items-center group">
                        <motion.div
                            whileHover={{ rotate: 180 }}
                            className="mr-3 p-2 bg-red-600 rounded-xl hidden sm:flex"
                        >
                            <Disc className="text-white" size={20} />
                        </motion.div>
                        <span className="text-xl font-black tracking-tighter uppercase italic text-white group-hover:text-red-500 transition-colors">
                            HARMONIA<span className="text-red-600">.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        <div className="flex bg-white/[0.03] p-1 rounded-2xl border border-white/5 mr-4 relative">
                            {links.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`relative px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors z-10 flex items-center gap-2 ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'
                                            }`}
                                    >
                                        <link.icon size={14} className={isActive ? 'text-red-500' : ''} />
                                        {link.label}

                                        {/* Active Background Pill */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-pill"
                                                className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 -z-10"
                                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        <Link
                            href="https://discord.com/..."
                            target="_blank"
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center gap-2 active:scale-95"
                        >
                            <Zap size={14} className="fill-white" />
                            Invite
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-zinc-400 hover:text-white transition-colors"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 overflow-hidden rounded-[2rem] bg-[#0a0a0a] border border-white/10 backdrop-blur-2xl shadow-2xl"
                    >
                        <div className="p-6 space-y-2">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${pathname === link.href
                                        ? 'bg-red-600 text-white'
                                        : 'bg-white/5 text-zinc-500 hover:text-zinc-200'
                                        }`}
                                >
                                    <link.icon size={18} />
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="https://discord.com/..."
                                className="w-full mt-4 bg-white text-black px-5 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-center flex items-center justify-center gap-2"
                            >
                                <Zap size={18} className="fill-black" />
                                Invite Bot
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}