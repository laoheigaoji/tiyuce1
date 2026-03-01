/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, 
  User as UserIcon, 
  ChevronRight, 
  Wallet, 
  FileText, 
  ShieldCheck, 
  Share2, 
  Headphones,
  Volume2,
  ChevronLeft,
  Flame,
  X,
  CheckCircle2,
  Smartphone,
  Lock,
  ShieldEllipsis
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Page = 'home' | 'profile' | 'vip' | 'detail' | 'recharge' | 'login' | 'register';

// --- Components ---

const BottomNav = ({ activeTab, onTabChange }: { activeTab: Page, onTabChange: (tab: Page) => void }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-2 pb-6 px-4 z-50">
    <button 
      onClick={() => onTabChange('home')}
      className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-[#FF5C5C]' : 'text-gray-400'}`}
    >
      <HomeIcon size={24} fill={activeTab === 'home' ? 'currentColor' : 'none'} />
      <span className="text-xs">首页</span>
    </button>
    <button 
      onClick={() => onTabChange('profile')}
      className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-[#FF5C5C]' : 'text-gray-400'}`}
    >
      <UserIcon size={24} fill={activeTab === 'profile' ? 'currentColor' : 'none'} />
      <span className="text-xs">我的</span>
    </button>
  </div>
);

const Header = ({ title, showBack, onBack }: { title: string, showBack?: boolean, onBack?: () => void }) => (
  <div className="sticky top-0 bg-white z-40 px-4 py-4 flex items-center justify-between border-b border-gray-50">
    <div className="w-10">
      {showBack && (
        <button onClick={onBack} className="p-1">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
      )}
    </div>
    <h1 className="text-lg font-bold text-gray-800">{title}</h1>
    <div className="flex items-center gap-2 bg-gray-100/50 rounded-full px-3 py-1 border border-gray-200">
      <div className="flex gap-1">
        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
      </div>
      <div className="w-[1px] h-3 bg-gray-300 mx-1"></div>
      <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  </div>
);

// --- Modals ---

const PaymentModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [method, setMethod] = useState<'alipay' | 'balance'>('alipay');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-sm rounded-3xl overflow-hidden relative z-10"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="w-6"></div>
                <h3 className="text-lg font-bold text-gray-800">请选择置顶时间</h3>
                <button onClick={onClose} className="text-gray-300 hover:text-gray-500">
                  <X size={24} />
                </button>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center text-gray-900">
                  <span className="text-2xl font-bold">¥</span>
                  <span className="text-5xl font-black ml-1">99</span>
                </div>
              </div>

              <div className="space-y-4">
                <div 
                  onClick={() => setMethod('alipay')}
                  className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 bg-gray-50/30 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                      <span className="text-xl font-bold">支</span>
                    </div>
                    <span className="font-medium text-gray-700">支付宝支付</span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'alipay' ? 'border-[#FF5C5C]' : 'border-gray-200'}`}>
                    {method === 'alipay' && <div className="w-3 h-3 bg-[#FF5C5C] rounded-full" />}
                  </div>
                </div>

                <div 
                  onClick={() => setMethod('balance')}
                  className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 bg-gray-50/30 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                      <Wallet size={20} />
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">余额支付</span>
                      <span className="text-xs text-gray-400 ml-1">(余额: <span className="text-[#FF5C5C]">¥ 0</span>)</span>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'balance' ? 'border-[#FF5C5C]' : 'border-gray-200'}`}>
                    {method === 'balance' && <div className="w-3 h-3 bg-[#FF5C5C] rounded-full" />}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <button className="text-sm text-gray-400">
                  余额不足? <span className="text-[#FF5C5C]">去购买</span>
                </button>
              </div>

              <button className="w-full mt-8 bg-gradient-to-r from-[#FF8C66] to-[#FF5C5C] text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-100 active:scale-95 transition-transform">
                去支付
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Views ---

