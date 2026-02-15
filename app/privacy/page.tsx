'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, Trash2, Globe, Clock, ChevronRight } from 'lucide-react';

export default function PrivacyPage() {
    // Animation Variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-300 selection:bg-red-500/30 overflow-x-hidden">

            {/* Ambient Background Glows */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-red-900/10 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay" />
            </div>

            <div className="max-w-4xl mx-auto px-6 py-24 relative z-10">

                {/* Header Section */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-red-500 mb-4"
                    >
                        <Shield size={16} />
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase">Security Protocol</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic leading-none mb-6"
                    >
                        PRIVACY <span className="text-red-600">POLICY.</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-4 text-zinc-600 bg-white/[0.02] border border-white/5 w-fit px-4 py-2 rounded-xl"
                    >
                        <Clock size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                            Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                    </motion.div>
                </div>

                {/* Content Sections */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-6"
                >
                    <PrivacySection
                        icon={<Database size={20} />}
                        title="1. Data Collection"
                        content="We collect only the essential metadata required to ensure high-performance audio delivery and user-specific configurations."
                        list={[
                            { label: 'Identifiers', text: 'Discord User IDs & Guild IDs for profile synchronization.' },
                            { label: 'Voice Data', text: 'Voice Channel IDs (We never record audio content).' },
                            { label: 'Analytics', text: 'Command execution counts to optimize bot response times.' },
                            { label: 'Metadata', text: 'Server names and icons for dashboard visualization.' }
                        ]}
                    />

                    <PrivacySection
                        icon={<Eye size={20} />}
                        title="2. Data Utilization"
                        content="Your data is strictly used for internal operational purposes. We maintain a zero-tolerance policy regarding the sale or trade of user information."
                        list={[
                            { label: 'Optimization', text: 'Improving playback stability across different regions.' },
                            { label: 'Security', text: 'Preventing bot abuse and ensuring service availability.' },
                            { label: 'Features', text: 'Managing global premium status and user-specific playlists.' }
                        ]}
                    />

                    <PrivacySection
                        icon={<Trash2 size={20} />}
                        title="3. Retention & Deletion"
                        content="We believe you should have total control over your digital footprint. Data is stored only as long as the service is active in your server."
                        list={[
                            { label: 'Removal', text: 'Data is automatically flagged for deletion if the bot leaves a server.' },
                            { label: 'Manual Request', text: 'Users can request an immediate purge of their personal metadata via our support portal.' }
                        ]}
                    />

                    <PrivacySection
                        icon={<Globe size={20} />}
                        title="4. Third-Party Integration"
                        content="Our service interfaces with external APIs to provide music content. These platforms have independent privacy regulations."
                        list={[
                            { label: 'YouTube/Spotify', text: 'Content is fetched via public APIs; no personal credentials are shared.' },
                            { label: 'Lavalink', text: 'Audio nodes process stream data securely and transiently.' }
                        ]}
                    />

                    {/* Contact CTA */}
                    <motion.div
                        variants={item}
                        className="mt-12 p-8 rounded-[2rem] bg-gradient-to-br from-red-600/10 to-transparent border border-red-500/20 text-center"
                    >
                        <Lock className="mx-auto text-red-500 mb-4" size={32} />
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-2">Have Questions?</h3>
                        <p className="text-zinc-500 text-sm mb-6 max-w-md mx-auto">
                            If you have concerns regarding your data or wish to exercise your privacy rights, please join our encrypted support channel.
                        </p>
                        <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all">
                            Contact Security Team
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

function PrivacySection({ icon, title, content, list }: any) {
    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.section
            variants={item}
            className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group"
        >
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-600/10 rounded-2xl text-red-500 group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">{title}</h2>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-medium">
                {content}
            </p>

            <div className="space-y-3">
                {list.map((li: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-black/40 border border-white/[0.03]">
                        <ChevronRight size={14} className="text-red-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-zinc-500 leading-relaxed">
                            <span className="text-zinc-300 font-bold uppercase tracking-tighter mr-2">{li.label}:</span>
                            {li.text}
                        </p>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}