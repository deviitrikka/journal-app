import { useState } from 'react';
import { journalAPI } from '../services/api';
import { Loader2 } from 'lucide-react';

const JournalForm = ({ onEntryCreated, onCancel }) => {
  const [content, setContent] = useState('');
  const [emotionTag, setEmotionTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Please write something in your journal');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await journalAPI.create(content, emotionTag || null);
      setContent('');
      setEmotionTag('');
      if (onEntryCreated) {
        onEntryCreated();
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create journal entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card animate-scale-in">
      {error && (
        <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            What's on your mind?
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-neutral-900 text-white input-field min-h-[150px] resize-none"
            placeholder="Write your thoughts, feelings, or experiences here..."
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Emotion Tag (Optional)
          </label>
          <input
            type="text"
            value={emotionTag}
            onChange={(e) => setEmotionTag(e.target.value)}
            className="bg-neutral-900 text-white input-field"
            placeholder="e.g., grateful, anxious, excited"
            disabled={loading}
          />
        </div>

        <div className="flex gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="bg-neutral-900 text-gray-300 border-2 border-gray-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:text-red-400 hover:border-red-400 hover:shadow-md transform hover:scale-105 active:scale-95 flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className={`btn-primary ${onCancel ? 'flex-1' : 'w-full'} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Entry'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JournalForm;

