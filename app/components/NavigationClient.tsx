'use client';

 import { useState, useEffect, useCallback } from 'react';
 import { Menu, X } from 'lucide-react';

 import { NAV_LINKS, CLASS_NAMES, ANIMATION } from '../constants';
 import { throttle } from '../utils';

 export const NavigationClient = () => {
   const [isScrolled, setIsScrolled] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   useEffect(() => {
     const handleScroll = throttle(() => {
       setIsScrolled(window.scrollY > 0);
     }, ANIMATION.SCROLL_DEBOUNCE_MS);

     window.addEventListener('scroll', handleScroll);
     return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const toggleMobileMenu = useCallback(() => {
     setIsMobileMenuOpen((prev) => !prev);
   }, []);

   const closeMobileMenu = useCallback(() => {
     setIsMobileMenuOpen(false);
   }, []);

   return (
     <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
       isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100' : 'bg-transparent'
     }`}>
       <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
         <div className="text-lg font-semibold tracking-tight">Daiki.T</div>
         <div className="hidden md:flex space-x-8 text-xs font-medium text-gray-600 uppercase tracking-widest">
           {NAV_LINKS.map((link) => (
             <a key={link.href} href={link.href} className={CLASS_NAMES.NAV_LINK}>
               {link.label}
             </a>
           ))}
         </div>
         <button 
           className="md:hidden p-2"
           onClick={toggleMobileMenu}
           aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
           aria-expanded={isMobileMenuOpen}
         >
           {isMobileMenuOpen ? (
             <X className="w-5 h-5" />
           ) : (
             <Menu className="w-5 h-5" />
           )}
         </button>
       </div>
       
       {isMobileMenuOpen && (
         <div className="md:hidden bg-white border-b border-gray-100">
           <div className="px-6 py-4 space-y-3">
             {NAV_LINKS.map((link) => (
               <a 
                 key={link.href}
                 href={link.href} 
                 className={CLASS_NAMES.MOBILE_MENU_ITEM}
                 onClick={closeMobileMenu}
               >
                 {link.label}
               </a>
             ))}
           </div>
         </div>
       )}
     </nav>
   );
 };
