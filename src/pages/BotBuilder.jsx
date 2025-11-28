import React, { useState, useRef } from 'react';
import { Rocket, FileText, MessageSquare, Bot, Play, BookOpen, RotateCcw, Save, CheckCircle, Copy, Terminal, Code, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import { Link } from 'react-router-dom';

const CodeBlock = ({ language, code }) => (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
            <span className="text-xs font-medium text-gray-400">{language}</span>
            <button className="text-gray-400 hover:text-white transition-colors">
                <Copy size={14} />
            </button>
        </div>
        <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
            <code>{code}</code>
        </pre>
    </div>
);

const BotBuilder = () => {
    const [showDeployment, setShowDeployment] = useState(false);
    const deploymentRef = useRef(null);

    const handleCreateBot = () => {
        setShowDeployment(true);
        // In a real app, you would submit the form data here
        setTimeout(() => {
            deploymentRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const botId = "d7af7000";
    const apiEndpoint = `http://localhost:8000/api/bot/${botId}/interact`;

    const curlCode = `curl -X POST "${apiEndpoint}" \\
  -F "audio=@your_audio.wav" \\
  -F "session_id=user123" \\
  --output response.wav`;

    const pythonCode = `import requests

files = {'audio': open('audio.wav', 'rb')}
data = {'session_id': 'user123'}

response = requests.post(
    '${apiEndpoint}',
    files=files,
    data=data
)

with open('response.wav', 'wb') as f:
    f.write(response.content)`;

    return (
        <div className="space-y-8">
            {/* Top Navigation / Stepper */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Bot className="text-blue-600" />
                        Universal Voice Bot Platform
                    </h2>
                    <p className="text-gray-500 mt-1">Create → Deploy → Test - All in One Place!</p>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                    <Button variant="primary" className="text-sm py-1.5 px-3">
                        <span className="flex items-center gap-2">
                            <Rocket size={16} /> Create Bot
                        </span>
                    </Button>
                    <Link to="/test-bot">
                        <Button variant="ghost" className="text-sm py-1.5 px-3">
                            <span className="flex items-center gap-2">
                                <Play size={16} /> Test Bot
                            </span>
                        </Button>
                    </Link>
                    <Link to="/bots">
                        <Button variant="ghost" className="text-sm py-1.5 px-3">
                            <span className="flex items-center gap-2">
                                <Bot size={16} /> My Bots
                            </span>
                        </Button>
                    </Link>
                    <Button variant="ghost" className="text-sm py-1.5 px-3">
                        <span className="flex items-center gap-2">
                            <BookOpen size={16} /> Guide
                        </span>
                    </Button>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <Rocket className="text-orange-500" size={24} />
                    <h3>Build Your Voice Bot</h3>
                </div>

                {/* Step 1: Choose Template */}
                <Card className="p-6 space-y-4">
                    <div className="flex items-center gap-2 font-medium text-gray-700">
                        <FileText size={20} />
                        <span>Step 1: Choose Template</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                        <div className="flex-1">
                            <Select
                                label="Select Template"
                                options={[
                                    { label: 'Customer Support', value: 'support' },
                                    { label: 'Sales Agent', value: 'sales' },
                                    { label: 'Appointment Booking', value: 'booking' }
                                ]}
                            />
                        </div>
                        <Button variant="secondary" className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 border-0">
                            <span className="flex items-center gap-2 justify-center">
                                <RotateCcw size={16} /> Load Template
                            </span>
                        </Button>
                    </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Step 2: Bot Details */}
                    <Card className="p-6 space-y-6 h-full">
                        <div className="flex items-center gap-2 font-medium text-gray-700 border-b border-gray-100 pb-2">
                            <Bot size={20} />
                            <span>Step 2: Bot Details</span>
                        </div>

                        <Input label="Bot Name *" placeholder="e.g. Support Assistant" />

                        <Textarea
                            label="Description"
                            placeholder="What does this bot do?"
                            className="h-24"
                        />

                        <Input label="Personality" placeholder="e.g. helpful, empathetic, solution-oriented" />

                        <Select
                            label="Voice Style"
                            options={[
                                { label: 'Friendly', value: 'friendly' },
                                { label: 'Professional', value: 'professional' },
                                { label: 'Energetic', value: 'energetic' }
                            ]}
                        />

                        <Select
                            label="Bot Type"
                            options={[
                                { label: 'Scripted Q&A', value: 'scripted' },
                                { label: 'LLM Conversational', value: 'llm' }
                            ]}
                        />
                    </Card>

                    {/* Step 3: Conversation */}
                    <Card className="p-6 space-y-6 h-full">
                        <div className="flex items-center gap-2 font-medium text-gray-700 border-b border-gray-100 pb-2">
                            <MessageSquare size={20} />
                            <span>Step 3: Conversation</span>
                        </div>

                        <Textarea
                            label="Greeting"
                            placeholder="Hi! I'm here to help..."
                            className="h-24"
                        />

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Questions (one per line) - <span className="text-gray-400 font-normal">For Scripted Q&A Only</span>
                            </label>
                            <Textarea
                                placeholder="What is your name? | customer_name | text"
                                className="h-48 font-mono text-sm"
                            />
                        </div>

                        <Textarea
                            label="Closing"
                            placeholder="Thank you! We will be in touch."
                            className="h-24"
                        />
                    </Card>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <Button
                    onClick={handleCreateBot}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
                >
                    <span className="flex items-center gap-2">
                        <Rocket size={20} /> Create Bot
                    </span>
                </Button>

                <Button variant="secondary" className="px-6">
                    <span className="flex items-center gap-2">
                        <RotateCcw size={16} /> Clear
                    </span>
                </Button>
            </div>

            {/* Deployment Section */}
            {showDeployment && (
                <div ref={deploymentRef} className="space-y-6 pt-8 border-t-2 border-dashed border-gray-200">
                    {/* Success Banner */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                        <CheckCircle className="text-green-600 mt-0.5" size={20} />
                        <div>
                            <h3 className="font-bold text-green-900">Bot Created Successfully!</h3>
                            <p className="text-green-700 text-sm mt-1">
                                Bot 'Support Assistant' created! ID: {botId}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column: API & Testing */}
                        <div className="space-y-6">
                            <Card className="p-6">
                                <div className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                                    <Terminal className="text-red-500" size={20} />
                                    <h3>API Endpoint</h3>
                                </div>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center justify-between gap-2">
                                    <code className="text-sm text-gray-600 truncate flex-1">{apiEndpoint}</code>
                                    <button className="text-gray-400 hover:text-blue-600 transition-colors">
                                        <Copy size={16} />
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Copy this endpoint to use in your apps!</p>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                                    <Code className="text-orange-500" size={20} />
                                    <h3>Quick Test</h3>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 mb-2">Using curl:</p>
                                        <CodeBlock language="bash" code={curlCode} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-700 mb-2">Using Python:</p>
                                        <CodeBlock language="python" code={pythonCode} />
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Right Column: Bot Details & Flow */}
                        <div className="space-y-6">
                            <Card className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                                        <Bot size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Support Assistant</h3>
                                        <div className="mt-2 space-y-1 text-sm">
                                            <p><span className="text-gray-500">ID:</span> <span className="font-mono bg-gray-100 px-1 rounded">{botId}</span></p>
                                            <p><span className="text-gray-500">Type:</span> Scripted Q&A</p>
                                            <p><span className="text-gray-500">Description:</span> Handles customer queries and creates support tickets</p>
                                            <p><span className="text-gray-500">Personality:</span> helpful, empathetic, solution-oriented</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                                    <MessageSquare className="text-blue-500" size={20} />
                                    <h3>Conversation Flow:</h3>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Greeting:</p>
                                        <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-100">
                                            Hi! I'm here to help resolve your issue. Let me gather some information.
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Questions:</p>
                                        <ul className="mt-1 space-y-2 text-sm text-gray-600">
                                            <li className="flex gap-2">
                                                <span className="text-gray-400">1.</span>
                                                <span>What is your name? <span className="bg-blue-50 text-blue-600 px-1 rounded text-xs">customer_name</span></span>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-gray-400">2.</span>
                                                <span>What is your account email? <span className="bg-blue-50 text-blue-600 px-1 rounded text-xs">email</span></span>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-gray-400">3.</span>
                                                <span>What issue are you facing? <span className="bg-blue-50 text-blue-600 px-1 rounded text-xs">issue_description</span></span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Closing:</p>
                                        <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-100">
                                            Thank you! I've created a ticket for your issue. Our team will respond within 24 hours.
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BotBuilder;
