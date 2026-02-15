'use client';

import useSWR from 'swr';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Terminal, Zap, ChevronRight, Hash } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Command {
    name: string;
    description: string;
    category: string;
    aliases: string[];
    usage: string;
}

export default function CommandsPage() {
    const { data: commands, error } = useSWR<Command[]>('http://miami.vexanode.cloud:2000/api/commands', fetcher);
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState('');

    const isLoading = !commands && !error;

    const categories = useMemo(() =>
        ['All', ...Array.from(new Set(commands?.map((c) => c.category) || []))],
        [commands]
    );

    const filteredCommands = useMemo(() => {
        return commands?.filter((cmd) => {
            const matchesCategory = activeCategory === 'All' || cmd.category === activeCategory;
            const matchesSearch =
                cmd.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cmd.description?.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [commands, activeCategory, searchTerm]);

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-300 selection:bg-red-500/30">

            {/* Optimized Background (No heavy blur) */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#450a0a,transparent)]" />
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">

                {/* Compact Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-2 text-red-500 mb-2">
                        <Terminal size={14} />
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase">Library</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                        Commands<span className="text-red-600">.</span>
                    </h1>
                </div>

                {/* Search & Tabs (Tighter) */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                        <input
                            type="text"
                            placeholder="Find a command..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-red-500/40 transition-all"
                        />
                    </div>
                    <div className="flex gap-1.5 overflow-x-auto no-scrollbar max-w-full md:max-w-md">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all whitespace-nowrap border ${activeCategory === category
                                    ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/20'
                                    : 'bg-white/5 border-white/5 text-zinc-500 hover:text-zinc-300'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Commands Grid (Small Cards - 4 Columns) */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="h-32 bg-white/5 border border-white/5 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredCommands?.map((cmd) => (
                            <motion.div
                                key={cmd.name}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="group bg-[#0a0a0a] border border-white/5 p-5 rounded-2xl hover:border-red-500/40 transition-colors relative"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="p-2 bg-red-600/10 rounded-lg text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all">
                                        <Hash size={14} />
                                    </div>
                                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest bg-black px-2 py-0.5 rounded border border-white/5">
                                        {cmd.category}
                                    </span>
                                </div>

                                <h3 className="text-base font-black text-white mb-1 uppercase tracking-tighter">
                                    {cmd.name}
                                </h3>

                                <p className="text-zinc-500 text-xs mb-4 line-clamp-2 leading-relaxed h-8">
                                    {cmd.description}
                                </p>

                                <div className="bg-black/50 rounded-lg p-2 border border-white/5 mb-2">
                                    <div className="flex items-center gap-1.5 text-zinc-700 text-[9px] font-bold uppercase mb-1">
                                        <Zap size={10} className="text-red-600" /> Usage
                                    </div>
                                    <code className="text-[10px] text-red-400 font-mono block truncate">
                                        /{cmd.name} {cmd.usage}
                                    </code>
                                </div>

                                {cmd.aliases && cmd.aliases.length > 0 && (
                                    <p className="text-[9px] text-zinc-600 font-medium truncate">
                                        Aliases: {cmd.aliases.join(', ')}
                                    </p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && filteredCommands?.length === 0 && (
                    <div className="text-center py-20 text-zinc-600 border border-dashed border-white/5 rounded-[2rem]">
                        <p className="text-sm font-black uppercase italic">No matches in current category</p>
                    </div>
                )}
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}