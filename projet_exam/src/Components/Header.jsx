import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-[#F4E1C1] text-black shadow-lg">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <img src="/logosite.png" alt="logo" className="h-24" />
                    </Link>

                    {/* Navigation principale */}
                    <nav className="hidden md:flex items-center space-x-1">
                        <NavItem
                            icon={
                                <div className="w-6 h-6 flex items-center justify-center rounded-md text-black">
                                    <span className="text-lg">わ</span>
                                    <span className="text-lg">カ</span>
                                </div>
                            }
                            to="/review"
                        />

                        <NavItem
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            }
                            to="/lessons"
                        />

                        <NavItem
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            }
                            to="/leaderboard"
                        />

                        <NavItem
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            }
                            to="/chat"
                        />

                        <NavItem
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            }
                            to="/multiplayer"
                        />

                        <NavItem
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            }
                            to="/profile"
                        />
                    </nav>

                    {/* Menu mobile */}
                    <button className="md:hidden text-black focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Navigation mobile (se déplie) */}
            <div className="md:hidden bg-gray-700">
                <div className="container mx-auto px-4 py-2 flex overflow-x-auto space-x-4">
                    <MobileNavItem icon="👤" text="Profil" to="/profile" />
                    <MobileNavItem icon="📚" text="Leçons" to="/lessons" />
                    <MobileNavItem icon="🏆" text="Classement" to="/leaderboard" />
                    <MobileNavItem icon="💬" text="Chat" to="/chat" />
                    <MobileNavItem icon="👥" text="Multijoueur" to="/multiplayer" />
                </div>
            </div>
        </header>
    );
};

// Composant pour les items de navigation desktop
const NavItem = ({ icon, text, to, active = false }) => (
    <Link
        to={to}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${active ? 'bg-[#D93F3F] text-black' : 'text-black hover:bg-gray-700 hover:text-white'
            }`}
    >
        <span className="mr-2">{icon}</span>
        {text && <span>{text}</span>}
    </Link>
);

// Composant pour les items de navigation mobile
const MobileNavItem = ({ icon, text, to, active = false }) => (
    <Link
        to={to}
        className={`flex flex-col items-center px-3 py-2 text-sm rounded-full whitespace-nowrap ${active ? 'bg-[#6BBE44] text-white' : 'text-gray-300 hover:bg-gray-600'
            }`}
    >
        <span className="text-lg">{icon}</span>
        <span>{text}</span>
    </Link>
);

export default Header;