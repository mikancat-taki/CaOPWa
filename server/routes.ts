import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertChatMessageSchema, insertSearchQuerySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat messages API
  app.get("/api/chat/messages", async (req, res) => {
    try {
      const messages = await storage.getChatMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/chat/messages", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(validatedData);
      res.json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid message data" });
      } else {
        res.status(500).json({ error: "Failed to create message" });
      }
    }
  });

  // Search API
  app.get("/api/search/queries", async (req, res) => {
    try {
      const queries = await storage.getSearchQueries();
      res.json(queries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch search queries" });
    }
  });

  app.post("/api/search", async (req, res) => {
    try {
      const { query, type } = req.body;
      
      let results = [];
      
      if (type === 'ai') {
        // AI search simulation based on query
        results = [
          {
            title: `AI分析: ${query}`,
            content: `${query}に関する AI による分析結果です。人工知能が関連する情報を統合して回答を生成しました。`,
            type: 'ai',
            relevance: 0.95
          }
        ];
      } else if (type === 'web') {
        // Web search simulation
        results = [
          {
            title: `${query} - Web検索結果`,
            content: `${query}に関するウェブ上の最新情報です。複数のソースから関連する情報を収集しました。`,
            url: `https://example.com/search?q=${encodeURIComponent(query)}`,
            type: 'web',
            relevance: 0.88
          }
        ];
      }

      const searchQuery = await storage.createSearchQuery({
        query,
        type,
        results: JSON.stringify(results)
      });

      res.json({ query: searchQuery, results });
    } catch (error) {
      res.status(500).json({ error: "Search failed" });
    }
  });

  // Translation API
  app.post("/api/translate", async (req, res) => {
    try {
      const { text, fromLang, toLang } = req.body;
      
      // Simple translation simulation - in real app would use translation service
      const translations: Record<string, Record<string, string>> = {
        ja: {
          en: text.replace(/こんにちは/g, "Hello").replace(/ありがとう/g, "Thank you"),
          zh: text.replace(/こんにちは/g, "你好").replace(/ありがとう/g, "谢谢"),
          ko: text.replace(/こんにちは/g, "안녕하세요").replace(/ありがとう/g, "감사합니다")
        },
        en: {
          ja: text.replace(/Hello/g, "こんにちは").replace(/Thank you/g, "ありがとう"),
          zh: text.replace(/Hello/g, "你好").replace(/Thank you/g, "谢谢"),
          ko: text.replace(/Hello/g, "안녕하세요").replace(/Thank you/g, "감사합니다")
        }
      };

      const translatedText = translations[fromLang]?.[toLang] || `[${toLang}] ${text}`;
      
      res.json({ 
        originalText: text,
        translatedText,
        fromLang,
        toLang
      });
    } catch (error) {
      res.status(500).json({ error: "Translation failed" });
    }
  });

  const httpServer = createServer(app);
  
  // WebSocket server for real-time chat
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (ws: WebSocket) => {
    console.log('New WebSocket connection');
    
    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'chat') {
          // Save message to storage
          const savedMessage = await storage.createChatMessage({
            userId: message.userId || 'anonymous',
            username: message.username || 'Anonymous',
            message: message.message
          });
          
          // Broadcast to all connected clients
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: 'chat',
                data: savedMessage
              }));
            }
          });
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });
    
    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });

  return httpServer;
}
