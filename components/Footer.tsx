'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Disc, ExternalLink, Shield, MessageSquare, Zap } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.1, duration: 0.6 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <footer className="relative bg-[#050505] border-t border-white/5 pt-20 pb-10 px-6 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-red-900/5 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="max-w-7xl mx-auto relative z-10"
            >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

                    {/* Brand Section */}
                    <div className="md:col-span-5">
                        <Link href="/" className="flex items-center group mb-6">
                            <div className="mr-3 p-2 bg-red-600 rounded-xl">
                                <Disc className="text-white animate-[spin_4s_linear_infinite]" size={20} />
                            </div>
                            <span className="text-2xl font-black tracking-tighter uppercase italic text-white group-hover:text-red-500 transition-colors">
                                HARMONIA<span className="text-red-600">.</span>
                            </span>
                        </Link>
                        <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mb-8 font-medium">
                            The next generation of Discord audio. Experience studio-quality
                            streaming with lossless audio nodes and enterprise-grade stability.
                        </p>
                        <div className="flex gap-3">
                            <SocialLink href="https://discord.gg/ZhTecu5aFz" icon={<MessageSquare size={18} />} />
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6">Platform</h4>
                        <ul className="space-y-4">
                            <FooterLink href="/commands" label="Commands" />
                            <FooterLink href="/premium" label="Premium" />
                            <FooterLink href="/support" label="Support" />
                            <FooterLink href="/status" label="Status" />
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6">Compliance</h4>
                        <ul className="space-y-4">
                            <FooterLink href="/privacy" label="Privacy Policy" />
                            <FooterLink href="/terms" label="Terms of Service" />
                            <FooterLink href="#" label="Guide Lines" />
                        </ul>
                    </div>

                    {/* CTA / Newsletter Section */}
                    <div className="md:col-span-3">
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem]">
                            <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <Zap size={12} className="fill-red-500" /> System Status
                            </h4>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-bold text-white uppercase">Operational</span>
                            </div>
                            <p className="text-[10px] text-zinc-600 font-medium mb-4 leading-relaxed">
                                All global audio nodes are performing at peak efficiency.
                            </p>
                            <Link href="#" className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
                                Network Stats <ExternalLink size={12} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 text-zinc-600 text-[10px] font-black uppercase tracking-widest">
                        <Shield size={14} className="text-red-600" />
                        &copy; {currentYear} Harmonia Protocol. All Rights Reserved.
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-zinc-600 text-[10px] font-black uppercase tracking-widest group">
                            Built with <Heart size={14} className="text-zinc-800 group-hover:text-red-600 transition-colors" /> by Vexanode
                        </div>
                        <div className="h-4 w-px bg-white/5 hidden md:block" />
                        <div className="hidden md:flex items-center gap-2 text-zinc-800 text-[9px] font-black uppercase tracking-[0.4em]">
                            Global_ID: {Math.random().toString(36).substring(7).toUpperCase()}
                        </div>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
}

function FooterLink({ href, label }: { href: string; label: string }) {
    return (
        <li>
            <Link
                href={href}
                className="text-xs font-bold text-zinc-500 hover:text-red-500 transition-colors flex items-center gap-2 group"
            >
                <div className="h-1 w-0 bg-red-600 transition-all group-hover:w-2" />
                {label}
            </Link>
        </li>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/5 text-zinc-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all active:scale-90"
        >
            {icon}
        </Link>
    );
}