/**
 * Created by user on 2017/9/19.
 */
function toDoub(n){
    return n<10?'0'+n:''+n;
}

module.exports = {
    time_convert: function (time) {
        var oDate = new Date();
        oDate.setTime(time);

        return oDate.getFullYear()+'年'+toDoub(oDate.getMonth()+1)+'月'+toDoub(oDate.getDay())+'日'+toDoub(oDate.getHours())+'时'+
                toDoub(oDate.getMinutes())+'分'+toDoub(oDate.getSeconds())+'秒';
    }
};