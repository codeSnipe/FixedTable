#组件引用方式
参考demo.<br><br><br><br>
配置参数：
# hasFilterHead
是否开始过滤功能,默认为false
#showHideFilterBtn
是否显示折叠过滤项的按钮，默认为true
#sort
是否支持排序，默认为true
#sortFunction
点击排序列头的回调函数，只有当sort为true时有效。返回值为{sortField:field,sortStatus:1},sortStatus:升序为1，降序为0.
#maxHeight
列表的最大高度，默认为400.
#lockRow
设置锁定行数，默认锁定头(默认锁定1行)
#lockLine
设置锁定列，默认不锁定（0）
#head
列表头部配置信息：<br>
[{headTitle:"a",dataField:"test1"},<br>
{headTitle:"b",dataField:"test2"},<br>
{headTitle:"c",dataField:"test3"}
]
#data
列表数据配置，按照head参数配置来设置对应数据
[{a:"1",b:"2",c:"3"},<br>
{a:"1",b:"2",c:"3"}]