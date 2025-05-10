
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Smartphone, Image, Settings } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/apps', label: 'Apps', icon: Smartphone },
    { path: '/photos', label: 'Photos', icon: Image },
    { path: '/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl border-t border-gray-200 animate-slide-up z-10">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            className={`nav-item ${currentPath === item.path ? 'active' : ''}`}
          >
            <item.icon className="nav-icon" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
