---
title: "使用 Cursor Agent 批量重构服务层代码"
date: 2026-03-09
stage: "coding"
tools: ["Cursor Agent", "GitLab MCP"]
difficulty: 3
duration: "45 分钟"
tags: ["重构", "批量操作", "服务层"]
---

# 使用 Cursor Agent 批量重构服务层代码

## 基本信息

| 字段 | 值 |
|------|-----|
| 日期 | 2026-03-09 |
| 工作阶段 | 编码开发 |
| 使用工具 | Cursor Agent + GitLab MCP |
| 难度评级 | ★★★☆☆ |
| 耗时 | 45 分钟 |

## 场景描述

项目中有 20+ 个 Service 类的异常处理方式不统一，部分直接 throw RuntimeException，部分用自定义异常但缺少错误码。需要批量重构为统一的 BizException + ErrorCode 模式。

## AI 协助过程

### 第一步：通过 GitLab MCP 搜索现有代码模式

使用 GitLab MCP 搜索项目中所有 throw RuntimeException 的位置，快速定位需要修改的文件列表。

### 第二步：让 Cursor Agent 理解重构目标

```
请将项目中所有 Service 层的异常处理重构为统一模式：
1. 将 throw new RuntimeException(...) 替换为 throw new BizException(ErrorCode.XXX, ...)
2. 根据异常场景自动推断合适的 ErrorCode 枚举值
3. 如果 ErrorCode 中没有合适的值，新增枚举常量
```

### 第三步：逐文件审查 Agent 的修改

Cursor Agent 自动完成了 23 个文件的修改，新增了 8 个 ErrorCode 枚举值。逐一审查确认无误。

## 最终结果

- 23 个 Service 文件完成异常处理统一
- ErrorCode 枚举新增 8 个业务错误码
- 全部修改通过编译和单元测试
- 整体耗时从预估的半天缩短到 45 分钟

## 经验总结

1. **先搜索再重构**：通过 MCP 先定位全部目标文件，比手动 grep 更高效
2. **明确重构规则**：给 Agent 的 Prompt 要写清楚具体的替换规则和边界条件
3. **分步执行**：让 Agent 逐文件操作比一次性全部修改更可控

## 关联标签

`#coding` `#cursor-agent` `#gitlab-mcp` `#重构` `#异常处理`
