import React, { useState } from 'react';
import { Check, Plus, Star, Flame, Heart, Trophy, X, Sparkles } from 'lucide-react';

const SAMPLE_TASKS = [
  { id: 1, text: 'Vacuum the house', emoji: '🧹', xp: 40, done: false },
  { id: 2, text: 'Walk the dog', emoji: '🐕', xp: 30, done: false },
  { id: 3, text: 'Do the dishes', emoji: '🍽️', xp: 25, done: false },
  { id: 4, text: 'Clean the bathroom', emoji: '🚿', xp: 50, done: false },
  { id: 5, text: 'Put glasses in place', emoji: '👓', xp: 15, done: false },
];

const TITLES = [
  { min: 0, title: 'Couch Cuddler', emoji: '🛋️' },
  { min: 100, title: 'Sweet Starter', emoji: '🌸' },
  { min: 300, title: 'Charming Helper', emoji: '✨' },
  { min: 600, title: 'Domestic Heartthrob', emoji: '💫' },
  { min: 1000, title: 'Romance Champion', emoji: '🔥' },
  { min: 2000, title: 'Ultimate Dreamboat', emoji: '👑' },
];

const FLIRTY_MESSAGES = [
  "Mmm, someone's being helpful... 😏",
  "Keep this up and you might get lucky tonight 💋",
  "Nothing sexier than a man who cleans 🔥",
  "My hero! You're earning brownie points 😘",
  "Is it hot in here or is it just you working? 🥵",
  "Watching you work is my favorite show 👀",
  "You're making it really hard to focus right now 💕",
  "Damn, responsible looks good on you 😍",
];

const ROMANCE_LEVELS = [
  { min: 0, label: 'Netflix & Chill?', color: 'text-gray-400' },
  { min: 2, label: 'Getting Warmer...', color: 'text-pink-400' },
  { min: 3, label: 'Feeling Flirty 💋', color: 'text-pink-500' },
  { min: 4, label: 'Sparks Flying! 🔥', color: 'text-red-500' },
  { min: 5, label: 'Tonight\'s the Night 😏', color: 'text-red-600' },
];

