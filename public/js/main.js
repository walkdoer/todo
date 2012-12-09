/**
 * 前端交互主文件 -- public/js/main.js
 * zhangmhao@gmail.com
 */

$(function () {
    'use strict';
    var 
        todoList = $('#todo-list').find('ul>li'),
        $scrollWrapper = $('.scroll_wrapper'),
        last = {},
        scroll = {},
        myScroll,
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
            myScroll,
            $next = $('.next');

        $scrollWrapper.each(function () {
            var $this = $(this),
                id = this.id;
            scroll[id] = new iScroll(id);
            $currentTab = $this;
        });
        $pre.on('click', function () {
            myScroll.scrollToPage('prev', 0);
        });
        $next.on('click', function () {
            myScroll.scrollToPage('next', 0);
        });

        
        myScroll = new iScroll('tabPanel', {
            snap: true,
            momentum: false,
            hScrollbar: false,
            onScrollEnd: function () {
                
               // document.querySelector('#indicator > li.active').className = '';
               // document.querySelector('#indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
                
            }
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
        initSlider($scrollWrapper);
        bindEvents();
    }
    
    init();
    
});