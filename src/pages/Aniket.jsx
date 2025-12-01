import React, { useState } from 'react';
import { Bot, Plus, Check, Trash2, FileText, MessageSquare, Mic } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';

// Mock Constants
const TEMPLATES = {
    'Customer Support': {
        description: 'Handles common customer queries.',
        personality: 'Professional, Helpful',
        greeting: 'Hello! How can I assist you today?',
        questions: '',
        closing: 'Thank you for contacting us.',
        voiceStyle: 'professional',
        botType: 'Scripted Q&A'
    },
    'Sales Agent': {
        description: 'Qualifies leads and schedules appointments.',
        personality: 'Energetic, Persuasive',
        greeting: 'Hi! Are you looking to grow your business?',
        questions: '',
        closing: 'Let\'s get you started!',
        voiceStyle: 'energetic',
        botType: 'General Chat'
    }
};

const BOT_TYPES = [
    { label: 'General Chat', value: 'General Chat' },
    { label: 'Scripted Q&A', value: 'Scripted Q&A' },
    { label: 'Knowledge Base Chat', value: 'Knowledge Base Chat' }
];

const VOICE_STYLES = [
    { label: 'Friendly', value: 'friendly' },
    { label: 'Professional', value: 'professional' },
    { label: 'Energetic', value: 'energetic' }
];

const KB_TYPES = [
    { label: 'None', value: 'None' },
    { label: 'OpenWebUI Collection', value: 'OpenWebUI Collection' }
];

// Mock Validation
const validateBotCreation = (data) => {
    if (!data.botName) return { valid: false, error: 'Bot Name is required' };
    return { valid: true };
};

// Mock API
const apiService = {
    createBot: async (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    data: { bot_id: 'bot_' + Math.floor(Math.random() * 1000) }
                });
            }, 1000);
        });
    }
};

