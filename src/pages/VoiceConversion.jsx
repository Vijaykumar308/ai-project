import React, { useState, useEffect } from 'react';
import { Mic, MicOff, PhoneOff, Settings, Volume2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const VoiceConversion = () => {
    const [isListening, setIsListening] = useState(false);
    const [status, setStatus] = useState('Ready');
    const [volume, setVolume] = useState(0);

    // Simulate volume fluctuation for visualizer
    useEffect(() => {
        let interval;
        if (isListening) {
            interval = setInterval(() => {
                setVolume(Math.random() * 100);
            }, 100);
        } else {
            setVolume(0);
        }
        return () => clearInterval(interval);
    }, [isListening]);

    const toggleListening = () => {
        if (isListening) {
            setIsListening(false);
            setStatus('Ready');
        } else {
            setIsListening(true);
            setStatus('Listening...');
            // Simulate "Speaking" state after a delay
            setTimeout(() => {
                setStatus('Speaking...');
            }, 2000);
        }
    };

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

                    <Link to="/bots">
                        <Button
                            variant="danger"
                            className="rounded-full w-14 h-14 p-0 flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 text-red-500 border-transparent"
                        >
                            <PhoneOff size={24} />
                        </Button>
                    </Link>
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
