---
title: "Code Review Skill"
category: "skills"
stages: ["review"]
---

# Code Review Skill

## 基本信息

| 字段 | 值 |
|------|-----|
| 类型 | Cursor Agent Skill |
| 触发方式 | 用户说"审查代码"/"review"/"帮我 CR" |
| 适用阶段 | 代码审查 |
| 核心能力 | 审查 git diff → 检测问题 → 生成审查报告 |

## 检测范围

- 逻辑错误和潜在 bug
- 无用代码和冗余逻辑
- 安全隐患（SQL 注入、XSS 等）
- 性能问题（N+1 查询、内存泄漏等）
- 代码规范违反

## 使用示例

对 Cursor Agent 说："帮我审查当前的代码变更"，Skill 会分析 git diff 并生成结构化的审查报告。
