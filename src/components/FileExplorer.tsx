import React from 'react';
import { 
  FileText, 
  Image, 
  FileCode, 
  FolderOpen, 
  ChevronRight,
  Download
} from 'lucide-react';

interface FileExplorerProps {
  onClose: () => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ onClose }) => {
  // Mock data for the file structure
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
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-xl border border-border w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Project Files</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-2 max-h-[70vh] overflow-y-auto">
          {files.map(file => renderItem(file))}
        </div>
        
        <div className="p-4 border-t border-border flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 hover:bg-secondary rounded-lg text-sm transition-colors"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;