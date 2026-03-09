---
title: "Commit Skill"
category: "skills"
stages: ["coding"]
---

# Commit Skill

## 基本信息

| 字段 | 值 |
|------|-----|
| 类型 | Cursor Agent Skill |
| 触发方式 | 用户说"提交代码"/"commit"/"帮我提交" |
| 适用阶段 | 编码 |
| 核心能力 | 分析代码变更 → 生成 commit 描述 → 执行提交 → 记录日志 |

## 工作流程

1. 分析 `git diff` 中的所有代码变更
2. 按功能模块对变更进行分组
3. 生成规范化的 commit message（中文）
4. 执行 `git add` 和 `git commit`
5. 将变更详情追加到 COMMIT-LOG.md

## 使用示例

直接对 Cursor Agent 说："帮我提交代码"，Skill 会自动完成全部流程。
