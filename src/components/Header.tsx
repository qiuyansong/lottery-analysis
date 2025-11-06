import { BarChart3, TrendingUp } from 'lucide-react';
import { LotteryType } from '../types';

interface HeaderProps {
  currentType: LotteryType;
  onTypeChange: (type: LotteryType) => void;
}

export default function Header({ currentType, onTypeChange }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BarChart3 size={32} />
            <div>
              <h1 className="text-3xl font-bold">彩票数据分析平台</h1>
              <p className="text-purple-100 text-sm">专业的历史数据统计与趋势分析</p>
            </div>
          </div>
          <TrendingUp size={32} className="opacity-50" />
        </div>
        
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => onTypeChange('daletou')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              currentType === 'daletou'
                ? 'bg-white text-purple-600 shadow-lg scale-105'
                : 'bg-purple-500/30 hover:bg-purple-500/50'
            }`}
          >
            大乐透
          </button>
          <button
            onClick={() => onTypeChange('shuangseqiu')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              currentType === 'shuangseqiu'
                ? 'bg-white text-purple-600 shadow-lg scale-105'
                : 'bg-purple-500/30 hover:bg-purple-500/50'
            }`}
          >
            双色球
          </button>
        </div>
      </div>
    </header>
  );
}

