import { RecommendedNumbers } from '../utils/recommendation';
import { Lightbulb, RefreshCw } from 'lucide-react';

interface RecommendationPanelProps {
  type: 'daletou' | 'shuangseqiu';
  recommendations: RecommendedNumbers[];
  onRefresh: () => void;
}

export default function RecommendationPanel({ type, recommendations, onRefresh }: RecommendationPanelProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Lightbulb className="text-yellow-500 mr-3" size={28} />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              智能推荐号码
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              基于热冷号分析和历史走势生成的5组推荐方案
            </p>
          </div>
        </div>
        <button
          onClick={onRefresh}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
        >
          <RefreshCw size={18} />
          <span>重新生成</span>
        </button>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="border-2 border-purple-200 dark:border-purple-700 rounded-lg p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    方案 {rec.id}
                  </span>
                  <span className="text-lg font-bold text-purple-700 dark:text-purple-300">
                    {rec.strategy}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {rec.description}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-wrap gap-2">
              {/* 红球 */}
              {rec.redBalls.map((num, idx) => (
                <div key={`red-${idx}`} className="ball-red">
                  {num.toString().padStart(2, '0')}
                </div>
              ))}

              <span className="text-2xl text-gray-400 mx-2">+</span>

              {/* 蓝球 */}
              {type === 'daletou' ? (
                // 大乐透有2个蓝球
                Array.isArray(rec.blueBalls) && rec.blueBalls.map((num, idx) => (
                  <div key={`blue-${idx}`} className="ball-blue">
                    {num.toString().padStart(2, '0')}
                  </div>
                ))
              ) : (
                // 双色球有1个蓝球
                <div className="ball-blue">
                  {typeof rec.blueBalls === 'number' 
                    ? rec.blueBalls.toString().padStart(2, '0') 
                    : '00'}
                </div>
              )}
            </div>

            {/* 号码特征分析 */}
            <div className="mt-3 pt-3 border-t border-purple-200 dark:border-purple-700">
              <div className="flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-400">
                <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded">
                  奇偶: {rec.redBalls.filter(n => n % 2 === 1).length}:
                  {rec.redBalls.filter(n => n % 2 === 0).length}
                </span>
                <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded">
                  和值: {rec.redBalls.reduce((sum, n) => sum + n, 0)}
                </span>
                <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded">
                  跨度: {Math.max(...rec.redBalls) - Math.min(...rec.redBalls)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 温馨提示 */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">💡 使用建议</h4>
        <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
          <li>• <strong>热号主导</strong>：适合保守型玩家，跟随近期热门号码</li>
          <li>• <strong>冷号回补</strong>：适合激进型玩家，把握冷号回补机会</li>
          <li>• <strong>奇偶/大小均衡</strong>：遵循历史统计规律，中庸稳健</li>
          <li>• <strong>趋势跟随</strong>：基于最近走势，捕捉短期规律</li>
          <li>• 推荐号码仅供参考，请结合个人判断理性购彩</li>
        </ul>
      </div>
    </div>
  );
}

