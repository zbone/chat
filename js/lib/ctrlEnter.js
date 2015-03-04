$.fn.ctrlEnter = function (btns, fn) {
    var thiz = $(this);
    btns = $(btns);

    function performAction (e) {
        fn.call(thiz, e);
    };
    thiz.bind("keydown", function (e) {
        if (e.keyCode === 13 && e.ctrlKey) {
            performAction(e);
            e.preventDefault(); //阻止默认回车换行 
        }
    });
    btns.bind("click", performAction);
} 