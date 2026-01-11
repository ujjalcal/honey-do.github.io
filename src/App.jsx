import React, { useState } from 'react';
import { Check, Plus, Star, Flame, Heart, Trophy, X, Sparkles, MessageCircle, Users, Skull, Quote, Home, ArrowRight, Zap, Gift, Bot, Send } from 'lucide-react';

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

// Wife Whisperer AI Responses
const WHISPERER_TIPS = {
  vacuum: [
    "Pro tip: Move the furniture, don't just vacuum around it. She WILL check. 🕵️",
    "The edges! For the love of all that is holy, get the edges and corners! 🎯",
    "Empty the vacuum bag BEFORE it explodes. Learned that one the hard way... 💨",
    "Vacuum in straight lines like a lawn. It shows you actually tried. ✨",
  ],
  dishes: [
    "Pre-rinse is not optional. Dried cheese is the enemy of marriages. 🧀",
    "The dishwasher has a CORRECT way to load. Ask her. Memorize it. Live it. 📐",
    "Hand wash the good knives! Unless you want to buy new ones... and explain why. 🔪",
    "Wipe down the sink after. That's the chef's kiss that earns bonus points. 💋",
  ],
  bathroom: [
    "The toilet has THREE surfaces: lid, seat, AND the base. Clean all of them. 🚽",
    "That mirror? Streak-free or it didn't happen. Use newspaper if you have to. ✨",
    "Check behind the toilet. I know. Just do it. Trust me on this one. 👀",
    "Replace the toilet paper roll BEFORE it runs out. Revolutionary, I know. 🧻",
  ],
  dog: [
    "Bring poop bags. Multiple. The dog WILL go twice just to test you. 💩",
    "A tired dog is a good dog. Walk until they're actually tired. 🐕",
    "Clean the paws before coming inside. She will notice the muddy prints. 🐾",
    "Bonus points: Take a cute photo and send it to her. Free brownie points! 📸",
  ],
  gifts: [
    "Flowers are nice, but know her FAVORITE flowers. Generic roses = C+ effort. 💐",
    "It's not about the price, it's about showing you LISTENED. What did she mention wanting? 🎁",
    "Surprise her on a random Tuesday. Anniversary gifts are expected. Random = romantic. 💕",
    "When in doubt: her favorite snack + her favorite drink + uninterrupted peace. Chef's kiss. 👨‍🍳",
  ],
  general: [
    "Before you say 'done', ask yourself: would SHE say it's done? 🤔",
    "If you have to ask 'is this clean enough?' - it's not. Keep going. 💪",
    "Take a before & after photo. Proof of effort goes a long way. 📱",
    "The secret ingredient is doing it WITHOUT being asked. That's the real flex. 🔥",
    "When she says 'it's fine', it's NOT fine. Read the room, king. 👑",
  ],
  glasses: [
    "There's a designated spot. Find it. Use it. Every. Single. Time. 👓",
    "Clean them too while you're at it. Smudge-free = extra credit. ✨",
    "If you can't find the spot, ASK. It's not a trap, I promise. Maybe. 😅",
  ],
};

const WHISPERER_GREETINGS = [
  "Ah, another brave husband seeking wisdom. How can I help you not mess this up? 😏",
  "Welcome, domestic warrior. The Wife Whisperer is here to save your marriage... I mean, help. 💪",
  "Greetings! Ready to transform from clueless to flawless? Let's do this. ✨",
];

const QUICK_QUESTIONS = [
  { id: 'vacuum', label: '🧹 Vacuuming tips?' },
  { id: 'dishes', label: '🍽️ Dish duty help!' },
  { id: 'bathroom', label: '🚿 Bathroom advice?' },
  { id: 'dog', label: '🐕 Dog walking tips?' },
  { id: 'gifts', label: '🎁 Gift ideas?' },
  { id: 'general', label: '💡 General wisdom' },
];

