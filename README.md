# AI-Assistant 个人 AI 助手知识库

> 一名开发工程师的 AI 能力百科全书

## 项目简介

本项目系统化整理日常工作中使用的各类 AI 能力，覆盖从需求分析到上线运维的完整工作生命周期。通过**分类 → 唤醒 → 协助 → 沉淀 → 可视化**的闭环，将零散的 AI 工具使用经验转化为可复用的知识资产。

## 核心特性

- **工作生命周期全覆盖**：8 个阶段（需求设计、编码、审查、测试、部署、文档、排查、学习）
- **AI 工具体系化分类**：平台类、IDE 集成类、MCP 服务类、Skills 能力类、Agent 自动化类
- **案例驱动沉淀**：每次有价值的 AI 协助都记录为可复用案例
- **高质量 Prompt 收集**：按阶段分类的实战 Prompt 库
- **可视化前端浏览**：React 单页应用，直观展示全部项目内容

## 目录结构

```
ai-assistant/
├── demand/          # 需求文档
├── catalog/         # AI 工具目录（按形态分类）
│   ├── platforms/   # AI 平台类
│   ├── ide-plugins/ # IDE 集成类
│   ├── mcp-services/# MCP 服务类
│   ├── skills/      # Skills 能力类
│   └── agents/      # Agent 自动化类
├── lifecycle/       # 工作生命周期指南（8 阶段）
├── cases/           # 实战案例沉淀
├── prompts/         # 高质量 Prompt 收集
├── scripts/         # 辅助脚本
├── web/             # 可视化前端工程
└── README.md
```

## 快速开始

### 查找工具

按工作阶段查找：浏览 `lifecycle/` 目录，选择当前阶段 → 查看推荐工具列表

按工具类型查找：浏览 `catalog/` 目录，选择工具分类 → 查看工具详情卡片

### 记录案例

```bash
# 使用脚本快速创建案例文件
bash scripts/new-case.sh coding "cursor-agent-refactor"
```

### 启动可视化前端

```bash
cd web
npm install
npm run dev
```

## 工作生命周期

| 阶段 | 目录 | 说明 |
|------|------|------|
| 需求分析与方案设计 | `lifecycle/01-design.md` | 需求理解、技术方案、表结构设计 |
| 编码开发 | `lifecycle/02-coding.md` | 业务编码、模板生成、SQL 优化 |
| 代码审查 | `lifecycle/03-review.md` | 自审、他审、规范检查 |
| 测试与质量保障 | `lifecycle/04-testing.md` | 单测、接口测试、覆盖率 |
| 部署与运维 | `lifecycle/05-deploy.md` | CI/CD、容器化、监控 |
| 文档与知识管理 | `lifecycle/06-docs.md` | API 文档、设计文档、会议纪要 |
| 问题排查与故障处理 | `lifecycle/07-debug.md` | 日志分析、性能排查、故障复盘 |
| 学习与技能提升 | `lifecycle/08-learning.md` | 技术调研、源码阅读、技术写作 |

## 版本规划

- **V1.0**（当前）：骨架搭建，核心文档和前端工程骨架
- **V1.5**：内容填充，全部工具卡片和生命周期文档
- **V2.0**：智能检索，全局搜索和智能推荐
- **V3.0**：自动化闭环，MCP 对接和团队协作

## 许可

本项目为个人知识管理工具，仅供学习参考。
