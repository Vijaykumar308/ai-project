import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Bot, User, Volume2, StopCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Link } from 'react-router-dom';

const TestBot = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initial Greeting
    useEffect(() => {
        const initialGreeting = {
            id: 1,
            sender: 'bot',
            text: "Hi there! I'm your virtual assistant. How can I help you today?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([initialGreeting]);
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            sender: 'user',
            text: inputText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newMessage]);
        setInputText('');

        // Simulate Bot Response
        setIsSpeaking(true);
        setTimeout(() => {
            const botResponse = {
                id: messages.length + 2,
                sender: 'bot',
                text: "I understand. I can certainly help you with that. Could you please provide more details?",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botResponse]);
            setIsSpeaking(false);
        }, 1500);
    };

    const toggleListening = () => {
        setIsListening(!isListening);
        // Simulation of voice input would go here
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <Link to="/bots">
                        <Button variant="ghost" className="p-2">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Test Your Bot</h2>
                        <p className="text-gray-500">Interact with your agent in real-time.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" onClick={() => setMessages([])}>
                        <RefreshCw size={16} className="mr-2" /> Reset Chat
                    </Button>
                </div>
            </div>

            <Card className="flex-1 flex flex-col overflow-hidden border-0 shadow-lg">
                {/* Chat Header */}
                <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <Bot size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Support Agent</h3>
                            <div className="flex items-center gap-2 text-xs text-green-600">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Online
                            </div>
                        </div>
                    </div>
                    {isSpeaking && (
                        <div className="flex items-center gap-2 text-blue-600 text-sm font-medium animate-pulse">
                            <Volume2 size={16} />
                            Speaking...
                        </div>
                    )}
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'user' ? 'bg-gray-200 text-gray-600' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                    {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                                </div>
                                <div className={`p-4 rounded-2xl ${msg.sender === 'user'
                                        ? 'bg-blue-600 text-white rounded-tr-none'
                                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                                    }`}>
                                    <p className="text-sm leading-relaxed">{msg.text}</p>
                                    <span className={`text-xs mt-2 block ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'
                                        }`}>
                                        {msg.timestamp}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={toggleListening}
                            className={`p-3 rounded-full transition-colors ${isListening
                                    ? 'bg-red-100 text-red-600 animate-pulse'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {isListening ? <StopCircle size={20} /> : <Mic size={20} />}
                        </button>

                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                        </div>

                        <Button type="submit" className="rounded-full w-12 h-12 p-0 flex items-center justify-center">
                            <Send size={20} />
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default TestBot;
