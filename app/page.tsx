'use client';

import useSWR from 'swr';
import { motion } from 'framer-motion';
import { Server, Users, Music, Activity, Command, Disc, Flame, Crown, Zap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// FIXED: Robust Discord CDN URL builder for both Users and Servers
const getDiscordAsset = (id: string, hash: string | null, type: 'avatars' | 'icons') => {
  if (!hash) return null;
  // If the API already provides a full URL, use it
  if (hash.startsWith('http')) return hash;
  // Build the official Discord CDN link (supports GIFs if hash starts with a_)
  const extension = hash.startsWith('a_') ? 'gif' : 'png';
  return `https://cdn.discordapp.com/${type}/${id}/${hash}.${extension}?size=512`;
};

export default function Home() {
  const { data: stats, error } = useSWR('http://miami.vexanode.cloud:2000/api/stats', fetcher, {
    refreshInterval: 5000,
  });

  const isLoading = !stats && !error;

  // Animation variants for a "Welcome" feel
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-500/30 overflow-x-hidden">

      {/* Visual Decor: Red Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-900/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-800/10 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* Hero Section */}
        <section className="pt-28 pb-20 px-6 text-center">
          <motion.div variants={itemVars} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black tracking-[0.3em] uppercase mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            System Status: Operational
          </motion.div>

          <motion.h1 variants={itemVars} className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9]">
            BEAT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-500 to-red-700 drop-shadow-[0_0_30px_rgba(220,38,38,0.3)]">
              SUPREME
            </span>
          </motion.h1>

          <motion.p variants={itemVars} className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Elevate your Discord experience with high-fidelity audio and seamless
            management. Trusted by the world's largest communities.
          </motion.p>

          <motion.div variants={itemVars} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#" className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-2xl text-lg font-black transition-all hover:scale-105 shadow-[0_15px_30px_-10px_rgba(220,38,38,0.5)] flex items-center justify-center gap-3">
              <Disc className="animate-[spin_4s_linear_infinite]" /> ADD TO DISCORD
            </Link>
            <Link href="#" className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white px-10 py-4 rounded-2xl text-lg font-black transition-all flex items-center justify-center gap-3">
              <Zap size={20} className="text-red-500" /> COMMANDS
            </Link>
          </motion.div>
        </section>

        {/* Stats Grid */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard icon={Server} label="Guilds" value={stats?.live?.guilds} loading={isLoading} />
            <StatCard icon={Users} label="Listeners" value={stats?.live?.users} loading={isLoading} />
            <StatCard icon={Music} label="Players" value={stats?.live?.players} loading={isLoading} />
            <StatCard icon={Activity} label="Latency" value="14ms" loading={isLoading} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">

            {/* POWER USER CARD - FIXED AVATAR */}
            <motion.div variants={itemVars} className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Crown size={120} />
              </div>
              <p className="text-red-500 font-black text-xs tracking-widest uppercase mb-6">GLOBAL RANK #1</p>

              <div className="flex items-center gap-6">
                <div className="relative h-24 w-24 flex-shrink-0">
                  <div className="absolute inset-0 bg-red-600 blur-2xl opacity-20 group-hover:opacity-40" />
                  {getDiscordAsset(stats?.db?.topUser?.id, stats?.db?.topUser?.avatar, 'avatars') ? (
                    <img
                      src={getDiscordAsset(stats?.db?.topUser?.id, stats?.db?.topUser?.avatar, 'avatars')!}
                      className="relative h-full w-full rounded-full object-cover border-4 border-[#0a0a0a]"
                      alt="User Avatar"
                    />
                  ) : (
                    <div className="relative h-full w-full rounded-full bg-zinc-900 flex items-center justify-center border-4 border-[#0a0a0a]">
                      <Users size={32} />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white mb-2">{stats?.db?.topUser?.username || 'Legendary User'}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-mono text-zinc-500 border border-white/5 uppercase">
                      ID: {stats?.db?.topUser?.id || 'Unknown'}
                    </span>
                    <span className="px-3 py-1 bg-red-600/10 text-red-500 rounded-lg text-[10px] font-black uppercase">
                      {stats?.db?.topUser?.count || 0} Commands Run
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* TRENDING TRACK */}
            <motion.div variants={itemVars} className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between group">
              <div>
                <p className="text-zinc-500 font-black text-xs tracking-widest uppercase mb-6 flex items-center gap-2">
                  <Flame size={16} className="text-orange-500" /> Trending This Week
                </p>
                <h3 className="text-3xl font-black text-white group-hover:text-red-500 transition-colors">
                  {stats?.db?.mostPlayedSong?.title || 'No Tracks Active'}
                </h3>
                <p className="text-zinc-500 font-bold mt-1 uppercase tracking-tight">
                  By {stats?.db?.mostPlayedSong?.author || 'Various Artists'}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">Global Streams</span>
                <span className="text-2xl font-black tabular-nums">{stats?.db?.mostPlayedSong?.plays || 0}</span>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Top Servers Marquee */}
        <section className="py-20 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 mb-12 flex items-center justify-between">
            <h2 className="text-2xl font-black italic tracking-tighter">ELITE COMMUNITIES</h2>
            <div className="h-px flex-1 mx-8 bg-gradient-to-r from-white/5 to-transparent" />
            <ShieldCheck className="text-red-600" />
          </div>

          <div className="flex gap-6 animate-marquee">
            {[...(stats?.topServers || []), ...(stats?.topServers || [])].map((server: any, i: number) => {
              const serverIcon = getDiscordAsset(server.id, server.icon, 'icons');
              return (
                <div key={i} className="flex-none w-[320px] bg-white/[0.02] border border-white/5 p-6 rounded-3xl flex items-center gap-5 group hover:border-red-500/30 transition-all">
                  <div className="h-14 w-14 flex-shrink-0 relative">
                    {serverIcon ? (
                      <img src={serverIcon} className="h-full w-full rounded-2xl object-cover" alt="S" />
                    ) : (
                      <div className="h-full w-full rounded-2xl bg-red-600 flex items-center justify-center font-black text-xl">
                        {server.name?.[0]}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-white text-lg truncate uppercase">{server.name}</p>
                    <p className="text-zinc-500 text-xs font-bold flex items-center gap-2">
                      <Users size={12} className="text-red-500" /> {server.memberCount?.toLocaleString()} MEMBERS
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </motion.div>

      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, loading }: any) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] group transition-all"
    >
      <div className="h-12 w-12 bg-white/[0.03] rounded-2xl flex items-center justify-center mb-6 group-hover:text-red-500 transition-colors">
        <Icon size={24} />
      </div>
      <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{label}</p>
      {loading ? (
        <div className="h-10 w-24 bg-white/5 animate-pulse rounded-lg" />
      ) : (
        <h4 className="text-4xl font-black text-white tracking-tighter tabular-nums">
          {typeof value === 'number' ? value.toLocaleString() : value || '0'}
        </h4>
      )}
    </motion.div>
  );
}