/**
 * 前端交互主文件 -- public/js/main.js
 * zhangmhao@gmail.com
 */

$(function () {
    'use strict';
    var todoList = $('#todo-list').find('ul>li'),
        $scrollWrapper = $('.scroll_wrapper'),
        last = {},
        scroll = {},
        initialIndex = 'scroll-wrapper-todo',
        $currentTab;


    function createScroller(wrapper) {
        var id = wrapper.attr('id');
        if (!scroll[id]) {
            scroll[id] = new iScroll(id);
        }
    }
    //初始化slider
    function initSlider($list) {
        var $pre = $('.pre'),
            i = 0,
            count = $list.length,
            $next = $('.next');

        $pre.on('click', function () {
            var $clist;
            i -= 1;
            if (i < 0) {
                i = 0;
                return;
            }
            $list.hide();
            $clist = $list.eq(i).show();
            createScroller($clist);
        });
        $next.on('click', function () {
            var $cList;
            i += 1;
            if (i >= count) {
                i = count - 1;
                return;
            }
            $list.hide();
            $cList = $list.eq(i).show();
            createScroller($cList);
        });
    }

    function bindEvents() {
        //绑定click处理事件
        todoList.on('click',function () {
            var $this = $(this),
                $a = $this.find('a');
            if(last.$a && last.$li) {
                last.$a.hide();
                last.$li.removeClass('list-item-active');
            }
            $a.show();
            $this.addClass('list-item-active');
            last.$a = $a;
            last.$li = $this;
        });
        document.addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);
        //处理touch事件
        document.addEventListener('touchstart', function (e) {

        });
        document.addEventListener('touchend', function (e) {

        });
    }
    function init() {
        //初始化数据界面
        $scrollWrapper.each(function () {
            var $this = $(this),
                id = this.id;
            if (this.id === initialIndex) {
                scroll[id] = new iScroll(id),
                $currentTab = $this;
                $this.show();
            } else {
                $this.hide();
            }
        });
        initSlider($scrollWrapper);
        bindEvents();
    }
    
    init();
    
});