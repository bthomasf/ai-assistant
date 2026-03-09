---
title: "部署与运维"
stage: "deploy"
order: 5
---

# 阶段五：部署与运维

## 阶段描述

从打包构建到线上部署与日常运维。AI 能帮助快速生成配置文件和排查部署问题。

## 典型任务

| 任务 | 说明 |
|------|------|
| CI/CD 配置 | 编写构建和部署流水线 |
| Docker/K8s 配置 | 容器化配置和编排 |
| 上线检查清单 | 发布前的检查项 |
| 监控告警配置 | 配置监控指标和告警规则 |

## 推荐 AI 工具

| 工具 | 用法 | 推荐度 |
|------|------|--------|
| ChatGPT | 生成 Dockerfile、K8s 配置 | ★★★★★ |
| Cursor Agent | 编写 CI/CD 脚本 | ★★★★☆ |
| Claude | 排查部署问题 | ★★★★☆ |

## 实用 Prompt 示例

### Dockerfile 生成
```
请为以下 Java Spring Boot 项目生成多阶段构建的 Dockerfile：
- JDK 版本：17
- 构建工具：Maven
- 需要时区设置为 Asia/Shanghai
- 健康检查端点：/actuator/health
```

## 关联案例

_待补充_
