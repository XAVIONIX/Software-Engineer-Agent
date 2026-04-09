import React from 'react';

const MessageBubble = ({ message }) => {
  const isUser = message.type === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`transition-theme max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-surface text-foreground border border-border'
        }`}
      >
        <div className="text-xs font-semibold mb-1 opacity-75">
          {message.agent}
        </div>
        <div className="text-sm">{message.content}</div>
        <div className="text-xs opacity-50 mt-1">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
