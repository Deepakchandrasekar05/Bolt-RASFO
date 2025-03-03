import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { X, Upload, Image as ImageIcon, Copy, Loader } from 'lucide-react';
import { createWorker } from 'tesseract.js';

interface ImageToLatexProps {
  onClose: () => void;
}

const ImageToLatex: React.FC<ImageToLatexProps> = ({ onClose }) => {
  const [image, setImage] = useState<string | null>(null);
  const [latex, setLatex] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        processImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1
  });

  const processImage = async (imageData: string) => {
    setIsProcessing(true);
    try {
      const worker = await createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(imageData);
      await worker.terminate();
      
      // Convert text to LaTeX format (basic conversion)
      const latexText = text
        .replace(/\$/g, '\\$')
        .replace(/\^/g, '\\^')
        .replace(/_/g, '\\_');
      
      setLatex(latexText);
    } catch (error) {
      console.error('Error processing image:', error);
    }
    setIsProcessing(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(latex);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="bg-card w-full max-w-4xl h-[80vh] rounded-lg shadow-xl border border-border flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Image to LaTeX Converter</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 flex gap-4 p-6">
          <div className="w-1/2 flex flex-col gap-4">
            <div
              {...getRootProps()}
              className={`h-64 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                isDragActive ? 'border-primary bg-primary/10' : 'border-border'
              }`}
            >
              <input {...getInputProps()} />
              {image ? (
                <img
                  src={image}
                  alt="Uploaded"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="text-center p-4">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop an image here, or click to select
                  </p>
                </div>
              )}
            </div>

            {image && (
              <button
                onClick={() => setImage(null)}
                className="w-full px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm transition-colors"
              >
                Clear Image
              </button>
            )}
          </div>

          <div className="w-1/2 flex flex-col gap-4">
            <div className="flex-1 bg-background rounded-lg p-4 relative">
              {isProcessing ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Processing image...</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">LaTeX Output</h4>
                    {latex && (
                      <button
                        onClick={copyToClipboard}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <pre className="font-mono text-sm whitespace-pre-wrap">
                    {latex || 'Converted LaTeX will appear here...'}
                  </pre>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageToLatex;