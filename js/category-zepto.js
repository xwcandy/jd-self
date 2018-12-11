// 入口函数 使用zepto来写的js
$(function(){

    // 初始化swiper插件（内容滚动）
    var swiper = new Swiper('.swiper-container', {
        // 设置垂直方向
        direction: 'vertical',
        // 'auto'则自动根据slides的宽度来设定数量
        slidesPerView: 'auto',
        //设置可以惯性滑动
        freeMode: true,
        // 设置滚动条
        scrollbar: {
            el: '.swiper-scrollbar',
        },
        //开启鼠标滚轮控制Swiper切换
        mousewheel: true,
    });



    //需求：点击左侧分类标题（每个a），位移父盒子让它上去，达到吸顶的效果，
    //     如果位移的距离超过了最小距离（因为往上移动，是负数），就还是最小距离

    //获取左侧分类的swiper-slide容器
    var swiperSlide = $('.category-left .swiper-slide');
    var swiperWrapper = $('.category-left .swiper-wrapper');
    console.log(swiperWrapper);
    //获取左侧分类里所有a
    var aList = $('.category-left a');

    console.log(aList);
    //遍历所有a
    aList.each(function(i,ele){
        //采用闭包的方式，把i作为实参传进去，里面的函数就可以用到外面的i
        //如果不用闭包，平常的方法是用setAttribute给每个a设置索引index，就知道点击的是哪个a
        $(ele).on('click',function(){
            
                console.log(aList[i]);
                //计算父盒子swiper-wrapper位移的距离
                var translateY = -i * $(aList[i]).height();

                //获取最小位移距离 用父盒子swiperWrapper高度 - swiperSlide的高度
                var minTranslateY = swiperWrapper.height() - swiperSlide.height();

                //判断是否超过最小位移距离，超过就使用最小位移距离，否则就用计算出来的translateY
                translateY = translateY < minTranslateY ? minTranslateY : translateY;

                //父盒子swiperWrapper进行位移，并设置过渡
                swiperWrapper.css({
                    'transform' : 'translate3d(0, '+ translateY +'px, 0)',
                    'transition' : 'all .3s'
                });
                // console.log(translateY,minTranslateY);

                //将当前a的父节点li的active属性加上，给其他兄弟移除active
                $(ele).parent().addClass('active').siblings().removeClass('active');

           
        });
    })
    


})