import React, { useState, useEffect } from 'react';
import { Mic, MicOff, PhoneOff, Settings, Volume2, ArrowLeft, BarChart2, Clock, MessageSquare, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Link } from 'react-router-dom';

const VoiceConversion = () => {
    const [isListening, setIsListening] = useState(false);
    const [status, setStatus] = useState('Ready');
    const [volume, setVolume] = useState(0);
    const [callEnded, setCallEnded] = useState(false);

    // Mock Transcript Data
    const transcript = [
        { sender: 'bot', text: "Hi there! I'm your virtual assistant. How can I help you today?", time: '00:01' },
        { sender: 'user', text: "I'm having trouble with my account login.", time: '00:05' },
        { sender: 'bot', text: "I can help with that. Are you seeing any error messages?", time: '00:08' },
        { sender: 'user', text: "Yes, it says 'Invalid credentials' but I'm sure my password is correct.", time: '00:12' },
        { sender: 'bot', text: "Okay, let's try resetting your password. I'll send a link to your email.", time: '00:15' },
        { sender: 'user', text: "That worked, thank you!", time: '00:45' },
        { sender: 'bot', text: "You're welcome! Is there anything else?", time: '00:48' },
        { sender: 'user', text: "No, that's all.", time: '00:50' },
        { sender: 'bot', text: "Have a great day!", time: '00:52' },
    ];

    // Simulate volume fluctuation for visualizer
    useEffect(() => {
        let interval;
        if (isListening && !callEnded) {
            interval = setInterval(() => {
                setVolume(Math.random() * 100);
            }, 100);
        } else {
            setVolume(0);
        }
        return () => clearInterval(interval);
    }, [isListening, callEnded]);

    const toggleListening = () => {
        if (isListening) {
            setIsListening(false);
            setStatus('Ready');
        } else {
            setIsListening(true);
            setStatus('Listening...');
            // Simulate "Speaking" state after a delay
            setTimeout(() => {
                if (!callEnded) setStatus('Speaking...');
            }, 2000);
        }
    };

    const endCall = () => {
        setIsListening(false);
        setCallEnded(true);
    };

    if (callEnded) {
        return (
            <div className="min-h-[calc(100vh-100px)] bg-gray-50 p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/bots">
                            <Button variant="ghost" className="p-2">
                                <ArrowLeft size={20} />
                            </Button>
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Call Analytics</h2>
                            <p className="text-gray-500">Session ID: #8492-AC</p>
                        </div>
                    </div>
                    <Button onClick={() => setCallEnded(false)} variant="secondary">
                        Start New Call
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Transcript */}
                    <Card className="lg:col-span-2 p-0 overflow-hidden flex flex-col h-[600px]">
                        <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
                            <div className="flex items-center gap-2 font-bold text-gray-800">
                                <MessageSquare size={18} className="text-blue-500" />
                                <h3>Transcript</h3>
                            </div>
                            <span className="text-xs text-gray-400">00:52 Duration</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
                            {transcript.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                                ? 'bg-blue-600 text-white rounded-tr-none'
                                                : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                                            }`}>
                                            {msg.text}
                                        </div>
                                        <span className="text-xs text-gray-400 mt-1 px-1">{msg.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Right Column: Analytics */}
                    <div className="space-y-6">
                        {/* Sentiment Analysis */}
                        <Card className="p-6">
                            <div className="flex items-center gap-2 font-bold text-gray-800 mb-6">
                                <ThumbsUp size={18} className="text-green-500" />
                                <h3>Sentiment Analysis</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-gray-700">Positive</span>
                                        <span className="text-green-600 font-bold">65%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-gray-700">Neutral</span>
                                        <span className="text-gray-600 font-bold">30%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-gray-400 rounded-full" style={{ width: '30%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-gray-700">Negative</span>
                                        <span className="text-red-600 font-bold">5%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500 rounded-full" style={{ width: '5%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Talk Time */}
                        <Card className="p-6">
                            <div className="flex items-center gap-2 font-bold text-gray-800 mb-6">
                                <Clock size={18} className="text-orange-500" />
                                <h3>Talk Time Ratio</h3>
                            </div>

                            <div className="flex items-center justify-center h-32 relative">
                                {/* Simple Donut Chart Representation using CSS Conic Gradient */}
                                <div
                                    className="w-32 h-32 rounded-full"
                                    style={{
                                        background: 'conic-gradient(#3b82f6 0% 45%, #e5e7eb 45% 100%)'
                                    }}
                                >
                                    <div className="w-24 h-24 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col">
                                        <span className="text-2xl font-bold text-gray-900">45%</span>
                                        <span className="text-xs text-gray-500">User</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center gap-6 mt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <span className="text-sm text-gray-600">User (45%)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                                    <span className="text-sm text-gray-600">Bot (55%)</span>
                                </div>
                            </div>
                        </Card>

                        {/* Call Stats */}
                        <Card className="p-6">
                            <div className="flex items-center gap-2 font-bold text-gray-800 mb-4">
                                <BarChart2 size={18} className="text-purple-500" />
                                <h3>Call Stats</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-purple-50 p-3 rounded-lg text-center">
                                    <p className="text-xs text-purple-600 uppercase font-bold">Duration</p>
                                    <p className="text-lg font-bold text-gray-900">52s</p>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg text-center">
                                    <p className="text-xs text-blue-600 uppercase font-bold">Turns</p>
                                    <p className="text-lg font-bold text-gray-900">9</p>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg text-center">
                                    <p className="text-xs text-green-600 uppercase font-bold">Silence</p>
                                    <p className="text-lg font-bold text-gray-900">12%</p>
                                </div>
                                <div className="bg-orange-50 p-3 rounded-lg text-center">
                                    <p className="text-xs text-orange-600 uppercase font-bold">Pace</p>
                                    <p className="text-lg font-bold text-gray-900">Normal</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col items-center justify-center bg-gray-900 rounded-2xl overflow-hidden relative">
            {/* Background Animation Effect */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-md px-6">

                {/* Status Indicator */}
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-white tracking-wide">{status}</h2>
                    <p className="text-blue-200 text-sm">Voice Conversion Mode</p>
                </div>

                {/* Visualizer Orb */}
                <div className="relative">
                    {/* Outer Rings */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/30 transition-all duration-300 ${isListening ? 'w-64 h-64 animate-[spin_10s_linear_infinite]' : 'w-48 h-48'}`}></div>
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/20 transition-all duration-300 ${isListening ? 'w-80 h-80 animate-[spin_15s_linear_infinite_reverse]' : 'w-56 h-56'}`}></div>

                    {/* Core Orb */}
                    <div
                        className={`w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_50px_rgba(59,130,246,0.5)] flex items-center justify-center transition-all duration-200 transform ${isListening ? 'scale-110' : 'scale-100'}`}
                        style={{
                            transform: isListening ? `scale(${1 + volume / 200})` : 'scale(1)'
                        }}
                    >
                        <Volume2 className="text-white/80" size={48} />
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-6">
                    <Button
                        variant="secondary"
                        className="rounded-full w-14 h-14 p-0 flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700"
                    >
                        <Settings size={24} />
                    </Button>

                    <button
                        onClick={toggleListening}
                        className={`rounded-full w-20 h-20 flex items-center justify-center transition-all duration-300 shadow-lg ${isListening
                                ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/30'
                                : 'bg-white hover:bg-gray-100 text-gray-900 shadow-white/10'
                            }`}
                    >
                        {isListening ? <MicOff size={32} /> : <Mic size={32} />}
                    </button>

                    <Button
                        variant="danger"
                        onClick={endCall}
                        className="rounded-full w-14 h-14 p-0 flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 text-red-500 border-transparent"
                    >
                        <PhoneOff size={24} />
                    </Button>
                </div>
            </div>

            {/* Footer Info */}
            <div className="absolute bottom-8 text-center">
                <p className="text-gray-500 text-xs">Powered by Universal Voice Engine</p>
            </div>
        </div>
    );
};

export default VoiceConversion;
