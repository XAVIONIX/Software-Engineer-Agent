import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import MessageBubble from './MessageBubble';

const ChatPanel = ({ selectedAgent, messages, onSendMessage, onClose }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const filteredMessages = selectedAgent
    ? messages.filter(m => m.agent === selectedAgent.name || m.agent === 'User')
    : messages;

  return (
    <div className="transition-theme fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="transition-theme bg-card rounded-2xl w-full max-w-2xl h-3/4 flex flex-col border border-border shadow-xl">
        {/* Header */}
        <div className="transition-theme flex items-center justify-between p-4 border-b border-border bg-surface/50">
          <h3 className="text-lg font-semibold text-foreground">
            Chat with {selectedAgent?.name || 'Orchestrator'}
          </h3>
          <button
            onClick={onClose}
            className="transition-theme p-2 hover:bg-surface rounded-lg text-muted-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredMessages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="transition-theme p-4 border-t border-border">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message ${selectedAgent?.name || 'Orchestrator'}...`}
              className="transition-theme flex-1 bg-surface border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="transition-theme bg-primary hover:opacity-90 text-primary-foreground px-4 py-2 rounded-lg font-medium"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;
