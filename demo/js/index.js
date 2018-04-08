var box = document.getElementById('box');
box.onmousedown = function (ev) {
    var mouseLeft = ev.clientX;
    var mouseTop = ev.clientY;

    var boxLeft = box.offsetLeft;
    var boxTop = box.offsetTop;

    var dx = mouseLeft - boxLeft;
    var dy = mouseTop - boxTop;

    document.onmousemove = function (ev) {
        // console.log(document.body.clientWidth);
        var boxTop = box.offsetTop;

        var moveLeft = ev.clientX - dx;

        var moveTop = ev.clientY - dy;

        var screaWidth = document.documentElement.clientWidth;
        var screaHeight = document.documentElement.clientHeight;
   
        moveTop = moveTop < 0 ? 0 : moveTop;
        moveTop = boxTop <= screaHeight - box.clientHeight ? moveTop : screaHeight - box.clientHeight;
        console.log(boxTop < screaHeight - box.clientHeight);
        // moveTop = (boxTop + box.clientHeight) > (screaHeight)? (screaHeight-box.clientHeight) : moveTop;

        // moveLeft = moveLeft < 0 ? 0 :moveLeft;
        // moveLeft = moveLeft > screaWidth ? moveLeft :screaWidth;


        box.style.left = moveLeft + 'px';
        box.style.top = moveTop + 'px';
    }

}
box.onmouseup = function (ev) {
    document.onmousemove = null;
}