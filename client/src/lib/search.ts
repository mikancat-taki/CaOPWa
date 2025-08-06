import { apiRequest } from "./queryClient";

export interface SearchResult {
  title: string;
  content: string;
  type: 'ai' | 'web';
  url?: string;
  relevance: number;
}

export interface SearchResponse {
  query: any;
  results: SearchResult[];
}

export async function performSearch(
  query: string, 
  type: 'ai' | 'web'
): Promise<SearchResponse> {
  const response = await apiRequest("POST", "/api/search", {
    query,
    type
  });
  
  return response.json();
}
