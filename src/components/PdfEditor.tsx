import React from 'react';
import { motion } from 'framer-motion';
import { X, Save, Download, FileText, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

interface PdfEditorProps {
  onClose: () => void;
  pdfUrl?: string;
}

const PdfEditor: React.FC<PdfEditorProps> = ({ onClose, pdfUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="bg-card w-full h-[95vh] rounded-lg shadow-xl border border-border flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-medium">PDF Editor</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {/* Implement zoom out */}}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              onClick={() => {/* Implement zoom in */}}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={() => {/* Implement rotate */}}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <RotateCw className="h-4 w-4" />
            </button>
            <div className="h-6 w-px bg-border mx-2" />
            <button
              onClick={() => {/* Implement save */}}
              className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm transition-colors"
            >
              <Save className="h-4 w-4" />
              Save
            </button>
            <button
              onClick={() => {/* Implement download */}}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* PDF Viewer */}
          <div className="flex-1 bg-background p-6 overflow-auto">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
              {/* PDF content will be rendered here */}
              <div className="aspect-[1/1.4142] w-full bg-white rounded-lg">
                {pdfUrl ? (
                  <iframe
                    src={pdfUrl}
                    className="w-full h-full rounded-lg"
                    title="PDF Viewer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No PDF loaded
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tools Sidebar */}
          <div className="w-64 border-l border-border p-4">
            <h4 className="font-medium mb-4">Tools</h4>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm transition-colors">
                Add Text
              </button>
              <button className="w-full px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm transition-colors">
                Draw
              </button>
              <button className="w-full px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm transition-colors">
                Highlight
              </button>
              <button className="w-full px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm transition-colors">
                Add Comment
              </button>
              <button className="w-full px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm transition-colors">
                Add Shape
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PdfEditor;