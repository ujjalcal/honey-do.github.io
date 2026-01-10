import React, { useState, useEffect } from 'react';
import { 
  Check, Plus, Clock, Trophy, X, Heart, Star, 
  Flame, Gift, Crown, Zap, Target,
  Sparkles, Medal, Wrench, Leaf, Dog, ShoppingCart,
  Swords, Shield, Brain, Gem, Gamepad2, Map
} from 'lucide-react';

// ==================== GAME DATA ====================
const HUSBAND_CLASSES = [
  { id: 'handyman', name: 'The Handyman', emoji: '🔧', bonus: 'repairs', description: '+50% XP on repairs', color: 'from-orange-500 to-amber-500' },
  { id: 'chef', name: 'The Chef', emoji: '👨‍🍳', bonus: 'cooking', description: '+50% XP on cooking', color: 'from-red-500 to-orange-500' },
  { id: 'athlete', name: 'The Athlete', emoji: '💪', bonus: 'outdoor', description: '+50% XP on outdoor', color: 'from-green-500 to-emerald-500' },
  { id: 'nerd', name: 'The Nerd', emoji: '🤓', bonus: 'tech', description: '+50% XP on tech', color: 'from-blue-500 to-indigo-500' },
];

const PET_COMPANIONS = [
  { id: 'dog', name: 'Buddy', emoji: '🐕', ability: '+10% XP', rarity: 'common' },
  { id: 'cat', name: 'Whiskers', emoji: '🐈', ability: 'Save combos', rarity: 'common' },
  { id: 'hamster', name: 'Speedy', emoji: '🐹', ability: '+20% speed', rarity: 'uncommon' },
  { id: 'parrot', name: 'Captain', emoji: '🦜', ability: 'Less nagging', rarity: 'rare' },
  { id: 'dragon', name: 'Ember', emoji: '🐉', ability: '2x boss dmg', rarity: 'legendary' },
  { id: 'unicorn', name: 'Sparkle', emoji: '🦄', ability: 'Auto-approve', rarity: 'legendary' },
];

const WEATHER_EVENTS = [
  { id: 'sunny', name: 'Perfect Day', emoji: '☀️', effect: '+25% XP', color: 'from-yellow-400 to-orange-400', multiplier: 1.25 },
  { id: 'rainy', name: 'Rainy Day', emoji: '🌧️', effect: 'Indoor +50%', color: 'from-blue-400 to-slate-500', multiplier: 1.5 },
  { id: 'stormy', name: 'Storm', emoji: '⛈️', effect: '2x XP!', color: 'from-purple-600 to-slate-700', multiplier: 2.0 },
  { id: 'rainbow', name: 'Rainbow', emoji: '🌈', effect: '3x XP!!!', color: 'from-pink-400 via-purple-400 to-blue-400', multiplier: 3.0 },
];

const RANDOM_EVENTS = [
  { id: 'mother_in_law', name: '👵 Mother-in-Law Visit!', description: 'Quick! Complete 2 tasks!', reward: 200 },
  { id: 'pizza', name: '🍕 Pizza Arrived!', description: 'Take a break! +50 XP', reward: 50 },
  { id: 'treasure', name: '💎 Found Treasure!', description: 'Lucky discovery!', reward: 300 },
  { id: 'date_night', name: '💕 Surprise Date!', description: 'Wife mood maxed!', reward: 150 },
];

const LOOT_TABLE = [
  { id: 'hammer', name: 'Golden Hammer', emoji: '🔨', rarity: 'legendary', effect: '+100% repair XP' },
  { id: 'remote', name: 'Infinity Remote', emoji: '📺', rarity: 'epic', effect: 'TV control forever' },
  { id: 'pillow', name: 'Magic Pillow', emoji: '🛏️', rarity: 'epic', effect: '+2 sleep-ins/month' },
  { id: 'socks', name: 'Lucky Socks', emoji: '🧦', rarity: 'rare', effect: '+10% loot chance' },
];

const TITLES = [
  { points: 0, title: 'Couch Potato', emoji: '🥔' },
  { points: 500, title: 'Task Rookie', emoji: '🌱' },
  { points: 1000, title: 'Chore Warrior', emoji: '⚔️' },
  { points: 2500, title: 'Domestic Knight', emoji: '🛡️' },
  { points: 5000, title: 'Household Hero', emoji: '🦸' },
  { points: 10000, title: 'Marriage Legend', emoji: '👑' },
  { points: 25000, title: 'GOD OF HUSBANDS', emoji: '🌟' },
];

