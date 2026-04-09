import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transition-theme p-4 border-t border-border">
      <div className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message to the Orchestrator..."
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
  );
};

export default ChatInput;
