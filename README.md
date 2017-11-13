# 正则
---------------------------------
### 字符组 (Character Class)
- 字符组 `[]`
> 在同一位置可能出现的各种字符    
```js
    /^[0-9]$/.test(2)               // true
    /^[0-3]678]$/.test(2)           // false
    /^[0-3]678]$/.test('2678]')     // true
    /^[0-3]678]$/.test('1678]')     // true
    /^[0-3]678]$/.test('3678]')     // true

```

- 排除型字符组 `[^...]`     
> 取反
```js
/^[0-9]$/.test(2)           // false
/^[0-9]$/.test('a')         // true
/^[^0-9][0-9]$/.test('a1')  // true


/^[^012]$/          // none of 0 1 2
/^[0^12]$/          // one of 0 '^' 1 2
```


- 字符组简记
```js
    // 常用简记

    /^\d$/ === /^[0-9]$/
    /^\D$/ === /^[^\d]$/ === /^[^0-9]$/

    /^\w$/ === /^[0-9a-zA-Z_]$/
    /^\W$/ === /^[^0-9a-zA-Z_]$/

    /^.$/            // 匹配出\n之外的任何字符
    /^[\d\D]$/       // 匹配任何字符

    \b        //单词边界    怎么用??
```


### 量词
- `{n}`     出现n次        
- `{m,n}`   出现m-n次(闭区间) *不可有空格`{m, n} {m ,n}`*  
- `{m,}`    至少出现m次      
- `{0,n}`   最多出现n次 可以不出现
```js
    /^\d\d\d$/ === /^\d{3}$/    
```

- 常用量词简记
```js
    * ==== {0,}     //出现任意次

    + === {1,}      // 至少出现1次

    ? === {0,1}     // 最多出现1次

    //例
    // 匹配美式英语和英式英语
    let regex = /^travell?er$/
    regex.test('traveller')    // true
    regex.test('traveler')     // true

    // 匹配http和https
    regex = /^https?$/
    regex.test('http')      // true
    regex.test('https')     // true

    // 匹配html标签
    regex = /^<[^>]+>$/
    regex.test('<img/>')    // true
    regex.test('<p/>')      // true
    regex.test('<div>')     // true
    regex.test('</>')       // true
```

- 懒惰量词(lazy quantifier)
> *在不确定是否要匹配的场合, 先尝试不匹配, 测试正则后面的元素, 如果失败, 在回来重新尝试匹配* 
```js
    *?
    +?
    ??
```

### 分组(grouping) `()`
> 将多个字符组包裹起来 作为一个整体

```js
    // 量词`{m,n}`表示匹配m-n次; 如何匹配m或n次
    // 匹配一个字符串中'a'出现3次或6次的情况
    /^a{3}(a{3})?$/

    // 匹配身份证号码 652823198909303719
    
    // 不能以0开头
    // 15位或18位
    // 18位最后一位可能会出现x

    // 匹配15位
    /^[1-9]\d{14}$/

    // 匹配18位
    /^[1-9]\d{16}[\dx]$/

    // 15位\18位都可匹配- 使用()分组作为一个整体出现?次
    /^[1-9]\d{14}(\d{2}[\dx])?$/

```

- 多选结构(alternative) `(...|...)`    
> 整个多选结构被视为单个元素 只要其中某个子表达式匹配成功, 整个多选结构就算匹配成功    
> *`|`两边不能有空格*    
```js
    // 改写身份证匹配
    /^[1-9](\d{14}|\d{17}[\dx])$/
```

