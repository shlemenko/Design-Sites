import React, { useState, useEffect } from 'react';
import { 
  User, 
  Briefcase, 
  Mail, 
  MessageSquare, 
  Settings, 
  Image as ImageIcon 
} from 'lucide-react';

import { MenuBar } from './components/MenuBar';
import { Window } from './components/Window';
import { PortfolioApp } from './components/apps/PortfolioApp';
import { AboutApp } from './components/apps/AboutApp';
import { ChatApp } from './components/apps/ChatApp';
import { AppID, AppConfig, WindowState } from './types';
import { WALLPAPER_URL } from './constants';

const INITIAL_WINDOW_SIZE = { width: 800, height: 600 };

const APPS: AppConfig[] = [
  { 
    id: AppID.ABOUT, 
    title: 'Обо мне', 
    icon: User, 
    color: 'bg-blue-500', 
    component: <AboutApp /> 
  },
  { 
    id: AppID.PROJECTS, 
    title: 'Проекты', 
    icon: Briefcase, 
    color: 'bg-purple-500', 
    component: <PortfolioApp />,
    width: 900 
  },
  { 
    id: AppID.CONTACT, 
    title: 'Контакты', 
    icon: Mail, 
    color: 'bg-green-500', 
    component: (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <Mail size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Свяжитесь со мной</h2>
        <p className="text-gray-600 mb-6">Я открыт для новых возможностей и интересных проектов.</p>
        <a href="mailto:alex@example.com" className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg">
          Написать письмо
        </a>
      </div>
    )
  },
  { 
    id: AppID.CHAT, 
    title: 'AI Помощник', 
    icon: MessageSquare, 
    color: 'bg-indigo-600', 
    component: <ChatApp />,
    width: 400,
    height: 600
  },
];

const DOCK_APPS: AppConfig[] = [
  ...APPS,
  { id: AppID.PHOTOS, title: 'Фото', icon: ImageIcon, color: 'bg-pink-500', component: null },
  { id: AppID.SETTINGS, title: 'Настройки', icon: Settings, color: 'bg-gray-500', component: null },
];

export default function App() {
  const [windows, setWindows] = useState<Record<string, WindowState>>({});
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = useState(10);

  // Initial Open
  useEffect(() => {
    // Open About Me on load
    openApp(AppID.ABOUT);
  }, []);

  const openApp = (appId: AppID) => {
    const appConfig = APPS.find(a => a.id === appId);
    
    if (windows[appId]) {
      // Bring to front if already open
      focusWindow(appId);
      if (windows[appId].isMinimized) {
        setWindows(prev => ({
          ...prev,
          [appId]: { ...prev[appId], isMinimized: false }
        }));
      }
      return;
    }

    if (!appConfig) return; // For dummy dock apps

    // Center window
    const winWidth = appConfig.width || INITIAL_WINDOW_SIZE.width;
    const winHeight = appConfig.height || INITIAL_WINDOW_SIZE.height;
    const x = Math.max(0, (window.innerWidth - winWidth) / 2) + (Object.keys(windows).length * 20);
    const y = Math.max(40, (window.innerHeight - winHeight) / 2) + (Object.keys(windows).length * 20);

    setWindows(prev => ({
      ...prev,
      [appId]: {
        id: appId,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: nextZIndex,
        position: { x, y },
        size: { width: winWidth, height: winHeight }
      }
    }));
    setNextZIndex(prev => prev + 1);
    setActiveWindowId(appId);
  };

  const closeWindow = (id: AppID) => {
    setWindows(prev => {
      const newWindows = { ...prev };
      delete newWindows[id];
      return newWindows;
    });
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const minimizeWindow = (id: AppID) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true }
    }));
    setActiveWindowId(null);
  };

  const maximizeWindow = (id: AppID) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized }
    }));
    focusWindow(id);
  };

  const focusWindow = (id: AppID) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], zIndex: nextZIndex }
    }));
    setNextZIndex(prev => prev + 1);
    setActiveWindowId(id);
  };

  const moveWindow = (id: AppID, x: number, y: number) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], position: { x, y } }
    }));
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden bg-cover bg-center relative selection:bg-blue-500/30"
      style={{ backgroundImage: `url(${WALLPAPER_URL})` }}
    >
      <MenuBar />

      {/* Desktop Area - Icons */}
      <div className="absolute top-10 left-4 grid grid-cols-1 gap-6 p-2 z-0">
        {APPS.map(app => (
          <button
            key={app.id}
            onClick={() => openApp(app.id)}
            className="group flex flex-col items-center gap-1 w-24 focus:outline-none"
          >
            <div className={`w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center text-white transition-transform group-hover:scale-105 group-active:scale-95 ${app.color}`}>
              <app.icon size={32} />
            </div>
            <span className="text-white text-xs font-medium drop-shadow-md px-2 py-0.5 rounded group-hover:bg-white/20 transition-colors">
              {app.title}
            </span>
          </button>
        ))}
      </div>

      {/* Windows Layer */}
      {(Object.values(windows) as WindowState[]).map(win => {
        const app = APPS.find(a => a.id === win.id);
        if (!app) return null;
        return (
          <Window
            key={win.id}
            {...win}
            title={app.title}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onMaximize={maximizeWindow}
            onFocus={focusWindow}
            onMove={moveWindow}
          >
            {app.component}
          </Window>
        );
      })}

      {/* Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[90vw]">
        <div className="glass-panel px-4 py-3 rounded-2xl flex items-end gap-3 shadow-2xl bg-white/40">
           {DOCK_APPS.map((app) => (
             <button
               key={app.id}
               onClick={() => openApp(app.id)}
               className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-2"
             >
               {/* Tooltip */}
               <div className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-opacity pointer-events-none whitespace-nowrap">
                 {app.title}
               </div>
               
               {/* Icon */}
               <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl shadow-lg flex items-center justify-center text-white transition-all ${app.color}`}>
                 <app.icon size={24} className="sm:w-8 sm:h-8" />
               </div>

               {/* Active Dot */}
               <div className={`w-1 h-1 rounded-full bg-gray-800 mt-1 ${windows[app.id] && !windows[app.id].isMinimized ? 'opacity-100' : 'opacity-0'}`} />
             </button>
           ))}
        </div>
      </div>
    </div>
  );
}