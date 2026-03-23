const { useState, useEffect } = React;

// ==========================================
// Components / Features
// ==========================================

// 1. Weather Widget (features/weather/WeatherWidget.jsx)
const WeatherWidget = () => {
  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white shadow-lg h-full flex flex-col justify-between hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold opacity-90">東京</h2>
          <p className="text-sm opacity-75">今日</p>
        </div>
        <div className="text-4xl animate-pulse">☀️</div>
      </div>
      <div className="mt-6">
        <div className="text-5xl font-extrabold tracking-tighter drop-shadow-sm">24°</div>
        <div className="flex gap-4 mt-2 text-sm opacity-90 font-medium">
          <span>最高: 26°</span>
          <span>最低: 18°</span>
        </div>
      </div>
    </div>
  );
};

// 2. Garbage Collection (features/garbage/GarbageSchedule.jsx)
const GarbageSchedule = () => {
  // 後で分離・書き換えやすいようにデータ構造を独立させる
  const scheduleDayMap = {
    '月': '燃えるゴミ',
    '火': 'プラ・資源',
    '水': '燃えないゴミ',
    '木': '燃えるゴミ',
    '金': '古紙・ペットボトル',
    '土': 'なし',
    '日': 'なし',
  };

  const days = ['日', '月', '火', '水', '木', '金', '土'];
  const today = new Date();
  const todayStr = days[today.getDay()];
  const todayGarbage = scheduleDayMap[todayStr];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col hover:border-green-200 transition-colors">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-green-500">♻️</span> ゴミ出しカレンダー
      </h2>
      
      <div className="bg-green-50 rounded-xl p-4 mb-5 border border-green-100 flex-1 flex flex-col justify-center items-center text-center">
        <p className="text-sm text-green-700 font-medium mb-1 drop-shadow-sm">今日 ({todayStr}曜日)</p>
        <p className="text-2xl font-black text-green-800 tracking-tight">{todayGarbage}</p>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {days.map((day) => {
          const type = scheduleDayMap[day];
          const isToday = day === todayStr;
          
          let dotColor = 'bg-gray-200';
          if (type.includes('燃える')) dotColor = 'bg-red-400';
          if (type.includes('プラ')) dotColor = 'bg-blue-400';
          if (type.includes('燃えない')) dotColor = 'bg-yellow-400';
          if (type.includes('古紙')) dotColor = 'bg-purple-400';

          return (
             <div key={day} className={`flex flex-col items-center p-1 rounded-lg ${isToday ? 'bg-green-100 text-green-800 font-bold' : 'text-gray-500'}`}>
               <span className="mb-1.5">{day}</span>
               <div className={`w-2.5 h-2.5 rounded-full ${dotColor} shadow-inner`} title={type}></div>
             </div>
          );
        })}
      </div>
    </div>
  );
};

// 3. Calendar (features/calendar/TimeTreeCalendar.jsx)
const TimeTreeCalendar = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col hover:border-blue-200 transition-colors">
      <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
         <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
           <span className="text-blue-500">📅</span> 家族カレンダー
         </h2>
      </div>
      <div className="flex-1 bg-gray-50 relative min-h-[300px]">
        {/* URL部分をTimeTreeの公開カレンダー用URLに変更してください */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 text-sm p-6 text-center z-0 gap-3">
          <div className="text-4xl opacity-50">🗓️</div>
          <p>
            ここにTimeTreeの公開カレンダーが埋め込まれます。<br/>
            (コード内のiframe srcを書き換えてください)
          </p>
        </div>
        <iframe 
          className="w-full h-full relative z-10" 
          src="about:blank" 
          frameBorder="0" 
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};


// ==========================================
// Tabs
// ==========================================

// Main Tab Container (tabs/MainTab.jsx)
const MainTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full p-6 pb-28 md:pb-6 overflow-y-auto w-full max-w-7xl mx-auto">
      {/* 行1: 天気とゴミ出し */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="h-44 shrink-0 transition-transform hover:scale-[1.02]">
          <WeatherWidget />
        </div>
        <div className="flex-1 min-h-[250px] transition-transform hover:scale-[1.02]">
           <GarbageSchedule />
        </div>
      </div>
      
      {/* 行2: カレンダー */}
      <div className="lg:col-span-8 min-h-[450px] transition-transform hover:scale-[1.01]">
        <TimeTreeCalendar />
      </div>
    </div>
  );
};


// ==========================================
// Layout & Root App
// ==========================================

// App Layout (layout/AppLayout.jsx)
const AppLayout = ({ children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'main', name: 'メイン', icon: '🏠' },
    { id: 'tasks', name: 'タスク', icon: '✅' },
    { id: 'settings', name: '設定', icon: '⚙️' },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] w-full overflow-hidden font-sans">
      {/* Header for iPad/PC */}
      <header className="hidden md:flex bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 px-8 py-4 justify-between items-center z-10">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
          Home<span className="text-blue-500">Dash</span>
        </h1>
        <div className="flex gap-2 bg-gray-100/50 p-1 rounded-xl">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'bg-transparent text-gray-500 hover:text-gray-700 hover:bg-white/50'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>{tab.name}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 overflow-y-auto hide-scrollbar">
          {children}
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.08)] border-t border-gray-100 z-50 px-6 py-2 pb-safe">
        <ul className="flex justify-around items-center">
          {tabs.map(tab => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'text-blue-600 -translate-y-1' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className={`text-2xl mb-1 ${activeTab === tab.id ? 'scale-110' : ''} transition-transform`}>{tab.icon}</span>
                <span className="text-[10px] font-bold">{tab.name}</span>
                {/* Active Indicator */}
                <div className={`h-1 w-1 bg-blue-600 rounded-full mt-1 absolute -bottom-1 transition-opacity ${activeTab === tab.id ? 'opacity-100' : 'opacity-0'}`}></div>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Global CSS for hiding scrollbar visually but allowing scroll */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .pb-safe { padding-bottom: max(env(safe-area-inset-bottom), 0.5rem); }
      `}} />
    </div>
  );
};

// Root Component
const App = () => {
  const [activeTab, setActiveTab] = useState('main');

  return (
    <AppLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className={`transition-opacity duration-300 h-full ${activeTab === 'main' ? 'opacity-100 z-10' : 'opacity-0 hidden'}`}>
        <MainTab />
      </div>
      
      <div className={`transition-opacity duration-300 h-full ${activeTab === 'tasks' ? 'opacity-100 z-10' : 'opacity-0 hidden'}`}>
        <div className="h-full flex flex-col items-center justify-center text-gray-500 p-6 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-xl font-bold mb-2">タスク管理</h2>
          <p className="text-sm">この機能は今後の拡張用として準備されています。<br/>（Reactによるコンポーネント指向・タブ構造で設計済み）</p>
        </div>
      </div>
      
      <div className={`transition-opacity duration-300 h-full ${activeTab === 'settings' ? 'opacity-100 z-10' : 'opacity-0 hidden'}`}>
        <div className="h-full flex flex-col items-center justify-center text-gray-500 p-6 text-center">
          <div className="text-6xl mb-4">⚙️</div>
          <h2 className="text-xl font-bold mb-2">設定</h2>
          <p className="text-sm">ゴミ出しの曜日設定や天気の地域設定などを<br/>ここに追加できます。</p>
        </div>
      </div>
    </AppLayout>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
