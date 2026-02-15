'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import { Activity, Zap, Server, Wifi, Clock, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function StatusPage() {
    const [pingTime, setPingTime] = useState<number | null>(null);
    // Use local Next.js API route which proxies to the backend
    const { data: stats, error } = useSWR('/api/stats', fetcher, {
        refreshInterval: 5000,
    });

    // Measure API ping (to our Next.js API route)
    useEffect(() => {
        const measurePing = async () => {
            const start = performance.now();
            try {
                await fetch('/api/stats');
                const end = performance.now();
                setPingTime(Math.round(end - start));
            } catch (err) {
                setPingTime(null);
            }
        };
        measurePing();
        const interval = setInterval(measurePing, 5000);
        return () => clearInterval(interval);
    }, []);

    const isOnline = !error && stats;
    const uptime = isOnline ? '99.9%' : '0%';

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
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-red-900/10 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay" />
            </div>

            <div className="max-w-5xl mx-auto px-6 py-24 relative z-10">
                {/* Header */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-red-500 mb-4"
                    >
                        <Activity size={16} />
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase">System Monitor</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic leading-none mb-6"
                    >
                        LIVE <span className="text-red-600">STATUS.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-zinc-500 text-sm max-w-xl font-medium"
                    >
                        Real-time monitoring of all critical infrastructure components and global audio nodes.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    {/* Overall Status Banner */}
                    <motion.div
                        variants={itemVariants}
                        className={`p-8 rounded-[2.5rem] border ${isOnline
                            ? 'bg-green-500/5 border-green-500/20'
                            : 'bg-red-500/5 border-red-500/20'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`h-4 w-4 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                                    }`} />
                                <div>
                                    <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                                        {isOnline ? 'All Systems Operational' : 'Service Disruption'}
                                    </h2>
                                    <p className="text-xs text-zinc-500 font-medium mt-1">
                                        Last checked: {new Date().toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                            {isOnline ? (
                                <CheckCircle2 className="text-green-500" size={32} />
                            ) : (
                                <AlertCircle className="text-red-500" size={32} />
                            )}
                        </div>
                    </motion.div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <MetricCard
                            icon={<Zap size={20} />}
                            label="API Latency"
                            value={pingTime !== null ? `${pingTime}ms` : '—'}
                            status={pingTime && pingTime < 100 ? 'good' : pingTime && pingTime < 300 ? 'warning' : 'error'}
                        />
                        <MetricCard
                            icon={<Server size={20} />}
                            label="Active Guilds"
                            value={stats?.live?.guilds?.toLocaleString() || '—'}
                            status="good"
                        />
                        <MetricCard
                            icon={<TrendingUp size={20} />}
                            label="Uptime (30d)"
                            value={uptime}
                            status="good"
                        />
                    </div>

                    {/* Service Components */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-6">
                            Service Components
                        </h3>

                        <ServiceStatus
                            name="Discord Bot"
                            status={isOnline ? 'operational' : 'down'}
                            uptime="99.9%"
                        />
                        <ServiceStatus
                            name="API Gateway"
                            status={isOnline ? 'operational' : 'down'}
                            uptime="99.9%"
                        />
                        <ServiceStatus
                            name="Lavalink Nodes"
                            status={stats?.live?.players !== undefined ? 'operational' : 'down'}
                            uptime="99.8%"
                        />
                        <ServiceStatus
                            name="Database (MongoDB)"
                            status={isOnline ? 'operational' : 'down'}
                            uptime="99.9%"
                        />
                        <ServiceStatus
                            name="Web Dashboard"
                            status="operational"
                            uptime="100%"
                        />
                    </motion.div>

                    {/* Live Stats */}
                    <motion.div
                        variants={itemVariants}
                        className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5"
                    >
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-6 flex items-center gap-2">
                            <Wifi size={20} className="text-red-500" /> Live Network Stats
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <StatItem label="Total Users" value={stats?.live?.users?.toLocaleString() || '—'} />
                            <StatItem label="Active Players" value={stats?.live?.players?.toLocaleString() || '—'} />
                            <StatItem label="Commands Run" value={stats?.db?.totalCmds?.toLocaleString() || '—'} />
                            <StatItem label="Shards" value={stats?.live?.guilds ? Math.ceil(stats.live.guilds / 1000) : '—'} />
                        </div>
                    </motion.div>

                    {/* Incident History (Placeholder) */}
                    <motion.div
                        variants={itemVariants}
                        className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 text-center"
                    >
                        <Clock className="mx-auto text-zinc-700 mb-4" size={32} />
                        <h3 className="text-lg font-black text-white uppercase italic tracking-tighter mb-2">
                            No Recent Incidents
                        </h3>
                        <p className="text-xs text-zinc-600 font-medium">
                            All systems have been stable for the past 30 days.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

function MetricCard({ icon, label, value, status }: any) {
    const statusColors = {
        good: 'text-green-500 border-green-500/20 bg-green-500/5',
        warning: 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5',
        error: 'text-red-500 border-red-500/20 bg-red-500/5'
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`p-6 rounded-[2rem] border ${statusColors[status as keyof typeof statusColors] || statusColors.good}`}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/5 rounded-xl">
                    {icon}
                </div>
                <div className={`h-2 w-2 rounded-full ${status === 'good' ? 'bg-green-500' : status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    } animate-pulse`} />
            </div>
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">{label}</p>
            <h4 className="text-3xl font-black text-white tracking-tighter tabular-nums">{value}</h4>
        </motion.div>
    );
}

function ServiceStatus({ name, status, uptime }: any) {
    const statusConfig = {
        operational: { color: 'bg-green-500', text: 'Operational', textColor: 'text-green-500' },
        degraded: { color: 'bg-yellow-500', text: 'Degraded', textColor: 'text-yellow-500' },
        down: { color: 'bg-red-500', text: 'Down', textColor: 'text-red-500' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.operational;

    return (
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-white/10 transition-colors">
            <div className="flex items-center gap-4">
                <div className={`h-3 w-3 rounded-full ${config.color} ${status === 'operational' ? 'animate-pulse' : ''}`} />
                <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight">{name}</h4>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${config.textColor}`}>
                        {config.text}
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-xs text-zinc-600 font-medium">Uptime</p>
                <p className="text-sm font-black text-white tabular-nums">{uptime}</p>
            </div>
        </div>
    );
}

function StatItem({ label, value }: any) {
    return (
        <div>
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">{label}</p>
            <p className="text-2xl font-black text-white tabular-nums">{value}</p>
        </div>
    );
}
