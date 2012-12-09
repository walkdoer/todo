/**
 * 前端交互主文件 -- public/js/main.js
 * zhangmhao@gmail.com
 */

$(function () {
    'use strict';
    var config = {
            initialIndex: 0
        },
        todoList = $('#todo-list').find('ul>li'),
        $scrollWrapper = $('.scroll_wrapper'),
        last = {},
        $title = $('#list-slider>.title'),
        scroll = {};

    /**
     * 创建iScroll
     */
    function createScroller(wrapper) {
        var id = wrapper.attr('id');
        if (!scroll[id]) {
            scroll[id] = new iScroll(id);
        }
    }
    function getTitle($tab) {
        return $tab.find('.list>p').html();
    }
    function changeTitle(title) {
        $title.html(title);
    }
    /**
     * 初始化slider
     */
    function initSlider() {
        var $prev = $('.pre'),
            myScroll,
            index = 0,
            $currentTab,
            $next = $('.next');

        $scrollWrapper.each(function () {
            var $this = $(this);
            createScroller($this);
            if (index++ === config.initialIndex) {
                $currentTab = $this;
            }
        });
        $prev.on('click', function () {
            var title;
            myScroll.scrollToPage('prev', 0);
            $currentTab = $currentTab.prev();
            title = getTitle($currentTab);
            changeTitle(title);
        });
        $next.on('click', function () {
            var title;
            myScroll.scrollToPage('next', 0);
            $currentTab = $currentTab.next();
            title = getTitle($currentTab);
            changeTitle(title);
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