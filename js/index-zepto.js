//使用zepto来写的js
$(function(){

    /* 1: 头部背景色渐变 */

    // 获取轮播图的高度
    var slideHeight = $('#slide').height();
    
    var header = $('#header');
    // var opacity = 0;
    // 注册滚动条滚动事件
    $(window).on('scroll',function(){
        //获取滚动的高度
        var scrollHeight = $(window).scrollTop();
        // console.log(document.documentElement.scrollTop);
        //计算透明度 
        var opacity = scrollHeight / slideHeight;
        // console.log(opacity);
        header.css( 'backgroundColor' , 'rgba(222, 24, 27,'+opacity+')' );
    })


    // 2、初始化swiper插件（轮播图）
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: true,//设置自动滑动
        // 设置回路
        loop : true,
        //设置分页器
        pagination: {
            el: '.swiper-pagination',
        },
    
        // prevButton:'.swiper-button-prev',
        // nextButton:'.swiper-button-next',
        // effect : 'flip',
    })


    /* 3: 倒计时 */

    // 拿到时间（一般是从后台获取的）单位是秒
    // var time = 2.5 * 60 * 60;

    //模拟我们自己计算倒计时的时间 
    //获取未来时间
    // 在date里面按照格式写指定的时间，格式有两种：（'mm dd,yyyy hh:mm:ss'）或 (yyyy,mm,dd,hh,mm,ss)整数型
    var futureTime = new Date('12 9,2018 21:00:00').getTime(); //使用getTime能转成毫秒
    console.log(futureTime);
    //获取当前时间
    var currentTime = new Date().getTime();
    console.log(currentTime);
    //用未来时间 - 当前时间 （毫秒数，要除以1000，转为秒）
    var time = Math.floor((futureTime - currentTime)/1000);
    console.log(time);

    //将倒计时封装到函数里
    function downTime(){
        //计算时、分、秒
        var hour = time / 3600;
        var min = time % 3600 / 60;
        var sec = time % 60;
        //依次取出时分秒的十位和个位 赋给span显示
        var spanList = document.querySelectorAll('.seckill-time span');
        // console.log(spanList);
        spanList[0].innerHTML = parseInt(hour / 10);
        spanList[1].innerHTML = parseInt(hour % 10);
        spanList[3].innerHTML = parseInt(min / 10);
        spanList[4].innerHTML = parseInt(min % 10);
        spanList[6].innerHTML = parseInt(sec / 10);
        spanList[7].innerHTML = parseInt(sec % 10);
    }
    
    //页面一加载，调用一次，将时间显示在页面
    downTime();

    // 设置定时器：每隔一秒，秒--，重新计算时分秒，再赋给span
    setInterval(function(){
        
        time--;
        downTime();

    },1000);





})