# Git Commit

## 概览

如果您想直接进行环境配置请点击如下链接：
[开发环境配置](/zh-cn/git/commit?id=开发环境配置)

### 目的
- 帮助我们生成Release Note
- 方便关联代码提交者、Commit以及所对应的Issue之间的关系
- 方便后期回溯代码

## 提交规范
当前代码规范参考了由[Angluar团队Commit规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)衍生的[Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/)。

Commit消息格式如下：
```
<类型>[(任务编号或范围说明（可选）)]: <描述>

[消息体（可选）]

[脚注（可选）]
```

示例1：常用提交消息，任务编号
```
feat(#JGRW-224): 新增项目通用图片上传功能
```
示例2：常用提交消息，范围说明
```
feat(router): 调整项目页面路径
```
示例3：完整的提交消息：
```
feat(#JGRW-224): 新增项目通用图片上传功能

包装项目图片上传，实现图片文件大小、尺寸大小限制，上传图片预览格式化。

BREAKING CHANGE: 增加图片上传功能，优化多语言设置
    
修正#1234, #2345, 关闭 #4567
```

**类型**：

提交类型一般有一下几种，可根据需求进行扩展
- WIP 工作中的提交（未完成的提交）
- feat 新功能(feature)
- fix 修补bug
- docs 文档
- test 测试
- chore 杂项 （构建工具、辅助工具的变动）
- refactor 重构（代码优化，不影响功能）
- style 代码风格调整（不影响代码功能）
- perf 性能优化
- revert 撤销提交

**任务编号（可选）**：

任务编号一般为JIRA中任务编号（如：#JGRW-224），此编号将在生成changelog时作为链接生成参数。

虽然提倡根据JIRA进行Commit，但不一是强制的。你也可以在这里提供此次修改的范围，比如: route, component, utils, build等等。


**描述**

当前提交概述。

**消息体（可选）**

提交具体修改内容, 可以分为多行

**脚注（可选）**

一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.

## 环境配置

我们可以通过工具生成和约束我们的规范。

