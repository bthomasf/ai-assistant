---
title: "Cursor"
category: "ide-plugins"
stages: ["coding", "review", "debug"]
url: "https://cursor.com"
---

# Cursor

## 基本信息

| 字段 | 值 |
|------|-----|
| 类型 | AI-first 代码编辑器 |
| 基础 | VS Code fork |
| 内置模型 | Claude、GPT-4o、自定义模型 |
| 适用阶段 | 编码、审查、重构、排查 |
| 核心优势 | Agent 模式可自主完成多步骤任务 |

## 核心能力

- **Tab 补全**：上下文感知的智能代码补全
- **Cmd+K 编辑**：选中代码后用自然语言描述修改意图
- **Chat 对话**：基于项目上下文的 AI 对话
- **Agent 模式**：自主执行多步骤编码任务，可调用终端和工具
- **MCP 集成**：连接外部工具扩展 AI 能力

## 最佳实践场景

| 场景 | 用法 | 效果 |
|------|------|------|
| 批量重构 | Agent 模式 + 明确规则 | 自动完成跨文件修改 |
| 代码审查 | 选中 diff 用 Chat 分析 | 快速发现潜在问题 |
| 新功能开发 | Agent 模式描述需求 | 自动生成完整功能代码 |

## 推荐配置

- 启用 Agent 模式（Composer Agent）
- 配置 MCP 服务（GitLab、Sourcegraph 等）
- 设置 .cursorrules 项目级规则
- 开启自动索引（codebase indexing）

## 常用 Prompt

```
作为 Java 后端开发者，请帮我实现以下功能。要求使用 Spring Boot + MyBatis-Plus，
遵循项目现有的代码风格和分层架构：
[描述需求]
```
