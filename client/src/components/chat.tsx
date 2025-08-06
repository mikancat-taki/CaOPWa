import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWebSocket } from "@/hooks/use-websocket";
import { apiRequest } from "@/lib/queryClient";
import type { ChatMessage } from "@shared/schema";

export function Chat() {
  const [message, setMessage] = useState("");
  const [username] = useState(`ユーザー${Math.floor(Math.random() * 1000)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery<ChatMessage[]>({
    queryKey: ["/api/chat/messages"],
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (messageText: string) => {
      return apiRequest("POST", "/api/chat/messages", {
        userId: "anonymous",
        username,
        message: messageText,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat/messages"] });
    },
  });

  const { sendMessage, lastMessage } = useWebSocket('/ws');

  useEffect(() => {
    if (lastMessage) {
      try {
        const data = JSON.parse(lastMessage);
        if (data.type === 'chat') {
          queryClient.invalidateQueries({ queryKey: ["/api/chat/messages"] });
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    }
  }, [lastMessage, queryClient]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Send via WebSocket for real-time
      sendMessage(JSON.stringify({
        type: 'chat',
        userId: 'anonymous',
        username,
        message: message.trim()
      }));
      
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string | Date) => {
    return new Date(timestamp).toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAvatarColor = (username: string) => {
    const colors = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-red-500 to-pink-600',
      'from-yellow-500 to-orange-600',
      'from-indigo-500 to-blue-600',
      'from-purple-500 to-indigo-600'
    ];
    const index = username.length % colors.length;
    return colors[index];
  };

  return (
    <div className="cosmic-glow rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <MessageCircle className="text-purple-400 mr-3" />
          リアルタイムチャット
        </h3>
        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
          オンライン
        </span>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 space-y-3 mb-4 max-h-64 overflow-y-auto">
        {isLoading ? (
          <div className="text-center text-gray-400">メッセージを読み込み中...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-400">まだメッセージがありません</div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 bg-gradient-to-r ${getAvatarColor(msg.username)} rounded-full flex items-center justify-center text-white text-sm font-semibold`}>
                {msg.username.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="glass-morphism rounded-lg p-3">
                  <div className="text-sm text-gray-300 mb-1">{msg.username}</div>
                  <div className="text-white">{msg.message}</div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat Input */}
      <div className="flex space-x-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="メッセージを入力..."
          className="flex-1 glass-morphism border-none bg-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!message.trim() || sendMessageMutation.isPending}
          className="bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
