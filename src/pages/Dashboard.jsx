import React from 'react';
import { Plus, Phone, Clock, Activity, MoreVertical } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <Card className="p-6">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
                <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {change} <span className="text-gray-400">vs last month</span>
                </p>
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon size={24} className="text-white" />
            </div>
        </div>
    </Card>
);

const Dashboard = () => {
    const recentCalls = [
        { id: 1, bot: 'Support Agent', customer: '+1 (555) 123-4567', duration: '4m 12s', status: 'Completed', time: '2 mins ago' },
        { id: 2, bot: 'Sales Bot', customer: '+1 (555) 987-6543', duration: '1m 45s', status: 'Missed', time: '15 mins ago' },
        { id: 3, bot: 'Support Agent', customer: '+1 (555) 456-7890', duration: '8m 30s', status: 'Completed', time: '1 hour ago' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                    <p className="text-gray-500">Here's what's happening with your bots today.</p>
                </div>
                <Link to="/bots/new">
                    <Button className="flex items-center gap-2">
                        <Plus size={20} />
                        Create New Bot
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Calls"
                    value="1,234"
                    change="+12%"
                    icon={Phone}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Minutes Used"
                    value="8,540"
                    change="+8%"
                    icon={Clock}
                    color="bg-purple-500"
                />
                <StatCard
                    title="Active Bots"
                    value="12"
                    change="+2"
                    icon={Activity}
                    color="bg-green-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Recent Calls</h3>
                        <Button variant="ghost" className="text-sm">View All</Button>
                    </div>
                    <div className="space-y-4">
                        {recentCalls.map((call) => (
                            <div key={call.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full ${call.status === 'Completed' ? 'bg-green-500' : 'bg-red-500'}`} />
                                    <div>
                                        <p className="font-medium text-gray-900">{call.bot}</p>
                                        <p className="text-sm text-gray-500">{call.customer}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-gray-900">{call.duration}</p>
                                    <p className="text-sm text-gray-500">{call.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Top Performing Bots</h3>
                        <Button variant="ghost" className="text-sm">View All</Button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                                        {i}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Customer Support Bot</p>
                                        <p className="text-sm text-gray-500">98% success rate</p>
                                    </div>
                                </div>
                                <Button variant="ghost" className="p-2">
                                    <MoreVertical size={20} />
                                </Button>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
