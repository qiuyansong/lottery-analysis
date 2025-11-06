import { NumberStats, DaletouRecord, ShuangseqiuRecord } from '../types';

// 推荐号码组合
export interface RecommendedNumbers {
  id: number;
  strategy: string;
  redBalls: number[];
  blueBalls?: number[] | number;
  description: string;
}

// 生成大乐透推荐号码
export function generateDaletouRecommendations(
  redHot: NumberStats[],
  redCold: NumberStats[],
  blueHot: NumberStats[],
  blueCold: NumberStats[],
  recentRecords: DaletouRecord[]
): RecommendedNumbers[] {
  const recommendations: RecommendedNumbers[] = [];

  // 策略1: 热号为主（70%热号 + 30%温号）
  const strategy1Red = [
    ...selectNumbers(redHot.slice(0, 5), 3),
    ...selectNumbers(redHot.slice(5, 15), 2),
  ].sort((a, b) => a - b);
  const strategy1Blue = selectNumbers(blueHot.slice(0, 4), 2).sort((a, b) => a - b);
  
  recommendations.push({
    id: 1,
    strategy: '热号主导',
    redBalls: strategy1Red,
    blueBalls: strategy1Blue,
    description: '以近期高频号码为主，稳健型选择',
  });

  // 策略2: 冷号回补（50%冷号 + 50%热号）
  const strategy2Red = [
    ...selectNumbers(redCold.slice(0, 10), 2),
    ...selectNumbers(redHot.slice(0, 10), 3),
  ].sort((a, b) => a - b);
  const strategy2Blue = [
    selectNumbers(blueCold.slice(0, 5), 1)[0],
    selectNumbers(blueHot.slice(0, 5), 1)[0],
  ].sort((a, b) => a - b);
  
  recommendations.push({
    id: 2,
    strategy: '冷号回补',
    redBalls: strategy2Red,
    blueBalls: strategy2Blue,
    description: '冷号可能回补，热号保底，平衡型选择',
  });

  // 策略3: 奇偶均衡（保持3:2或2:3比例）
  const strategy3Red = generateBalancedNumbers(redHot, 35, 'oddEven');
  const strategy3Blue = selectNumbers(blueHot.slice(0, 6), 2).sort((a, b) => a - b);
  
  recommendations.push({
    id: 3,
    strategy: '奇偶均衡',
    redBalls: strategy3Red,
    blueBalls: strategy3Blue,
    description: '奇偶比例均衡，遵循历史规律',
  });

  // 策略4: 大小均衡（保持区域分布）
  const strategy4Red = generateBalancedNumbers(redHot, 35, 'size');
  const strategy4Blue = [
    ...selectNumbers(blueHot.slice(0, 6).filter(s => s.number <= 6), 1),
    ...selectNumbers(blueHot.slice(0, 6).filter(s => s.number > 6), 1),
  ].sort((a, b) => a - b);
  
  recommendations.push({
    id: 4,
    strategy: '大小均衡',
    redBalls: strategy4Red,
    blueBalls: strategy4Blue,
    description: '大小号码均衡分布，覆盖各区间',
  });

  // 策略5: 趋势跟随（分析最近3期的号码特征）
  const strategy5Red = generateTrendNumbers(recentRecords, redHot, redCold);
  const strategy5Blue = selectNumbers(
    [...blueHot.slice(0, 3), ...blueCold.slice(0, 2)],
    2
  ).sort((a, b) => a - b);
  
  recommendations.push({
    id: 5,
    strategy: '趋势跟随',
    redBalls: strategy5Red,
    blueBalls: strategy5Blue,
    description: '根据近期走势特征生成，跟随型选择',
  });

  return recommendations;
}

// 生成双色球推荐号码
export function generateShuangseqiuRecommendations(
  redHot: NumberStats[],
  redCold: NumberStats[],
  blueHot: NumberStats[],
  blueCold: NumberStats[],
  recentRecords: ShuangseqiuRecord[]
): RecommendedNumbers[] {
  const recommendations: RecommendedNumbers[] = [];

  // 策略1: 热号为主
  const strategy1Red = [
    ...selectNumbers(redHot.slice(0, 6), 4),
    ...selectNumbers(redHot.slice(6, 16), 2),
  ].sort((a, b) => a - b);
  const strategy1Blue = selectNumbers(blueHot.slice(0, 5), 1)[0];
  
  recommendations.push({
    id: 1,
    strategy: '热号主导',
    redBalls: strategy1Red,
    blueBalls: strategy1Blue,
    description: '以近期高频号码为主，稳健型选择',
  });

  // 策略2: 冷号回补
  const strategy2Red = [
    ...selectNumbers(redCold.slice(0, 10), 3),
    ...selectNumbers(redHot.slice(0, 10), 3),
  ].sort((a, b) => a - b);
  const strategy2Blue = selectNumbers(blueCold.slice(0, 5), 1)[0];
  
  recommendations.push({
    id: 2,
    strategy: '冷号回补',
    redBalls: strategy2Red,
    blueBalls: strategy2Blue,
    description: '冷号可能回补，热号保底，平衡型选择',
  });

  // 策略3: 奇偶均衡
  const strategy3Red = generateBalancedNumbers(redHot, 33, 'oddEven', 6);
  const strategy3Blue = selectNumbers(blueHot.slice(0, 6), 1)[0];
  
  recommendations.push({
    id: 3,
    strategy: '奇偶均衡',
    redBalls: strategy3Red,
    blueBalls: strategy3Blue,
    description: '奇偶比例均衡，遵循历史规律',
  });

  // 策略4: 大小均衡
  const strategy4Red = generateBalancedNumbers(redHot, 33, 'size', 6);
  const strategy4Blue = blueHot[Math.floor(Math.random() * Math.min(8, blueHot.length))].number;
  
  recommendations.push({
    id: 4,
    strategy: '大小均衡',
    redBalls: strategy4Red,
    blueBalls: strategy4Blue,
    description: '大小号码均衡分布，覆盖各区间',
  });

  // 策略5: 趋势跟随
  const strategy5Red = generateTrendNumbersShuangseqiu(recentRecords, redHot, redCold);
  const strategy5Blue = selectNumbers(
    [...blueHot.slice(0, 4), ...blueCold.slice(0, 3)],
    1
  )[0];
  
  recommendations.push({
    id: 5,
    strategy: '趋势跟随',
    redBalls: strategy5Red,
    blueBalls: strategy5Blue,
    description: '根据近期走势特征生成，跟随型选择',
  });

  return recommendations;
}

