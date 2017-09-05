var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
/* GET home page. */

function select(sql) {
    var promise = new Promise(function(resolve,reject) {
        var result = null;
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host:'localhost',user:'root',password:'',database:'lianjia'
        });

        connection.connect();
        connection.query(sql, function (err, results, fields) {
                if (err) {
                    console.log("err");
                    reject(err);
                }else {
                    console.log("yes");
                    //console.log(results);
                    if(results.length > 0) {
                        resolve(results);
                    }else {
                        resolve({status: 00000});
                    }
                }
            }
        );
        connection.end();
    });
    return promise;
}
router.get('/', function(req, res, next) {
    var sql='SELECT * FROM zhaofang';
    select(sql).then(function (data) {
        res.render('home/index', { title: '链家网' ,hours:data});
    }).catch(function(err){

    });
});
router.get('/Suggest/:keyword',function (req,res,next) {
    let url = 'https://bj.lianjia.com/api/headerSearch?cityId=110000&cityName=%E5%8C%97%E4%BA%AC&channel=site&q=&keyword='+encodeURI(req.param('keyword'));
    (async function () {
        const resData = await fetch(url);
        const json = await resData.json();
        res.json(json);
        console.log(json);
    })();
})
module.exports = router;
