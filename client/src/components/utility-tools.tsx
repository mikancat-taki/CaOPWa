import { useState } from "react";
import { 
  Calculator, 
  QrCode, 
  Palette, 
  FileText, 
  BarChart3, 
  Combine,
  Plus,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { executeUtility } from "@/lib/utilities";

interface Tool {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

export function UtilityTools() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");

  const tools: Tool[] = [
    {
      id: 'calculator',
      name: '計算機',
      icon: <Calculator className="text-2xl" />,
      color: 'text-blue-400',
      description: '基本的な計算を実行'
    },
    {
      id: 'qrcode',
      name: 'QRコード',
      icon: <QrCode className="text-2xl" />,
      color: 'text-green-400',
      description: 'テキストからQRコードを生成'
    },
    {
      id: 'color',
      name: 'カラー',
      icon: <Palette className="text-2xl" />,
      color: 'text-purple-400',
      description: 'カラーコード変換'
    },
    {
      id: 'compress',
      name: '変換',
      icon: <Combine className="text-2xl" />,
      color: 'text-orange-400',
      description: 'データ形式変換'
    },
    {
      id: 'text',
      name: 'テキスト',
      icon: <FileText className="text-2xl" />,
      color: 'text-yellow-400',
      description: 'テキスト処理ツール'
    },
    {
      id: 'analytics',
      name: '分析',
      icon: <BarChart3 className="text-2xl" />,
      color: 'text-red-400',
      description: 'データ分析ツール'
    }
  ];

  const handleToolUse = async () => {
    if (selectedTool && inputValue.trim()) {
      const output = executeUtility(selectedTool.id, inputValue);
      setResult(output);
    }
  };

  return (
    <div className="cosmic-glow rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Settings className="text-green-500 mr-3" />
        便利ツール
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {tools.map((tool) => (
          <Dialog key={tool.id}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setSelectedTool(tool)}
                variant="ghost"
                className="glass-morphism hover:bg-white/20 p-4 h-auto flex flex-col items-center space-y-2 transition-all group"
              >
                <div className={`${tool.color} group-hover:opacity-80`}>
                  {tool.icon}
                </div>
                <div className="text-sm font-medium text-white">
                  {tool.name}
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-morphism border-gray-600 text-white">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <div className={tool.color}>{tool.icon}</div>
                  <span>{tool.name}</span>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-gray-300 text-sm">{tool.description}</p>
                
                {tool.id === 'calculator' ? (
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="計算式を入力 (例: 2 + 3 * 4)"
                    className="glass-morphism border-none bg-white/10 text-white"
                  />
                ) : (
                  <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={`${tool.name}の入力...`}
                    className="glass-morphism border-none bg-white/10 text-white resize-none"
                    rows={3}
                  />
                )}
                
                <Button
                  onClick={handleToolUse}
                  disabled={!inputValue.trim()}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  実行
                </Button>
                
                {result && (
                  <div className="glass-morphism rounded-lg p-4 mt-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">結果:</h4>
                    <div className="text-white whitespace-pre-wrap">{result}</div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      
      <div className="mt-4">
        <Button
          variant="ghost"
          className="w-full glass-morphism hover:bg-white/20 text-sm font-medium"
        >
          <Plus className="mr-2 w-4 h-4" />
          すべてのツールを表示
        </Button>
      </div>
    </div>
  );
}
