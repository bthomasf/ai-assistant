#!/bin/bash
# 生成案例索引文件
# 用法: bash scripts/gen-index.sh

INDEX_FILE="cases/_index.md"

TOTAL=$(find cases -name "*.md" ! -name "_*" | wc -l | tr -d ' ')

STAGES=("design" "coding" "review" "test" "deploy" "doc" "debug" "learn")
STAGE_NAMES=("需求分析与方案设计" "编码开发" "代码审查" "测试与质量保障" "部署与运维" "文档与知识管理" "问题排查与故障处理" "学习与技能提升")

COVERED=0
for stage in "${STAGES[@]}"; do
    count=$(find cases -name "*_${stage}_*" | wc -l | tr -d ' ')
    if [ "$count" -gt 0 ]; then
        COVERED=$((COVERED + 1))
    fi
done

cat > "$INDEX_FILE" << EOF
---
title: "案例索引"
updated: $(date +%Y-%m-%d)
---

# 案例索引

## 统计概览

| 维度 | 数量 |
|------|------|
| 总案例数 | ${TOTAL} |
| 覆盖阶段 | ${COVERED}/8 |

## 按阶段分类

EOF

for i in "${!STAGES[@]}"; do
    stage="${STAGES[$i]}"
    name="${STAGE_NAMES[$i]}"
    echo "### ${name} (${stage})" >> "$INDEX_FILE"
    echo "" >> "$INDEX_FILE"

    files=$(find cases -name "*_${stage}_*" -not -name "_*" | sort -r)
    if [ -z "$files" ]; then
        echo "_暂无案例_" >> "$INDEX_FILE"
    else
        while IFS= read -r file; do
            title=$(head -20 "$file" | grep "^title:" | sed 's/title: *"\(.*\)"/\1/' | sed "s/title: *'\(.*\)'/\1/")
            if [ -z "$title" ]; then
                title=$(basename "$file" .md)
            fi
            echo "- [${title}](${file#cases/})" >> "$INDEX_FILE"
        done <<< "$files"
    fi
    echo "" >> "$INDEX_FILE"
done

echo "索引文件已更新: $INDEX_FILE"
