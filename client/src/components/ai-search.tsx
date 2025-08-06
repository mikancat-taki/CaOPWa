import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Search, Brain, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { performSearch } from "@/lib/search";

interface SearchResult {
  title: string;
  content: string;
  type: 'ai' | 'web';
  url?: string;
  relevance: number;
}

export function AISearch() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<'ai' | 'web'>('ai');
  const [results, setResults] = useState<SearchResult[]>([]);

  const searchMutation = useMutation({
    mutationFn: async () => {
      const result = await performSearch(query, searchType);
      return result;
    },
    onSuccess: (data) => {
      setResults(data.results);
    },
  });

  const handleSearch = () => {
    if (query.trim()) {
      searchMutation.mutate();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="cosmic-glow rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Brain className="text-purple-400 mr-3" />
        AI検索 & Web検索
      </h3>
      
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="質問やキーワードを入力..."
            className="flex-1 glass-morphism border-none bg-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
          />
          <Button
            onClick={handleSearch}
            disabled={!query.trim() || searchMutation.isPending}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button
            onClick={() => setSearchType('ai')}
            variant={searchType === 'ai' ? 'default' : 'ghost'}
            className={`flex-1 ${searchType === 'ai' ? 'bg-purple-600 hover:bg-purple-700' : 'glass-morphism hover:bg-white/20'} text-sm`}
          >
            <Brain className="mr-2 w-4 h-4 text-purple-400" />
            AI検索
          </Button>
          <Button
            onClick={() => setSearchType('web')}
            variant={searchType === 'web' ? 'default' : 'ghost'}
            className={`flex-1 ${searchType === 'web' ? 'bg-blue-600 hover:bg-blue-700' : 'glass-morphism hover:bg-white/20'} text-sm`}
          >
            <Globe className="mr-2 w-4 h-4 text-blue-400" />
            Web検索
          </Button>
        </div>
        
        {/* Search Results */}
        <div className="glass-morphism rounded-lg p-4 space-y-3 max-h-48 overflow-y-auto">
          {searchMutation.isPending ? (
            <div className="flex items-center justify-center h-20">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
            </div>
          ) : results.length > 0 ? (
            results.map((result, index) => (
              <div
                key={index}
                className={`border-l-4 pl-3 ${
                  result.type === 'ai' ? 'border-purple-500' : 'border-blue-500'
                }`}
              >
                <h4 className="font-medium text-white text-sm">{result.title}</h4>
                <p className="text-gray-300 text-xs mt-1">{result.content}</p>
                {result.url && (
                  <a 
                    href={result.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 text-xs hover:underline"
                  >
                    詳細を見る
                  </a>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-4">
              検索結果がここに表示されます
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