// ==================== COMPONENTS ====================

// Class Selection Screen
const ClassSelection = ({ onSelect }) => (
  <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
    <div className="max-w-lg w-full">
      <h1 className="text-3xl font-black text-center text-white mb-2">⚔️ CHOOSE YOUR CLASS ⚔️</h1>
      <p className="text-slate-400 text-center mb-6">Select your husband archetype!</p>
      
      <div className="grid grid-cols-2 gap-3">
        {HUSBAND_CLASSES.map((cls) => (
          <button
            key={cls.id}
            onClick={() => onSelect(cls)}
            className={`bg-gradient-to-br ${cls.color} p-5 rounded-2xl text-white text-left
              hover:scale-105 transition-all shadow-xl border-2 border-white/20`}
          >
            <div className="text-4xl mb-2">{cls.emoji}</div>
            <h3 className="text-lg font-black">{cls.name}</h3>
            <p className="text-sm opacity-80">{cls.description}</p>
          </button>
        ))}
      </div>
    </div>
  </div>
);

// Weather Widget
const WeatherWidget = ({ weather, onClick }) => (
  <button 
    onClick={onClick}
    className={`bg-gradient-to-r ${weather.color} rounded-xl p-3 text-white shadow-lg hover:scale-105 transition-all flex-1`}
  >
    <div className="flex items-center gap-2">
      <span className="text-2xl">{weather.emoji}</span>
      <div className="text-left">
        <div className="text-xs opacity-80">Weather</div>
        <div className="font-bold text-sm">{weather.name}</div>
        <div className="text-xs">{weather.effect}</div>
      </div>
    </div>
  </button>
);

// Marriage Power Meter
const MarriagePowerMeter = ({ power }) => (
  <div className="bg-slate-800/80 rounded-xl p-3 flex-1">
    <div className="flex items-center gap-2 mb-2">
      <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
      <span className="text-pink-400 font-bold text-xs">MARRIAGE POWER</span>
      <span className="ml-auto text-white text-sm">{power}%</span>
    </div>
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-3 flex-1 bg-slate-700 rounded overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all"
            style={{ width: power >= (i + 1) * 20 ? '100%' : power > i * 20 ? `${(power - i * 20) * 5}%` : '0%' }}
          />
        </div>
      ))}
    </div>
    {power >= 100 && (
      <div className="mt-2 text-center text-xs text-pink-400 animate-pulse font-bold">
        💕 SUPER READY! 💕
      </div>
    )}
  </div>
);

// Combo Display
const ComboDisplay = ({ combo }) => {
  if (combo < 2) return null;
  return (
    <div className="fixed top-4 left-4 z-40 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl border-2 border-yellow-400 shadow-lg">
      <div className="flex items-center gap-2">
        {[...Array(Math.min(combo, 5))].map((_, i) => (
          <Flame key={i} className="w-5 h-5" />
        ))}
        <span className="font-black text-xl">x{combo}</span>
      </div>
      <div className="text-xs opacity-80">+{combo * 10}% bonus!</div>
    </div>
  );
};

// Random Event Popup
const RandomEventPopup = ({ event, onAccept, onDismiss }) => {
  if (!event) return null;
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl p-6 max-w-sm w-full border-2 border-yellow-500 text-center">
        <div className="text-5xl mb-3">{event.name.split(' ')[0]}</div>
        <h2 className="text-xl font-black text-yellow-400 mb-2">RANDOM EVENT!</h2>
        <p className="text-white mb-2">{event.name.slice(2)}</p>
        <p className="text-slate-400 mb-4">{event.description}</p>
        <div className="flex items-center justify-center gap-2 mb-4 text-amber-400">
          <Star className="w-5 h-5 fill-amber-400" />
          <span className="font-bold">+{event.reward} XP</span>
        </div>
        <div className="flex gap-3">
          <button onClick={onDismiss} className="flex-1 py-3 bg-slate-700 text-white rounded-xl font-bold">Skip</button>
          <button onClick={onAccept} className="flex-1 py-3 bg-yellow-500 text-black rounded-xl font-bold">Accept!</button>
        </div>
      </div>
    </div>
  );
};

