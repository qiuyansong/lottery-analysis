// 彩票类型
export type LotteryType = 'daletou' | 'shuangseqiu';

// 大乐透开奖记录
export interface DaletouRecord {
  period: string; // 期号
  date: string; // 开奖日期
  redBalls: number[]; // 红球号码（5个，范围1-35）
  blueBalls: number[]; // 蓝球号码（2个，范围1-12）
}

// 双色球开奖记录
export interface ShuangseqiuRecord {
  period: string; // 期号
  date: string; // 开奖日期
  redBalls: number[]; // 红球号码（6个，范围1-33）
  blueBall: number; // 蓝球号码（1个，范围1-16）
}

// 号码统计信息
export interface NumberStats {
  number: number;
  count: number; // 出现次数
  percentage: number; // 出现百分比
  lastAppearPeriod?: string; // 最后出现期号
  avgGap?: number; // 平均间隔期数
}

// 分析结果
export interface AnalysisResult {
  hotNumbers: NumberStats[]; // 热号
  coldNumbers: NumberStats[]; // 冷号
  frequencyMap: Map<number, number>; // 频率映射
  totalRecords: number; // 总记录数
}

