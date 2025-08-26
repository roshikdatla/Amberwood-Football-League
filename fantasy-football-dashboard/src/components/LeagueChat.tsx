import React, { useState, useRef, useEffect } from 'react';
import { mcpApi } from '../services/mcpApi';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isLoading?: boolean;
  isTyping?: boolean;
  displayText?: string;
}

const LeagueChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "🏈 **Fantasy Football Assistant**\n\nHi! I have access to your Sleeper league data and AI analysis. Here are some questions that work great:\n\n**📊 Popular Queries:**\n• **\"Show me the standings\"** - Current league rankings\n• **\"Who's in the league?\"** - All team owners and info\n• **\"This week's matchups\"** - Current week games\n• **\"Show me all rosters\"** - Everyone's players\n• **\"Team for [your name]\"** - Specific team analysis\n\n**🔍 Player Searches:**\n• **\"Who owns [player name]?\"** - Find player's owner\n• **\"Search for [player name]\"** - Player lookup\n• **\"When was [player name] drafted?\"** - Draft history\n\n**🤖 AI Analysis (requires API key):**\n• **\"Who should [your name] start this week?\"** - Start/sit advice\n• **\"How will [your name] do this week?\"** - Team predictions\n• **\"Trade suggestions for [your name]\"** - Trade advice\n\n**📋 League History:**\n• **\"Show me the draft results\"** - Full draft recap\n• **\"First round draft picks\"** - Top picks\n• **\"Recent transactions\"** - Trades & pickups\n\n💡 Replace [your name] and [player name] with actual names in your league!",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Typewriter effect for assistant messages
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    messages.forEach((message) => {
      if (message.sender === 'assistant' && message.isTyping && !message.isLoading) {
        const fullText = message.text;
        const currentDisplayText = message.displayText || '';
        
        if (currentDisplayText.length < fullText.length) {
          const intervalId = setInterval(() => {
            setMessages(prevMessages => 
              prevMessages.map(msg => {
                if (msg.id === message.id && msg.displayText && msg.displayText.length < fullText.length) {
                  const nextChar = fullText.charAt(msg.displayText.length);
                  return { ...msg, displayText: msg.displayText + nextChar };
                } else if (msg.id === message.id && msg.displayText && msg.displayText.length >= fullText.length) {
                  return { ...msg, isTyping: false };
                }
                return msg;
              })
            );
          }, 20); // Typing speed: 20ms per character

          intervals.push(intervalId);
        }
      }
    });

    return () => {
      intervals.forEach(clearInterval);
    };
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: 'Analyzing your question and fetching league data...',
      sender: 'assistant',
      timestamp: new Date(),
      isLoading: true
    };
    setMessages(prev => [...prev, loadingMessage]);

    try {
      // Call the MCP server through the API
      const response = await mcpApi.sendChatMessage(inputText.trim());
      
      // Replace loading message with typewriter effect
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id 
          ? { ...msg, text: response, isLoading: false, isTyping: true, displayText: '' }
          : msg
      ));
    } catch (error) {
      console.error('Error processing question:', error);
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id 
          ? { 
              ...msg, 
              text: error instanceof Error ? error.message : "Sorry, I encountered an error while processing your question. Please try again.", 
              isLoading: false 
            }
          : msg
      ));
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };


  return (
    <div className="league-chat-container">
      <div className="chat-header">
        <div className="chat-title">
          <img src="/claude-logo-png_seeklogo-554540.png" alt="Claude" className="chat-claude-logo" />
          <h2>League Assistant</h2>
        </div>
        <div className="chat-subtitle">
          Ask me anything about your fantasy league!
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">
              <div className="message-text">
                {message.isLoading ? (
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : message.isTyping ? (
                  <pre>{message.displayText}<span className="typing-cursor">|</span></pre>
                ) : (
                  <pre>{message.text}</pre>
                )}
              </div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input-form">
        <div className="chat-input-container">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about standings, rosters, trades, or anything else..."
            className="chat-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="chat-send-button"
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? '⏳' : '➤'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeagueChat;