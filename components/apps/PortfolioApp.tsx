import React from 'react';
import { PROJECTS } from '../../constants';
import { ExternalLink, Tag } from 'lucide-react';

export const PortfolioApp: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Мои Проекты</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <div 
            key={project.id} 
            className="bg-white/80 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-white/60 group"
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                </div>
                <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-600">
                  <ExternalLink size={16} />
                </button>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md flex items-center gap-1">
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};