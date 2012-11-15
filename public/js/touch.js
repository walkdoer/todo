$(function () {
  var $log = $('#log');
  var start, end, move = false, click = 0;
  console.log = function (str) {
    $log.prepend(str);
  };
  document.addEventListener('touchstart',function (e) {
    start = new Date();
    console.log('touchstart<br/>');
  });
  document.addEventListener('touchend',function (e) {
    var gap, str;
    end = new Date();
    gap = end - start;
    click += 1;
    if (gap < 100 && click === 2 && move === false) {
      str = 'double click';
    } else if (click === 1 && move === false){
      str = 'click';
    } else {
      str = 'move';
    }
    console.log(str + gap +'ms <br/>');
  });
  document.addEventListener('touchmove',function (e) {
    move = true;
    console.log('move <br/>');
  }); 
});