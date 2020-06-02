# 关于Git

## 关于GitFlow
- 是一组版本控制的指导原则
- 主要是关于分支模型
- 并不是规范，是一套指导原则
![Image from alias](~@assets/git/git-flow-nvie.png)

参考：
- [抛弃 Git Flow 的 8 大理由](https://tech.sina.com.cn/roll/2020-03-20/doc-iimxxsth0618703.shtml)
- [基于git的源代码管理模型——git flow](https://www.ituring.com.cn/article/56870)

## 关于Commit规范
#### 目的
- 加快Reviewing Code的过程
- 帮助我们写好Release Note (Changelog)
- 快速追踪分支及commit
- 方便确认代码提交者及commit（git blame）
- 我们可以通过commit来回溯项目
  - [一次优秀的代码提交应该包含什么?](https://kb.cnblogs.com/page/181762/)

#### Angluar团队的提交代码方式
提交格式：
```
<类型>[可选的作用域]: <描述>

[可选的正文]

[可选的脚注]
```

type类型：
- feat 新功能(feature)
- fix 修补bug
- docs 文档
- style  格式调整（不影响代码功能）
- refactor 重构（代码优化，不影响功能）
- test 测试
- chore 杂项 （构建工具、辅助工具的变动）
- perf 性能优化

示例：git commit -m 'fix(#1234): 修复XXX'

参考：
- [Conventional Commits](https://www.conventionalcommits.org/zh-hans/v1.0.0-beta.4/)

#### 工具
- Commitizen - Commit提交工具
  - [如何优雅的管理你的commit？](https://zhuanlan.zhihu.com/p/78668900)
- Commitlint - Commit规范提示
  - [commitlint](https://segmentfault.com/a/1190000017790694)
  - [commitizen官网](https://commitlint.js.org/)
- Husky - 提交钩子
  - [git commit前检测husky与pre-commit](https://segmentfault.com/a/1190000015953265)

*总结：既然我们写commit了，就尽可能发挥他的价值，其实就是随手的事*

### 一次优秀的代码提交应该包含什么
- 每次提交只做一个修改
- 每次提交要包含完整修改
- 写好注释，说明你修改了什么
- 注释说明为什么做这个修改
- 不要提交被注释掉的代码

参考：
- [一次优秀的代码提交应该包含什么?](https://kb.cnblogs.com/page/181762/)
- [Why you should not use (long-lived) feature branches](https://www.freecodecamp.org/news/why-you-should-not-use-feature-branches-a86950126124/)
- [《一个成功的Git分支模型》为什么是有害的](https://www.jianshu.com/p/748e4892871a)

## 其他

### git merge的原理
问题：
- git merge 是用时间先后决定merge结果的，后面会覆盖前面的?
- git merge 只要两行不相同就一定会报冲突，叫人工解决?
- Git 是如何进行合并的？
- 我们提交代码到主干发生冲突怎么办？

[Git Merge 原理](https://blog.csdn.net/u012937029/article/details/77161584)

### merge vs rebase

### reset vs revert

### cherrypick

### git tag
为了方便后期回溯，一般会在软件发布后打tag
- [git打tag](https://www.jianshu.com/p/cdd80dd15593)

### git blame