// let str = '<img src="imgs/04.png"><img src="imgs/05.png"><img src="imgs/07.png">'
// let str2 = '0123"hello " 568'
// let regex = /([a-zA-Z]\w+)/g

// let res1 = regex.test(str)

// // let res2 = str.match(/[a-zA-Z]\w+/g)
// console.log(res1)
// console.log(RegExp.$1)


// let regex =  /^(\d{4})-(\d{1,2})-(\d{1,2})$/
// regex.test('2014-3-50')
// console.log(RegExp.$1)
// console.log(RegExp.$2)
// console.log(RegExp.$3)



// 匹配a标签
// var regex1 = /<a\s+href\s*=\s*['"]([^'"\s]+)['"]>([^<]+)<\/a>/
// let str = '<a href="www.baidu.com">百度</a>'
// regex1.test(str)    //  true
// RegExp.$1   //  "www.baidu.com"
// RegExp.$2   //  "百度"

// // 匹配img标签
// var regex2 = /<img\s+src\s*=\s*['"]http:\/\/[^'"\s]+['"](\/)?>/
// var img = '<img src = "http://mpic.tiankong.com/0e8/9b0/0e89b0b5eb676ad004b103c0caeda066/640.jpg">'
// regex2.test(img)    // true

// 提取img标签的src属性
var img = '<img src="http://mpic.tiankong.com/935/cce/935cce5611ee35530947666ef1201206/640.jpg"><img src="http://mpic.tiankong.com/93a/044/93a0449f72bffef31df4cca9017fa8af/640.jpg"><img src = "http://mpic.tiankong.com/0e8/9b0/0e89b0b5eb676ad004b103c0caeda066/640.jpg">'
var regex3 = /http:\/\/([\w\.\/]+)+[^'"]/g
var res = img.match(regex3)
console.log(res)