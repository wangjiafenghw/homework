

var fun = {}; //方法集
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

function closeBar(){
    fun.removeClassById(['#topList', '#bottomList', '#main'], 'on')
}
function openBar(){
    fun.addClassById(['#topList', '#bottomList', '#main'], 'on')
}
function main(){
    var el = document.querySelector("#main")
    console.log(el)
    el.ontouchmove = function(e){
        // e.touches[0].pageY
        console.log('offsetTop=>',el.offsetTop, 'scrollTop=>', el.scrollTop)
    }
    // el.addEventListener('scroll', function(){
    //     console.log('ok')
    // })
    
}
document.getElementById("main").addEventListener('scroll', function(){
    console.log('ok')
})

main()