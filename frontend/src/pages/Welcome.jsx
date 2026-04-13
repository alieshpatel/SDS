import React from 'react';
import { SignInButton } from "@clerk/clerk-react";
import { Building2, ShieldCheck, Home, ArrowRight, Zap, Users, Wallet, CheckCircle2, ChevronRight, LockKeyhole } from "lucide-react";

function Welcome() {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-orange-600 selection:text-white overflow-x-hidden">
      {/* Navbar - Glassmorphism */}
      <nav className="fixed w-full top-0 z-50 bg-[#050505]/70 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-2">
           <div className="relative flex items-center justify-center space-x-[2px] ml-2">
             <span className="text-white font-extrabold tracking-tighter text-2xl leading-none">s</span>
             <span className="text-white font-extrabold tracking-tighter text-2xl leading-none relative">d</span>
             <span className="text-orange-600 font-extrabold tracking-tighter text-2xl leading-none">s</span>
           </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-400">
             <a href="#features" className="hover:text-white transition">Features</a>
             <a href="#benefits" className="hover:text-white transition">Benefits</a>
             <a href="#testimonials" className="hover:text-white transition">Testimonials</a>
          </div>
          <SignInButton mode="modal">
            <button className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] transform hover:-translate-y-0.5">
              Access Portal
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-56 lg:pb-40 overflow-hidden flex items-center justify-center min-h-[95vh]">
        {/* Abstract Background Shapes */}
        <div className="absolute top-1/4 right-0 xl:right-1/4 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[120px] opacity-60 z-0 pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] opacity-60 z-0 pointer-events-none mix-blend-screen"></div>
        
        {/* Dotted Grid Overlay */}
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 font-semibold text-sm mb-10 animate-in slide-in-from-bottom-4 duration-700 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
              Society Management Redefined
           </div>
           
           <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.05] animate-in slide-in-from-bottom-6 duration-700 delay-100">
             Effortless Living. <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">Superior Management.</span>
           </h1>
           
           <p className="text-lg md:text-xl text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto animate-in slide-in-from-bottom-8 duration-700 delay-200 font-medium">
             SDS bridges the gap between administrators and residents through a single, elegant platform. Automate complex billing, track complaints, and modernize your community effortlessly.
           </p>
           
           <div className="flex flex-col sm:flex-row justify-center items-center gap-6 animate-in slide-in-from-bottom-10 duration-700 delay-300">
              <SignInButton mode="modal">
                <button className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-500 transition-all shadow-[0_0_30px_rgba(234,88,12,0.3)] hover:shadow-[0_0_40px_rgba(234,88,12,0.5)] transform hover:-translate-y-1 flex items-center gap-2">
                  Launch Platform <ArrowRight size={20} />
                </button>
              </SignInButton>
              <button className="bg-transparent text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:border-white/50 hover:bg-white/5 transition-all flex items-center gap-2">
                View Features <ChevronRight size={20} />
              </button>
           </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-32 bg-[#0a0a0a] relative z-10 border-t border-white/5">
         <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-20">
               <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">Powerful & Precise.</h2>
               <p className="text-slate-400 max-w-2xl mx-auto text-xl">Engineered specifically for Indian housing societies to eliminate 80% of manual administrative workload.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Feature 1 */}
               <div className="bg-[#111] border border-white/10 p-10 rounded-3xl hover:border-orange-500/30 hover:bg-[#1a1a1a] transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="bg-orange-500/10 text-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-orange-500/20">
                     <Wallet size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Financial Engine</h3>
                  <p className="text-slate-400 leading-relaxed text-lg">Instantly generate custom invoices, auto-calculate monthly dues, contra-entries matching, and track advanced online payments without legacy spreadsheets.</p>
               </div>

               {/* Feature 2 */}
               <div className="bg-[#111] border border-white/10 p-10 rounded-3xl hover:border-indigo-500/30 hover:bg-[#1a1a1a] transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="bg-indigo-500/10 text-indigo-400 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-indigo-500/20">
                     <Zap size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Issue Resolution</h3>
                  <p className="text-slate-400 leading-relaxed text-lg">Residents log property maintenance issues seamlessly. Administrators process, assign, prioritize, and resolve tickets transparently on mobile or desktop.</p>
               </div>

               {/* Feature 3 */}
               <div className="bg-[#111] border border-white/10 p-10 rounded-3xl hover:border-emerald-500/30 hover:bg-[#1a1a1a] transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="bg-emerald-500/10 text-emerald-400 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-emerald-500/20">
                     <LockKeyhole size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Secure Records</h3>
                  <p className="text-slate-400 leading-relaxed text-lg">Maintain exhaustive architectural and resident records including tenant details, family members, secure vehicle registrations, and ID proofs safely encrypted.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Split Section / Identity */}
      <section className="py-32 bg-[#050505] text-white overflow-hidden relative">
         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-indigo-600/10 rounded-r-full blur-[100px] pointer-events-none mix-blend-screen"></div>
         <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative z-10">
               <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tighter leading-[1.1]">Dual Interface.<br/>Uncompromising Usability.</h2>
               <p className="text-slate-400 text-xl mb-10 leading-relaxed font-light">
                 Finally, a platform that doesn't just cater to the front office. SDS provides an advanced dual-portal ecosystem ensuring clarity up and down the chain.
               </p>
               
               <ul className="space-y-5 mb-12 text-lg">
                 <li className="flex items-center gap-4"><CheckCircle2 className="text-orange-500 shrink-0" size={24}/> <span className="font-medium text-slate-300">Admin: Execute broad financial operations</span></li>
                 <li className="flex items-center gap-4"><CheckCircle2 className="text-orange-500 shrink-0" size={24}/> <span className="font-medium text-slate-300">Admin: Publish digital emergency board notices</span></li>
                 <li className="flex items-center gap-4"><CheckCircle2 className="text-indigo-400 shrink-0" size={24}/> <span className="font-medium text-slate-300">Resident: Rapid instant payment tracking metrics</span></li>
                 <li className="flex items-center gap-4"><CheckCircle2 className="text-indigo-400 shrink-0" size={24}/> <span className="font-medium text-slate-300">Resident: Track all personal religious donations dynamically</span></li>
               </ul>

               <SignInButton mode="modal">
                  <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all shadow-xl hover:shadow-[0_0_20px_rgba(234,88,12,0.3)]">Enter the Ecosystem</button>
               </SignInButton>
            </div>
            <div className="relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-indigo-600/20 rounded-3xl transform rotate-3 scale-105 opacity-80 blur-xl"></div>
               <img src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=2884&auto=format&fit=crop" alt="Structural aesthetic" className="relative z-10 rounded-3xl border border-white/5 shadow-2xl object-cover h-[600px] w-full grayscale-[20%] hover:grayscale-0 transition-all duration-700" />
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] py-12 border-t border-white/10">
         <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="relative flex items-center justify-center space-x-[2px] opacity-70">
                 <span className="text-white font-extrabold tracking-tighter text-2xl leading-none">s</span>
                 <span className="text-white font-extrabold tracking-tighter text-2xl leading-none relative">d</span>
                 <span className="text-orange-600 font-extrabold tracking-tighter text-2xl leading-none">s</span>
               </div>
            </div>
            <p className="text-slate-500 text-sm font-medium tracking-wide">© 2026 SDS Nexus Administration. All rights reserved.</p>
         </div>
      </footer>
    </div>
  );
}

export default Welcome;
