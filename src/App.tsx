import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Auth from './components/Auth';
import PaperView from './components/PaperView';
import Settings from './components/Settings';
import AccountView from './components/AccountView';
import ImageToLatex from './components/ImageToLatex';
import DiagramTool from './components/DiagramTool';
import NewDocumentDialog from './components/NewDocumentDialog';
import { FileText } from 'lucide-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [selectedPaper, setSelectedPaper] = useState<number | null>(null);
  const [showNewDocument, setShowNewDocument] = useState(false);
  const [showImageToLatex, setShowImageToLatex] = useState(false);
  const [showDiagramTool, setShowDiagramTool] = useState(false);

  // Mock user data
  const userData = {
    name: 'John Doe',
    papers: [
      {
        id: 1,
        title: 'Quantum Computing Applications',
        lastEdited: '2 hours ago',
        tags: ['LaTeX', 'Draft'],
      },
      {
        id: 2,
        title: 'Machine Learning in Healthcare',
        lastEdited: '1 day ago',
        tags: ['LaTeX', 'Review'],
      },
      {
        id: 3,
        title: 'Neural Network Architecture',
        lastEdited: '3 days ago',
        tags: ['LaTeX', 'Final'],
      },
      {
        id: 4,
        title: 'Blockchain Technology',
        lastEdited: '1 week ago',
        tags: ['LaTeX', 'Draft'],
      },
      {
        id: 5,
        title: 'Artificial Intelligence Ethics',
        lastEdited: '2 weeks ago',
        tags: ['LaTeX', 'Published'],
      },
      {
        id: 6,
        title: 'Data Privacy in IoT',
        lastEdited: '1 month ago',
        tags: ['LaTeX', 'Review'],
      },
    ],
  };

  if (!isAuthenticated) {
    return <Auth onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed}
          onImageToLatex={() => setShowImageToLatex(true)}
          onDiagramTool={() => setShowDiagramTool(true)}
        />
        <Header 
          sidebarCollapsed={sidebarCollapsed}
          onNewDocument={() => setShowNewDocument(true)}
        />
        
        <Routes>
          <Route path="/settings" element={<Settings />} />
          <Route path="/account" element={<AccountView />} />
          <Route path="/" element={
            <main className={`pt-16 transition-all duration-300 ${
              sidebarCollapsed ? 'ml-16' : 'ml-64'
            }`}>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userData.papers.map((paper) => (
                    <div
                      key={paper.id}
                      onClick={() => setSelectedPaper(paper.id)}
                      className="bg-card rounded-lg p-4 border border-border hover:border-primary/50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="p-2 bg-secondary rounded-lg group-hover:bg-primary/20 transition-colors">
                          <FileText className="h-5 w-5" />
                        </div>
                        <button className="text-xs text-muted-foreground hover:text-foreground">
                          •••
                        </button>
                      </div>
                      <h3 className="mt-4 font-medium">{paper.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Last edited {paper.lastEdited}
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        {paper.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-secondary rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          } />
        </Routes>

        {selectedPaper && (
          <PaperView 
            paper={userData.papers.find(p => p.id === selectedPaper)!} 
            onClose={() => setSelectedPaper(null)} 
          />
        )}

        {showNewDocument && (
          <NewDocumentDialog onClose={() => setShowNewDocument(false)} />
        )}

        {showImageToLatex && (
          <ImageToLatex onClose={() => setShowImageToLatex(false)} />
        )}

        {showDiagramTool && (
          <DiagramTool onClose={() => setShowDiagramTool(false)} />
        )}
      </div>
    </Router>
  );
}

export default App;