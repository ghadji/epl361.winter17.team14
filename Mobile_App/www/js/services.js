angular
    .module("app.services", [])

.factory("BlankFactory", [function() {}])

.service("BlankService", [function() {}])

.factory("sharedProps", [
    "$rootScope",
    function() {
        var context = [];
        var addData = function(key, value) {
            let obj = context.find(c => c.key == key);
            if (obj != undefined) {
                obj.value = value;
            } else {
                var data = {
                    key: key,
                    value: value
                };
                context.push(data);
            }
        };
        var getData = function(key) {
            var data = _.find(context, function(t) {
                return t.key === key;
            });
            return data;
        };

        return {
            addData: addData,
            getData: getData
        };
    }
]);