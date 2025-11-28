import React, { useState, useEffect } from 'react';
import { Apple, Wifi, Battery } from 'lucide-react';

export const MenuBar: React.FC = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (d: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return d.toLocaleString('ru-RU', options).replace(',', '');
  };

  return (
    <div className="h-8 w-full bg-black/20 backdrop-blur-md flex items-center justify-between px-4 text-white text-sm select-none fixed top-0 left-0 z-50 shadow-sm">
      <div className="flex items-center gap-4">
        <Apple className="w-4 h-4 fill-current" />
        <span className="font-bold">Portfolio</span>
        <span className="hidden sm:inline opacity-90 hover:opacity-100 cursor-default">Файл</span>
        <span className="hidden sm:inline opacity-90 hover:opacity-100 cursor-default">Правка</span>
        <span className="hidden sm:inline opacity-90 hover:opacity-100 cursor-default">Вид</span>
        <span className="hidden sm:inline opacity-90 hover:opacity-100 cursor-default">Переход</span>
        <span className="hidden sm:inline opacity-90 hover:opacity-100 cursor-default">Справка</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Battery className="w-4 h-4" />
          <span className="text-xs">100%</span>
        </div>
        <Wifi className="w-4 h-4" />
        <span>{formatDate(date)}</span>
      </div>
    </div>
  );
};