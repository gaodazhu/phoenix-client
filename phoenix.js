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
    java.classpath.push(__dirname+"/PhoenixClient.jar");
    var db = java.newInstanceSync("com.mlsc.DBClient");
    java.callMethodSync(db, "init", url, username, password);
    this.query = function (sql) {
        return db2Json(java.callMethodSync(db, "query", sql));
    }

    this.upsert = function (sql) {
        return java.callMethodSync(db, "upsert", sql);
    }
    this.upsertMuti = function (sqls) {
        var sqlArray = java.newArray("java.lang.String", sqls);
        return java.callMethodSync(db, "upsertMuti", sqlArray);
    }
}
module.exports = phoenix;