import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const cars = [
  {
    id: 1,
    name: "Lexus LX 600",
    brand: "Lexus",
    color: "#6b0617", // deep elegant red
    image: "/red-suv.png",
    features: ["3.5L V6 Twin-Turbo", "409 HP / 479 lb-ft torque", "Full-Time 4WD System", "Mark Levinson 3D Audio"]
  },
  {
    id: 2,
    name: "AMG G 63",
    brand: "Mercedes-Benz",
    color: "#0c2b5e", // deep ocean blue
    image: "/blue-suv.png",
    features: ["Handcrafted AMG 4.0L V8", "577 HP / 627 lb-ft torque", "0-60 mph in 4.5s", "3 Locking Differentials"]
  },
  {
    id: 3,
    name: "X5 M Comp.",
    brand: "BMW",
    color: "#736000", // deep warm gold/yellow
    image: "/yellow-suv.png",
    features: ["4.4L M TwinPower Turbo V8", "617 HP All-Wheel Drive", "0-60 mph in 3.7s", "M Sport Exhaust System"]
  },
  {
    id: 4,
    name: "Land Cruiser",
    brand: "Toyota",
    color: "#141414", // dark graphite black
    image: "/black-suv.png",
    features: ["i-FORCE MAX Hybrid", "326 HP / 465 lb-ft torque", "Full-Time 4WD with CRAWL", "Multi-Terrain Select"]
  }
];

