import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Languages, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { translateText } from "@/lib/translation";

export function Translator() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [fromLang, setFromLang] = useState("ja");
  const [toLang, setToLang] = useState("en");

  const translateMutation = useMutation({
    mutationFn: async () => {
      const result = await translateText(sourceText, fromLang, toLang);
      return result;
    },
    onSuccess: (result) => {
      setTranslatedText(result.translatedText);
    },
  });

  const handleSwapLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const languages = [
    { value: "ja", label: "日本語" },
    { value: "en", label: "English" },
    { value: "zh", label: "中文" },
    { value: "ko", label: "한국어" },
  ];

  return (
    <div className="cosmic-glow rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Languages className="text-yellow-500 mr-3" />
        翻訳ツール
      </h3>
      
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Select value={fromLang} onValueChange={setFromLang}>
            <SelectTrigger className="flex-1 glass-morphism border-none bg-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map(lang => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button
            onClick={handleSwapLanguages}
            variant="ghost"
            size="icon"
            className="glass-morphism hover:bg-white/20"
          >
            <ArrowLeftRight className="text-gray-300 w-4 h-4" />
          </Button>
          
          <Select value={toLang} onValueChange={setToLang}>
            <SelectTrigger className="flex-1 glass-morphism border-none bg-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map(lang => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Textarea
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          placeholder="翻訳したいテキストを入力..."
          className="glass-morphism border-none bg-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 resize-none"
          rows={3}
        />
        
        <div className="glass-morphism rounded-lg p-4 min-h-[80px] text-gray-300">
          {translateMutation.isPending ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500"></div>
            </div>
          ) : translatedText ? (
            translatedText
          ) : (
            "翻訳結果がここに表示されます..."
          )}
        </div>
        
        <Button
          onClick={() => translateMutation.mutate()}
          disabled={!sourceText.trim() || translateMutation.isPending}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
        >
          翻訳する
        </Button>
      </div>
    </div>
  );
}
