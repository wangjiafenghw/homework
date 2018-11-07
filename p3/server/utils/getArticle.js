const read = require('node-read');

const Read = {};
Read.read = (url, callback)=>{
    read('http://www.sohu.com/a/273872036_428290?g=0?code=4b19151f80004169d3887b9a7c3ff443&_f=index_cpc_0', function(err, article, res) {
        let res = {};
        res.article = article.content.replace(/<[^>]*>/g, "");
        res.num_total = .replace(/\s/g, "").length;
        res.num_



        // Main Article.
        console.log(article.content.replace(/<[^>]*>/g, "")+"/n=========================>");
            
        // Title
        console.log(article.title);

        // HTML 
        console.log(article.content.replace(/<[^>]*>/g, "").replace(/\s/g, "").length+"/n=========================>");
        
        // DOM
        console.log(article.dom);
        callback()
    
    });
    function patch(s, re) {
        re = eval("/" + re + "/ig")
        return s.match(re) ? s.match(re).length : 0;
    }
}


