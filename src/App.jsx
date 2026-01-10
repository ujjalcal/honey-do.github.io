import React, { useState } from 'react';
import { Check, Plus, Star, Flame, Heart, Trophy, X, Sparkles, MessageCircle, Users, Skull, Quote } from 'lucide-react';

const SAMPLE_TASKS = [
  { id: 1, text: 'Vacuum the house', emoji: '🧹', xp: 40, done: false },
  { id: 2, text: 'Walk the dog', emoji: '🐕', xp: 30, done: false },
  { id: 3, text: 'Do the dishes', emoji: '🍽️', xp: 25, done: false },
  { id: 4, text: 'Clean the bathroom', emoji: '🚿', xp: 50, done: false },
  { id: 5, text: 'Put glasses in place', emoji: '👓', xp: 15, done: false },
  { id: 6, text: 'Gifts every week', emoji: '🎁', xp: 75, done: false },
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

const WIFE_REVIEWS = [
  { stars: 1, text: "He tried... bless his heart 😅", threshold: 0 },
  { stars: 2, text: "Getting there, but I've seen better 🙄", threshold: 50 },
  { stars: 3, text: "Not bad! Maybe there's hope 😊", threshold: 150 },
  { stars: 4, text: "Okay wow, who is this man? 😍", threshold: 300 },
  { stars: 5, text: "I hit the jackpot! Best husband ever! 🥰", threshold: 500 },
];

const LEADERBOARD = [
  { rank: 1, name: 'Chad Thunderchore', xp: 2847, avatar: '👨‍🦲', streak: 45, badge: '🏆' },
  { rank: 2, name: 'Mr. Clean Gene', xp: 2234, avatar: '🧔', streak: 32, badge: '🥈' },
  { rank: 3, name: 'Dustin Hoffman', xp: 1876, avatar: '👨‍🦱', streak: 28, badge: '🥉' },
  { rank: 4, name: 'Mop Daddy', xp: 1654, avatar: '👴', streak: 21, badge: '' },
  { rank: 5, name: 'Sir Sweeps-a-Lot', xp: 1432, avatar: '🤴', streak: 18, badge: '' },
];

const HALL_OF_SHAME = [
  { name: 'Lazy Larry', sin: 'Left dishes for 3 weeks', avatar: '😴', wives_left: 2 },
  { name: 'Forgetful Frank', sin: 'Forgot anniversary... twice', avatar: '🤦', wives_left: 1 },
  { name: 'Couch Carl', sin: 'Gaming instead of cleaning', avatar: '🎮', wives_left: 3 },
  { name: 'Excuses Eugene', sin: '"I\'ll do it tomorrow" x365', avatar: '🙄', wives_left: 1 },
  { name: 'Blind Bob', sin: 'Can\'t see mess right in front of him', avatar: '🙈', wives_left: 2 },
];

export default function HoneyDoRPG() {
  const [tasks, setTasks] = useState(SAMPLE_TASKS);
  const [xp, setXp] = useState(150);
  const [combo, setCombo] = useState(0);
  const [hearts, setHearts] = useState(2);
  const [newTask, setNewTask] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [flirtyMessage, setFlirtyMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('tasks');

  const level = Math.floor(xp / 200) + 1;
  const xpProgress = (xp % 200) / 200 * 100;
  const title = TITLES.reduce((t, curr) => xp >= curr.min ? curr : t, TITLES[0]);
  const romanceLevel = ROMANCE_LEVELS.reduce((t, curr) => hearts >= curr.min ? curr : t, ROMANCE_LEVELS[0]);
  const wifeReview = WIFE_REVIEWS.reduce((t, curr) => xp >= curr.threshold ? curr : t, WIFE_REVIEWS[0]);

  // Calculate user's rank
  const userRank = LEADERBOARD.filter(h => h.xp > xp).length + 1;

  const completeTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task || task.done) return;

    const bonusXp = Math.floor(task.xp * (1 + combo * 0.2));
    setXp(prev => prev + bonusXp);
    setCombo(prev => prev + 1);
    setHearts(prev => Math.min(5, prev + 0.5));
    setTasks(tasks.map(t => t.id === id ? { ...t, done: true } : t));

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
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white pb-24">
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
              <p className="text-sm text-gray-500">Happy wife, happy life — now with XP!</p>
            </div>
            <div className="text-4xl">{title.emoji}</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-lg mx-auto px-5 pt-4">
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
          {[
            { id: 'tasks', label: 'Tasks', icon: Sparkles },
            { id: 'review', label: 'Review', icon: MessageCircle },
            { id: 'rank', label: 'Rankings', icon: Users },
            { id: 'shame', label: 'Shame', icon: Skull },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-all
                ${activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'}`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 py-6">
        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <>
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
                          i < hearts ? 'bg-gradient-to-r from-pink-400 to-rose-500' : ''
                        }`}
                        style={{ width: i < Math.floor(hearts) ? '100%' : i < hearts ? `${(hearts % 1) * 100}%` : '0%' }}
                      />
                    </div>
                  ))}
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

                <div className="text-center p-3 bg-amber-50 rounded-xl">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-xl font-bold text-gray-900">{xp}</span>
                  </div>
                  <p className="text-xs text-gray-500">Love Pts</p>
                </div>
              </div>

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

            <div className="space-y-3">
              {pendingTasks.map(task => (
                <div
                  key={task.id}
                  className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4 border border-gray-100 hover:border-rose-200 transition-colors"
                >
                  <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-2xl">
                    {task.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{task.text}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-sm text-gray-500">{task.xp} pts</span>
                      {combo > 0 && (
                        <span className="text-xs text-rose-500 ml-1">+{Math.floor(task.xp * combo * 0.2)}</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => completeTask(task.id)}
                    className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
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

            {completedTasks.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Brownie Points Earned ✓</h3>
                <div className="space-y-2">
                  {completedTasks.map(task => (
                    <div key={task.id} className="bg-white/60 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-lg opacity-50">
                        {task.emoji}
                      </div>
                      <span className="flex-1 text-sm text-gray-400 line-through truncate">{task.text}</span>
                      <button onClick={() => deleteTask(task.id)} className="p-1.5 text-gray-300 hover:text-red-400">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Wife Review Tab */}
        {activeTab === 'review' && (
          <div className="space-y-6">
            {/* Main Review Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">👩</div>
                <h2 className="text-lg font-semibold text-gray-900">Wife's Review</h2>
                <p className="text-sm text-gray-500">Based on your performance</p>
              </div>

              {/* Star Rating */}
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-8 h-8 ${i < wifeReview.stars ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                  />
                ))}
              </div>

              {/* Review Quote */}
              <div className="bg-rose-50 rounded-xl p-4 relative">
                <Quote className="w-6 h-6 text-rose-300 absolute top-3 left-3" />
                <p className="text-center text-gray-700 italic pt-4">
                  "{wifeReview.text}"
                </p>
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">{xp}</div>
                  <div className="text-xs text-gray-500">Love Points</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">{completedTasks.length}</div>
                  <div className="text-xs text-gray-500">Tasks Done</div>
                </div>
              </div>

              {/* Next Review Milestone */}
              {wifeReview.stars < 5 && (
                <div className="mt-4 p-3 bg-amber-50 rounded-xl">
                  <p className="text-sm text-center text-amber-700">
                    🎯 {WIFE_REVIEWS[wifeReview.stars].threshold - xp} more pts for next star!
                  </p>
                </div>
              )}
            </div>

            {/* Review History */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">All Review Levels</h3>
              <div className="space-y-3">
                {WIFE_REVIEWS.map((review, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl flex items-center gap-3 ${
                      xp >= review.threshold ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex gap-0.5">
                      {[...Array(review.stars)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className={`flex-1 text-sm ${xp >= review.threshold ? 'text-gray-700' : 'text-gray-400'}`}>
                      {review.text}
                    </span>
                    <span className="text-xs text-gray-400">{review.threshold} pts</span>
                    {xp >= review.threshold && <Check className="w-4 h-4 text-green-500" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'rank' && (
          <div className="space-y-6">
            {/* Your Rank Card */}
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-4">
                <div className="text-5xl">🧔</div>
                <div className="flex-1">
                  <p className="text-rose-100 text-sm">Your Ranking</p>
                  <p className="text-3xl font-bold">#{userRank}</p>
                  <p className="text-rose-100 text-sm">{xp} Love Points</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl">{title.emoji}</div>
                  <p className="text-sm text-rose-100">{title.title}</p>
                </div>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  Top Husbands Worldwide
                </h3>
              </div>
              <div className="divide-y divide-gray-50">
                {LEADERBOARD.map((husband) => (
                  <div key={husband.rank} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                      ${husband.rank === 1 ? 'bg-amber-100 text-amber-700' :
                        husband.rank === 2 ? 'bg-gray-100 text-gray-700' :
                        husband.rank === 3 ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-500'}`}
                    >
                      {husband.badge || husband.rank}
                    </div>
                    <div className="text-3xl">{husband.avatar}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{husband.name}</p>
                      <p className="text-sm text-gray-500">🔥 {husband.streak} day streak</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{husband.xp.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">pts</p>
                    </div>
                  </div>
                ))}

                {/* You */}
                <div className="p-4 flex items-center gap-4 bg-rose-50 border-l-4 border-rose-500">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-rose-100 text-rose-700">
                    {userRank}
                  </div>
                  <div className="text-3xl">🧔</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">You <span className="text-xs bg-rose-200 text-rose-700 px-2 py-0.5 rounded-full ml-1">That's you!</span></p>
                    <p className="text-sm text-gray-500">🔥 {combo} day streak</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{xp.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">pts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hall of Shame Tab */}
        {activeTab === 'shame' && (
          <div className="space-y-6">
            {/* Warning Banner */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-5 text-white text-center">
              <div className="text-5xl mb-3">💀</div>
              <h2 className="text-xl font-bold mb-1">Hall of Shame</h2>
              <p className="text-gray-400 text-sm">Don't end up here, buddy...</p>
            </div>

            {/* Shame Cards */}
            <div className="space-y-3">
              {HALL_OF_SHAME.map((loser, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
                      {loser.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{loser.name}</h3>
                      <p className="text-sm text-red-500">"{loser.sin}"</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                          💔 {loser.wives_left} {loser.wives_left === 1 ? 'wife' : 'wives'} left
                        </span>
                      </div>
                    </div>
                    <div className="text-4xl opacity-50">😤</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Warning Message */}
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h3 className="font-semibold text-amber-800 mb-1">Don't be like them!</h3>
                  <p className="text-sm text-amber-700">
                    Complete your tasks, keep your wife happy, and you'll never end up in this hall of horrors.
                  </p>
                </div>
              </div>
            </div>

            {/* Your Status */}
            <div className={`rounded-2xl p-5 text-center ${
              completedTasks.length > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="text-4xl mb-2">{completedTasks.length > 0 ? '😇' : '😰'}</div>
              <p className={`font-medium ${completedTasks.length > 0 ? 'text-green-700' : 'text-red-700'}`}>
                {completedTasks.length > 0
                  ? "You're safe... for now 😉"
                  : "Careful! No tasks done yet... 👀"}
              </p>
            </div>
          </div>
        )}
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
