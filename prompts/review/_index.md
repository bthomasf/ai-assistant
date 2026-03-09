---
title: "代码审查 Prompt"
stage: "review"
---

# 代码审查 Prompt

### 全面代码审查
```
请审查以下代码变更，从以下维度给出建议：
1. 逻辑正确性：是否有 bug 或边界条件遗漏
2. 性能：是否有 N+1 查询、不必要的循环等
3. 安全：是否有注入、越权等风险
4. 可读性：命名、注释、代码结构
5. 规范：是否符合 Java 编码规范

[粘贴代码 diff]
```

### Commit Message 生成
```
请根据以下代码变更生成规范的 commit message：
格式：<type>(<scope>): <subject>
type: feat/fix/refactor/docs/test/chore
用中文描述

变更内容：[粘贴 diff 或描述]
```
