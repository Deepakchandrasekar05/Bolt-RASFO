import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { X, Play, Save, Download, FileText } from 'lucide-react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface LatexEditorProps {
  onClose: () => void;
  initialContent?: string;
}

const LatexEditor: React.FC<LatexEditorProps> = ({ onClose, initialContent = defaultLatexTemplate }) => {
  const [content, setContent] = useState(initialContent);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    try {
      // Render preview with KaTeX
      const rendered = katex.renderToString(content, {
        throwOnError: false,
        displayMode: true
      });
      setPreview(rendered);
    } catch (error) {
      console.error('LaTeX rendering error:', error);
    }
  }, [content]);

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
            <h3 className="font-medium">LaTeX Editor</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {/* Implement save */}}
              className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm transition-colors"
            >
              <Save className="h-4 w-4" />
              Save
            </button>
            <button
              onClick={() => {/* Implement compile */}}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
            >
              <Play className="h-4 w-4" />
              Compile
            </button>
            <button
              onClick={() => {/* Implement download */}}
              className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm transition-colors"
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
          {/* Editor */}
          <div className="w-1/2 border-r border-border">
            <Editor
              height="100%"
              defaultLanguage="latex"
              theme="vs-dark"
              value={content}
              onChange={(value) => setContent(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                rulers: [80],
                wordWrap: 'on',
                wrappingIndent: 'indent',
                automaticLayout: true,
              }}
            />
          </div>

          {/* Preview */}
          <div className="w-1/2 p-6 overflow-auto bg-background">
            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const defaultLatexTemplate = `\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{graphicx}
\\title{Your Research Paper Title}
\\author{Your Name}
\\date{\\today}

\\begin{document}

\\maketitle

\\begin{abstract}
Your abstract goes here...
\\end{abstract}

\\section{Introduction}
Your introduction goes here...

\\section{Methodology}
Your methodology goes here...

\\section{Results}
Your results go here...

\\section{Conclusion}
Your conclusion goes here...

\\end{document}`;

export default LatexEditor;