// Loot Drop Popup
const LootDropPopup = ({ loot, onCollect }) => {
  if (!loot) return null;
  const rarityColors = {
    legendary: 'from-amber-400 to-orange-500',
    epic: 'from-purple-400 to-pink-500',
    rare: 'from-blue-400 to-indigo-500',
  };
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className={`bg-gradient-to-b ${rarityColors[loot.rarity]} rounded-2xl p-6 max-w-sm w-full text-center border-4 border-white/50`}>
        <div className="text-xs uppercase tracking-widest text-white/80 mb-2">{loot.rarity} Loot!</div>
        <div className="text-6xl mb-3">{loot.emoji}</div>
        <h2 className="text-2xl font-black text-white mb-2">{loot.name}</h2>
        <p className="text-white/90 mb-4">{loot.effect}</p>
        <button onClick={onCollect} className="w-full py-3 bg-white text-black rounded-xl font-black">
          COLLECT! 🎉
        </button>
      </div>
    </div>
  );
};

// Sock Matcher Mini Game
const SockMatcherGame = ({ onComplete, onClose }) => {
  const [socks, setSocks] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  
  const sockTypes = ['🧦', '🧤', '👟', '👞', '👠', '🥿'];
  
  useEffect(() => {
    const pairs = sockTypes.slice(0, 4);
    const allSocks = [...pairs, ...pairs].sort(() => Math.random() - 0.5);
    setSocks(allSocks.map((s, i) => ({ id: i, emoji: s })));
  }, []);
  
  useEffect(() => {
    if (timeLeft > 0 && matched.length < 8) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 || matched.length === 8) {
      setTimeout(() => onComplete(score + matched.length * 10 + timeLeft * 5), 500);
    }
  }, [timeLeft, matched, score, onComplete]);
  
  const handleClick = (sock) => {
    if (selected.length === 2 || matched.includes(sock.id) || selected.find(s => s.id === sock.id)) return;
    const newSelected = [...selected, sock];
    setSelected(newSelected);
    if (newSelected.length === 2) {
      if (newSelected[0].emoji === newSelected[1].emoji) {
        setMatched([...matched, newSelected[0].id, newSelected[1].id]);
        setScore(s => s + 50);
        setSelected([]);
      } else {
        setTimeout(() => setSelected([]), 600);
      }
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl p-5 max-w-sm w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">🧦 Sock Matcher!</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X /></button>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-amber-400 font-bold">Score: {score}</span>
          <span className={`font-bold ${timeLeft < 10 ? 'text-red-500' : 'text-white'}`}>⏱️ {timeLeft}s</span>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {socks.map((sock) => (
            <button
              key={sock.id}
              onClick={() => handleClick(sock)}
              className={`aspect-square rounded-xl text-2xl flex items-center justify-center transition-all
                ${matched.includes(sock.id) ? 'bg-green-500/50 scale-90' : 
                  selected.find(s => s.id === sock.id) ? 'bg-blue-500 scale-105' : 'bg-slate-700 hover:bg-slate-600'}`}
            >
              {selected.find(s => s.id === sock.id) || matched.includes(sock.id) ? sock.emoji : '❓'}
            </button>
          ))}
        </div>
        <p className="text-slate-400 text-center text-sm">Match all pairs!</p>
      </div>
    </div>
  );
};

