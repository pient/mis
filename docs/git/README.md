## Git Flow

### 什么是GitFlow
- 是一组版本控制的指导原则
- 主要是关于分支模型
- 并不是规范，是一套指导原则

<img :src="$withBase('/assets/git/git-flow-nvie.png')" />

## 关于Commit
### Commit注释规范
#### 目的
- 加快Reviewing Code的过程
- 帮助我们写好Release Note
- 快速追踪分支及commit
- 方便确认代码提交者及commit（git blame）
- 提高项目质量

#### 示例
1. git commit -m '[<"type"> #<"issue number">]: ["Short summary of the change"].'

type类型：
- feat 新功能(feature)
- fix 修补bug
- docs 文档
- style  格式调整（不影响代码功能）
- refactor 重构（代码优化，不影响功能）
- test 测试
- chore 杂项 （构建工具、辅助工具的变动）
- perf 性能优化

2. git commit -m '[fix #1234]: 修复XXXbug'


## 其他

### git merge的原理


### merge vs rebase

### reset vs revert

### cherrypick

### git blame