import { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';
import { analyticsAPI } from '../services/api';
import { BarChart3, TrendingUp, Calendar, Loader2, BookOpen } from 'lucide-react';

const COLORS = {
  happy: '#fbbf24',
  sad: '#3b82f6',
  angry: '#ef4444',
  neutral: '#d2991e',
};

const Analytics = () => {
  const [trends, setTrends] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchTrends = async () => {
    try {
      setLoading(true);
      const response = await analyticsAPI.getTrends(filter);
      setTrends(response.data);
    } catch (err) {
      console.error('Failed to load analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, [filter]);

  const totalEntries = trends.reduce((sum, item) => sum + item.count, 0);
  const mostCommonEmotion = trends.length > 0 
    ? trends.reduce((max, item) => item.count > max.count ? item : max, trends[0])
    : null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <BarChart3 className="w-10 h-10" />
            Analytics Dashboard
          </h1>
          <p className="text-neutral-300">Insights into your emotional journey</p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex gap-3">
          {['all', 'week', 'month'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === f
                  ? 'bg-neutral-600 text-white shadow-lg'
                  : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-600'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : trends.length === 0 ? (
          <div className="card text-center py-12">
            <Calendar className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-600 text-lg">No data available</p>
            <p className="text-neutral-500 mt-2">Start journaling to see your analytics!</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card bg-gradient-to-br from-blue-500 to-indigo-50 border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-blue-950 mb-1">Total Entries</p>
                    <p className="text-3xl font-bold text-blue-950">{totalEntries}</p>
                  </div>
                  <BookOpen className="w-12 h-12 text-blue-950 opacity-50" />
                </div>
              </div>

              <div className="card bg-gradient-to-br from-yellow-500 to-orange-50 border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-yellow-950 mb-1">Most Common</p>
                    <p className="text-3xl font-bold text-yellow-950 capitalize">
                      {mostCommonEmotion?.emotion || 'N/A'}
                    </p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-yellow-950 opacity-50" />
                </div>
              </div>

              <div className="card bg-gradient-to-br from-purple-500 to-pink-50 border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-950 mb-1">Emotion Types</p>
                    <p className="text-3xl font-bold text-purple-950">{trends.length}</p>
                  </div>
                  <BarChart3 className="w-12 h-12 text-purple-950 opacity-50" />
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Bar Chart */}
              <div className="card">
                <h3 className="text-xl font-bold text-white mb-6">Emotion Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={trends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="emotion" 
                      tick={{ fill: '#6b7280' }}
                      tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
                    />
                    <YAxis tick={{ fill: '#6b7280' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="count" fill="#373737" radius={[8, 8, 0, 0]}>
                      {trends.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.emotion] || COLORS.neutral} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="card">
                <h3 className="text-xl font-bold text-white mb-6">Emotion Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={trends}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ emotion, percent }) => `${emotion.charAt(0).toUpperCase() + emotion.slice(1)} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {trends.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.emotion] || COLORS.neutral} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Emotion Details Table */}
            <div className="card">
              <h3 className="text-xl font-bold text-white mb-6">Emotion Details</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-600">
                      <th className="text-left py-3 px-4 font-semibold text-neutral-300">Emotion</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-300">Count</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-300">Percentage</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-300">Visual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trends.map((item) => {
                      const percentage = totalEntries > 0 ? (item.count / totalEntries) * 100 : 0;
                      return (
                        <tr key={item.emotion} className="border-b border-neutral-700 hover:bg-neutral-800 transition-colors">
                          <td className="py-4 px-4">
                            <span className="capitalize font-medium text-white">{item.emotion}</span>
                          </td>
                          <td className="py-4 px-4 text-neutral-300">{item.count}</td>
                          <td className="py-4 px-4 text-neutral-300">{percentage.toFixed(1)}%</td>
                          <td className="py-4 px-4">
                            <div className="w-full bg-neutral-700 rounded-full h-2.5">
                              <div
                                className="h-2.5 rounded-full transition-all duration-500"
                                style={{
                                  width: `${percentage}%`,
                                  backgroundColor: COLORS[item.emotion] || COLORS.neutral,
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;

