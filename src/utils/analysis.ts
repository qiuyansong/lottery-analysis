import { DaletouRecord, ShuangseqiuRecord, NumberStats, AnalysisResult } from '../types';

// 分析大乐透数据
export function analyzeDaletou(records: DaletouRecord[], ballType: 'red' | 'blue'): AnalysisResult {
  const frequencyMap = new Map<number, number>();
  const lastAppearMap = new Map<number, string>();
  const maxNumber = ballType === 'red' ? 35 : 12;

  // 统计频率
  records.forEach((record) => {
    const balls = ballType === 'red' ? record.redBalls : record.blueBalls;
    balls.forEach((num) => {
      frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
      if (!lastAppearMap.has(num)) {
        lastAppearMap.set(num, record.period);
      }
    });
  });

  // 生成统计数据
  const stats: NumberStats[] = [];
  for (let i = 1; i <= maxNumber; i++) {
    const count = frequencyMap.get(i) || 0;
    stats.push({
      number: i,
      count,
      percentage: (count / records.length) * 100,
      lastAppearPeriod: lastAppearMap.get(i),
    });
  }

  // 排序获取热号和冷号
  const sorted = [...stats].sort((a, b) => b.count - a.count);
  const hotNumbers = sorted.slice(0, 10);
  const coldNumbers = sorted.slice(-10).reverse();

  return {
    hotNumbers,
    coldNumbers,
    frequencyMap,
    totalRecords: records.length,
  };
}

// 分析双色球数据
export function analyzeShuangseqiu(records: ShuangseqiuRecord[], ballType: 'red' | 'blue'): AnalysisResult {
  const frequencyMap = new Map<number, number>();
  const lastAppearMap = new Map<number, string>();
  const maxNumber = ballType === 'red' ? 33 : 16;

  // 统计频率
  records.forEach((record) => {
    if (ballType === 'red') {
      record.redBalls.forEach((num) => {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
        if (!lastAppearMap.has(num)) {
          lastAppearMap.set(num, record.period);
        }
      });
    } else {
      const num = record.blueBall;
      frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
      if (!lastAppearMap.has(num)) {
        lastAppearMap.set(num, record.period);
      }
    }
  });

  // 生成统计数据
  const stats: NumberStats[] = [];
  for (let i = 1; i <= maxNumber; i++) {
    const count = frequencyMap.get(i) || 0;
    stats.push({
      number: i,
      count,
      percentage: (count / records.length) * 100,
      lastAppearPeriod: lastAppearMap.get(i),
    });
  }

  // 排序获取热号和冷号
  const sorted = [...stats].sort((a, b) => b.count - a.count);
  const hotNumbers = sorted.slice(0, 10);
  const coldNumbers = sorted.slice(-10).reverse();

  return {
    hotNumbers,
    coldNumbers,
    frequencyMap,
    totalRecords: records.length,
  };
}

// 计算奇偶比
export function calculateOddEvenRatio(numbers: number[]): { odd: number; even: number } {
  let odd = 0;
  let even = 0;
  numbers.forEach((num) => {
    if (num % 2 === 0) even++;
    else odd++;
  });
  return { odd, even };
}

// 计算大小比（以中位数为界）
export function calculateSizeRatio(numbers: number[], maxNumber: number): { small: number; large: number } {
  const mid = Math.ceil(maxNumber / 2);
  let small = 0;
  let large = 0;
  numbers.forEach((num) => {
    if (num <= mid) small++;
    else large++;
  });
  return { small, large };
}

// 计算区间分布
export function calculateZoneDistribution(numbers: number[], maxNumber: number, zones: number = 5): number[] {
  const distribution = new Array(zones).fill(0);
  const zoneSize = Math.ceil(maxNumber / zones);
  
  numbers.forEach((num) => {
    const zone = Math.min(Math.floor((num - 1) / zoneSize), zones - 1);
    distribution[zone]++;
  });
  
  return distribution;
}

