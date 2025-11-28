import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Play, Pause, Edit, Trash2 } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Link } from 'react-router-dom';

const BotList = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const bots = [
        { id: 1, name: 'Support Agent', type: 'Customer Service', voiceStyle: 'Friendly', status: 'Active', calls: 1234, lastActive: '2 mins ago' },
        { id: 2, name: 'Sales Bot', type: 'Sales & Leads', voiceStyle: 'Professional', status: 'Paused', calls: 856, lastActive: '1 day ago' },
        { id: 3, name: 'Appointment Setter', type: 'Scheduling', voiceStyle: 'Energetic', status: 'Active', calls: 432, lastActive: '1 hour ago' },
        { id: 4, name: 'Survey Bot', type: 'Data Collection', voiceStyle: 'Calm', status: 'Draft', calls: 0, lastActive: 'Never' },
    ];

    const filteredBots = bots.filter(bot => {
        const query = searchQuery.toLowerCase();
        return (
            bot.name.toLowerCase().includes(query) ||
            bot.type.toLowerCase().includes(query) ||
            bot.voiceStyle.toLowerCase().includes(query)
        );
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">My Bots</h2>
                    <p className="text-gray-500">Manage and monitor your voice agents.</p>
                </div>
                <Link to="/bots/new">
                    <Button>Create New Bot</Button>
                </Link>
            </div>

            <Card className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name, type, or voice style..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="secondary" className="flex items-center gap-2">
                        <Filter size={20} />
                        Filters
                    </Button>
                </div>
            </Card>

            <div className="grid grid-cols-1 gap-4">
                {filteredBots.length > 0 ? (
                    filteredBots.map((bot) => (
                        <Link to={`/bots/${bot.id}`} key={bot.id} className="block">
                            <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bot.status === 'Active' ? 'bg-green-100 text-green-600' :
                                            bot.status === 'Paused' ? 'bg-yellow-100 text-yellow-600' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                            {bot.status === 'Active' ? <Play size={24} /> :
                                                bot.status === 'Paused' ? <Pause size={24} /> :
                                                    <Edit size={24} />}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{bot.name}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <span>{bot.type}</span>
                                                <span>•</span>
                                                <span>{bot.voiceStyle}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <div className="text-center sm:text-left">
                                            <p className="text-sm text-gray-500">Total Calls</p>
                                            <p className="font-medium text-gray-900">{bot.calls}</p>
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <p className="text-sm text-gray-500">Last Active</p>
                                            <p className="font-medium text-gray-900">{bot.lastActive}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${bot.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                bot.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                {bot.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" className="p-2" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                                                <Edit size={18} />
                                            </Button>
                                            <Button variant="ghost" className="p-2 text-red-600 hover:bg-red-50" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                                                <Trash2 size={18} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        No bots found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default BotList;
