# 彩票数据分析平台

一个现代化的彩票历史数据分析网站，支持大乐透和双色球的数据统计与可视化分析。

## 功能特点

- 📊 **数据可视化**：使用图表展示历史开奖趋势
- 🔢 **号码统计**：统计各号码出现频率、冷热分析
- 📈 **趋势分析**：分析号码走势和分布规律
- 🎯 **双彩票支持**：同时支持大乐透和双色球数据分析
- 💎 **现代UI**：采用Tailwind CSS构建的美观界面

## 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **UI样式**：Tailwind CSS
- **图表库**：Recharts
- **图标**：Lucide React

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
lottery-analysis/
├── src/
│   ├── components/        # React组件
│   ├── data/             # 数据文件和模拟数据
│   ├── types/            # TypeScript类型定义
│   ├── utils/            # 工具函数
│   ├── App.tsx           # 主应用组件
│   ├── main.tsx          # 应用入口
│   └── index.css         # 全局样式
├── public/               # 静态资源
├── index.html           # HTML模板
└── package.json         # 项目配置
```

## 数据说明

项目包含示例历史数据用于演示。实际使用时，可以：

1. 替换 `src/data/` 目录下的数据文件
2. 接入真实的彩票数据API
3. 导入CSV或JSON格式的历史数据

## 许可证

MIT