const CreateBot = () => {
    const [formData, setFormData] = useState({
        botName: '',
        description: '',
        personality: 'professional, helpful',
        greeting: '',
        questions: '',
        closing: '',
        voiceStyle: 'friendly',
        botType: 'General Chat',
        kbType: 'None',
        collectionId: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [botPreview, setBotPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const loadTemplate = (templateName) => {
        if (TEMPLATES[templateName]) {
            const template = TEMPLATES[templateName];
            setFormData(prev => ({
                ...prev,
                description: template.description,
                personality: template.personality,
                greeting: template.greeting,
                questions: template.questions,
                closing: template.closing,
                voiceStyle: template.voiceStyle,
                botType: template.botType
            }));
            setStatus({ type: 'success', message: `Template "${templateName}" loaded!` });
        }
    };

    const handleCreateBot = async () => {
        setStatus({ type: '', message: '' });

        // Validate
        const validation = validateBotCreation(formData);
        if (!validation.valid) {
            setStatus({ type: 'error', message: validation.error });
            return;
        }

        setLoading(true);

        try {
            // Call actual backend API
            const response = await apiService.createBot(formData);

            if (response.success) {
                const botId = response.data.bot_id;

                // Parse questions for preview
                const questions = formData.botType === 'Scripted Q&A'
                    ? formData.questions.split('\n').filter(q => q.trim()).map((q, idx) => {
                        const parts = q.split('|').map(p => p.trim());
                        return {
                            id: idx + 1,
                            question: parts[0],
                            field: parts[1] || `field_${idx + 1}`,
                            type: parts[2] || 'text'
                        };
                    })
                    : [];

                // Create preview data
                const bot = {
                    bot_id: botId,
                    agent_name: formData.botName,
                    agent_description: formData.description,
                    agent_personality: formData.personality,
                    mode: formData.botType === 'Scripted Q&A' ? 'qa_scripted' :
                        formData.botType === 'Knowledge Base Chat' ? 'kb_chat' : 'chat_general',
                    conversation_flow: {
                        greeting: formData.greeting,
                        questions: questions,
                        closing: formData.closing
                    },
                    voice_settings: {
                        style: formData.voiceStyle
                    },
                    knowledge_base: {
                        enabled: formData.botType === 'Knowledge Base Chat' && formData.kbType === 'OpenWebUI Collection',
                        collection_id: formData.collectionId || null
                    },
                    api: {
                        endpoint: `http://localhost:8000/api/bot/${botId}/interact`
                    }
                };

                setBotPreview(bot);
                setStatus({
                    type: 'success',
                    message: `✅ Bot "${formData.botName}" created successfully! Saved to bots/${botId}_${formData.botName.toLowerCase().replace(/\s+/g, '_')}.json`
                });
            } else {
                setStatus({
                    type: 'error',
                    message: `❌ Failed to create bot: ${response.error}`
                });
            }

        } catch (error) {
            setStatus({
                type: 'error',
                message: `❌ Error: ${error.message}. Make sure backend is running!`
            });
        } finally {
            setLoading(false);
        }
    };

    const clearForm = () => {
        setFormData({
            botName: '',
            description: '',
            personality: 'professional, helpful',
            greeting: '',
            questions: '',
            closing: '',
            voiceStyle: 'friendly',
            botType: 'General Chat',
            kbType: 'None',
            collectionId: ''
        });
        setStatus({ type: '', message: '' });
        setBotPreview(null);
    };

    const shouldShowQuestions = formData.botType === 'Scripted Q&A';
    const shouldShowKB = formData.botType === 'Knowledge Base Chat';
    const shouldShowCollectionId = shouldShowKB && formData.kbType === 'OpenWebUI Collection';

    return (
        <div className="fade-in max-w-7xl mx-auto p-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Bot size={32} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Your Voice Bot</h2>
                    <p className="text-gray-500 text-sm">
                        Build → Deploy → Test - All in One Place!
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Form */}
                <div className="flex flex-col gap-6">
                    <Card className="p-6">
                        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <FileText size={18} className="text-blue-500" />
                            Step 1: Choose Template
                        </h4>
                        <Select
                            label="Select Template"
                            value=""
                            onChange={(e) => loadTemplate(e.target.value)}
                            options={Object.keys(TEMPLATES).map(t => ({ label: t, value: t }))}
                            placeholder="Choose a template..."
                        />
                    </Card>

                    <Card className="p-6 space-y-4">
                        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Bot size={18} className="text-purple-500" />
                            Step 2: Bot Details
                        </h4>

                        <Input
                            label="Bot Name"
                            value={formData.botName}
                            onChange={handleInputChange('botName')}
                            placeholder="e.g., HR Hiring Assistant"
                            required
                        />

                        <Textarea
                            label="Description"
                            value={formData.description}
                            onChange={handleInputChange('description')}
                            placeholder="What does this bot do?"
                            className="h-20"
                        />

                        <Input
                            label="Personality"
                            value={formData.personality}
                            onChange={handleInputChange('personality')}
                            placeholder="e.g., professional, friendly"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                label="Voice Style"
                                value={formData.voiceStyle}
                                onChange={handleInputChange('voiceStyle')}
                                options={VOICE_STYLES}
                            />

                            <Select
                                label="Bot Type"
                                value={formData.botType}
                                onChange={handleInputChange('botType')}
                                options={BOT_TYPES}
                            />
                        </div>
                    </Card>

                    <Card className="p-6 space-y-4">
                        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <MessageSquare size={18} className="text-green-500" />
                            Step 3: Conversation
                        </h4>

                        <Textarea
                            label="Greeting"
                            value={formData.greeting}
                            onChange={handleInputChange('greeting')}
                            placeholder="Opening message..."
                            className="h-20"
                        />

                        {shouldShowQuestions && (
                            <Textarea
                                label="Questions (one per line)"
                                value={formData.questions}
                                onChange={handleInputChange('questions')}
                                placeholder="Question? | field_name | type&#10;Example: What is your name? | name | text"
                                className="h-32 font-mono text-sm"
                            />
                        )}

                        {shouldShowKB && (
                            <>
                                <Select
                                    label="Knowledge Base Type"
                                    value={formData.kbType}
                                    onChange={handleInputChange('kbType')}
                                    options={KB_TYPES}
                                />

                                {shouldShowCollectionId && (
                                    <Input
                                        label="OpenWebUI Collection ID"
                                        value={formData.collectionId}
                                        onChange={handleInputChange('collectionId')}
                                        placeholder="Enter collection ID"
                                        required
                                    />
                                )}
                            </>
                        )}

                        <Textarea
                            label="Closing"
                            value={formData.closing}
                            onChange={handleInputChange('closing')}
                            placeholder="Thank you message..."
                            className="h-20"
                        />
                    </Card>

                    <div className="flex gap-4 mt-2">
                        <Button
                            variant="primary"
                            className="flex-1 py-3 text-lg"
                            onClick={handleCreateBot}
                            disabled={loading}
                        >
                            <span className="flex items-center justify-center gap-2">
                                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Plus size={20} />}
                                {loading ? 'Creating...' : 'Create Bot'}
                            </span>
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={clearForm}
                            disabled={loading}
                        >
                            <span className="flex items-center gap-2">
                                <Trash2 size={18} />
                                Clear
                            </span>
                        </Button>
                    </div>

                    {status.message && (
                        <div className={`p-3 rounded-lg text-sm font-medium ${status.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'
                            }`}>
                            {status.message}
                        </div>
                    )}
                </div>

                {/* Right Column - Preview */}
                <div className="lg:sticky lg:top-8 self-start">
                    <Card className="p-6">
                        <h4 className="font-bold text-gray-800 mb-4">👁️ Preview</h4>

                        {botPreview ? (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                        <Check size={20} />
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900">{botPreview.agent_name}</h3>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-mono">ID: {botPreview.bot_id}</span>
                                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded font-medium">{formData.botType}</span>
                                    {botPreview.knowledge_base.enabled && (
                                        <span className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded font-medium">KB Enabled</span>
                                    )}
                                </div>

                                <div>
                                    <strong className="text-sm text-gray-700 block mb-1">Description:</strong>
                                    <p className="text-sm text-gray-600">{botPreview.agent_description}</p>
                                </div>

                                <div>
                                    <strong className="text-sm text-gray-700 block mb-1">Personality:</strong>
                                    <p className="text-sm text-gray-600">{botPreview.agent_personality}</p>
                                </div>

                                <div>
                                    <strong className="text-sm text-gray-700 block mb-1">Greeting:</strong>
                                    <div className="p-3 bg-gray-50 border-l-4 border-blue-500 rounded-r text-sm text-gray-600 italic">
                                        "{botPreview.conversation_flow.greeting}"
                                    </div>
                                </div>

                                {botPreview.conversation_flow.questions.length > 0 && (
                                    <div>
                                        <strong className="text-sm text-gray-700 block mb-1">Questions ({botPreview.conversation_flow.questions.length}):</strong>
                                        <ul className="list-decimal list-inside space-y-1 text-sm text-gray-600 pl-2">
                                            {botPreview.conversation_flow.questions.map(q => (
                                                <li key={q.id}>
                                                    {q.question} <code className="bg-gray-100 px-1 rounded text-xs text-gray-500">({q.field})</code>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div>
                                    <strong className="text-sm text-gray-700 block mb-1">Closing:</strong>
                                    <div className="p-3 bg-gray-50 border-l-4 border-blue-500 rounded-r text-sm text-gray-600 italic">
                                        "{botPreview.conversation_flow.closing}"
                                    </div>
                                </div>

                                <div>
                                    <strong className="text-sm text-gray-700 block mb-1">🚀 API Endpoint:</strong>
                                    <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                                        <code className="text-xs text-green-400 font-mono whitespace-nowrap">{botPreview.api.endpoint}</code>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                                <Bot size={48} className="mb-4 opacity-20" />
                                <p>Create a bot to see preview</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateBot;