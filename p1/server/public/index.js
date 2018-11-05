

var fun = {}; // * 方法集
var isTop = 1;  // * 是否在顶部

/**
 * todo 批量添加类名
 * @param {Array} arr iten is ID eg. "#id" or "id"
 * @param {String} className 
 */
fun.addClassById = function(arr, className){
    for(var i=0;i<arr.length;i++){
        var sel = arr[i][0]==="#"?arr[i]:'#'+arr[i];
        document.querySelector(sel).classList.add(className);
    }
}
fun.removeClassById = function(arr, className){
    for(var i=0;i<arr.length;i++){
        var sel = arr[i][0]==="#"?arr[i]:'#'+arr[i];
        document.querySelector(sel).classList.remove(className);
    }
}

/**
 * * 顶部底部bar方法
 */
function closeBar(){
    fun.removeClassById(['#topList', '#bottomList', '#main', '#btnGoTop'], 'on')
}
function openBar(){
    fun.addClassById(['#topList', '#bottomList', '#main', '#btnGoTop'], 'on')
}

/**
 * * 置顶方法
 * * 
 */
function goTop(){
    var el = document.querySelector(".content");
    // * 上滚效果
    var st =  el.scrollTop;
    var b = st / 50;
    var si = window.setInterval(function(){
        if(st<=0) window.clearInterval(si)
        else{
            st -= b;
            el.scrollTop = st;
        }
    }, 10)
}

/**
 * * 主函数
 */
function main(){
    var el = document.querySelector(".content")
    
    el.addEventListener('scroll', function(){
        
        if(!isTop && this.scrollTop<20){
            
            openBar()
            isTop = 1;
        }
        
    })

    // todo 获取日期数据客户端渲染
    getData("./getData?key=dateList", function(res){
        var list = JSON.parse(res).data;
        var htmlStr = '';
        var htmlArr = [ 
        '<li>',
            '<div class="box @{on}">',
                '<p class="date">@{date}</p>',
                '<p class="day">@{day}</p>',
                '<p class="price">@{min_price}</p>',
            '</div>',
        '</li>',
        ];
        for(var i=0;i<list.length;i++){
            var str = htmlArr   .join('')
                                .replace("@{date}",             list[i].date        )
                                .replace("@{day}",              list[i].day         )
                                .replace("@{min_price}",        list[i].min_price   )
                                .replace("@{on}",               i===2?'on':''       ); //test
            htmlStr += str;
        }
        document.getElementById("dateList").innerHTML = htmlStr;
    })
    // todo 获取机票数据客户端渲染
    getData("./getData?key=list", function(res){
        var list = JSON.parse(res).data.tickets;
        var htmlStr = '';
        var htmlArr = [
        '<li>',
            '<div class="box">',
                '<div class="left">',
                    '<div class="top">',
                        '<div class="from">',
                            '<span class="time">@{from_time}</span>',
                            '<span class="location">@{from_location}</span>',
                        '</div>',
                        '<div class="to">',
                            '<span class="time">@{to_time}</span>',
                            '<span class="location">@{to_location}</span>',
                        '</div>',
                    '</div>',
                    '<div class="bottom">',
                        '<p class="desc">@{desc}</p>',
                    '</div>',
                '</div>',
                '<div class="right">',
                    '<p class="price">@{price}</p>',
                    '<p class="desc">@{price_desc}</p>',
                    '<p class="tips" style="display: none@{tips}">@{tips}</p>',
                '</div>',
            '</div>',
        '</li>'
        ];
        for(var i=0;i<list.length;i++){
            var str = htmlArr   .join('')
                                .replace("@{from_time}",            list[i].from_time       )
                                .replace("@{from_location}",        list[i].from_location   )
                                .replace("@{to_time}",              list[i].to_time         )
                                .replace("@{to_location}",          list[i].to_location     )
                                .replace("@{desc}",                 list[i].desc            )
                                .replace("@{price}",                list[i].price           )
                                .replace("@{price_desc}",           list[i].price_desc      )
                                .replace(/@{tips}/g,                list[i].tips            )
            htmlStr += str;
        }
        document.getElementById("mainList").innerHTML = htmlStr;
    })
}

function getData(url, callback)
{
  var xmlhttp;    
  if (window.XMLHttpRequest)
  {
    // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xmlhttp=new XMLHttpRequest();
  }
  else
  {
    // IE6, IE5 浏览器执行代码
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      callback(xmlhttp.responseText);
    }
  }
  xmlhttp.open("GET",url,true);
  xmlhttp.send();
}

/**
 * * 触摸滑动判断方法
 */
var startx, starty;
//获得角度
function getAngle(angx, angy) {
     return Math.atan2(angy, angx) * 180 / Math.PI;
};

//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
function getDirection(startx, starty, endx, endy) {
    var angx = endx - startx;
    var angy = endy - starty;
    var result = 0;

//如果滑动距离太短
if(Math.abs(angx) < 2 && Math.abs(angy) < 2) {
    return result;
}

var angle = getAngle(angx, angy);
     if(angle >= -135 && angle <= -45) {
     result = 1;
} else if(angle > 45 && angle < 135) {
     result = 2;
} else if((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    result = 3;
} else if(angle >= -45 && angle <= 45) {
   result = 4;
}

return result;
}
//手指接触屏幕
document.addEventListener("touchstart", function(e) {
   startx = e.touches[0].pageX;
   starty = e.touches[0].pageY;
}, false);
//手指离开屏幕
document.addEventListener("touchend", function(e) {
    if(isTop===0) return;
    var endx, endy;
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;
    var direction = getDirection(startx, starty, endx, endy);
    switch(direction) {
        case 0:
            // alert("未滑动！");
            break;
        case 1:
            // alert("向上！")
            closeBar();
            isTop = 0;
            break;
        case 2:
            // alert("向下！")
            break;
        case 3:
            // alert("向左！")
            break;
        case 4:
            // alert("向右！")
            break;
        default:
    }
}, false);


main()