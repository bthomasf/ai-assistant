#!/bin/bash
# 快速创建案例文件
# 用法: bash scripts/new-case.sh <阶段简写> <简要描述>
# 示例: bash scripts/new-case.sh coding cursor-agent-refactor

STAGE=${1:?"用法: $0 <阶段简写> <简要描述>"}
DESC=${2:?"用法: $0 <阶段简写> <简要描述>"}

DATE=$(date +%Y-%m-%d)
YEAR=$(date +%Y)
MONTH=$(date +%m)

DIR="cases/${YEAR}/${MONTH}"
FILE="${DIR}/${DATE}_${STAGE}_${DESC}.md"

STAGE_MAP=(
    "design:需求分析与方案设计"
    "coding:编码开发"
    "review:代码审查"
    "test:测试与质量保障"
    "deploy:部署与运维"
    "doc:文档与知识管理"
    "debug:问题排查与故障处理"
    "learn:学习与技能提升"
)

STAGE_NAME=""
for entry in "${STAGE_MAP[@]}"; do
    key="${entry%%:*}"
    value="${entry#*:}"
    if [ "$key" = "$STAGE" ]; then
        STAGE_NAME="$value"
        break
    fi
done

if [ -z "$STAGE_NAME" ]; then
    echo "错误：未知的阶段简写 '$STAGE'"
    echo "可用值：design, coding, review, test, deploy, doc, debug, learn"
    exit 1
fi

mkdir -p "$DIR"

cat > "$FILE" << EOF
---
title: "${DESC}"
date: ${DATE}
stage: "${STAGE}"
tools: []
difficulty: 3
duration: ""
tags: []
---

# ${DESC}

## 基本信息

| 字段 | 值 |
|------|-----|
| 日期 | ${DATE} |
| 工作阶段 | ${STAGE_NAME} |
| 使用工具 |  |
| 难度评级 | ★★★☆☆ |
| 耗时 |  |

## 场景描述

> 遇到了什么问题 / 要完成什么任务？

## AI 协助过程

> 使用了哪些 AI 工具？怎么用的？关键 Prompt 是什么？

## 最终结果

> 产出了什么？效果如何？

## 经验总结

> 学到了什么？下次可以怎么优化？

## 关联标签

\`#${STAGE}\`
EOF

echo "案例文件已创建: $FILE"
