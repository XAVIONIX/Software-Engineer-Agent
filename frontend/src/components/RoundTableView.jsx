import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

const RoundTableView = ({ agents, messages, onSendMessage }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  // Position agents in a circle
  const getAgentPosition = (index, total) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radius = 200;
    const centerX = 400;
    const centerY = 300;

    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  return (
    <div className="flex-1 bg-gray-900 relative overflow-hidden">
      {/* Round Table Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] border-2 border-gray-700 rounded-full relative">
          {/* Agent Positions */}
          {agents.map((agent, index) => {
            const pos = getAgentPosition(index, agents.length);
            return (
              <div
                key={agent.id}
                className={`absolute w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  agent.status === 'thinking' || agent.status === 'working'
                    ? 'ring-4 ring-blue-500 animate-pulse'
                    : 'ring-2 ring-gray-600'
                }`}
                style={{
                  left: pos.x - 32,
                  top: pos.y - 32,
                  backgroundColor: agent.status === 'idle' ? '#374151' : '#1e40af',
                }}
              >
                <span className="text-xs font-bold text-white">{agent.name.charAt(0)}</span>
              </div>
            );
          })}

          {/* Center Orchestrator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center ring-4 ring-blue-400 animate-pulse">
              <span className="text-lg font-bold text-white">O</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-sm border-t border-gray-700">
        <div className="h-80 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default RoundTableView;