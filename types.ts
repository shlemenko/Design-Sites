import { LucideIcon } from 'lucide-react';
import React from 'react';

export enum AppID {
  ABOUT = 'about',
  PROJECTS = 'projects',
  CONTACT = 'contact',
  CHAT = 'chat',
  SETTINGS = 'settings',
  PHOTOS = 'photos'
}

export interface AppConfig {
  id: AppID;
  title: string;
  icon: LucideIcon;
  color: string; // Tailwind color class for icon background
  component: React.ReactNode;
  width?: number;
  height?: number;
}

export interface WindowState {
  id: AppID;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}