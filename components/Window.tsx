import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';
import { AppID } from '../types';

interface WindowProps {
  id: AppID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  onClose: (id: AppID) => void;
  onMinimize: (id: AppID) => void;
  onMaximize: (id: AppID) => void;
  onFocus: (id: AppID) => void;
  onMove: (id: AppID, x: number, y: number) => void;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  position,
  size,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onMove(id, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, id, onMove]);

  if (!isOpen || isMinimized) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus(id);
    if (!isMaximized) {
      setIsDragging(true);
      const rect = windowRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }
  };

  const style: React.CSSProperties = isMaximized
    ? {
        top: 32, // Menu bar height
        left: 0,
        width: '100%',
        height: 'calc(100vh - 32px)',
        zIndex,
      }
    : {
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        zIndex,
      };

  return (
    <div
      ref={windowRef}
      style={style}
      className={`absolute flex flex-col glass-panel rounded-lg overflow-hidden shadow-2xl transition-all duration-100 ease-out ${
        isMaximized ? 'rounded-none border-0' : ''
      }`}
      onMouseDown={() => onFocus(id)}
    >
      {/* Title Bar */}
      <div
        className="h-10 bg-gray-100/50 border-b border-gray-200/50 flex items-center justify-between px-4 select-none cursor-default"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 group">
          <button
            onClick={(e) => { e.stopPropagation(); onClose(id); }}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-transparent hover:text-black/50 transition-colors"
          >
            <X size={8} strokeWidth={4} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center text-transparent hover:text-black/50 transition-colors"
          >
            <Minus size={8} strokeWidth={4} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(id); }}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-transparent hover:text-black/50 transition-colors"
          >
            <Maximize2 size={6} strokeWidth={4} />
          </button>
        </div>
        <div className="text-sm font-semibold text-gray-700">{title}</div>
        <div className="w-14"></div> {/* Spacer for centering */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-white/50 relative">
        {children}
      </div>
    </div>
  );
};