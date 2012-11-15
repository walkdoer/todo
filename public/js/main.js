/**
 * 前端交互主文件 -- public/js/main.js
 * zhangmhao@gmail.com
 */

$(function () {
    var todoList = $('#todo-list').find('ul>li'),
        last = null,
        doc = document,
        $list = $('.list'),
        initialIndex = 'list-1',
        currentIndex = 0,
        $currentTab,
        time = 0,
        isMove = false,
        startPos = {},//触屏start点
        endPos = {},//触屏end点
        tabNum = $list.length,
        nextIndex = '',
        lastLi = null,
        /*常量*/
        ALLOWRANGE = 100,
        DIRECT = {
            LEFT: 'l',
            RIGHT: 'r'
        };
    /**
     * 手势的方向
     * return left/right
     */
    function gesture (startPos, endPos) {
        var validGesture = Math.abs(startPos.y - endPos.y) < ALLOWRANGE;
        if (startPos.x < endPos.x && validGesture) {
            return DIRECT.RIGHT;
        } else if(validGesture){
            return DIRECT.LEFT;
        }
    }

    function isHorize(startPos, endPos) {
        var disY = Math.abs(startPos.y - endPos.y),
            disX = Math.abs(startPos.x - endPos.x);
        if (disX > 100 && disY < 20) {
            return true;
        }
        return false;
    }

    function isVert(startPos, endPos) {
        var disY = Math.abs(startPos.y - endPos.y),
            disX = Math.abs(startPos.x - endPos.x);
        if (disY > 100 && disX < 20) {
            return true;
        }
        return false;
    }
    function distance (startPos, endPos) {
        return endPos.y - startPos.y;
    }
    //绑定click处理事件
    todoList.click(function(e) {
        var $this = $(this),
            $a = $this.find('a');
        if(last) {
            last.hide();
            lastLi.removeClass('list-item-active');
        }
        $a.show();
        $this.addClass('list-item-active');
        last = $a;
        lastLi = $this;
    });
    //初始化数据界面
    $list.each(function () {
        $this = $(this);
        if (this.id === initialIndex) {
            $currentTab = $this;
            $this.show();
        } else {
            $this.hide();
        }
    });
    window.onResize = function (e) {
        //console.log("resize");
    };

    //处理touch事件
    document.addEventListener('touchstart', function (e) {
        console.log("touchstart");
        var touch = e.touches[0];
        startPos.x = touch.pageX;
        startPos.y = touch.pageY;
        //console.log(startPos);
    });
    document.addEventListener('touchend', function (e) {
        var direct;
        if (!isMove && isVeri()) {
            return;
        }
        direct = gesture(startPos, endPos);
        console.log(direct);
        switch (direct) {
            case DIRECT.RIGHT:
                if (currentIndex > 0) {
                    currentIndex -= 1;
                }
                break;
            case DIRECT.LEFT:
                if (currentIndex < tabNum - 1) {
                    currentIndex += 1;
                }
                break;
        }
        
        var $tab = $list.eq(currentIndex);
        if ($tab) {
            $currentTab.hide();
            $tab.show();
            $currentTab = $tab;
        }
    });
    document.addEventListener('touchmove', function (e) {
        var dis = distance(startPos,endPos);
        e.preventDefault();
        var touch = e.touches[0];
        endPos.x = touch.pageX;
        endPos.y = touch.pageY;
        isMove = true;
        //console.log(dis);
        if (isVert(startPos, endPos)) {
            window.scrollTo(0, window.scrollY + dis);
        }
    });
});