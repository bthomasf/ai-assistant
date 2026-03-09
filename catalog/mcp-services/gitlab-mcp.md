---
title: "GitLab MCP"
category: "mcp-services"
stages: ["coding", "review"]
---

# GitLab MCP

## 基本信息

| 字段 | 值 |
|------|-----|
| 类型 | MCP Server |
| 能力 | 搜索代码/仓库、管理 MR、查看项目详情 |
| 适用阶段 | 编码、审查 |
| 集成方式 | Cursor MCP 配置 |

## 核心能力

- **代码搜索**：跨仓库搜索代码片段和文件
- **仓库搜索**：根据关键词查找 GitLab 项目
- **MR 管理**：查看、创建、更新 Merge Request
- **代码变更查看**：获取 MR 的 diff 详情

## 典型用法

| 场景 | 操作 | 效果 |
|------|------|------|
| 查找参考实现 | "搜索项目中 Redis 分布式锁的实现" | 快速定位已有代码 |
| 代码审查 | "查看 MR #123 的变更内容" | AI 分析 diff |
| 重构前调研 | "搜索所有使用 OldService 的代码" | 评估影响范围 |

## 配置方式

在 Cursor 的 MCP 设置中添加 GitLab MCP Server 配置，需要提供 GitLab Token 和 API 地址。
