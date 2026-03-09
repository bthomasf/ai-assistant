---
title: "编码开发 Prompt"
stage: "coding"
---

# 编码开发 Prompt

## 代码生成

### CRUD 全套生成
```
请基于以下表结构生成完整的 CRUD 代码：
1. Entity 实体类（Lombok + MyBatis-Plus 注解）
2. Mapper 接口
3. Service 接口和实现类
4. Controller（RESTful）
5. DTO（CreateReq / UpdateReq / QueryReq / Response 分离）
6. 参数校验注解

表结构 DDL：[粘贴]
```

### 复杂业务逻辑
```
请实现以下业务逻辑，要求：
1. 清晰的方法拆分
2. 完善的异常处理（使用 BizException）
3. 必要的日志记录
4. 事务注解（如需要）
5. 并发安全考虑

业务描述：[描述]
```

## SQL 相关

### 复杂查询编写
```
请编写满足以下需求的 SQL：
表结构：[粘贴 DDL]
查询需求：[描述]
要求：考虑性能，避免全表扫描
```

### SQL 优化
```
以下 SQL 在大数据量下执行较慢：
表数据量：[数量]
当前索引：[列出]
SQL：[粘贴]
EXPLAIN 结果：[粘贴]

请分析瓶颈并提供优化方案。
```