const BrandLogo = ({ brand }: { brand: string }) => {
  switch (brand) {
    case "Lexus":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-10 fill-none stroke-white" strokeWidth="5">
          <ellipse cx="50" cy="50" rx="46" ry="32" />
          <path d="M 55 25 L 40 25 L 40 65 A 10 10 0 0 0 50 75 L 70 75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "Mercedes-Benz":
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 fill-none stroke-white" strokeWidth="4">
          <circle cx="50" cy="50" r="46" />
          <path d="M50 4 L50 50 L12 73 M50 50 L88 73" />
        </svg>
      );
    case "BMW":
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <circle cx="50" cy="50" r="46" className="stroke-white fill-none" strokeWidth="4" />
          <path d="M50 4 A46 46 0 0 1 96 50 L50 50 Z" className="fill-white" />
          <path d="M50 96 A46 46 0 0 1 4 50 L50 50 Z" className="fill-white" />
        </svg>
      );
    case "Toyota":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-10 fill-none stroke-white" strokeWidth="5">
          <ellipse cx="50" cy="50" rx="46" ry="32" />
          <ellipse cx="50" cy="40" rx="30" ry="20" />
          <ellipse cx="50" cy="50" rx="10" ry="25" />
        </svg>
      );
    default:
      return null;
  }
};

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextCar = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % cars.length);
  };

  const prevCar = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + cars.length) % cars.length);
  };

  return (
    <motion.div 
      className="relative w-screen h-screen overflow-hidden text-white font-sans flex flex-col selection:bg-white/20 selection:text-white"
      animate={{ backgroundColor: cars[activeIndex].color }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
       {/* 1. Blurred background cars */}
       <div className="absolute inset-0 pointer-events-none filter blur-[40px] opacity-30 mix-blend-screen scale-[1.2] z-0">
          <img src={cars[0].image} alt="" className="absolute -top-[10%] -left-[10%] w-[60%] object-contain opacity-60 transform -rotate-12" />
          <img src={cars[1].image} alt="" className="absolute -bottom-[20%] right-[10%] w-[70%] object-contain opacity-60 transform rotate-6" />
          <img src={cars[2].image} alt="" className="absolute top-[10%] -right-[10%] w-[50%] object-contain opacity-50 transform rotate-12" />
          <img src={cars[3].image} alt="" className="absolute bottom-[10%] -left-[20%] w-[50%] object-contain opacity-40 transform -rotate-6" />
       </div>

       {/* 2. SUVS Overlay Header Text */}
       <div className="absolute top-[8%] md:top-[12%] left-0 w-full flex justify-center pointer-events-none z-10">
          <h1 className="text-[25vw] md:text-[22vw] font-display font-black text-white/10 uppercase tracking-tighter leading-none select-none">
            SUVS
          </h1>
       </div>

       {/* Top Nav Minimal */}
       <nav className="relative z-40 w-full px-8 md:px-12 py-8 flex justify-between items-center h-[100px]">
         <div className="flex items-center justify-center pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={cars[activeIndex].brand}
                initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 20 }}
                transition={{ duration: 0.5 }}
                className="drop-shadow-lg"
              >
                <BrandLogo brand={cars[activeIndex].brand} />
              </motion.div>
            </AnimatePresence>
         </div>
         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <span className="text-[10px] md:text-sm font-mono font-bold uppercase tracking-[0.8em] md:tracking-[1.2em] text-white/80">
              Josiah Johnmark
            </span>
         </div>
         <div className="flex gap-4 items-center">
            <button className="text-white/70 hover:text-white transition-all duration-300 text-sm font-semibold tracking-wide uppercase cursor-pointer backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95">
              Menu
            </button>
         </div>
       </nav>

       {/* Main Content Area */}
       <div className="relative z-30 flex-1 grid grid-cols-1 md:grid-cols-12 px-8 md:px-12 lg:px-24">
          
          {/* Left panel: Info & Navigation */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-end md:justify-center h-full z-40 pb-12 md:pb-0 order-2 md:order-1 pt-10 md:pt-0 pointer-events-auto">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeIndex}
                 initial={{ opacity: 0, y: 15 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -15 }}
                 transition={{ duration: 0.4, ease: "easeOut" }}
                 className="flex flex-col items-start"
               >
                 <div className="mb-4 w-12 h-1 bg-white/40 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                 
                 <p className="text-white/60 text-xs font-bold tracking-[0.3em] uppercase mb-3 pl-1 drop-shadow-md">
                   {cars[activeIndex].brand}
                 </p>
                 
                 <div className="relative inline-block mb-10 group cursor-default">
                   {/* Liquid Glass Background */}
                   <div className="absolute -inset-x-6 -inset-y-3 bg-white/5 backdrop-blur-xl border-t border-l border-white/30 border-b border-r border-white/10 rounded-2xl shadow-[inset_0_0_20px_rgba(255,255,255,0.05),0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-500 -z-10 group-hover:bg-white/15 group-hover:scale-105" />
                   
                   <h2 className="text-4xl lg:text-5xl 2xl:text-6xl font-display font-bold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40 drop-shadow-sm transition-transform duration-500 group-hover:scale-105 origin-left">
                     {cars[activeIndex].name}
                   </h2>
                 </div>
                 
                 <div className="space-y-5 mb-12 w-full max-w-sm">
                   {cars[activeIndex].features.map((feature, i) => (
                     <div key={i} className="flex flex-col relative group/feature transition-all duration-300 hover:translate-x-2 cursor-default">
                       <span className="text-white/40 text-[10px] font-mono tracking-widest uppercase mb-1.5 flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover/feature:bg-white/80 transition-colors shadow-[0_0_10px_rgba(255,255,255,0)] group-hover/feature:shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                         Feature 0{i + 1}
                       </span>
                       <span className="text-white/90 font-medium text-sm md:text-base border-b border-white/10 pb-2.5 group-hover/feature:border-white/50 transition-colors pl-3 border-l hover:bg-white/10 hover:text-white rounded-r-md">
                         {feature}
                       </span>
                     </div>
                   ))}
                 </div>
               </motion.div>
             </AnimatePresence>

             {/* Arrow Navigation */}
             <div className="flex gap-4">
                <button 
                  onClick={prevCar} 
                  className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] hover:bg-white hover:text-black hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer backdrop-blur-xl active:scale-95 group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={nextCar} 
                  className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] hover:bg-white hover:text-black hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer backdrop-blur-xl active:scale-95 group"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>

          {/* Right/Center panel: Focused Car */}
          <div className="md:col-span-7 lg:col-span-8 absolute inset-0 md:relative flex items-center justify-center pointer-events-none z-30 order-1 md:order-2 perspective-1000">
             <AnimatePresence>
               <motion.img 
                  key={activeIndex}
                  src={cars[activeIndex].image}
                  initial={{ opacity: 0, scale: 0.85, x: direction * 150, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1.05, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.85, x: direction * -150, filter: 'blur(10px)' }}
                  whileHover={{ 
                    y: -25, 
                    scale: 1.1,
                    filter: 'drop-shadow(0px 80px 60px rgba(0,0,0,0.9))'
                  }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.22, 1, 0.36, 1],
                    hover: { duration: 0.4, ease: "easeOut" } 
                  }}
                  className="absolute inset-0 m-auto w-[95%] md:w-[110%] lg:w-[125%] max-w-7xl object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.7)] pointer-events-auto cursor-pointer"
                  style={{ maxHeight: '85vh' }}
               />
             </AnimatePresence>
          </div>
       </div>

    </motion.div>
  );
}