export default function HoneyDoRPG() {
  const [tasks, setTasks] = useState(SAMPLE_TASKS);
  const [xp, setXp] = useState(150);
  const [combo, setCombo] = useState(0);
  const [hearts, setHearts] = useState(2);
  const [newTask, setNewTask] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [flirtyMessage, setFlirtyMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: WHISPERER_GREETINGS[Math.floor(Math.random() * WHISPERER_GREETINGS.length)] }
  ]);
  const [chatInput, setChatInput] = useState('');

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

  const getWhispererResponse = (topic) => {
    const tips = WHISPERER_TIPS[topic] || WHISPERER_TIPS.general;
    return tips[Math.floor(Math.random() * tips.length)];
  };

  const handleChatSubmit = (topic) => {
    const userMessage = typeof topic === 'string' ?
      QUICK_QUESTIONS.find(q => q.id === topic)?.label || topic :
      chatInput;

    if (!userMessage.trim()) return;

    // Add user message
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');

    // Determine topic from input
    let detectedTopic = 'general';
    const lowerInput = userMessage.toLowerCase();
    if (lowerInput.includes('vacuum') || lowerInput.includes('floor')) detectedTopic = 'vacuum';
    else if (lowerInput.includes('dish') || lowerInput.includes('kitchen') || lowerInput.includes('sink')) detectedTopic = 'dishes';
    else if (lowerInput.includes('bath') || lowerInput.includes('toilet') || lowerInput.includes('shower')) detectedTopic = 'bathroom';
    else if (lowerInput.includes('dog') || lowerInput.includes('walk') || lowerInput.includes('pet')) detectedTopic = 'dog';
    else if (lowerInput.includes('gift') || lowerInput.includes('present') || lowerInput.includes('flower')) detectedTopic = 'gifts';
    else if (lowerInput.includes('glass') || lowerInput.includes('spectacle')) detectedTopic = 'glasses';
    else if (typeof topic === 'string') detectedTopic = topic;

    // Add bot response after a short delay
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'bot', text: getWhispererResponse(detectedTopic) }]);
    }, 500);
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
              <p className="text-sm font-semibold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">Happy wife, happy life — now with XP! ✨</p>
            </div>
            <div className="text-4xl">{title.emoji}</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-lg mx-auto px-5 pt-4">
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
          {[
            { id: 'home', label: 'Home', icon: Home },
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
        {/* Home/Marketing Tab */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="text-center py-8">
              <div className="text-7xl mb-4">💑</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Turn Chores Into <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">Romance</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                The gamified way to be a better partner
              </p>
              <button
                onClick={() => setActiveTab('tasks')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Pain Points - Sound Familiar? */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white">
              <div className="text-center mb-5">
                <div className="text-4xl mb-2">😤</div>
                <h3 className="text-xl font-bold">Sound Familiar?</h3>
              </div>
              <div className="space-y-3">
                {[
                  "Tired of screaming behind your husband?",
                  "Does 'I'll do it later' mean never?",
                  "Is the dishwasher invisible to him?",
                  "Do you have to ask 47 times for one task?",
                  "Are dirty socks a permanent floor decoration?",
                ].map((pain, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-rose-400 flex-shrink-0" />
                    <span className="text-gray-200">{pain}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-rose-300 font-medium">There's a better way... 💕</p>
              </div>
            </div>

            {/* Features */}
            <div className="grid gap-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center">
                    <Zap className="w-7 h-7 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Earn XP & Level Up</h3>
                    <p className="text-sm text-gray-500">Complete tasks to earn Love Points and unlock titles</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-rose-50 rounded-xl flex items-center justify-center">
                    <Heart className="w-7 h-7 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Romance Meter</h3>
                    <p className="text-sm text-gray-500">Watch her mood improve with every task you complete</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center">
                    <Flame className="w-7 h-7 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Build Hot Streaks</h3>
                    <p className="text-sm text-gray-500">Chain tasks together for bonus multipliers</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center">
                    <Trophy className="w-7 h-7 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Compete & Compare</h3>
                    <p className="text-sm text-gray-500">See how you rank against other husbands</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Wife Whisperer Feature */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bot className="w-9 h-9 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-xl">Wife Whisperer™</h3>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Patent Pending</span>
                  </div>
                  <p className="text-purple-100 mt-1">AI-powered advice to help you complete tasks perfectly. Never mess up again!</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-white/10 px-3 py-1 rounded-full">🧹 Cleaning Tips</span>
                <span className="text-xs bg-white/10 px-3 py-1 rounded-full">🎁 Gift Ideas</span>
                <span className="text-xs bg-white/10 px-3 py-1 rounded-full">💡 Pro Secrets</span>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
              <div className="text-center">
                <div className="text-4xl mb-3">🥰</div>
                <p className="text-gray-700 italic mb-3">
                  "He went from Couch Potato to Domestic Dreamboat. I didn't know laundry could be so attractive!"
                </p>
                <p className="text-sm text-rose-500 font-medium">— A Very Happy Wife</p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pb-4">
              <button
                onClick={() => setActiveTab('tasks')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full text-lg hover:bg-gray-800 transition-colors"
              >
                Start Earning Points <Gift className="w-5 h-5" />
              </button>
              <p className="text-sm text-gray-400 mt-3">No sign up needed. Just be awesome.</p>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <>
            {/* Speedometer Gauges */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Husband Tasks Remaining (LEFT) - Goes DOWN as tasks complete */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2">👨 Tasks Left</p>
                  <div className="relative w-32 h-20 mx-auto">
                    <svg viewBox="0 0 120 70" className="w-full h-full">
                      {/* Background arc */}
                      <path
                        d="M 10 60 A 50 50 0 0 1 110 60"
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />
                      {/* Colored arc - HIGH when many tasks, LOW when few */}
                      <path
                        d="M 10 60 A 50 50 0 0 1 110 60"
                        fill="none"
                        stroke="url(#taskGradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={`${(pendingTasks.length / Math.max(tasks.length, 1)) * 157} 157`}
                      />
                      {/* Gradient - red (danger) to green (safe) */}
                      <defs>
                        <linearGradient id="taskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#22c55e" />
                          <stop offset="50%" stopColor="#eab308" />
                          <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                      </defs>
                      {/* Needle */}
                      <line
                        x1="60"
                        y1="60"
                        x2={60 + 35 * Math.cos(Math.PI - (pendingTasks.length / Math.max(tasks.length, 1)) * Math.PI)}
                        y2={60 - 35 * Math.sin(Math.PI - (pendingTasks.length / Math.max(tasks.length, 1)) * Math.PI)}
                        stroke="#374151"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <circle cx="60" cy="60" r="6" fill="#374151" />
                    </svg>
                  </div>
                  <p className={`text-sm font-semibold mt-1 ${
                    pendingTasks.length === 0 ? 'text-green-500' :
                    pendingTasks.length <= 2 ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                    {pendingTasks.length === 0 ? 'All Clear! 🎉' :
                     pendingTasks.length <= 2 ? 'Almost There!' :
                     pendingTasks.length <= 4 ? 'Keep Going!' : 'Get Moving! 😅'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{pendingTasks.length} remaining</p>
                </div>
              </div>

              {/* Wife Mood Meter (RIGHT) - Goes UP as tasks complete */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2">👩 Her Mood</p>
                  <div className="relative w-32 h-20 mx-auto">
                    <svg viewBox="0 0 120 70" className="w-full h-full">
                      {/* Background arc */}
                      <path
                        d="M 10 60 A 50 50 0 0 1 110 60"
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />
                      {/* Colored arc */}
                      <path
                        d="M 10 60 A 50 50 0 0 1 110 60"
                        fill="none"
                        stroke="url(#moodGradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={`${(hearts / 5) * 157} 157`}
                      />
                      {/* Gradient definition */}
                      <defs>
                        <linearGradient id="moodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#fda4af" />
                          <stop offset="50%" stopColor="#f472b6" />
                          <stop offset="100%" stopColor="#e11d48" />
                        </linearGradient>
                      </defs>
                      {/* Needle */}
                      <line
                        x1="60"
                        y1="60"
                        x2={60 + 35 * Math.cos(Math.PI - (hearts / 5) * Math.PI)}
                        y2={60 - 35 * Math.sin(Math.PI - (hearts / 5) * Math.PI)}
                        stroke="#374151"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <circle cx="60" cy="60" r="6" fill="#374151" />
                    </svg>
                  </div>
                  <p className={`text-sm font-semibold mt-1 ${romanceLevel.color}`}>
                    {romanceLevel.label}
                  </p>
                  <div className="flex justify-center gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Heart
                        key={i}
                        className={`w-3 h-3 ${i < hearts ? 'text-rose-500 fill-rose-500' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 border border-gray-100">
              <div className="flex items-center justify-around">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="text-2xl font-bold text-gray-900">{combo}</span>
                  </div>
                  <p className="text-xs text-gray-500">Streak</p>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span className="text-2xl font-bold text-gray-900">{xp}</span>
                  </div>
                  <p className="text-xs text-gray-500">Love Pts</p>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div className="text-center">
                  <div className="text-2xl">{title.emoji}</div>
                  <p className="text-xs text-gray-500">{title.title}</p>
                </div>
              </div>
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

      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChat(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center z-40"
      >
        <Bot className="w-8 h-8" />
      </button>

      {/* Wife Whisperer Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
          <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl flex flex-col max-h-[80vh] sm:m-4">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 sm:rounded-t-2xl rounded-t-3xl flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white">The Wife Whisperer</h3>
                <p className="text-purple-100 text-sm">Your secret weapon for domestic success</p>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {msg.role === 'bot' && <span className="text-purple-500 font-medium">🧙 </span>}
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Questions */}
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_QUESTIONS.map(q => (
                  <button
                    key={q.id}
                    onClick={() => handleChatSubmit(q.id)}
                    className="px-3 py-1.5 bg-purple-50 text-purple-600 rounded-full text-sm hover:bg-purple-100 transition-colors"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask the Wife Whisperer..."
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-400 outline-none focus:ring-2 ring-purple-500 transition-shadow"
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit(chatInput)}
                />
                <button
                  onClick={() => handleChatSubmit(chatInput)}
                  className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
