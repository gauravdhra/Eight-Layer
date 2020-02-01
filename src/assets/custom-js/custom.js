$(window).resize(function(){
    var contentHeight = $('#main').height();
    $('#left-panel').css('min-height',contentHeight+100);
});
