import React from 'react';
import { Rocket, Zap, MessageSquare, ArrowRight, PlayCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description, iconColor }) => (
    <Card className="p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-gray-50 ${iconColor}`}>
            <Icon size={20} />
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </Card>
);

const Step = ({ number, title, description }) => (
    <div className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0 border border-blue-100">
            {number}
        </div>
        <div>
            <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{description}</p>
        </div>
    </div>
);

const Dashboard = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-12 py-8">
            {/* Hero Section */}
            <div className="text-center space-y-6">
                <div className="space-y-3">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Build Voice Agents in Minutes
                    </h1>
                    <p className="text-base text-gray-500 max-w-xl mx-auto">
                        Deploy AI-powered voice assistants that sound human and integrate seamlessly.
                        Simple, fast, and no coding required.
                    </p>
                </div>

                <div className="flex items-center justify-center gap-3">
                    <Link to="/bots/new">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-sm font-medium rounded-lg shadow-sm">
                            <span className="flex items-center gap-2">
                                Create Bot <ArrowRight size={16} />
                            </span>
                        </Button>
                    </Link>
                    <Link to="/voice-demo">
                        <Button variant="secondary" className="px-5 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700">
                            <span className="flex items-center gap-2">
                                <PlayCircle size={16} />
                                Live Demo
                            </span>
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard
                    icon={Zap}
                    title="Launch in Minutes"
                    description="Skip development cycles. Select a template, customize, and get a production-ready API instantly."
                    iconColor="text-yellow-600"
                />
                <FeatureCard
                    icon={Rocket}
                    title="No-Code Builder"
                    description="Orchestrate conversation flows with a simple interface. Powerful logic without writing code."
                    iconColor="text-blue-600"
                />
                <FeatureCard
                    icon={MessageSquare}
                    title="Human-Like AI"
                    description="Powered by advanced LLMs to understand context and deliver natural, empathetic responses."
                    iconColor="text-purple-600"
                />
            </div>

            {/* How It Works - Simplified */}
            <div className="border-t border-gray-100 pt-10">
                <div className="text-center mb-8">
                    <h2 className="text-lg font-bold text-gray-900">How It Works</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                    <Step
                        number="1"
                        title="Select & Customize"
                        description="Choose a template and tailor the personality to match your brand voice."
                    />
                    <Step
                        number="2"
                        title="Configure Logic"
                        description="Define how your agent handles questions and objections using simple rules."
                    />
                    <Step
                        number="3"
                        title="Deploy Instantly"
                        description="Get a unique API endpoint immediately and start handling calls."
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
