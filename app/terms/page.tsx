'use client';

import { motion } from 'framer-motion';
import { Scale, AlertTriangle, CheckCircle2, ShieldAlert, Zap, Clock, Gavel, HelpCircle } from 'lucide-react';

export default function TermsPage() {
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
                <div className="absolute top-0 right-0 w-full h-[600px] bg-red-900/10 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay" />
            </div>

            <div className="max-w-4xl mx-auto px-6 py-24 relative z-10">

                {/* Header Section */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-red-500 mb-4"
                    >
                        <Gavel size={16} />
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase">User Agreement</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic leading-none mb-6"
                    >
                        TERMS OF <span className="text-red-600">SERVICE.</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-4"
                    >
                        <div className="flex items-center gap-2 text-zinc-600 bg-white/[0.02] border border-white/5 px-4 py-2 rounded-xl">
                            <Clock size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">
                                Updated: {new Date().toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-red-500/50 bg-red-500/5 border border-red-500/10 px-4 py-2 rounded-xl">
                            <Scale size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">v2.1 Protocol</span>
                        </div>
                    </motion.div>
                </div>

                {/* Content Sections */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-6"
                >
                    <TermsSection
                        icon={<CheckCircle2 size={20} />}
                        title="1. Acceptance"
                        content="By integrating the bot into your digital infrastructure or accessing its features, you formally acknowledge and accept the following binding conditions. Failure to comply results in immediate revocation of access."
                    />

                    <TermsSection
                        icon={<ShieldAlert size={20} />}
                        title="2. Usage Directive"
                        content="Users must adhere to the high-performance standards of the platform. Exploitation of system resources is strictly prohibited."
                        list={[
                            { label: 'Integrity', text: 'Do not attempt to reverse-engineer or exploit audio nodes.' },
                            { label: 'Compliance', text: 'All activity must align with Discord Community Guidelines.' },
                            { label: 'Safety', text: 'Illegal distribution of copyrighted streams is not permitted.' },
                            { label: 'Fair Use', text: 'Automation of bot commands via third-party scripts is restricted.' }
                        ]}
                    />

                    <TermsSection
                        icon={<Zap size={20} />}
                        title="3. Service Availability"
                        content="While we maintain an enterprise-grade 99.9% uptime target, services are provided 'as-is'. Maintenance windows may be deployed without prior notice to ensure system stability."
                    />

                    <TermsSection
                        icon={<AlertTriangle size={20} />}
                        title="4. Liability Limitation"
                        content="The development team and associated stakeholders are not responsible for data loss, server disruptions, or any indirect damages resulting from the use of our audio services."
                    />

                    {/* Support Link */}
                    <motion.div
                        variants={item}
                        className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col items-center text-center"
                    >
                        <div className="w-16 h-16 bg-red-600/10 rounded-3xl flex items-center justify-center text-red-500 mb-6">
                            <HelpCircle size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">Need Clarification?</h3>
                        <p className="text-zinc-500 text-sm max-w-sm mb-8 leading-relaxed">
                            Our legal and support teams are available to discuss specific terms or partnership agreements.
                        </p>
                        <button className="px-10 py-4 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-red-600 hover:text-white transition-all">
                            Open Support Ticket
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

function TermsSection({ icon, title, content, list }: any) {
    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.section
            variants={item}
            className="p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 hover:border-red-500/20 transition-all group"
        >
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-600/10 rounded-2xl text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all">
                    {icon}
                </div>
                <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">{title}</h2>
            </div>

            <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-medium">
                {content}
            </p>

            {list && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {list.map((li: any, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-black border border-white/[0.03]">
                            <div className="h-1.5 w-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0" />
                            <p className="text-[11px] text-zinc-400 leading-snug">
                                <span className="text-zinc-200 font-bold uppercase block mb-1">{li.label}</span>
                                {li.text}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </motion.section>
    );
}