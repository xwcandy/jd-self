// 入口函数
window.addEventListener('load',function(){

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
    var swiperSlide = document.querySelector('.swiper-slide');
    var swiperWrapper = document.querySelector('.swiper-wrapper');
    console.log(swiperWrapper);
    //获取左侧分类里所有a
    var aList = document.querySelectorAll('.category-left a');

    console.log(aList);
    //遍历所有a
    for(var i = 0; i < aList.length; i++){
        //采用闭包的方式，把i作为实参传进去，里面的函数就可以用到外面的i
        //如果不用闭包，平常的方法是用setAttribute给每个a设置索引index，就知道点击的是哪个a
        aList[i].addEventListener('click',(function(i){
            return function(){
                console.log(aList[i]);
                //计算父盒子swiper-wrapper位移的距离
                var translateY = -i * aList[0].offsetHeight;
                //获取最小位移距离 用父盒子swiperWrapper高度 - swiperSlide的高度
                var minTranslateY = swiperWrapper.offsetHeight - swiperSlide.offsetHeight;
                //判断是否超过最小位移距离，超过就使用最小位移距离，否则就用计算出来的translateY
                translateY = translateY < minTranslateY ? minTranslateY : translateY;
                //父盒子swiperWrapper进行位移，并设置过渡
                swiperWrapper.style.transform = 'translate3d(0, '+ translateY +'px, 0)';
                swiperWrapper.style.transition = 'all .3s';
                // console.log(translateY,minTranslateY);

                //遍历所有a ：将a的父节点li的active属性移除，给当前点击的加上active
                for(var j = 0; j < aList.length; j++){
                    aList[j].parentNode.classList.remove('active');
                }
                aList[i].parentNode.classList.add('active');

            };
        })(i));
    }


},false)