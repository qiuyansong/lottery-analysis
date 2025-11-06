import { useState, useMemo } from 'react';
import Header from './components/Header';
import LatestDraws from './components/LatestDraws';
import StatisticsPanel from './components/StatisticsPanel';
import FrequencyChart from './components/FrequencyChart';
import TrendAnalysis from './components/TrendAnalysis';
import ComprehensiveStats from './components/ComprehensiveStats';
import RecommendationPanel from './components/RecommendationPanel';
import { LotteryType } from './types';
import { daletouData } from './data/daletou';
import { shuangseqiuData } from './data/shuangseqiu';
import { analyzeDaletou, analyzeShuangseqiu } from './utils/analysis';
import { generateDaletouRecommendations, generateShuangseqiuRecommendations } from './utils/recommendation';

function App() {
  const [currentType, setCurrentType] = useState<LotteryType>('daletou');
  const [refreshKey, setRefreshKey] = useState(0);

  // 获取当前彩票数据
  const currentData = currentType === 'daletou' ? daletouData : shuangseqiuData;

  // 分析红球数据
  const redAnalysis = useMemo(() => {
    if (currentType === 'daletou') {
      return analyzeDaletou(daletouData, 'red');
    } else {
      return analyzeShuangseqiu(shuangseqiuData, 'red');
    }
  }, [currentType]);

  // 分析蓝球数据
  const blueAnalysis = useMemo(() => {
    if (currentType === 'daletou') {
      return analyzeDaletou(daletouData, 'blue');
    } else {
      return analyzeShuangseqiu(shuangseqiuData, 'blue');
    }
  }, [currentType]);

  // 生成所有红球号码统计数据
  const allRedStats = useMemo(() => {
    const maxNumber = currentType === 'daletou' ? 35 : 33;
    const stats = [];
    for (let i = 1; i <= maxNumber; i++) {
      const count = redAnalysis.frequencyMap.get(i) || 0;
      stats.push({
        number: i,
        count,
        percentage: (count / redAnalysis.totalRecords) * 100,
      });
    }
    return stats;
  }, [currentType, redAnalysis]);

  // 生成所有蓝球号码统计数据
  const allBlueStats = useMemo(() => {
    const maxNumber = currentType === 'daletou' ? 12 : 16;
    const stats = [];
    for (let i = 1; i <= maxNumber; i++) {
      const count = blueAnalysis.frequencyMap.get(i) || 0;
      stats.push({
        number: i,
        count,
        percentage: (count / blueAnalysis.totalRecords) * 100,
      });
    }
    return stats;
  }, [currentType, blueAnalysis]);

  // 生成推荐号码
  const recommendations = useMemo(() => {
    if (currentType === 'daletou') {
      return generateDaletouRecommendations(
        redAnalysis.hotNumbers,
        redAnalysis.coldNumbers,
        blueAnalysis.hotNumbers,
        blueAnalysis.coldNumbers,
        daletouData
      );
    } else {
      return generateShuangseqiuRecommendations(
        redAnalysis.hotNumbers,
        redAnalysis.coldNumbers,
        blueAnalysis.hotNumbers,
        blueAnalysis.coldNumbers,
        shuangseqiuData
      );
    }
  }, [currentType, redAnalysis, blueAnalysis, refreshKey]);

  // 重新生成推荐
  const handleRefreshRecommendations = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header currentType={currentType} onTypeChange={setCurrentType} />
      
      <main className="container mx-auto px-4 py-8">
        {/* 标题信息 */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {currentType === 'daletou' ? '大乐透' : '双色球'}数据分析
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            基于最近 {currentData.length} 期历史数据的专业分析
          </p>
        </div>

        {/* 布局：左侧最新开奖，右侧统计面板 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <LatestDraws type={currentType} records={currentData} />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <StatisticsPanel
              title="红球号码统计"
              hotNumbers={redAnalysis.hotNumbers}
              coldNumbers={redAnalysis.coldNumbers}
              ballType="red"
            />
          </div>
        </div>

        {/* 蓝球统计 */}
        <div className="mb-8">
          <StatisticsPanel
            title="蓝球号码统计"
            hotNumbers={blueAnalysis.hotNumbers}
            coldNumbers={blueAnalysis.coldNumbers}
            ballType="blue"
          />
        </div>

        {/* 智能推荐号码 */}
        <div className="mb-8">
          <RecommendationPanel
            type={currentType}
            recommendations={recommendations}
            onRefresh={handleRefreshRecommendations}
          />
        </div>

        {/* 频率图表 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <FrequencyChart
            title="红球号码频率分布"
            data={allRedStats}
            ballType="red"
          />
          <FrequencyChart
            title="蓝球号码频率分布"
            data={allBlueStats}
            ballType="blue"
          />
        </div>

        {/* 趋势分析 */}
        <div className="mb-8">
          <TrendAnalysis type={currentType} records={currentData} />
        </div>

        {/* 综合统计 */}
        <div className="mb-8">
          <ComprehensiveStats type={currentType} records={currentData} />
        </div>

        {/* 页脚提示 */}
        <div className="mt-12 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h3 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">⚠️ 免责声明</h3>
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            本平台仅提供历史数据统计和分析，所有数据仅供参考学习使用。
            彩票开奖具有随机性，历史数据不代表未来趋势。请理性购彩，量力而行。
          </p>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            彩票数据分析平台 &copy; 2023 | 专业的历史数据统计工具
          </p>
          <p className="text-xs text-gray-400 mt-2">
            技术栈：React + TypeScript + Vite + Tailwind CSS + Recharts
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

