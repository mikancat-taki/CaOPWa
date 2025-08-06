import { StarfieldBackground } from "@/components/starfield-background";
import { LiveClock } from "@/components/live-clock";
import { Calendar } from "@/components/calendar";
import { Chat } from "@/components/chat";
import { Translator } from "@/components/translator";
import { AISearch } from "@/components/ai-search";
import { UtilityTools } from "@/components/utility-tools";
import { Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen text-gray-100 overflow-x-hidden">
      <StarfieldBackground />
      
      {/* Header */}
      <header className="relative z-10 glass-morphism border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-purple-600 rounded-full flex items-center justify-center animate-glow">
                <Rocket className="text-white text-lg" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-purple-600 bg-clip-text text-transparent">
                CaOPWa
              </h1>
            </div>
            
            <LiveClock />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent">
            宇宙規模の統合ワークスペース
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            カレンダー、チャット、翻訳、AI検索、便利ツールを一つの場所で
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-2 xl:col-span-2">
            <Calendar />
          </div>
          <div className="lg:col-span-1 xl:col-span-2">
            <Chat />
          </div>
        </div>

        {/* Secondary Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <Translator />
          <AISearch />
          <UtilityTools />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-16 py-8 glass-morphism border-t border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-400 text-sm mb-4">
            © 2024 CaOPWa - 宇宙規模の統合ワークスペース
          </div>
          <div className="flex justify-center space-x-6 text-gray-500">
            <a href="#" className="hover:text-yellow-400 transition-colors">プライバシー</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">利用規約</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">サポート</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
