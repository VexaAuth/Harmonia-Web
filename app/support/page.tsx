'use client';

import { motion } from 'framer-motion';
import { MessageSquare, HelpCircle, Zap, ExternalLink, Shield, Users, Headphones } from 'lucide-react';
import Link from 'next/link';

export default function SupportPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-300 selection:bg-red-500/30 overflow-x-hidden">
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
                <div className="absolute top-0 right-0 w-full h-[500px] bg-red-900/10 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay" />
            </div>

            <div className="max-w-5xl mx-auto px-6 py-24 relative z-10">
                {/* Header */}
                <div className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/5 border border-red-500/20 text-red-500 text-[10px] font-black tracking-[0.3em] uppercase mb-6"
                    >
                        <Headphones size={12} />
                        24/7 Support
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic leading-none mb-6"
                    >
                        GET <span className="text-red-600">HELP.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-zinc-500 text-sm md:text-base max-w-2xl mx-auto font-medium"
                    >
                        Our dedicated support team is ready to assist you with any questions,
                        technical issues, or feature requests.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    {/* Primary Support - Discord */}
                    <motion.div
                        variants={itemVariants}
                        className="p-10 rounded-[2.5rem] bg-gradient-to-br from-red-600/10 to-transparent border border-red-500/20 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <MessageSquare size={120} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-red-600 rounded-2xl">
                                    <MessageSquare className="text-white" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                                        Discord Support Server
                                    </h2>
                                    <p className="text-xs text-red-500 font-bold uppercase tracking-widest">
                                        Recommended • Fastest Response
                                    </p>
                                </div>
                            </div>

                            <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-2xl">
                                Join our official Discord server for instant support from our team and community.
                                Get help with setup, troubleshooting, feature requests, and more.
                            </p>

                            <Link
                                href="https://discord.gg/ZhTecu5aFz"
                                target="_blank"
                                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] active:scale-95"
                            >
                                <MessageSquare size={18} />
                                Join Support Server
                                <ExternalLink size={16} />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Support Resources Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SupportCard
                            icon={<HelpCircle size={24} />}
                            title="Documentation"
                            description="Browse our comprehensive guides and tutorials for common questions and setup instructions."
                            link="#"
                            linkText="View Docs"
                        />

                        <SupportCard
                            icon={<Shield size={24} />}
                            title="Report Issues"
                            description="Found a bug or security vulnerability? Report it directly to our development team."
                            link="https://discord.gg/ZhTecu5aFz"
                            linkText="Report Issue"
                            external
                        />

                        <SupportCard
                            icon={<Zap size={24} />}
                            title="Feature Requests"
                            description="Have an idea to improve Harmonia? We'd love to hear your suggestions and feedback."
                            link="https://discord.gg/ZhTecu5aFz"
                            linkText="Submit Idea"
                            external
                        />

                        <SupportCard
                            icon={<Users size={24} />}
                            title="Community Forum"
                            description="Connect with other users, share playlists, and learn tips and tricks from the community."
                            link="https://discord.gg/ZhTecu5aFz"
                            linkText="Join Community"
                            external
                        />
                    </div>

                    {/* FAQ Section */}
                    <motion.div
                        variants={itemVariants}
                        className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5"
                    >
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-8">
                            Frequently Asked Questions
                        </h3>

                        <div className="space-y-6">
                            <FAQItem
                                question="How do I invite Harmonia to my server?"
                                answer="Click the 'Add to Discord' button on our homepage and select your server from the dropdown menu. Make sure you have 'Manage Server' permissions."
                            />
                            <FAQItem
                                question="Why isn't the bot playing music?"
                                answer="Ensure the bot has proper permissions (Connect, Speak, View Channel) and that you're in a voice channel. Check our status page for any ongoing issues."
                            />
                            <FAQItem
                                question="How do I get premium features?"
                                answer="Visit our Premium page to view available plans. Premium unlocks higher audio quality, custom filters, and priority support."
                            />
                            <FAQItem
                                question="Can I customize the bot's prefix?"
                                answer="Yes! Use the /settings command to change the prefix, music channel, and other server-specific configurations."
                            />
                        </div>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        variants={itemVariants}
                        className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 text-center"
                    >
                        <Shield className="mx-auto text-red-500 mb-4" size={32} />
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-2">
                            Need Urgent Assistance?
                        </h3>
                        <p className="text-zinc-500 text-sm mb-6 max-w-md mx-auto">
                            For critical issues or partnership inquiries, contact our team directly.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                href="https://discord.gg/ZhTecu5aFz"
                                target="_blank"
                                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                            >
                                Discord DM
                            </Link>
                            <Link
                                href="/status"
                                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                            >
                                Check Status
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

function SupportCard({ icon, title, description, link, linkText, external }: any) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 hover:border-red-500/20 transition-all group"
        >
            <div className="p-3 bg-red-600/10 rounded-2xl text-red-500 w-fit mb-6 group-hover:bg-red-600 group-hover:text-white transition-all">
                {icon}
            </div>
            <h3 className="text-lg font-black text-white uppercase italic tracking-tighter mb-3">
                {title}
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-medium">
                {description}
            </p>
            <Link
                href={link}
                target={external ? '_blank' : undefined}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors"
            >
                {linkText}
                {external && <ExternalLink size={12} />}
            </Link>
        </motion.div>
    );
}

function FAQItem({ question, answer }: any) {
    return (
        <div className="p-6 rounded-2xl bg-black/40 border border-white/[0.03]">
            <h4 className="text-sm font-black text-white uppercase tracking-tight mb-3">
                {question}
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                {answer}
            </p>
        </div>
    );
}
