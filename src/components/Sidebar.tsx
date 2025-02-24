import React from 'react';
import { 
  FileText, 
  PenTool, 
  Image, 
  BookOpen, 
  Settings,
  ChevronLeft
} from 'lucide-react';

const Sidebar = ({ collapsed, setCollapsed }: { collapsed: boolean, setCollapsed: (value: boolean) => void }) => {
  const menuItems = [
    { icon: FileText, label: 'Document Editor' },
    { icon: PenTool, label: 'Diagram Tool' },
    { icon: Image, label: 'Image to LaTeX' },
    { icon: BookOpen, label: 'PDF Editor' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={`h-screen bg-card fixed left-0 top-0 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    } border-r border-border`}>
      <div className="flex items-center justify-end p-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <ChevronLeft className={`h-5 w-5 transition-transform ${
            collapsed ? 'rotate-180' : ''
          }`} />
        </button>
      </div>
      
      <nav className="mt-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center px-4 py-3 text-sm hover:bg-secondary transition-colors"
          >
            <item.icon className="h-5 w-5 min-w-5" />
            {!collapsed && (
              <span className="ml-3 whitespace-nowrap">{item.label}</span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;