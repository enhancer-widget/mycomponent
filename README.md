# 介绍
这是一个用于 [Enhancer](https://enhancerio) 平台的 demo 组件, 该组件会把用户配置的数据源里的数据渲染成一个列表, 并且会根据用户配置的字体大小来改变列表的字体大小, 当 用户点击列表的某一行时会触发  onRowClick 事件,
这个事件会提供 currentClickRowData 和 lastClickRowData 两个变量

# 可用变量

### currentClickRowData
- 【类型】object
- 【说明】用户当前点击行的数据
- 【示例】`{text: "apple", value: 1}`

### lastClickRowData
- 【类型】object
- 【说明】用户上一次点击行的数据
- 【示例】`{text: "pear", value: 2}`


# 可用事件

### 点击列表行 （On Row Click）
- 【事件 ID】onRowClick
- 【触发时机】用户点击了列表上的某一行 

# 安装 运行
```bash
git clone git@github.com:enhancer-widget/mycomponent.git
cd mycomponent
npm install --registry=https://registry.npm.taobao.org
npm start
```

在打开的配置页面上的数据源里填入下面的数据
```json
[{
	"text": "apple",
	"value": 1
}, {
	"text": "pear",
	"value": 2
}, {
	"text": "bala",
	"value": 3
}]
```

点击页面底部的 保存 按钮, 然后点击 预览 按钮查看效果

再回到配置页面 改变字体大小后 再 保存, 预览