const HomeView = ({ onGoToVIP, onGoToDetail }: { onGoToVIP: () => void, onGoToDetail: () => void }) => {
  const listItems = [
    { id: 1, title: '第001期 【小张老师】 10注精选直组10注精选直组', price: '¥ 168.00', date: '2025-04-07 16:09', hitRate: '76%' },
    { id: 2, title: '第019期 【小红老师】 10注精选', price: '¥ 209.50', date: '2025-04-07 16:09', hitRate: '76%' },
    { id: 3, title: '第001期 【小张老师】 10注精选直组10注精选直组', price: '免费', date: '2025-04-07 16:09', isFree: true },
    { id: 4, title: '第019期 【小红老师】 10注精选', price: '免费', date: '2025-04-07 16:09', isFree: true },
    { id: 5, title: '第002期 【老李老师】 5注精选', price: '¥ 88.00', date: '2025-04-07 17:30', hitRate: '82%' },
  ];

  return (
    <div className="pb-20">
      <Header title="首页" />
      
      {/* Banner */}
      <div className="px-4 py-3">
        <div className="rounded-xl overflow-hidden shadow-lg aspect-[16/9] relative bg-gradient-to-br from-red-500 to-orange-400">
          <img 
            src="https://picsum.photos/seed/lottery/800/450" 
            alt="Promotion" 
            className="w-full h-full object-cover mix-blend-overlay opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
            <h2 className="text-3xl font-black tracking-wider drop-shadow-md">DÀNH TẶNG BẠN MỚI</h2>
            <div className="text-6xl font-black mt-2 text-yellow-300 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">3.000<span className="text-2xl ml-1">S</span></div>
            <div className="mt-4 flex gap-2">
              <div className="bg-blue-900 px-3 py-1 rounded text-xs font-bold">05.07 - 07.07</div>
              <div className="bg-blue-900 px-3 py-1 rounded text-xs font-bold">13.07 - 15.07</div>
              <div className="bg-blue-900 px-3 py-1 rounded text-xs font-bold">23.07 - 25.07</div>
            </div>
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="px-4 py-2 flex items-center gap-2 text-gray-500 text-sm bg-gray-50/50">
        <Volume2 size={16} className="text-[#FF5C5C]" />
        <div className="overflow-hidden whitespace-nowrap">
          <motion.p 
            animate={{ x: [300, -500] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            恭喜用户9068046中奖100000元! 恭喜用户7721345中奖50000元!
          </motion.p>
        </div>
      </div>

      {/* List */}
      <div className="mt-2">
        {listItems.map((item) => (
          <div 
            key={item.id} 
            onClick={onGoToDetail}
            className="px-4 py-4 border-b border-gray-50 flex justify-between items-start bg-white active:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex-1 pr-4">
              <h3 className="text-[15px] font-medium text-gray-800 leading-snug line-clamp-2">{item.title}</h3>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-gray-400 text-xs">{item.date}</span>
                {item.hitRate && (
                  <span className="bg-orange-50 text-orange-400 text-[10px] px-1.5 py-0.5 rounded border border-orange-100">
                    命中率{item.hitRate}
                  </span>
                )}
              </div>
            </div>
            <div className={`text-sm font-bold whitespace-nowrap pt-1 ${item.isFree ? 'text-[#FF5C5C]' : 'text-[#FF5C5C]'}`}>
              {item.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileView = ({ onGoToVIP, onGoToRecharge, onGoToLogin }: { onGoToVIP: () => void, onGoToRecharge: () => void, onGoToLogin: () => void }) => {
  const menuItems = [
    { icon: Wallet, label: '余额充值', action: onGoToRecharge },
    { icon: FileText, label: '用户协议', action: () => {} },
    { icon: ShieldCheck, label: '隐私政策', action: () => {} },
    { icon: Share2, label: '分享好友', action: () => {} },
    { icon: Headphones, label: '联系客服', action: () => {} },
  ];

  return (
    <div className="pb-20 bg-white min-h-screen">
      <Header title="我的" />
      
      {/* User Info */}
      <div className="px-6 py-8 flex items-center gap-4" onClick={onGoToLogin}>
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-100 flex items-center justify-center">
          <UserIcon size={32} className="text-gray-300" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-800">微信用户</span>
            <div className="w-5 h-5 bg-[#FF5C5C] rounded-full flex items-center justify-center text-white text-[10px] font-black italic">V</div>
          </div>
          <span className="text-xs text-gray-400 mt-1">点击登录/注册</span>
        </div>
      </div>

      {/* VIP Banner */}
      <div className="px-4">
        <div className="bg-gradient-to-r from-[#FF8C66] to-[#FF5C5C] rounded-xl p-5 flex items-center justify-between shadow-lg shadow-orange-100">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-black text-white/40 italic">V</div>
            <span className="text-white font-bold text-lg">开通会员 享受权益</span>
          </div>
          <button 
            onClick={onGoToVIP}
            className="bg-white text-[#FF5C5C] px-4 py-1.5 rounded-full text-sm font-medium shadow-sm active:scale-95 transition-transform"
          >
            立即查看
          </button>
        </div>
      </div>

      {/* Menu List */}
      <div className="mt-8 px-2">
        {menuItems.map((item, idx) => (
          <div 
            key={idx} 
            onClick={item.action}
            className="flex items-center justify-between px-4 py-4 active:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <item.icon size={22} className="text-gray-700" strokeWidth={1.5} />
              </div>
              <span className="text-[15px] text-gray-800 font-medium">{item.label}</span>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-active:text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

const VIPCenterView = ({ onBack }: { onBack: () => void }) => {
  const packages = [
    { type: '月度会员', price: '12.8', original: '25.8', active: true },
    { type: '季度会员', price: '29.8', original: '45.8', active: false },
    { type: '年度会员', price: '98.0', original: '198.0', active: false },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F8] pb-24">
      <Header title="会员中心" showBack onBack={onBack} />
      
      {/* VIP Card */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-br from-[#FFB088] via-[#FF8C66] to-[#FF5C5C] rounded-2xl p-6 relative overflow-hidden shadow-xl shadow-orange-100">
          <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 opacity-20 rotate-12">
             <div className="w-32 h-32 border-[12px] border-white rounded-2xl flex items-center justify-center">
                <span className="text-7xl font-black text-white italic">V</span>
             </div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white italic tracking-tight">VIP会员</h2>
            <p className="text-white/80 text-sm mt-1 font-medium">尊享专属权益</p>
            
            <div className="mt-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden">
                <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <span className="text-white/90 text-sm font-medium">暂未开通特权</span>
            </div>
          </div>
        </div>
      </div>

      {/* Package Selection */}
      <div className="mt-6">
        <div className="flex items-center justify-center gap-3 px-4 mb-4">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#FF5C5C]"></div>
          <div className="w-1.5 h-1.5 bg-[#FF5C5C] rotate-45"></div>
          <h3 className="text-[#FF5C5C] font-bold text-lg">套餐选择</h3>
          <div className="w-1.5 h-1.5 bg-[#FF5C5C] rotate-45"></div>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#FF5C5C]"></div>
        </div>

        <div className="flex gap-3 px-4 overflow-x-auto pb-4 no-scrollbar">
          {packages.map((pkg, idx) => (
            <div 
              key={idx}
              className={`min-w-[140px] flex-1 rounded-2xl p-5 flex flex-col items-center border-2 transition-all ${
                pkg.active 
                ? 'bg-[#FFF0F0] border-[#FF5C5C] shadow-md' 
                : 'bg-white border-transparent'
              }`}
            >
              <div className="flex items-center gap-1 text-[#FF5C5C] mb-2">
                <Flame size={14} fill="currentColor" />
                <span className="text-xs font-bold">{pkg.type}</span>
              </div>
              <div className="flex items-baseline text-[#FF5C5C]">
                <span className="text-sm font-bold">¥</span>
                <span className="text-2xl font-black ml-0.5">{pkg.price}</span>
              </div>
              <span className="text-gray-300 text-xs line-through mt-1">¥ {pkg.original}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Member Description */}
      <div className="mt-8 px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#FF5C5C]"></div>
          <div className="w-1.5 h-1.5 bg-[#FF5C5C] rotate-45"></div>
          <h3 className="text-[#FF5C5C] font-bold text-lg">会员说明</h3>
          <div className="w-1.5 h-1.5 bg-[#FF5C5C] rotate-45"></div>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#FF5C5C]"></div>
        </div>
        <div className="bg-white rounded-2xl p-6 text-gray-400 text-sm leading-relaxed tracking-wide">
          一报能这过地产近：里笑标世么育不个里资者省造清要立停不人区住处简化陆展第程，深经舞面深说飞自笑。
          <br /><br />
          更多特权正在陆续上线中，敬请期待。开通即代表您同意《会员服务协议》。
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100">
        <button className="w-full bg-gradient-to-r from-[#FF8C66] to-[#FF5C5C] text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-100 active:scale-[0.98] transition-transform">
          立即开通
        </button>
      </div>
    </div>
  );
};

const DetailView = ({ onBack, onShowPayment }: { onBack: () => void, onShowPayment: () => void }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header title="详情" showBack onBack={onBack} />
      
      <div className="px-6 py-6">
        <h2 className="text-2xl font-bold text-gray-800">测试</h2>
        <p className="text-gray-400 text-sm mt-2">2026-01-25 10:44</p>
      </div>

      <div className="h-2 bg-gray-50"></div>

      <div className="px-6 py-6 space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-[#FF5C5C] rounded-full"></div>
            <h3 className="font-bold text-gray-800 text-lg">VIP内容</h3>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center py-12" onClick={onShowPayment}>
            <p className="text-gray-400 text-sm">此内容为VIP专属，请开通后查看</p>
            <button className="mt-4 text-[#FF5C5C] font-bold">立即解锁</button>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-[#FF5C5C] rounded-full"></div>
            <h3 className="font-bold text-gray-800 text-lg">简介</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">111</p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-[#FF5C5C] rounded-full"></div>
            <h3 className="font-bold text-gray-800 text-lg">资料</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">111</p>
        </section>
      </div>
    </div>
  );
};

const RechargeView = ({ onBack }: { onBack: () => void }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const amounts = [100, 500, 1000, 2000, 10000];

  return (
    <div className="min-h-screen bg-white">
      <Header title="余额充值" showBack onBack={onBack} />
      
      <div className="px-4 py-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-[#FFB088] to-[#FF5C5C] rounded-2xl p-6 text-white shadow-xl shadow-orange-100 mb-8">
          <div className="mb-8">
            <p className="text-white/80 text-sm">账户余额(元)</p>
            <p className="text-4xl font-black mt-1">¥ 0</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-white/80 text-xs">累计消费(元)</p>
              <p className="text-lg font-bold mt-0.5">¥ 0.00</p>
            </div>
            <div>
              <p className="text-white/80 text-xs">累计充值(元)</p>
              <p className="text-lg font-bold mt-0.5">¥ 0</p>
            </div>
          </div>
        </div>

        {/* Amount Selection */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">选择充值额度</h3>
          <button className="text-gray-400 text-sm flex items-center gap-1">
            账户明细 <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-12">
          {amounts.map((amount) => (
            <div 
              key={amount}
              onClick={() => setSelectedAmount(amount)}
              className={`py-6 rounded-xl flex items-center justify-center text-xl font-bold transition-all border-2 ${
                selectedAmount === amount 
                ? 'bg-gradient-to-br from-[#FFB088] to-[#FF5C5C] text-white border-transparent shadow-lg shadow-orange-100' 
                : 'bg-gray-50 text-gray-700 border-transparent'
              }`}
            >
              {amount}
            </div>
          ))}
          <div className="bg-gray-50 py-6 rounded-xl flex items-center justify-center text-gray-400 text-sm border-2 border-transparent">
            自定义
          </div>
        </div>

        <div className="space-y-6">
          <button className="w-full bg-gradient-to-r from-[#FF8C66] to-[#FF5C5C] text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-100 active:scale-95 transition-transform">
            立即充值
          </button>
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-400">我已阅读并同意 <span className="text-orange-300">《用户充值协议》</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginView = ({ onBack, onGoToRegister }: { onBack: () => void, onGoToRegister: () => void }) => {
  return (
    <div className="min-h-screen bg-white px-8 pt-12">
      <button onClick={onBack} className="mb-12">
        <ChevronLeft size={24} className="text-gray-800" />
      </button>

      <div className="flex flex-col items-center mb-12">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <div className="text-blue-500 font-bold text-xs text-center leading-tight">
            宇航数字<br />YUHANG
          </div>
        </div>
        <h2 className="text-3xl font-black text-gray-800 tracking-wider">宇航数字</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4 border-b border-gray-100 py-4">
          <Smartphone size={20} className="text-gray-400" />
          <input type="text" placeholder="请输入手机号" className="flex-1 outline-none text-gray-700" />
        </div>
        <div className="flex items-center gap-4 border-b border-gray-100 py-4">
          <Lock size={20} className="text-gray-400" />
          <input type="password" placeholder="请输入密码" className="flex-1 outline-none text-gray-700" />
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <button className="w-full bg-gradient-to-r from-[#FF8C66] to-[#FF5C5C] text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-100">
          登录
        </button>
        <button 
          onClick={onGoToRegister}
          className="w-full bg-gray-50 text-[#FF5C5C] py-4 rounded-full font-bold text-lg"
        >
          注册
        </button>
      </div>

      <div className="mt-12 text-center">
        <button className="text-gray-400 text-sm">忘记密码?</button>
      </div>
    </div>
  );
};

const RegisterView = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-white px-8 pt-12">
      <button onClick={onBack} className="mb-12">
        <ChevronLeft size={24} className="text-gray-800" />
      </button>

      <div className="flex flex-col items-center mb-12">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <div className="text-blue-500 font-bold text-xs text-center leading-tight">
            宇航数字<br />YUHANG
          </div>
        </div>
        <h2 className="text-3xl font-black text-gray-800 tracking-wider">宇航数字</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4 border-b border-gray-100 py-4">
          <Smartphone size={20} className="text-gray-400" />
          <input type="text" placeholder="请输入手机号" className="flex-1 outline-none text-gray-700" />
        </div>
        <div className="flex items-center gap-4 border-b border-gray-100 py-4">
          <Lock size={20} className="text-gray-400" />
          <input type="password" placeholder="请输入密码" className="flex-1 outline-none text-gray-700" />
        </div>
        <div className="flex items-center gap-4 border-b border-gray-100 py-4">
          <ShieldEllipsis size={20} className="text-gray-400" />
          <input type="text" placeholder="请输入验证码" className="flex-1 outline-none text-gray-700" />
          <button className="text-[#FF5C5C] text-sm font-medium">获取验证码</button>
        </div>
      </div>

      <div className="mt-12">
        <button className="w-full bg-gradient-to-r from-[#FF8C66] to-[#FF5C5C] text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-100">
          注册
        </button>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<Page>('home');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handleGoToVIP = () => setActiveTab('vip');
  const handleGoToDetail = () => setActiveTab('detail');
  const handleGoToRecharge = () => setActiveTab('recharge');
  const handleGoToLogin = () => setActiveTab('login');
  const handleGoToRegister = () => setActiveTab('register');

  const handleBack = () => {
    if (activeTab === 'vip' || activeTab === 'recharge' || activeTab === 'login') {
      setActiveTab('profile');
    } else if (activeTab === 'detail') {
      setActiveTab('home');
    } else if (activeTab === 'register') {
      setActiveTab('login');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen font-sans selection:bg-orange-100">
      <AnimatePresence mode="wait">
        {activeTab === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <HomeView onGoToVIP={handleGoToVIP} onGoToDetail={handleGoToDetail} />
          </motion.div>
        )}
        {activeTab === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ProfileView onGoToVIP={handleGoToVIP} onGoToRecharge={handleGoToRecharge} onGoToLogin={handleGoToLogin} />
          </motion.div>
        )}
        {activeTab === 'vip' && (
          <motion.div
            key="vip"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto"
          >
            <VIPCenterView onBack={handleBack} />
          </motion.div>
        )}
        {activeTab === 'detail' && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto"
          >
            <DetailView onBack={handleBack} onShowPayment={() => setIsPaymentOpen(true)} />
          </motion.div>
        )}
        {activeTab === 'recharge' && (
          <motion.div
            key="recharge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto"
          >
            <RechargeView onBack={handleBack} />
          </motion.div>
        )}
        {activeTab === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto"
          >
            <LoginView onBack={handleBack} onGoToRegister={handleGoToRegister} />
          </motion.div>
        )}
        {activeTab === 'register' && (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto"
          >
            <RegisterView onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>

      {['home', 'profile'].includes(activeTab) && (
        <BottomNav activeTab={activeTab as any} onTabChange={setActiveTab} />
      )}

      <PaymentModal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} />
    </div>
  );
}
