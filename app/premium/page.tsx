'use client';

import { Check, Star, Zap, Crown, ShieldCheck, Flame, Disc } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PremiumPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-zinc-300 selection:bg-red-500/30 overflow-x-hidden">

            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-10%,#450a0a,transparent)]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay" />
            </div>

            <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">

                {/* Compact Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/5 border border-red-500/20 text-red-500 text-[10px] font-black tracking-[0.3em] uppercase mb-6"
                    >
                        <Star size={12} className="fill-red-500" />
                        Premium Experience
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase italic leading-none"
                    >
                        UNLIMITED <span className="text-red-600">AUDIO.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto font-medium"
                    >
                        Ditch the limits. Experience studio-grade 256kbps audio,
                        exclusive filters, and 24/7 persistence for your community.
                    </motion.p>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

                    {/* Free Tier */}
                    <PricingCard
                        title="Standard"
                        icon={<Zap size={20} />}
                        price="0"
                        description="Essential tools for small groups."
                        features={[
                            'Standard 128kbps Audio',
                            'Basic Audio Filters',
                            '99.9% Core Uptime',
                            'Community Support'
                        ]}
                    />

                    {/* Pro Tier (Highlighted) */}
                    <PricingCard
                        title="Elite"
                        icon={<Flame size={20} />}
                        price="4.99"
                        description="Professional quality for growing servers."
                        features={[
                            'Everything in Standard',
                            'Master-Grade 256kbps Audio',
                            'Volume & Pitch Control',
                            '24/7 Voice Persistence',
                            'No Vote Requirement',
                            'Custom Command Aliases'
                        ]}
                        highlight
                    />

                    {/* Ultimate Tier */}
                    <PricingCard
                        title="Supreme"
                        icon={<Crown size={20} />}
                        price="9.99"
                        description="The ultimate setup for large networks."
                        features={[
                            'Everything in Elite',
                            'Priority Processing Nodes',
                            'Early Access Features',
                            'Personalized Support',
                            'Global Profile Badge',
                            'Multi-Guild Premium'
                        ]}
                    />
                </div>

                {/* Bottom Trust Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 flex flex-col items-center justify-center p-8 border border-white/5 bg-white/[0.01] rounded-[2.5rem]"
                >
                    <div className="flex gap-8 mb-6 opacity-40">
                        <ShieldCheck size={32} />
                        <Disc size={32} />
                        <Zap size={32} />
                    </div>
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">Secure checkout powered by UPI & BINANCE</p>
                </motion.div>
            </div>
        </div>
    );
}

function PricingCard({ title, price, description, features, icon, highlight = false }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className={`relative p-8 rounded-[2.5rem] border transition-all flex flex-col ${highlight
                ? 'border-red-600/40 bg-[#0a0a0a] shadow-[0_20px_50px_-15px_rgba(220,38,38,0.2)] z-10'
                : 'border-white/5 bg-white/[0.02]'
                }`}
        >
            {highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest uppercase">
                    Most Popular
                </div>
            )}

            <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl ${highlight ? 'bg-red-600 text-white' : 'bg-white/5 text-zinc-500'}`}>
                    {icon}
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Monthly</p>
                    <div className="flex items-baseline justify-end">
                        <span className="text-sm font-bold text-zinc-500 mr-1">$</span>
                        <span className="text-3xl font-black text-white">{price}</span>
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight italic">{title}</h3>
            <p className="text-zinc-500 text-xs mb-8 font-medium leading-relaxed">{description}</p>

            <ul className="space-y-4 mb-10 flex-grow">
                {features.map((feature: string) => (
                    <li key={feature} className="flex items-start gap-3">
                        <div className={`mt-1 flex-shrink-0 ${highlight ? 'text-red-500' : 'text-zinc-700'}`}>
                            <Check size={14} strokeWidth={3} />
                        </div>
                        <span className="text-xs text-zinc-400 font-medium">{feature}</span>
                    </li>
                ))}
            </ul>

            <Link
                href="#"
                className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all text-center ${highlight
                    ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-900/20'
                    : 'bg-white/5 text-white hover:bg-white/10'
                    }`}
            >
                Upgrade Now
            </Link>
        </motion.div>
    );
}