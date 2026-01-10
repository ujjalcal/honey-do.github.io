import React, { useState } from 'react';
import { Check, Plus, Star, Flame, Heart, Trophy, Sparkles, X } from 'lucide-react';

const SAMPLE_TASKS = [
  { id: 1, text: 'Fix the leaky faucet', emoji: '🔧', xp: 50, done: false },
  { id: 2, text: 'Take out the trash', emoji: '🗑️', xp: 20, done: false },
  { id: 3, text: 'Walk the dog', emoji: '🐕', xp: 30, done: false },
  { id: 4, text: 'Assemble IKEA shelf', emoji: '🪑', xp: 100, done: false },
  { id: 5, text: 'Grocery shopping', emoji: '🛒', xp: 40, done: false },
];

const TITLES = [
  { min: 0, title: 'Couch Potato', emoji: '🥔' },
  { min: 100, title: 'Task Rookie', emoji: '🌱' },
  { min: 300, title: 'Chore Warrior', emoji: '⚔️' },
  { min: 600, title: 'Domestic Knight', emoji: '🛡️' },
  { min: 1000, title: 'Household Hero', emoji: '🦸' },
  { min: 2000, title: 'Marriage Legend', emoji: '👑' },
];

const CELEBRATIONS = ['🎉', '🔥', '💪', '⚡', '🌟', '💥', '🚀', '✨'];

export default function HoneyDoRPG() {
  const [tasks, setTasks] = useState(SAMPLE_TASKS);
  const [xp, setXp] = useState(150);
  const [combo, setCombo] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [newTask, setNewTask] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [celebration, setCelebration] = useState(null);
  const [lastCompleted, setLastCompleted] = useState(null);

  const level = Math.floor(xp / 200) + 1;
  const xpProgress = (xp % 200) / 200 * 100;
  const title = TITLES.reduce((t, curr) => xp >= curr.min ? curr : t, TITLES[0]);

  const completeTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task || task.done) return;

    const bonusXp = Math.floor(task.xp * (1 + combo * 0.2));
    setXp(prev => prev + bonusXp);
    setCombo(prev => prev + 1);
    setHearts(prev => Math.min(5, prev + 0.5));
    setTasks(tasks.map(t => t.id === id ? { ...t, done: true } : t));
    setLastCompleted({ ...task, bonusXp });

    // Celebration
    setCelebration(CELEBRATIONS[Math.floor(Math.random() * CELEBRATIONS.length)]);
    setTimeout(() => setCelebration(null), 1000);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const emojis = ['📋', '✏️', '📝', '🎯', '💼', '🏠'];
    setTasks([...tasks, {
      id: Date.now(),
      text: newTask,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      xp: 25 + Math.floor(Math.random() * 50),
      done: false
    }]);
    setNewTask('');
    setShowAdd(false);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const pendingTasks = tasks.filter(t => !t.done);
  const completedTasks = tasks.filter(t => t.done);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-4 pb-32">
      {/* Celebration Popup */}
      {celebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-9xl animate-bounce">{celebration}</div>
        </div>
      )}

      {/* XP Earned Toast */}
      {lastCompleted && (
        <div className="fixed top-4 right-4 z-40 animate-pulse">
          <div className="bg-green-500 text-white px-4 py-2 rounded-2xl font-bold shadow-xl">
            +{lastCompleted.bonusXp} XP!
          </div>
        </div>
      )}

      {/* Header Card */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 mb-6 border border-white/20 shadow-2xl">
        {/* Title & Level */}
        <div className="text-center mb-4">
          <div className="text-6xl mb-2">{title.emoji}</div>
          <h1 className="text-2xl font-black text-white">{title.title}</h1>
          <div className="text-purple-200 text-sm">Level {level} Husband</div>
        </div>

        {/* XP Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-purple-200 mb-1">
            <span>XP</span>
            <span>{xp} / {level * 200}</span>
          </div>
          <div className="h-4 bg-black/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 rounded-full transition-all duration-500 relative"
              style={{ width: `${xpProgress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex justify-around">
          {/* Combo */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-orange-400">
              <Flame className="w-6 h-6 fill-orange-400" />
              <span className="text-2xl font-black">{combo}</span>
            </div>
            <div className="text-xs text-purple-200">Combo</div>
          </div>

          {/* Hearts */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-5 h-5 transition-all ${i < hearts ? 'text-pink-500 fill-pink-500 scale-110' : 'text-white/30'}`}
                />
              ))}
            </div>
            <div className="text-xs text-purple-200">Wife Happy</div>
          </div>

          {/* Tasks Done */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-green-400">
              <Trophy className="w-6 h-6" />
              <span className="text-2xl font-black">{completedTasks.length}</span>
            </div>
            <div className="text-xs text-purple-200">Done</div>
          </div>
        </div>
      </div>

      {/* Combo Bonus Banner */}
      {combo > 0 && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-3 mb-4 text-center border-2 border-yellow-400 shadow-lg">
          <div className="flex items-center justify-center gap-2 text-white font-black">
            <Flame className="w-5 h-5" />
            <span>{combo}x COMBO!</span>
            <Flame className="w-5 h-5" />
          </div>
          <div className="text-yellow-200 text-sm">+{combo * 20}% bonus XP on next task!</div>
        </div>
      )}

      {/* Tasks Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Quests ({pendingTasks.length})
          </h2>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-xl transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Task Cards */}
        <div className="space-y-3">
          {pendingTasks.map(task => (
            <div
              key={task.id}
              className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20 flex items-center gap-3 group hover:bg-white/20 transition-all"
            >
              <div className="text-4xl">{task.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold truncate">{task.text}</div>
                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  <span>+{task.xp} XP</span>
                  {combo > 0 && (
                    <span className="text-orange-400 text-xs ml-1">
                      (+{Math.floor(task.xp * combo * 0.2)} bonus)
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => completeTask(task.id)}
                className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-3 rounded-xl font-bold hover:scale-110 transition-all shadow-lg active:scale-95"
              >
                <Check className="w-6 h-6" />
              </button>
            </div>
          ))}

          {pendingTasks.length === 0 && (
            <div className="text-center py-8">
              <div className="text-6xl mb-3">🎊</div>
              <div className="text-white font-bold text-xl">All done!</div>
              <div className="text-purple-200">You're the best husband ever!</div>
            </div>
          )}
        </div>
      </div>

      {/* Completed Section */}
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-white/60 font-bold mb-2 text-sm">Completed</h3>
          <div className="space-y-2">
            {completedTasks.map(task => (
              <div
                key={task.id}
                className="bg-white/5 rounded-xl p-3 flex items-center gap-3 opacity-60"
              >
                <div className="text-2xl grayscale">{task.emoji}</div>
                <div className="flex-1 text-white/70 line-through truncate">{task.text}</div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-white/40 hover:text-red-400 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md animate-slide-up">
            <h3 className="text-xl font-black text-gray-900 mb-4">New Quest</h3>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full p-4 rounded-xl bg-gray-100 text-gray-900 font-medium text-lg mb-4 outline-none focus:ring-2 ring-purple-500"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 py-4 rounded-xl font-bold text-gray-500 bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="flex-1 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-500"
              >
                Add Quest!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Stats Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-xl border-t border-white/10 p-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="text-center">
            <div className="text-2xl font-black text-white">{xp}</div>
            <div className="text-xs text-purple-300">Total XP</div>
          </div>
          <div className="text-center">
            <div className="text-4xl">{title.emoji}</div>
            <div className="text-xs text-purple-300">Rank</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-white">Lv.{level}</div>
            <div className="text-xs text-purple-300">Level</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