- [Commitizen - Commit提交工具](https://github.com/commitizen/cz-cli)：我们借助它提供的 git cz 命令替代我们的 git commit 命令, 帮助我们生成符合规范的 commit message.
- [cz-customizable](https://github.com/leonardoanalista/cz-customizable):一个自定义提交规范的设定，使得commitizen 按照我们指定的规范帮助我们生成 commit message.
- [Commitlint: 校验你的 message](https://github.com/conventional-changelog/commitlint):可以帮助我们 lint commit messages, 如果我们提交的不符合指定的规范, 则拒绝提交.
- [Husky - 提交钩子](https://github.com/typicode/husky):用于为git commit增加钩子，在提交commit时验证commit正确性。
- [standard-version](https://github.com/conventional-changelog/standard-version):用于生成changelog及提交release

#### 开发环境配置
项目根目录下执行
```bash
npm install -D commitizen cz-customizable @commitlint/config-conventional husky @commitlint/cli conventional-changelog-cli standard-version
```

package.json中配置:
```json
{
  "script": {
    ...,
    "commit": "git-cz",
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0",
    "release": "standard-version"
  },
  "devDependencies": {
    ...
    "@commitlint/cli": "^8.3.5",
    "@commitlint/config-conventional": "^8.3.4",
    "commitizen": "^4.1.2",
    "conventional-changelog-cli": "^2.0.34",
    "cz-customizable": "^3.2.0",
    "husky": "^4.2.5",
    "standard-version": "^8.0.0",
    ...
  },
  "repository" : 
  {
    "type" : "git",
    "url" : "http://git.ztosys.com/FinanceInformation/finance-web.git" 
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-customizable"
    }
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -e $GIT_PARAMS"
    }
  }
}
```
根目录下新建文件 .cz-config.js (提交配置) :
```js
module.exports = {
  types: [
    {
      value: 'WIP',
      name : 'WIP: 工作中的提交'
    },
    {
      value: 'feat',
      name : 'feat: 新特性'
    },
    {
      value: 'fix',
      name : 'fix: 修补bug'
    },
    {
      value: 'docs',
      name : 'docs: 文档'
    },
    {
      value: 'refactor',
      name : 'refactor: 重构（代码优化，不影响功能）'
    },
    {
      value: 'test',
      name : 'test: 测试'
    },
    {
      value: 'chore',
      name : 'chore: 杂项 （构建工具、辅助工具的变动）'
    },
    {
      value: 'style',
      name : 'style: 代码风格调整 (如：空格，格式，分号等等)'
    },
    {
      value: 'pref',
      name : 'revert: 性能优化'
    },
    {
      value: 'revert',
      name : 'revert: 撤销提交'
    }
  ],

  messages: {
    type: '请选择本次提交的类型:',
    scope: '\n请设置本次提交的任务ID或范围 (可选，E.g.:#JGRW-123,router):',
    // used if allowCustomScopes is true
    customScope: '请设置本次提交的任务ID或范围 (可选，E.g.:#JGRW-123,router):',
    subject: '请设置当前提交的简短描述:\n',
    body: '请设置当前提交的详细描述(可选). 使用 "|" 换行:\n',
    breaking: '列出任意BREAKING CHANGES (可选):\n',
    footer: '列出完成的任务ID(可选，E.g.: #JGRW-123, #JGRW-234):\n',
    confirmCommit: '确认提交?'
  },

  scopes: [],
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],

  // 限制subject长度
  subjectLimit: 100
}
```

根目录下新建文件commitlint.config.js (lint配置) :
```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'WIP', 'feat', 'fix', 'docs', 'test', 'chore', 'refactor', 'style', 'perf', 'revert'
     ]],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0, 'never'],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72]
  }
};
```

根目录下新建文件 .versionrc.js (changelog配置):
```js
module.exports = {
  "commitUrlFormat": "{{host}}/{{owner}}/{{repository}}/commit/{{hash}}",
  "issueUrlFormat": "http://jira.dev.ztosys.com/browse/{{hash}}",
  "types": [
    {"type": "feat", "section": "Features"},
    {"type": "fix", "section": "Bug Fixes"},
    {"type": "test", "section": "Tests", "hidden": true},
    {"type": "build", "section": "Build System", "hidden": true},
    {"type": "ci", "hidden":true}
  ]
}
```

安装配置好之后，可以通过npx git cz 或者 npm run commit执行提交:
```sh
# 提交代码1
npx git-cz

# 提交代码2
npm run commit

# 如果使用yarn
yarn commit

# 生成changelog(只对master分支有效)
npm run changelog
```

## Git 流程

```
# 1. 克隆项目
git clone git@git.ztosys.com:<project-name>/<repository-name>.git

# 2. 如果本地没有YYYY_MM_DD分支则新建发布分支，规则参考 git 使用规范
#    如果本地有YYYY_MM_DD分支，直接跳转到步骤3
git checkout -b YYYY_MM_DD

# 3. 按分支规格新建分支
git checkout -b <username-abbr>_YYYY_MM_DD

# 4. ... 开始编码 ...

# 5. 提交前拉取最新代码
git pull

# 6. 将变更提交到staging区
git add .

# 7. 按commit规则提交commit
npx git-cz

# 8. merge分支
git merge YYYY_MM_DD

# 9. 解冲突...

# 10. 再次提交
git pull
git add .
git commit --amend --no-edit
git push

# 11. ...创建 push request 并且review...

# 12. review不通过，则继续修改代码，并跳回到步骤10执行提交，通过则进入步骤13
git commit --amend --no-edit
git push

# 13. gitlab中直接merge

```
参考：
-  [git 使用规范](/zh-cn/git/index)


## Git 命令

下面是几个git有用的命令：

#### git commit
```sh
# 可以使用git-cz提交代码
npx git-cz

# 使用npm run commit提交代码，效果同上
npm run commit

# 提交新的代码，并将commit并入上一次修改
git commit --amend --no-edit
```

#### git reset
一般用在合并commit的时候
```
# 将缓冲区提交代码撤回
git reset

# 将提交测绘到上一步
git reset HEAD~1

# 将提交测绘到上n不（n为数字）
git reset HEAD~n
```

#### git reflog
在执行reset或者revert时，可能会使一些分支从分支树丢失，通过此命令找回丢失的commit
```
# 查看丢失分支
git reflog

# 切换到目标分支
git reset HEAD@{n}
```

#### git cherrypick
就是将指定的提交（commit）应用于其他分支。
```
# 将一个提交应用到当前编辑
git cherry-pick <commit-hash>

# 将多个提交同时应用到当前编辑
git cherry-pick <commit-hash1>...<<commit-hashn>

# 当代码有冲突是需要解冲突，并执行如下命令
git cherry-pick --continue
```
参考：
- [git cherry-pick 教程](http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)

#### git rebase
git rebase允许我们改变分支的提交历史，可以合并代码，合并已有提交，功能十分强大

参考：
- [Rewriting Git History - Amend, Reword, Delete, Reorder, Squash and Split ](https://www.youtube.com/watch?v=ElRzTuYln0M)（需要科学上网）


### 参考：
- [工作流一目了然，看小姐姐用动图展示10大Git命令](https://cloud.tencent.com/developer/article/1616640)


