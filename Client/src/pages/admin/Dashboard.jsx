import React from 'react'
import {
    FaUsers,
    FaProjectDiagram,
    FaServicestack,
    FaEnvelope,
    FaChartLine,
    FaEye,
    FaArrowUp,
    FaArrowDown
} from 'react-icons/fa'

function Dashboard() {

    const dashboardStats = [
        {
            title: 'Total Projects',
            value: '24',
            icon: <FaProjectDiagram />,
            growth: '+12%',
            positive: true
        },
        {
            title: 'Services',
            value: '8',
            icon: <FaServicestack />,
            growth: '+5%',
            positive: true
        },
        {
            title: 'Messages',
            value: '145',
            icon: <FaEnvelope />,
            growth: '+18%',
            positive: true
        },
        {
            title: 'Visitors',
            value: '12.5K',
            icon: <FaEye />,
            growth: '-2%',
            positive: false
        }
    ]

    const recentActivities = [
        'New project added successfully',
        'Hero section updated',
        'New contact inquiry received',
        'Service section modified',
        'Portfolio traffic increased'
    ]

    return (
        <div className="text-white">

            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
                    Dashboard Overview
                </h1>

                <p className="text-slate-400 text-lg">
                    Welcome back! Here’s your portfolio system summary.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-14">
                {dashboardStats.map((item, index) => (
                    <div
                        key={index}
                        className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:scale-105 transition shadow-xl"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <p className="text-slate-400 mb-2">
                                    {item.title}
                                </p>

                                <h2 className="text-4xl font-bold">
                                    {item.value}
                                </h2>
                            </div>

                            <div className="text-5xl text-cyan-400">
                                {item.icon}
                            </div>
                        </div>

                        <div
                            className={`flex items-center gap-2 font-semibold ${item.positive
                                ? 'text-green-400'
                                : 'text-red-400'
                                }`}
                        >
                            {item.positive ? <FaArrowUp /> : <FaArrowDown />}
                            {item.growth} this month
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-8 mb-14">

                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
                    <h2 className="text-2xl font-bold mb-8">
                        Recent Activities
                    </h2>

                    <ul className="space-y-5">
                        {recentActivities.map((activity, index) => (
                            <li
                                key={index}
                                className="flex items-center gap-4 border-b border-slate-800 pb-4 text-slate-300"
                            >
                                <span className="w-3 h-3 bg-cyan-400 rounded-full"></span>
                                {activity}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Performance */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
                    <h2 className="text-2xl font-bold mb-8">
                        Performance
                    </h2>

                    <div className="space-y-6">

                        {/* Portfolio Growth */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <span>Portfolio Growth</span>
                                <span>92%</span>
                            </div>

                            <div className="w-full bg-slate-800 rounded-full h-3">
                                <div className="bg-cyan-400 h-3 rounded-full w-[92%]"></div>
                            </div>
                        </div>

                        {/* User Engagement */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <span>User Engagement</span>
                                <span>88%</span>
                            </div>

                            <div className="w-full bg-slate-800 rounded-full h-3">
                                <div className="bg-blue-500 h-3 rounded-full w-[88%]"></div>
                            </div>
                        </div>

                        {/* SEO Ranking */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <span>SEO Ranking</span>
                                <span>81%</span>
                            </div>

                            <div className="w-full bg-slate-800 rounded-full h-3">
                                <div className="bg-purple-500 h-3 rounded-full w-[81%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analytics Placeholder */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-xl">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">
                        Analytics Overview
                    </h2>

                    <FaChartLine className="text-cyan-400 text-4xl" />
                </div>

                <div className="h-80 flex items-center justify-center border-2 border-dashed border-slate-700 rounded-3xl text-slate-500 text-xl">
                    Recharts / Graph Analytics Section
                </div>
            </div>
        </div>
    )
}

export default Dashboard