// Task Card
const TaskCard = ({ task, onComplete, combo, weatherMultiplier }) => {
  const categoryEmojis = { repairs: '🔧', chores: '🧹', errands: '🛒', outdoor: '🌿', cooking: '👨‍🍳', tech: '💻' };
  const priorityColors = {
    high: { bg: 'from-red-500/20 to-orange-500/20', border: 'border-red-500/50', text: 'text-red-400' },
    medium: { bg: 'from-amber-500/20 to-yellow-500/20', border: 'border-amber-500/50', text: 'text-amber-400' },
    low: { bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/50', text: 'text-green-400' },
  };
  const config = priorityColors[task.priority];
  const totalXP = Math.round(task.points * weatherMultiplier * (1 + combo * 0.1));
  
  return (
    <div className={`bg-gradient-to-r ${config.bg} rounded-2xl p-4 border ${config.border} mb-3 
      ${task.isBoss ? 'ring-2 ring-red-500 animate-pulse' : ''}`}>
      <div className="flex items-start gap-3">
        <div className="text-3xl">{categoryEmojis[task.category] || '📋'}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${config.text} bg-black/30`}>
              {task.priority === 'high' && '🔥'}{task.priority.toUpperCase()}
            </span>
            {task.isBoss && <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-red-500 text-white">⚔️ BOSS</span>}
            {task.lootChance && <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/50 text-purple-300">💎 Loot!</span>}
          </div>
          <h3 className="font-bold text-white text-lg">{task.title}</h3>
          <p className="text-slate-400 text-sm">{task.description}</p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1 text-slate-400 text-sm">
              <Clock className="w-4 h-4" />
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-amber-500/20 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-amber-400">+{totalXP}</span>
              </div>
              {task.status === 'pending' && (
                <button
                  onClick={() => onComplete(task.id)}
                  className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-bold hover:scale-105 transition-all shadow-lg"
                >
                  <Check className="w-4 h-4" /> DONE!
                </button>
              )}
              {task.status === 'completed' && (
                <span className="text-green-400 font-bold flex items-center gap-1"><Check /> Done!</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pet Card
const PetCard = ({ pet, isActive, onClick }) => {
  const rarityColors = {
    common: 'border-slate-500', uncommon: 'border-green-500', rare: 'border-blue-500', legendary: 'border-amber-400'
  };
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-xl transition-all ${isActive ? 'bg-indigo-600 scale-105' : 'bg-slate-800/50 hover:bg-slate-700/50'}
        border-2 ${isActive ? 'border-yellow-400' : rarityColors[pet.rarity]}`}
    >
      <div className="text-3xl mb-1">{pet.emoji}</div>
      <div className="text-white text-sm font-bold">{pet.name}</div>
      <div className="text-slate-400 text-xs">{pet.ability}</div>
      <div className={`text-xs mt-1 ${pet.rarity === 'legendary' ? 'text-amber-400' : 'text-slate-500'}`}>{pet.rarity}</div>
    </button>
  );
};

// Daily Quests
const DailyQuests = ({ quests }) => (
  <div className="bg-amber-900/30 rounded-xl p-3 border border-amber-500/30">
    <div className="flex items-center gap-2 mb-2">
      <Target className="w-4 h-4 text-amber-400" />
      <span className="text-amber-400 font-bold text-sm">Daily Quests</span>
    </div>
    {quests.map((q, i) => (
      <div key={i} className={`flex items-center gap-2 p-2 rounded-lg mb-1 ${q.completed ? 'bg-green-500/20' : 'bg-black/20'}`}>
        <span className="text-lg">{q.emoji}</span>
        <span className={`flex-1 text-sm ${q.completed ? 'text-green-400 line-through' : 'text-white'}`}>{q.name}</span>
        <span className="text-xs text-slate-400">{q.progress}/{q.target}</span>
        <span className="text-amber-400 text-xs font-bold">+{q.reward}</span>
      </div>
    ))}
  </div>
);

