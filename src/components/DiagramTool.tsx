import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Circle, Arrow, Text } from 'react-konva';
import { motion } from 'framer-motion';
import { X, Square, Circle as CircleIcon, ArrowRight, Type, Download, Undo, Redo } from 'lucide-react';

interface DiagramToolProps {
  onClose: () => void;
}

type Shape = {
  id: string;
  type: 'rect' | 'circle' | 'arrow' | 'text';
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  text?: string;
  points?: number[];
};

const DiagramTool: React.FC<DiagramToolProps> = ({ onClose }) => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedTool, setSelectedTool] = useState<string>('rect');
  const [history, setHistory] = useState<Shape[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const stageRef = useRef(null);

  const addShape = (e: any) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    
    const newShape: Shape = {
      id: Date.now().toString(),
      type: selectedTool as any,
      x: point.x,
      y: point.y,
    };

    switch (selectedTool) {
      case 'rect':
        newShape.width = 100;
        newShape.height = 100;
        break;
      case 'circle':
        newShape.radius = 50;
        break;
      case 'arrow':
        newShape.points = [0, 0, 100, 100];
        break;
      case 'text':
        newShape.text = 'Double click to edit';
        break;
    }

    const newShapes = [...shapes, newShape];
    setShapes(newShapes);
    
    // Update history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newShapes);
    setHistory(newHistory);
    setHistoryIndex(historyIndex + 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setShapes(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setShapes(history[historyIndex + 1]);
    }
  };

  const downloadAsPNG = () => {
    if (stageRef.current) {
      const uri = stageRef.current.toDataURL();
      const link = document.createElement('a');
      link.download = 'diagram.png';
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const tools = [
    { icon: Square, name: 'rect', label: 'Rectangle' },
    { icon: CircleIcon, name: 'circle', label: 'Circle' },
    { icon: ArrowRight, name: 'arrow', label: 'Arrow' },
    { icon: Type, name: 'text', label: 'Text' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="bg-card w-full max-w-6xl h-[90vh] rounded-lg shadow-xl border border-border flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Square className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Diagram Tool</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={undo}
              disabled={historyIndex === 0}
              className="p-2 hover:bg-secondary rounded-lg transition-colors disabled:opacity-50"
            >
              <Undo className="h-4 w-4" />
            </button>
            <button
              onClick={redo}
              disabled={historyIndex === history.length - 1}
              className="p-2 hover:bg-secondary rounded-lg transition-colors disabled:opacity-50"
            >
              <Redo className="h-4 w-4" />
            </button>
            <div className="h-6 w-px bg-border mx-2" />
            <button
              onClick={downloadAsPNG}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
            >
              <Download className="h-4 w-4" />
              Export as PNG
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
          {/* Tools Sidebar */}
          <div className="w-48 border-r border-border p-4">
            <h4 className="font-medium mb-4">Tools</h4>
            <div className="space-y-2">
              {tools.map((tool) => (
                <button
                  key={tool.name}
                  onClick={() => setSelectedTool(tool.name)}
                  className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                    selectedTool === tool.name
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-secondary'
                  }`}
                >
                  <tool.icon className="h-4 w-4" />
                  {tool.label}
                </button>
              ))}
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-background p-6">
            <Stage
              ref={stageRef}
              width={800}
              height={600}
              onClick={addShape}
              className="bg-white rounded-lg shadow-lg mx-auto"
            >
              <Layer>
                {shapes.map((shape) => {
                  switch (shape.type) {
                    case 'rect':
                      return (
                        <Rect
                          key={shape.id}
                          x={shape.x}
                          y={shape.y}
                          width={shape.width}
                          height={shape.height}
                          fill="transparent"
                          stroke="#000"
                          draggable
                        />
                      );
                    case 'circle':
                      return (
                        <Circle
                          key={shape.id}
                          x={shape.x}
                          y={shape.y}
                          radius={shape.radius}
                          fill="transparent"
                          stroke="#000"
                          draggable
                        />
                      );
                    case 'arrow':
                      return (
                        <Arrow
                          key={shape.id}
                          points={shape.points}
                          fill="#000"
                          stroke="#000"
                          draggable
                        />
                      );
                    case 'text':
                      return (
                        <Text
                          key={shape.id}
                          x={shape.x}
                          y={shape.y}
                          text={shape.text}
                          fontSize={16}
                          draggable
                        />
                      );
                    default:
                      return null;
                  }
                })}
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DiagramTool;