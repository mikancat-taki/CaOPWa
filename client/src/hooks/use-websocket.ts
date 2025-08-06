import { useState, useRef, useEffect } from 'react';

interface UseWebSocketReturn {
  sendMessage: (message: string) => void;
  lastMessage: string | null;
  readyState: number;
}

export function useWebSocket(url: string): UseWebSocketReturn {
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [readyState, setReadyState] = useState<number>(WebSocket.CONNECTING);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}${url}`;
    
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => setReadyState(WebSocket.OPEN);
    ws.current.onclose = () => setReadyState(WebSocket.CLOSED);
    ws.current.onerror = () => setReadyState(WebSocket.CLOSED);
    ws.current.onmessage = (event) => setLastMessage(event.data);

    return () => {
      ws.current?.close();
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    }
  };

  return { sendMessage, lastMessage, readyState };
}
