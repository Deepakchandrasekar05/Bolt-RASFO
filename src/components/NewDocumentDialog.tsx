import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, FileText, Plus } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface NewDocumentDialogProps {
  onClose: () => void;
}

const NewDocumentDialog: React.FC<NewDocumentDialogProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('blank');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/x-tex': ['.tex']
    },
    maxFiles: 1
  });

  const templates = [
    { id: 'blank', name: 'Blank Document' },
    { id: 'article', name: 'Research Article' },
    { id: 'thesis', name: 'Thesis' },
    { id: 'presentation', name: 'Presentation' }
  ];

  const createDocument = () => {
    // Implement document creation logic
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="bg-card w-full max-w-2xl rounded-lg shadow-xl border border-border">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Create New Document</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Document Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title"
              className="w-full bg-secondary px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Choose Template</label>
            <div className="grid grid-cols-2 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    selectedTemplate === template.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <FileText className="h-6 w-6 mb-2 text-primary" />
                  <h4 className="font-medium">{template.name}</h4>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Or Upload Existing Document</label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-primary bg-primary/10' : 'border-border'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drag & drop a PDF or LaTeX file here, or click to select
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 hover:bg-secondary rounded-lg text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={createDocument}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
          >
            Create Document
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NewDocumentDialog;