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
            count = $scrollWrapper.length,
            $tabs = [],
            $next = $('.next');
        $scrollWrapper.each(function () {
            var $this = $(this);
            createScroller($this);
            $tabs[index] = $this;
            if (index++ === config.initialIndex) {
                changeTitle(getTitle($this));
            }
        });

        function isValidRange(index) {

        }
        $prev.on('click', function () {
            if (index === 0) {
                return;
            }
            myScroll.scrollToPage('prev', 0);
        });
        $next.on('click', function () {
            if (index === count - 1) {
                return;
            }
            myScroll.scrollToPage('next', 0);
        });

        
        myScroll = new iScroll('tabPanel', {
            snap: true,
            momentum: false,
            hScrollbar: false,
            onScrollEnd: function () {
                index = this.currPageX;
                $('#indicator > li.active').removeClass('active');
                $('#indicator > li:nth-child(' + (index + 1) + ')').addClass('active');
                changeTitle(getTitle($tabs[index]));
            }
        });
    }

    function bindEvents() {
        //绑定click处理事件
        todoList.on('click', function () {
            var $this = $(this),
                $a = $this.find('a');
            if (last.$a && last.$li) {
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
    }
    function init() {
        //初始化数据界面
        initSlider($scrollWrapper);
        bindEvents();
    }
    
    init();
    
});