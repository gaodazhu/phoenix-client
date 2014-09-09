/**
 * Created by gaozhu on 2014/8/25.
 */
function phoenix(url, username, password, javaoptions) {
    if (!url || typeof(url) != "string") {
        throw "require phoenix url string like : jdbc:phoenix:192.168.252.131,192.168.252.132 ";
        return;
    }
    function db2Json(data) {
        var array = [];
        var head = data[0].split("\t");
        var body;
        for (var i = 1; i < data.length; i++) {
            var obj = {};
            body = data[i].split("\t");
            for (var j = 0; j < head.length; j++) {
                obj[head[j]] = body[j]
            }
            array.push(obj);
        }
        return array;
    }

    var java = require("java");
    javaoptions && javaoptions.forEach(function (option) {
        java.options.push(option);
    })
    java.classpath.push(__dirname+"/java/druid-1.0.6.jar");
    java.classpath.push(__dirname+"/java/phoenix-4.0.0-incubating-client.jar");
    java.classpath.push(__dirname+"/java/PhoenixClient.jar");
    var db = java.newInstanceSync("com.mlsc.DBClient");
    java.callMethodSync(db, "init", url, username, password);
    this.query = function (sql,success,error) {
        try{
            success && success(db2Json(java.callMethodSync(db, "query", sql)));
        }catch(e){
            error && error(e);
        }
    }

    this.upsert = function (sql,success,error) {
        try{
            var result = java.callMethodSync(db, "upsert", sql);
            result && success && success();
            !result && error && error();
        }catch(e){
            error && error(e);
        }
    }
    this.upsertMuti = function (sqls,success,error) {
        if(!sqls instanceof Array || sqls.length == 0)
            return;
        var sqlArray = java.newArray("java.lang.String", sqls);
        try{
            var result = java.callMethodSync(db, "upsertMuti", sqlArray);
            result && success && success();
            !result && error && error();
        }catch(e){
            error && error(e);
        }
    }
}
module.exports = phoenix;