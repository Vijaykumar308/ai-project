import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Copy, Terminal, Code, MessageSquare, Bot, ArrowRight, ArrowLeft } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

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

const BotDetails = () => {
    const { botId } = useParams();

    // Mock data - in a real app, fetch based on botId
    const botData = {
        id: botId || 'd7af7000',
        name: 'Support Agent',
        type: 'Customer Service',
        description: 'Handles customer queries and creates support tickets',
        personality: 'helpful, empathetic, solution-oriented',
        apiEndpoint: `http://localhost:8000/api/bot/${botId || 'd7af7000'}/interact`
    };

    const curlCode = `curl -X POST "${botData.apiEndpoint}" \\
  -F "audio=@your_audio.wav" \\
  -F "session_id=user123" \\
  --output response.wav`;

    const pythonCode = `import requests

files = {'audio': open('audio.wav', 'rb')}
data = {'session_id': 'user123'}

response = requests.post(
    '${botData.apiEndpoint}',
    files=files,
    data=data
)

with open('response.wav', 'wb') as f:
    f.write(response.content)`;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Link to="/bots">
                        <Button variant="ghost" className="p-2">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{botData.name}</h2>
                        <p className="text-gray-500">Bot ID: {botData.id}</p>
                    </div>
                </div>

                <Link to="/voice-demo">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                        Connect with Agent
                    </Button>
                </Link>
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
                            <code className="text-sm text-gray-600 truncate flex-1">{botData.apiEndpoint}</code>
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
                                <h3 className="text-lg font-bold text-gray-900">{botData.name}</h3>
                                <div className="mt-2 space-y-1 text-sm">
                                    <p><span className="text-gray-500">ID:</span> <span className="font-mono bg-gray-100 px-1 rounded">{botData.id}</span></p>
                                    <p><span className="text-gray-500">Type:</span> {botData.type}</p>
                                    <p><span className="text-gray-500">Description:</span> {botData.description}</p>
                                    <p><span className="text-gray-500">Personality:</span> {botData.personality}</p>
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
    );
};

export default BotDetails;
