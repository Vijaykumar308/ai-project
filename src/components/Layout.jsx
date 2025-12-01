import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    Bot,
    Settings,
    LogOut,
    Menu,
    Bell,
    User
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, to, active }) => (
    <Link
        to={to}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${active
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
    >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
    </Link>
);

const Layout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-blue-600">
                        <Bot size={28} />
                        <span className="text-xl font-bold text-gray-900">VoiceBot Studio</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <SidebarItem
                        icon={LayoutDashboard}
                        label="Home"
                        to="/"
                        active={location.pathname === '/'}
                    />
                    <SidebarItem
                        icon={Bot}
                        label="My Bots"
                        to="/bots"
                        active={location.pathname.startsWith('/bots')}
                    />
                    {/* <SidebarItem
                        icon={Settings}
                        label="Settings adad"
                        to="/settings"
                        active={location.pathname === '/settings'}
                    /> */}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button className="flex items-center gap-3 px-3 py-2 w-full text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                            <Menu size={20} />
                        </button>
                        <h1 className="text-lg font-semibold text-gray-800">
                            {location.pathname === '/' ? 'Dashboard' :
                                location.pathname.startsWith('/bots') ? 'My Bots' : 'Settings'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-gray-900">Aniket</p>
                                <p className="text-xs text-gray-500"></p>
                            </div>
                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                <User size={18} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
