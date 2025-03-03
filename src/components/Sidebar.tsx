import React from 'react';
import { 
  FileText, 
  PenTool, 
  Image,
  Settings,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  onImageToLatex: () => void;
  onDiagramTool: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed, 
  setCollapsed,
  onImageToLatex,
  onDiagramTool
}) => {
  const menuItems = [
    { icon: FileText, label: 'Document Editor', path: '/' },
    { icon: PenTool, label: 'Diagram Tool', onClick: onDiagramTool },
    { icon: Image, label: 'Image to LaTeX', onClick: onImageToLatex },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className={`h-screen bg-card fixed left-0 top-0 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    } border-r border-border`}>
      <div className="flex items-center justify-between p-4">
        {!collapsed && <span className="font-semibold">Menu</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>
      
      <nav className="mt-4">
        {menuItems.map((item, index) => {
          const Component = item.path ? Link : 'button';
          return (
            <Component
              key={index}
              to={item.path}
              onClick={item.onClick}
              className="w-full flex items-center px-4 py-3 text-sm hover:bg-secondary transition-colors"
            >
              <item.icon className="h-5 w-5 min-w-5" />
              {!collapsed && (
                <span className="ml-3 whitespace-nowrap">{item.label}</span>
              )}
            </Component>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;