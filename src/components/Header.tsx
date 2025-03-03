import React from 'react';
import { Brain, Search, UserCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  sidebarCollapsed: boolean;
  onNewDocument: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarCollapsed, onNewDocument }) => {
  const navigate = useNavigate();

  return (
    <header className={`fixed top-0 right-0 h-16 transition-all duration-300 ${
      sidebarCollapsed ? 'left-16' : 'left-64'
    } bg-card border-b border-border`}>
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">RASFO</h1>
        </div>
        
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full bg-secondary pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onNewDocument}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
          >
            New Document
          </button>
          <button 
            onClick={() => navigate('/account')}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <UserCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;