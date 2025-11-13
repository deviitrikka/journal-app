import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import JournalForm from "../components/JournalForm";
import JournalEntry from "../components/JournalEntry";
import { journalAPI } from "../services/api";
import { BookOpen, Loader2, Plus, X } from "lucide-react";

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await journalAPI.getAll();
      setEntries(response.data);
      setError("");
    } catch (err) {
      setError("Failed to load journal entries");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleEntryCreated = () => {
    fetchEntries();
    setShowForm(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Journal</h1>
            <p className="text-gray-300">
              Reflect on your thoughts and track your emotions
            </p>
          </div>

          {!showForm && (
          <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-md font-semibold leading-6  text-white inline-block"
          onClick={() => setShowForm(true)}>
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-7 ring-1 ring-white/10 ">
              <span>
                New Entry
              </span>
              <svg
                fill="none"
                height="44"
                viewBox="0 0 24 24"
                width="54"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.75 8.75L14.25 12L10.75 15.25"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </button>
          )}
        </div>

        {showForm && (
          <div className="mb-8 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                New Journal Entry
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 text-gray-400 hover:bg-transparent hover:text-red-400 rounded-lg transition-colors"
                aria-label="Close form"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <JournalForm
              onEntryCreated={handleEntryCreated}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Recent Entries
          </h2>
        </div>

        {loading
          ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          )
          : error
          ? (
            <div className="card bg-red-900 border border-red-700 text-red-200">
              {error}
            </div>
          )
          : entries.length === 0
          ? (
            <div className="card text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-300 text-lg">No journal entries yet</p>
              <p className="text-gray-400 mt-2">
                Start writing your first entry above!
              </p>
            </div>
          )
          : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <JournalEntry key={entry._id} entry={entry} />
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default Dashboard;