// Leaderboard
const LeaderboardView = ({ entries }) => (
  <div className="bg-slate-800/50 rounded-xl overflow-hidden">
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 flex items-center gap-2">
      <Crown className="w-5 h-5 text-yellow-400" />
      <span className="font-bold text-white">Leaderboard</span>
    </div>
    {entries.map((e, i) => (
      <div key={i} className={`flex items-center gap-3 p-3 border-b border-slate-700/50 ${e.isUser ? 'bg-indigo-500/20' : ''}`}>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold
          ${i === 0 ? 'bg-yellow-500 text-yellow-900' : i === 1 ? 'bg-slate-400 text-slate-800' : i === 2 ? 'bg-orange-500 text-orange-900' : 'bg-slate-700 text-white'}`}>
          {i < 3 ? ['👑', '🥈', '🥉'][i] : i + 1}
        </div>
        <span className="text-2xl">{e.avatar}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`font-bold ${e.isUser ? 'text-indigo-400' : 'text-white'}`}>{e.name}</span>
            {e.isUser && <span className="text-xs bg-indigo-500 px-1.5 py-0.5 rounded text-white">YOU</span>}
          </div>
          <span className="text-xs text-slate-400">{e.title}</span>
        </div>
        <div className="flex items-center gap-1 text-amber-400 font-bold">
          <Star className="w-4 h-4 fill-amber-400" />{e.points.toLocaleString()}
        </div>
      </div>
    ))}
  </div>
);

// ==================== MAIN APP ====================
export default function HoneyDoRPG() {
  const [gameStarted, setGameStarted] = useState(false);
  const [husbandClass, setHusbandClass] = useState(null);
  const [activeTab, setActiveTab] = useState('quests');
  
  const [totalXP, setTotalXP] = useState(1250);
  const [marriagePower, setMarriagePower] = useState(65);
  const [combo, setCombo] = useState(4);
  const [streak, setStreak] = useState(12);
  
  const [activePet, setActivePet] = useState(PET_COMPANIONS[0]);
  const [weather, setWeather] = useState(WEATHER_EVENTS[0]);
  const [randomEvent, setRandomEvent] = useState(null);
  const [lootDrop, setLootDrop] = useState(null);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [inventory, setInventory] = useState([LOOT_TABLE[3]]);
  
  const [dailyQuests] = useState([
    { emoji: '✅', name: 'Complete 3 tasks', progress: 2, target: 3, reward: 100, completed: false },
    { emoji: '🔥', name: 'Get 5x combo', progress: 4, target: 5, reward: 150, completed: false },
    { emoji: '🎮', name: 'Win mini-game', progress: 1, target: 1, reward: 75, completed: true },
  ]);
  
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Assemble IKEA Wardrobe', description: 'The MALM nightmare...', priority: 'high', category: 'repairs', dueDate: '2026-01-15', status: 'pending', points: 150, isBoss: true, lootChance: 30 },
    { id: 2, title: 'Deep Clean Kitchen', description: 'Make it sparkle!', priority: 'high', category: 'chores', dueDate: '2026-01-12', status: 'pending', points: 80, lootChance: 15 },
    { id: 3, title: 'Mow the Lawn', description: 'Front and back', priority: 'medium', category: 'outdoor', dueDate: '2026-01-14', status: 'pending', points: 60 },
    { id: 4, title: 'Fix Leaky Faucet', description: 'Kitchen sink', priority: 'medium', category: 'repairs', dueDate: '2026-01-13', status: 'pending', points: 70, lootChance: 20 },
    { id: 5, title: 'Grocery Shopping', description: 'The whole list', priority: 'low', category: 'errands', dueDate: '2026-01-11', status: 'pending', points: 40 },
  ]);
  
  const leaderboard = [
    { name: 'ChoreKing99', avatar: '🧔', title: 'GOD OF HUSBANDS', points: 52340, isUser: false },
    { name: 'MrFixIt', avatar: '👨‍🔧', title: 'Mythical Partner', points: 28750, isUser: false },
    { name: 'DadOfYear', avatar: '👨‍👧', title: 'Marriage Legend', points: 15200, isUser: false },
    { name: 'You', avatar: '🦸', title: getTitle(totalXP).title, points: totalXP, isUser: true },
    { name: 'TaskMaster', avatar: '🤵', title: 'Household Hero', points: 890, isUser: false },
  ];
  
  function getTitle(points) {
    return TITLES.reduce((acc, t) => points >= t.points ? t : acc, TITLES[0]);
  }
  
  // Random event trigger
  useEffect(() => {
    if (gameStarted && !randomEvent) {
      const timer = setTimeout(() => {
        if (Math.random() < 0.3) {
          setRandomEvent(RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)]);
        }
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [gameStarted, randomEvent]);
  
  const handleClassSelect = (cls) => {
    setHusbandClass(cls);
    setGameStarted(true);
  };
  
  const handleCompleteTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const classBonus = husbandClass?.bonus === task.category ? 1.5 : 1;
    const earned = Math.round(task.points * weather.multiplier * (1 + combo * 0.1) * classBonus);
    
    setTotalXP(prev => prev + earned);
    setCombo(prev => prev + 1);
    setMarriagePower(prev => Math.min(100, prev + 10));
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: 'completed' } : t));
    
    // Loot drop chance
    if (task.lootChance && Math.random() * 100 < task.lootChance) {
      const available = LOOT_TABLE.filter(l => !inventory.find(i => i.id === l.id));
      if (available.length > 0) {
        setLootDrop(available[Math.floor(Math.random() * available.length)]);
      }
    }
  };
  
  const handleMiniGameComplete = (score) => {
    setTotalXP(prev => prev + score);
    setShowMiniGame(false);
  };
  
  const currentTitle = getTitle(totalXP);
  
  if (!gameStarted) {
    return <ClassSelection onSelect={handleClassSelect} />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900">
      {/* Popups */}
      <RandomEventPopup 
        event={randomEvent} 
        onAccept={() => { setTotalXP(p => p + randomEvent.reward); setRandomEvent(null); }}
        onDismiss={() => setRandomEvent(null)}
      />
      <LootDropPopup loot={lootDrop} onCollect={() => { setInventory([...inventory, lootDrop]); setLootDrop(null); }} />
      {showMiniGame && <SockMatcherGame onComplete={handleMiniGameComplete} onClose={() => setShowMiniGame(false)} />}
      
      {/* Combo Display */}
      <ComboDisplay combo={combo} />
      
      {/* Header */}
      <div className="pt-4 pb-4 px-4">
        {/* Player Info */}
        <div className="bg-slate-800/80 rounded-xl p-3 mb-3 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl border-3 border-amber-400">
                {husbandClass?.emoji}
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center text-lg border-2 border-amber-400">
                {activePet?.emoji}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">{husbandClass?.name}</span>
                <span className="text-amber-400 text-xs">{currentTitle.emoji} {currentTitle.title}</span>
              </div>
              <div className="mt-1">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Lv {Math.floor(totalXP / 1000) + 1}</span>
                  <span>{totalXP.toLocaleString()} XP</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" style={{ width: `${(totalXP % 1000) / 10}%` }} />
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 text-orange-400">
                <Flame className="w-5 h-5 fill-orange-400" />
                <span className="font-bold text-lg">{streak}</span>
              </div>
              <div className="text-xs text-slate-400">streak</div>
            </div>
          </div>
        </div>
        
        {/* Weather & Marriage */}
        <div className="flex gap-2 mb-3">
          <WeatherWidget weather={weather} onClick={() => setWeather(WEATHER_EVENTS[Math.floor(Math.random() * WEATHER_EVENTS.length)])} />
          <MarriagePowerMeter power={marriagePower} />
        </div>
        
        {/* Daily Quests */}
        <DailyQuests quests={dailyQuests} />
      </div>
      
      {/* Main Content */}
      <div className="px-4 pb-24">
        {activeTab === 'quests' && (
          <>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Swords className="w-5 h-5 text-red-400" /> Active Quests
              </h2>
              <button 
                onClick={() => setShowMiniGame(true)}
                className="flex items-center gap-1 bg-purple-500/30 text-purple-300 px-3 py-1.5 rounded-lg text-sm font-bold"
              >
                <Gamepad2 className="w-4 h-4" /> Mini-Game
              </button>
            </div>
            {tasks.filter(t => t.status === 'pending').map(task => (
              <TaskCard key={task.id} task={task} onComplete={handleCompleteTask} combo={combo} weatherMultiplier={weather.multiplier} />
            ))}
            {tasks.filter(t => t.status === 'completed').length > 0 && (
              <>
                <h3 className="text-white font-bold mt-4 mb-2 opacity-60">Completed</h3>
                {tasks.filter(t => t.status === 'completed').map(task => (
                  <TaskCard key={task.id} task={task} onComplete={handleCompleteTask} combo={combo} weatherMultiplier={weather.multiplier} />
                ))}
              </>
            )}
          </>
        )}
        
        {activeTab === 'pets' && (
          <>
            <h2 className="text-lg font-black text-white mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-400" /> Companions
            </h2>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {PET_COMPANIONS.map(pet => (
                <PetCard key={pet.id} pet={pet} isActive={activePet?.id === pet.id} onClick={() => setActivePet(pet)} />
              ))}
            </div>
            <h3 className="text-white font-bold mt-4 mb-2 flex items-center gap-2">
              <Gem className="w-4 h-4 text-purple-400" /> Your Loot
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {inventory.map(item => (
                <div key={item.id} className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl p-3 border border-amber-500/30">
                  <div className="text-2xl mb-1">{item.emoji}</div>
                  <div className="text-white font-bold text-sm">{item.name}</div>
                  <div className="text-amber-400 text-xs">{item.effect}</div>
                </div>
              ))}
              {inventory.length === 0 && <p className="text-slate-500 col-span-2 text-center py-4">Complete tasks for loot drops!</p>}
            </div>
          </>
        )}
        
        {activeTab === 'ranks' && (
          <>
            <h2 className="text-lg font-black text-white mb-3 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-400" /> Rankings
            </h2>
            <LeaderboardView entries={leaderboard} />
          </>
        )}
      </div>
      
      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-slate-700 px-4 py-2 z-30">
        <div className="flex justify-around max-w-md mx-auto">
          {[
            { id: 'quests', icon: Swords, label: 'Quests' },
            { id: 'pets', icon: Heart, label: 'Companions' },
            { id: 'ranks', icon: Crown, label: 'Ranks' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 px-5 py-2 rounded-xl transition-all
                ${activeTab === tab.id ? 'text-white bg-indigo-600/50' : 'text-slate-500'}`}
            >
              <tab.icon className="w-6 h-6" />
              <span className="text-xs font-bold">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
