'use client';

export function ByRapidScreen() {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <a href="https://www.rapidscreen.my/" target="_blank" className="relative group">
        {/* Glossy badge container */}
        <div className="relative px-4 py-2 rounded-full bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm border border-white/50 shadow-lg">
          {/* Shine effect */}
          {/* <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-60" /> */}
          
          {/* Inner shadow for depth */}
          <div className="absolute inset-0 rounded-full shadow-inner" />
          
          {/* Text content */}
          <div className="relative flex items-center text-sm font-bold uppercase">
            <span className="text-gray-400 mr-1">by</span>
            <span className="text-orange-400">rapid</span>
            <span className="text-gray-400">screen</span>
          </div>
          
          {/* Bottom highlight */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        </div>
        
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full bg-orange-400/20 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
      </a>
    </div>
  );
}

