---
title: "部署与运维 Prompt"
stage: "deploy"
---

# 部署与运维 Prompt

### Dockerfile 生成
```
请为 Java Spring Boot 项目生成多阶段 Dockerfile：
- JDK：17
- 构建工具：Maven
- 时区：Asia/Shanghai
- 健康检查：/actuator/health
- JVM 参数：-Xms512m -Xmx1g
```

### K8s 部署配置
```
请生成 Kubernetes 部署配置（Deployment + Service + ConfigMap）：
- 应用名：[名称]
- 副本数：2
- 资源限制：CPU 1core / Memory 2Gi
- 健康检查配置
- 滚动更新策略
```
