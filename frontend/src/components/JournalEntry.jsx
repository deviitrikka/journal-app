import { format } from 'date-fns';
import { Smile, Frown, Angry, Meh } from 'lucide-react';

const emotionIcons = {
  happy: { icon: Smile, color: 'text-yellow-500', bg: 'bg-yellow-900', border: 'border-yellow-700' },
  sad: { icon: Frown, color: 'text-blue-400', bg: 'bg-gray-800', border: 'border-blue-600' },
  angry: { icon: Angry, color: 'text-red-500', bg: 'bg-red-900', border: 'border-red-700' },
  neutral: { icon: Meh, color: 'text-gray-400', bg: 'bg-gray-800', border: 'border-gray-600' },
};

const JournalEntry = ({ entry }) => {
  const emotion = entry.detectedEmotion || 'neutral';
  const emotionConfig = emotionIcons[emotion] || emotionIcons.neutral;
  const Icon = emotionConfig.icon;

  return (
    <div className={`card border-l-4 ${emotionConfig.border} animate-slide-up`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${emotionConfig.bg}`}>
            <Icon className={`w-5 h-5 ${emotionConfig.color}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white capitalize">{emotion}</span>
              {entry.emotionTag && (
                <span className="px-2 py-1 text-xs bg-purple-900 text-purple-200 rounded-full">
                  {entry.emotionTag}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400">
              {format(new Date(entry.date), 'MMM dd, yyyy • h:mm a')}
            </p>
          </div>
        </div>
      </div>
      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{entry.content}</p>
    </div>
  );
};

export default JournalEntry;

