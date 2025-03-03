import React, { useState } from 'react';
import { Download, Edit, FileText, Image, FileCode, FolderOpen, ArrowLeft, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LatexEditor from './LatexEditor';
import PdfEditor from './PdfEditor';

interface PaperViewProps {
  paper: {
    id: number;
    title: string;
    lastEdited: string;
    tags: string[];
    abstract?: string;
  };
  onClose: () => void;
}

const PaperView: React.FC<PaperViewProps> = ({ paper, onClose }) => {
  const [showLatexEditor, setShowLatexEditor] = useState(false);
  const [showPdfEditor, setShowPdfEditor] = useState(false);

  const files = [
    {
      name: 'Research Paper',
      type: 'folder',
      items: [
        { name: 'main.tex', type: 'tex' },
        { name: 'figures', type: 'folder', items: [
          { name: 'diagram1.png', type: 'image' },
          { name: 'graph1.png', type: 'image' }
        ]},
        { name: 'references.bib', type: 'bib' }
      ]
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'folder': return FolderOpen;
      case 'tex': return FileCode;
      case 'image': return Image;
      case 'bib': return FileText;
      default: return FileText;
    }
  };

  const renderItem = (item: any, depth = 0) => {
    const Icon = getIcon(item.type);
    
    return (
      <div key={item.name}>
        <div 
          className="flex items-center gap-2 px-4 py-2 hover:bg-secondary/50 rounded-lg cursor-pointer group"
          style={{ paddingLeft: `${depth * 1.5 + 1}rem` }}
        >
          <Icon className="h-4 w-4 text-primary" />
          <span className="flex-1">{item.name}</span>
          {item.type !== 'folder' && (
            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-secondary rounded transition-all">
              <Download className="h-4 w-4" />
            </button>
          )}
        </div>
        {item.items?.map((subItem: any) => renderItem(subItem, depth + 1))}
      </div>
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center p-4"
      >
        <div className="bg-card rounded-lg shadow-xl border border-border w-full max-w-[90vw] h-[90vh]">
          <div className="flex h-full">
            {/* Left sidebar with file explorer */}
            <div className="w-64 border-r border-border p-4 overflow-y-auto">
              <h3 className="font-medium mb-4">Project Files</h3>
              {files.map(file => renderItem(file))}
            </div>

            {/* Main content area */}
            <div className="flex-1 flex flex-col">
              <div className="border-b border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={onClose}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Documents
                  </button>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">{paper.title}</h2>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-muted-foreground">
                        Last edited {paper.lastEdited}
                      </span>
                      <div className="flex gap-2">
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
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowLatexEditor(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm transition-colors"
                    >
                      <Code className="h-4 w-4" />
                      LaTeX Editor
                    </button>
                    <button 
                      onClick={() => setShowPdfEditor(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                      Edit PDF
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <h3 className="text-lg font-medium mb-4">Abstract</h3>
                <p className="text-muted-foreground leading-relaxed">
                  This research paper explores the applications of quantum computing in modern cryptography systems. 
                  We present a comprehensive analysis of quantum algorithms and their potential impact on current 
                  encryption methods. The study includes experimental results from quantum simulations and proposes 
                  new approaches to quantum-resistant cryptography.
                </p>

                <h3 className="text-lg font-medium mt-8 mb-4">Overview</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    The paper is structured into several key sections:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Introduction to Quantum Computing</li>
                    <li>Current Cryptographic Systems</li>
                    <li>Quantum Algorithms for Cryptography</li>
                    <li>Experimental Results</li>
                    <li>Future Implications</li>
                    <li>Proposed Solutions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showLatexEditor && (
          <LatexEditor onClose={() => setShowLatexEditor(false)} />
        )}
        {showPdfEditor && (
          <PdfEditor onClose={() => setShowPdfEditor(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default PaperView;