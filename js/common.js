var wHeight = $(window).height(), // 보이는 화면
    dHeight = $(document).height(), // 문서 화면
    $header = $('#header'),
    $headerMu = $('#header .menu ul li'),
    navHeight = $('#header').outerHeight(), // margin, padding 값에 따라 outerHeight, inHeight 라고 한다.
    lastScrollTop = 0, // 마지막 스크롤 된 위치값을 저장하기 위한 변수
    moveScroll,  // 현재 스크롤 감지할 변수
    wscroll = $(window).scrollTop(), // 현재 스크롤 값을 구한다.
    $cont = $('#content > div'),
    $btmTop = $('.btm_wrap'),
    $btnMenu = $('#header .btn_menu'),
    $Mmenu = $('#header .menu'),
    $MboxMenu = $('#header .box_menu'),
    $btnMenuCloseTxt = $('#header .btn_menu').attr('data-txt-close'),
    $btnMenuOpenTxt = $('#header .btn_menu').attr('data-txt-open'),
    $btnMenuHindTxt = $('#header .btn_menu').find('.hide_txt'),
    $toggle = false;

/* Accordion */
var Accordion = function (){
    var $acc = $('.js-acc'),
        $accCont = $('.js-acc-cont'),
        $accBtn = $('.js-acc-btn'),
        $accDet = $('.js-acc-detail'),
        $accBtnTxt = $('.hide_txt');

    // $(this).attr('aria-expanded') === 'true'

    $accBtn.each(function(index, item){
        if (( parseInt($acc.attr('data-open-detail')) - 1) !== index) {
            $(this).attr({
                'id': 'accrod_toggle_' + index,
                'aria-controls': 'accord_content_' + index,
                'aria-expanded': $toggle
            }).find('.hide_txt').text($(this).attr('data-txt-open'))
            .parent().parent().attr('role', 'presentation');
        } else {
            $(this).attr({
                'id': 'accrod_toggle_' + index,
                'aria-controls': 'accord_content_' + index,
                'aria-expanded': !$toggle
            }).find('.hide_txt').text($(this).attr('data-txt-close'))
            .parent().parent().attr('role', 'presentation');
        }
    });

    $accDet.each(function(index, item){
        if (( parseInt($acc.attr('data-open-detail')) - 1) !== index) {
            $(this).attr({
                'id': 'accord_content_' + index,
                'role': 'region',
                'aria-labelledby': 'accord_toggle_' + index
            });
        } else {
            $(this).attr({
                'id': 'accord_content_' + index,
                'role': 'region',
                'aria-labelledby': 'accord_toggle_' + index
            }).slideDown().parent().addClass('on');
        }
        
        
    });

    $accBtn.click(function(){
        var $this_accCont = $(this).closest('.js-acc-cont');
        var $this_accDet = $(this).closest('.js-acc-cont').find('.js-acc-detail');
        var $this_accBtnTxt = $(this).find('.hide_txt');
        
        if($(this).closest('.js-acc-cont').hasClass('on')) {
            $this_accCont.removeClass('on');
            $this_accDet.slideUp();
            $this_accBtnTxt.text($(this).attr('data-txt-close'));
            $(this).attr({'aria-expanded': $toggle});
        } else {
            $accCont.removeClass('on');
            $accDet.slideUp();
            $accBtnTxt.text($accBtn.attr('data-txt-close'));
            $accBtn.attr({'aria-expanded': $toggle});

            $this_accCont.addClass('on');
            $this_accDet.slideDown();
            $this_accBtnTxt.text( $(this).attr('data-txt-open'));
            $(this).attr({'aria-expanded': !$toggle});
        }

        // $(".row").not($(this)).slideUp();
        // $($(this)).slideToggle();
    });
}


/* floating button */
wscroll > 50 && $btmTop.fadeOut();

$(window).scroll(function(){
    if($(this).scrollTop() > 50 ){
        $btmTop.fadeIn();
    } else{
        $btmTop.fadeOut();
    }
});

$('.btm_wrap .btn_top').click(function(e){
    e.preventDefault();
    $('html, body').stop().animate({scrollTop:0}, 500);
});


if (navigator.userAgent.indexOf('Mobi') > -1) {
    $btnMenu.attr({'aria-expanded': $toggle});
}


/* Top menu */
$(window).scroll(function(event){ //스크롤을 감지
    event.preventDefault();
    moveScroll = true;
    
    for(i=0; i < $cont.length; i++ ){
        if (wscroll >= $cont.eq(i).offset().top) {
            $headerMu.removeClass('active');
            $headerMu.eq(i).addClass('active');
        } 
        
        if (wscroll >= $cont.eq(i).offset().top - wHeight) {
            $cont.eq(i).find('h2.title').addClass('on');
        }

    }

});

setInterval(function(){
    // 0.25초마다 실행한다. 스크롤 감지해서 실행할 구문을 사용자 정의

    if (moveScroll) {
        dHeight = $(document).height()
        hasScroll(dHeight);
        moveScroll = false;  // setInterval 실행되면 moveScroll을 false 를 변경하여 이 후 움직이는 지 아닌지를 감지한다.
    }

}, 250); 

function hasScroll(h){
    wscroll = $(this).scrollTop(); // 현재 스크롤 값을 구한다.
    if (wscroll > lastScrollTop && wscroll > navHeight ) { // wscroll 이 마지막 스크롤된 위치값보다 크고 $('#nav') 보다 클 경우 true 
        //스크롤을 내렸을 때
        $header.addClass('on');
    } else {
        //스크롤을 올렸을 때

        if ((wscroll + wHeight) < h) {
            //console.log('wscroll', wscroll, '  wHeight', wHeight, '   wscroll + wHeight =',  wscroll + wHeight, '  dHeight', h);
            $header.removeClass('on');
        }   
    }
    lastScrollTop = wscroll;
}

/* mobile Top Menu */
$btnMenu.click(function(e){
    e.preventDefault();
    if($Mmenu.hasClass('on')) {
        $Mmenu.removeClass('on');
        $MboxMenu.slideUp();
        $(this).attr({'aria-expanded': !$toggle});
        $btnMenuHindTxt.text($(this).attr($btnMenuCloseTxt));
    } else {
        $Mmenu.addClass('on');
        $MboxMenu.slideDown();
        $(this).attr({'aria-expanded': $toggle});
        $btnMenuHindTxt.text($(this).attr($btnMenuOpenTxt));
    }
});

/* Top Menu */
$headerMu.click(function (e) {
    
    e.preventDefault();
    var index = $(this).index();
    var offset = $cont.eq(index).offset().top
    
    $('html, body').animate({scrollTop:offset}, 600);
    setInterval(function(){
        $cont.eq(index).find('h2.title').addClass('on');
    }, 500);

    if (navigator.userAgent.indexOf('Mobi') > -1) {
        $Mmenu.removeClass('on');
        $MboxMenu.slideUp();
        $(this).attr({'aria-expanded': !$toggle});
        $btnMenuHindTxt.text($(this).attr($btnMenuCloseTxt));
    }
    
});


$(window).on('load', function(){
    
    $(function(){
        
        setInterval(function(){
            $('.about_wrap .txt_wrap').addClass('on');
            $('.about_wrap').find('h2.title').addClass('on');
        }, 100);

        
        if (wscroll < $('.career_wrap').offset().top){
            setInterval(function(){
                $('.career_wrap').find('h2.title').addClass('on');
            }, 500);
        }
        
        
    });
    
});


