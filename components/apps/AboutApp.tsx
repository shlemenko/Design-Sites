import React from 'react';
import { SKILLS } from '../../constants';
import { MapPin, Mail, Github, Linkedin, Briefcase } from 'lucide-react';

export const AboutApp: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Sidebar Info */}
      <div className="md:w-1/3 bg-gray-50/50 p-6 border-r border-gray-200/50 flex flex-col items-center text-center">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 shadow-lg border-4 border-white">
          <img src="https://picsum.photos/seed/designer/400/400" alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Алекс Дизайнер</h2>
        <p className="text-blue-600 font-medium mb-4">Senior Product Designer</p>
        
        <div className="w-full space-y-3 text-sm text-gray-600 text-left mt-4">
          <div className="flex items-center gap-3">
            <MapPin size={16} />
            <span>Москва, Россия</span>
          </div>
          <div className="flex items-center gap-3">
            <Briefcase size={16} />
            <span>Open for work</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={16} />
            <a href="mailto:alex@example.com" className="hover:text-blue-600 transition-colors">alex@example.com</a>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
           <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
             <Github size={20} className="text-gray-700" />
           </button>
           <button className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">
             <Linkedin size={20} className="text-blue-700" />
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">Обо мне</h3>
          <p className="text-gray-600 leading-relaxed">
            Я страстный продуктовый дизайнер с более чем 5-летним опытом создания интуитивно понятных и визуально привлекательных цифровых продуктов. Мой подход сочетает в себе глубокие исследования пользователей, дизайн-системы и pixel-perfect реализацию. Я верю, что дизайн — это не просто то, как это выглядит, но и то, как это работает.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Навыки</h3>
          <div className="space-y-4">
            {SKILLS.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{skill.name}</span>
                  <span className="text-gray-500">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};