// 从统计数据中选择指定数量的号码
function selectNumbers(stats: NumberStats[], count: number): number[] {
  const shuffled = [...stats].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(s => s.number);
}

// 生成平衡的号码组合
function generateBalancedNumbers(
  hotStats: NumberStats[],
  maxNumber: number,
  balanceType: 'oddEven' | 'size',
  count: number = 5
): number[] {
  const numbers: number[] = [];
  const targetRatio = balanceType === 'oddEven' 
    ? { target1: Math.ceil(count / 2), target2: Math.floor(count / 2) }
    : { target1: Math.ceil(count / 2), target2: Math.floor(count / 2) };

  const availableHot = hotStats.slice(0, 15).map(s => s.number);
  
  let count1 = 0;
  let count2 = 0;

  // 先从热号中选择
  for (const num of availableHot) {
    if (numbers.length >= count) break;
    
    const isType1 = balanceType === 'oddEven' 
      ? num % 2 === 1 
      : num <= Math.ceil(maxNumber / 2);
    
    if (isType1 && count1 < targetRatio.target1) {
      numbers.push(num);
      count1++;
    } else if (!isType1 && count2 < targetRatio.target2) {
      numbers.push(num);
      count2++;
    }
  }

  // 如果还不够，随机补充
  while (numbers.length < count) {
    const randomNum = Math.floor(Math.random() * maxNumber) + 1;
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }

  return numbers.sort((a, b) => a - b);
}

// 根据趋势生成号码（大乐透）
function generateTrendNumbers(
  recentRecords: DaletouRecord[],
  hotStats: NumberStats[],
  coldStats: NumberStats[]
): number[] {
  const recent3 = recentRecords.slice(0, 3);
  const recentNumbers = new Set<number>();
  
  recent3.forEach(record => {
    record.redBalls.forEach(num => recentNumbers.add(num));
  });

  // 从最近出现的号码中选2个
  const recentArray = Array.from(recentNumbers);
  const fromRecent = selectRandomFromArray(recentArray, 2);
  
  // 从热号中选2个（排除已选的）
  const hotNumbers = hotStats.slice(0, 10)
    .map(s => s.number)
    .filter(n => !fromRecent.includes(n));
  const fromHot = selectRandomFromArray(hotNumbers, 2);
  
  // 从冷号中选1个
  const coldNumbers = coldStats.slice(0, 8).map(s => s.number);
  const fromCold = selectRandomFromArray(coldNumbers, 1);
  
  return [...fromRecent, ...fromHot, ...fromCold].sort((a, b) => a - b);
}

// 根据趋势生成号码（双色球）
function generateTrendNumbersShuangseqiu(
  recentRecords: ShuangseqiuRecord[],
  hotStats: NumberStats[],
  coldStats: NumberStats[]
): number[] {
  const recent3 = recentRecords.slice(0, 3);
  const recentNumbers = new Set<number>();
  
  recent3.forEach(record => {
    record.redBalls.forEach(num => recentNumbers.add(num));
  });

  const recentArray = Array.from(recentNumbers);
  const fromRecent = selectRandomFromArray(recentArray, 2);
  
  const hotNumbers = hotStats.slice(0, 10)
    .map(s => s.number)
    .filter(n => !fromRecent.includes(n));
  const fromHot = selectRandomFromArray(hotNumbers, 3);
  
  const coldNumbers = coldStats.slice(0, 8).map(s => s.number);
  const fromCold = selectRandomFromArray(coldNumbers, 1);
  
  return [...fromRecent, ...fromHot, ...fromCold].sort((a, b) => a - b);
}

// 从数组中随机选择指定数量的元素
function selectRandomFromArray(arr: number[], count: number): number[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, arr.length));
}

