document.addEventListener("DOMContentLoaded", function () {

    var buildArray = function (target, n) {
        let answerAry = [];
        let maxNum = target[target.length - 1];
        let cnt = 0;
        for (let i = 1; i <= n; i++) {
            if (i <= maxNum) {
                let s1 = target[cnt];
                if (s1 === i) {
                    answerAry.push('Push');
                    cnt++;
                } else {
                    answerAry.push('Push');
                    answerAry.push('Pop');
                }
            }
        }
        return answerAry;
    };
    console.log(buildArray([2,3,4,5,8,9,10], 10));
});


// for (var i = 0; i < index.length; i++) {

// }