export default function HoneyDoRPG() {
  const [tasks, setTasks] = useState(SAMPLE_TASKS);
  const [xp, setXp] = useState(150);
  const [combo, setCombo] = useState(0);
  const [hearts, setHearts] = useState(2);
  const [newTask, setNewTask] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [flirtyMessage, setFlirtyMessage] = useState(null);

  const level = Math.floor(xp / 200) + 1;
  const xpProgress = (xp % 200) / 200 * 100;
  const title = TITLES.reduce((t, curr) => xp >= curr.min ? curr : t, TITLES[0]);
  const romanceLevel = ROMANCE_LEVELS.reduce((t, curr) => hearts >= curr.min ? curr : t, ROMANCE_LEVELS[0]);

  const completeTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task || task.done) return;

    const bonusXp = Math.floor(task.xp * (1 + combo * 0.2));
    setXp(prev => prev + bonusXp);
    setCombo(prev => prev + 1);
    setHearts(prev => Math.min(5, prev + 0.5));
    setTasks(tasks.map(t => t.id === id ? { ...t, done: true } : t));

    // Show flirty message
    setFlirtyMessage(FLIRTY_MESSAGES[Math.floor(Math.random() * FLIRTY_MESSAGES.length)]);
    setTimeout(() => setFlirtyMessage(null), 3000);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const emojis = ['📋', '✏️', '📝', '🎯', '💼', '🏠', '💝'];
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
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Flirty Message Toast */}
      {flirtyMessage && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-sm">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-3 rounded-2xl text-sm font-medium shadow-lg text-center">
            {flirtyMessage}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl sticky top-0 z-40 border-b border-rose-100">
        <div className="max-w-lg mx-auto px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                HoneyDo <span className="text-rose-400">💕</span>
              </h1>
              <p className="text-sm text-gray-500">Level {level} · {title.title}</p>
            </div>
            <div className="text-4xl">{title.emoji}</div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 py-6">
        {/* Romance Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 border border-rose-100">
          {/* Romance Meter */}
          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-rose-400" />
                Romance Meter
              </span>
              <span className={`text-sm font-medium ${romanceLevel.color}`}>
                {romanceLevel.label}
              </span>
            </div>
            <div className="flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex-1 h-3 rounded-full overflow-hidden bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      i < hearts
                        ? 'bg-gradient-to-r from-pink-400 to-rose-500'
                        : ''
                    }`}
                    style={{ width: i < Math.floor(hearts) ? '100%' : i < hearts ? `${(hearts % 1) * 100}%` : '0%' }}
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center italic">
              {hearts >= 5 ? "🔥 Maximum attraction unlocked!" : "Complete tasks to fill the meter..."}
            </p>
          </div>

          {/* XP Progress */}
          <div className="mb-5">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Love Points</span>
              <span className="font-medium text-gray-900">{xp} XP</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-orange-50 rounded-xl">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-xl font-bold text-gray-900">{combo}</span>
              </div>
              <p className="text-xs text-gray-500">Hot Streak</p>
            </div>

            <div className="text-center p-3 bg-rose-50 rounded-xl">
              <div className="flex items-center justify-center gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Heart
                    key={i}
                    className={`w-3.5 h-3.5 transition-all ${
                      i < hearts ? 'text-rose-500 fill-rose-500' : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">Her Mood</p>
            </div>

            <div className="text-center p-3 bg-green-50 rounded-xl">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Trophy className="w-4 h-4 text-green-500" />
                <span className="text-xl font-bold text-gray-900">{completedTasks.length}</span>
              </div>
              <p className="text-xs text-gray-500">Wins</p>
            </div>
          </div>

          {/* Combo Bonus */}
          {combo > 0 && (
            <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-rose-50 rounded-xl border border-orange-100">
              <p className="text-sm text-center">
                <span className="font-semibold text-orange-600">🔥 {combo}x Hot Streak!</span>
                <span className="text-gray-500"> · She's noticing...</span>
              </p>
            </div>
          )}
        </div>

        {/* Tasks Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Honey-Do List
            <span className="ml-2 text-sm font-normal text-gray-400">{pendingTasks.length}</span>
          </h2>
          <button
            onClick={() => setShowAdd(true)}
            className="w-8 h-8 flex items-center justify-center bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {pendingTasks.map(task => (
            <div
              key={task.id}
              className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4 group border border-gray-100 hover:border-rose-200 transition-colors"
            >
              <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-2xl">
                {task.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{task.text}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-sm text-gray-500">{task.xp} love pts</span>
                  {combo > 0 && (
                    <span className="text-xs text-rose-500 ml-1">
                      +{Math.floor(task.xp * combo * 0.2)} bonus
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => completeTask(task.id)}
                className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full hover:from-rose-500 hover:to-pink-600 transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                <Check className="w-5 h-5" />
              </button>
            </div>
          ))}

          {pendingTasks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-3">😘</div>
              <h3 className="font-semibold text-gray-900 mb-1">All Done, Handsome!</h3>
              <p className="text-sm text-gray-500">Time to collect your reward...</p>
            </div>
          )}
        </div>

        {/* Completed Section */}
        {completedTasks.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Brownie Points Earned ✓</h3>
            <div className="space-y-2">
              {completedTasks.map(task => (
                <div
                  key={task.id}
                  className="bg-white/60 rounded-xl p-3 flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-lg opacity-50">
                    {task.emoji}
                  </div>
                  <span className="flex-1 text-sm text-gray-400 line-through truncate">
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1.5 text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-400">
          <p>Made with 💕 for happy relationships</p>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
          <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl p-6 sm:m-4">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5 sm:hidden" />
            <h3 className="text-xl font-semibold text-gray-900 mb-1">Add a Task</h3>
            <p className="text-sm text-gray-500 mb-4">What would make her happy?</p>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="e.g., Give her a massage..."
              className="w-full px-4 py-3.5 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-400 outline-none focus:ring-2 ring-rose-500 transition-shadow"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 py-3.5 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="flex-1 py-3.5 rounded-xl font-medium text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 transition-colors"
              >
                Add Task 💕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
