import React from 'react';
import { Rocket, FileText, MessageSquare, Bot, Play, BookOpen, RotateCcw, Save } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import { Link } from 'react-router-dom';

const BotBuilder = () => {
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
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
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
        </div>
    );
};

export default BotBuilder;