- 反向引用
> *允许正则表达式内部引用之前的捕获**分组匹配**的文本*
```js
    // 只有分组才存在引用
    let regex =  /^(\d{4})-(\d{1,2})-(\d{1,2})$/
    regex.test('2014-3-15')
    console.log(RegExp.$1)      // '2014'
    console.log(RegExp.$2)      // '3'
    console.log(RegExp.$3)      // '15'


   // 匹配重复字母
   var regex = /([a-z])\1/      // \1 -> group=1
   regex.test('book')       // true
   regex.test('car')        // false
   regex.text('banana')     // false
   regex.test('food')       // true


   // 匹配html闭合标签'<div></div>'
   var regex = /<([^<]+)>.*?<\/\1>/
   var node = '<div>hello world<</div>'
   regex.test(node)     // true


   // 匹配html标签`<div class='title'>hello world</div>`
   var node = "<div class='title'>hello world</div>"
                // 不匹配空格  // 空格+非<
   var regex = /([a-zA-Z0-9]+)(\s[^<]+)?>.*<\/\1>/
   regex.test(node)     // true


   // 匹配AABB类词语
   var regex = /(\S)$1(\S)$2/
   var str1 = '红红火火',
       str2 = '朝朝暮暮',
       str3 = '长长久久';
   regex.test(str1)     // true    
   regex.test(str2)     // true
   regex.test(str3)     // true

   // 
   var regex = /(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)/
   var str = '123456789065' 

```

- match函数 `str.match(regexp)`    
>  返回一个包含了整个匹配结果以及任何括号捕获的匹配结果的 `Array` ；如果没有匹配项，则返回 `null`
```js
     // 匹配a标签
    var regex1 = /<a\s+href\s*=\s*['"]([^'"\s]+)['"]>([^<]+)<\/a>/g
    var str = '<a href="www.baidu.com">百度</a>'
    regex1.test(str)    //  true
    RegExp.$1   //  "www.baidu.com"
    RegExp.$2   //  "百度"
    str.match(regex1)   // ["<a href="www.baidu.com">百度</a>"]

    // 提取富文本中img标签的src属性
    var img = '<img src="http://mpic.tiankong.com/935/cce/935cce5611ee35530947666ef1201206/640.jpg"><img src="http://mpic.tiankong.com/93a/044/93a0449f72bffef31df4cca9017fa8af/640.jpg"><img src = "http://mpic.tiankong.com/0e8/9b0/0e89b0b5eb676ad004b103c0caeda066/640.jpg">'
    var regex2 = /http:\/\/([\w\.\/]+)+[^'"]/g
    img.match(regex2)   // ["http://mpic.tiankong.com/935/cce/935cce5611ee35530947666ef1201206/640.jpg", "http://mpic.tiankong.com/93a/044/93a0449f72bffef31df4cca9017fa8af/640.jpg", "http://mpic.tiankong.com/0e8/9b0/0e89b0b5eb676ad004b103c0caeda066/640.jpg"]

```

- replace函数 `str.replace(regexp, newSubStr)`    
> 返回替换后的string                  
>[str.replace(regexp, newSubStr)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
```js
    // 日期替换
    // 2012-10-31 ->  2012/10/31
    var str = '2012-10-31'
    var regex = /-/g
    str.replace(regex,'/')      // 2012/10/31

    // 手机号隐藏中间4位
    var tel = '15260435677'
    var regex = /(\d{3})\d{4}(\d{4})/
    tel.replace(regex,'$1****$2')   // 152****5677
```

### 断言 (assertion)   
> 不匹配文本, 只匹配某个位置(锚点)

- 单词边界(world boundary)  `\b`
```js
    var regex = /\brow\b/
    regex.test('tomorrow')   // false
    regex.test('brown')      // false
    regex.test('rowdy')      // false
    regex.test('row')        // true

    var regexB = /row\b/
    regexB.test('tomorrow')  // true
    regexB.test('brown')     // false
    regexB.test('rowdy')     // false
    regexB.test('row')       // true

    var Bregex = /\brow/
    regexB.test('tomorrow')  // false
    regexB.test('brown')     // false
    regexB.test('rowdy')     // true
    regexB.test('row')       // true
```

- 行起始/结束位置              
    - `^` 起始位置
    - `$` 结束位置
```js

```

- 环视



### 匹配模式
> 不区分大小写 单行模式 多行模式 注释模式

```js
    // 不区分大小写 `/regex/i`
    var regex1 = /iphone/i
    regex1.test('iphone')       // true
    regex1.test('IPHONE')       // true
    regex1.test('IphONe')       // true

    // 单行模式 *js不支持*

    // 多行模式 `/regex/m`
    

    
```
