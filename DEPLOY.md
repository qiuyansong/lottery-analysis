# 📦 GitHub Pages 部署指南

## 🚀 快速部署步骤

### 1️⃣ 在GitHub上创建新仓库

1. 访问 [GitHub](https://github.com/)
2. 点击右上角的 "+" 号，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `lottery-analysis` (或其他名字)
   - **Description**: `彩票数据分析平台 - 大乐透 & 双色球`
   - **Public/Private**: 选择 Public（GitHub Pages需要）
   - **不要**勾选 "Initialize this repository with a README"
4. 点击 "Create repository"

### 2️⃣ 推送代码到GitHub

在项目目录下执行以下命令（将 `YOUR_USERNAME` 替换为你的GitHub用户名）：

```bash
cd /Users/jindundun/lottery-analysis

# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/lottery-analysis.git

# 推送代码
git push -u origin main
```

### 3️⃣ 配置GitHub Pages

1. 在GitHub仓库页面，点击 "Settings"（设置）
2. 在左侧菜单中找到 "Pages"
3. 在 "Build and deployment" 部分：
   - **Source**: 选择 "GitHub Actions"
4. 保存设置

### 4️⃣ 等待自动部署

- 代码推送后，GitHub Actions会自动开始构建和部署
- 可以在仓库的 "Actions" 标签页查看部署进度
- 部署成功后，网站将在 `https://YOUR_USERNAME.github.io/lottery-analysis/` 访问

## 🔍 部署状态检查

### 查看部署进度
1. 进入仓库页面
2. 点击 "Actions" 标签
3. 查看 "Deploy to GitHub Pages" 工作流
4. 绿色✅表示成功，红色❌表示失败

### 访问网站
部署成功后，访问：
```
https://YOUR_USERNAME.github.io/lottery-analysis/
```

## 🔄 更新代码

每次修改代码后，只需提交并推送：

```bash
# 添加更改
git add .

# 提交
git commit -m "你的提交信息"

# 推送
git push
```

推送后会自动触发重新部署。

## ⚠️ 常见问题

### Q1: 404 页面找不到？
**解决方案**：
- 确保在 Settings > Pages 中选择了 "GitHub Actions" 作为部署源
- 检查 Actions 标签页，确保部署工作流成功完成

### Q2: 页面样式丢失？
**解决方案**：
- 已在 `vite.config.ts` 中设置 `base: './'` 来解决路径问题
- 如果仍有问题，可以尝试设置为 `base: '/lottery-analysis/'`

### Q3: 推送代码时要求输入密码？
**解决方案**：
GitHub 已不支持密码认证，需要使用：
- **Personal Access Token (PAT)**：
  1. 访问 GitHub Settings > Developer settings > Personal access tokens
  2. 创建新token，勾选 `repo` 权限
  3. 使用token代替密码
- **SSH**：
  ```bash
  # 改用SSH方式
  git remote set-url origin git@github.com:YOUR_USERNAME/lottery-analysis.git
  ```

## 📝 配置文件说明

### `.github/workflows/deploy.yml`
- 自动化部署工作流
- 每次推送到 main 分支时自动触发
- 自动构建并部署到GitHub Pages

### `vite.config.ts`
- 已配置 `base: './'` 适配GitHub Pages
- 确保资源路径正确

## 🎉 部署完成后

你的彩票数据分析平台将可以通过以下方式访问：

- **在线访问**: `https://YOUR_USERNAME.github.io/lottery-analysis/`
- **本地开发**: `http://localhost:5173`

---

## 📞 需要帮助？

如果遇到问题，可以：
1. 查看 GitHub Actions 的日志
2. 检查 Settings > Pages 的配置
3. 确认仓库是 Public 类型

祝部署顺利！🚀

