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
      text: "Hi! I'm your fantasy football assistant. I can help you analyze your Amberwood Fantasy Football League using AI and real-time data from Sleeper.\n\nTry asking me about standings, rosters, trades, draft analysis, or any other fantasy football questions!",
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
    const typingMessage = messages.find(msg => 
      msg.sender === 'assistant' && msg.isTyping && !msg.isLoading
    );
    
    if (!typingMessage) return;

    const fullText = typingMessage.text;
    const currentLength = (typingMessage.displayText || '').length;
    
    if (currentLength >= fullText.length) {
      // Typing is complete
      setMessages(prev => prev.map(msg => 
        msg.id === typingMessage.id 
          ? { ...msg, isTyping: false }
          : msg
      ));
      return;
    }

    const timeoutId = setTimeout(() => {
      setMessages(prev => prev.map(msg => {
        if (msg.id === typingMessage.id) {
          const currentDisplay = msg.displayText || '';
          const nextChar = fullText.charAt(currentDisplay.length);
          return { ...msg, displayText: currentDisplay + nextChar };
        }
        return msg;
      }));
    }, 50); // 50ms per character

    return () => clearTimeout(timeoutId);
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