var target1 = document.getElementsByClassName('first-face')[0];
var target2 = document.getElementsByClassName('first-opp-face')[0];
var speed = 1;
var inter;
var inter2;
target1.addEventListener('click', function () {
    var data = {
        d1: 180,
        d2: 180,
        target1,
        target2,
        speed,
    }
    around(data);
});
target2.addEventListener('click', function () {
    var data = {
        d1: 0,
        d2: 0,
        target2: target1,
        target1: target2,
        speed,
    }
    around(data);
});


// @param
// @d1 img1开始转动的角度 int
// @d2 img2开始转动的角度 int
// @target1 img1节点 obj
// @target2 img2节点 obj
function around(data, fn) {
    var d3, d1 = data.d1, d2 = data.d2, target1 = data.target1, target2 = data.target2, speed = data.speed;
    window.clearInterval(inter);
    inter = setInterval(_inter(d1, target1, target2), speed);

    // setTimeout(_inter2(d2, target2), 450);
    inter2 = setInterval(_inter2(d2, target2), speed);
    function _inter(d1, target1, target2) {
        return function () {
            d1 += 1;
            target1.style.transform = "rotateY(" + d1 + "deg)";
            if (d1 % 90 == 0) {
                target1.style.visibility = "hidden";
                target2.style.visibility = "visible";
                clearInterval(inter);
            }
        }
    }

    function _inter2(d2, target2) {
        return function () {
            d2 += 1;
            
            if (d2 % 180 == 0) {
                clearInterval(inter2);
            }
            target2.style.transform = "rotateY(" + d2 + "deg)";
        }


    }
    // function __inter2(d2, target2) {

    // }
}