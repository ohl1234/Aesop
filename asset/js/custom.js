/**
 * 1. gsap load화면, 제목,버튼,svg // gsap 스크롤트리거 img,text영역 
 * 2. 모든 이미지 페럴렉스 통합판 - each문 활용
 * 3. sc-gift 자동 롤링 함수, 자동 롤링 셋팅
 * 4. sc-gift li클릭 이벤트 - 클릭시 자동 롤링,bar 멈추고 클릭한 요소의 bar 롤링진행
 * 5. homeapp 텍스트 애니메이션 - each문 활용
 * 6. hover 이벤트
 * 7. swiper slide
 * 8. btn-menu 클릭시 gnb-area등장
 */

$(function(){
    // 1. gsap load화면, 제목,버튼,svg // gsap 스크롤트리거 img,text영역    
    const loadAni = gsap.timeline({})
    loadAni.addLabel('a')
    loadAni.to('.load',{height:0,delay:0.7},'a')
    .to('.load .load-logo',{yPercent:-100,delay:0.3},'a')
    .addLabel('b')
    .from('.sc-home .thumb-area figure',{scale:1.2},'b-=0.4')
    .from('.sc-home .text',{yPercent:100,stagger:0.1},'b-=0.4')
    .to('.sc-home .link-btn',{duration:0.7,opacity:1},'b-=0.4')
    .from('.sc-home .home-logo-area .char',{opacity:0,stagger:0.2,duration:0.9,yPercent:103},'b-=0.4')

    const introAni = gsap.timeline({
        scrollTrigger:{
            trigger:".sc-home",
            start:"top top",
            end:"bottom top",
            //markers:true,
            scrub:1
        }
    })
    introAni.addLabel('c')
    introAni.to('.group-flex1',{yPercent:20},'c')
    .to('.sc-home .thumb-area',{yPercent:-10},'c')

    // 2. 모든 이미지 페럴렉스 통합판 - each문 활용
    ScrollTrigger.matchMedia({
        // large
        "(min-width: 768px)": function() {
            $('[data-parallex]').each(function(i,el){
                parent = $(this).parent()//thumb-box 변수
                gsap.to(el,{
                    scrollTrigger:{
                        trigger:parent,
                        start:"top bottom", 
                        end:"bottom top",
                        //markers:true,
                        scrub:1,
                        duration:3
                    },
                    yPercent:5
                })
            })
        }
      });

    // 3. sc-gift li클릭 이벤트 - 클릭시 자동 롤링,bar 멈추고 클릭한 요소의 bar 롤링진행
    $('.sc-gift .info-box').click(function(e){
        e.preventDefault();
        idx = $(this).parents('.gift-item').index();// gift-item index값 선언
        $('.sc-gift .thumb-box').removeClass('active')
        $(this).siblings('.thumb-box').addClass('active')// active 시 scale 작동

        clearInterval(gift_Rolling);
        guageBar.kill();
        gsap.set('.guage',{width:"0%"})
        num = idx
        bar = $('.gift-item').eq(num).find('.guage')// 게이지바 선언
        guageBar = gsap.to(bar,5,{
            width:"100%",
            ease:"none",
            onComplete:function(){
                gsap.set('.guage',{width:"0%"})
            } // 애니메이션 실행 후 진행되는 메서드
        })// 게이지바 애니메이션 설정
        $('.gift-item').eq(num).addClass('active').siblings().removeClass('active')
        num++;
        giftRolling();
    })

    // 4. sc-gift 자동 롤링 함수, 자동 롤링 셋팅
    let num = 0;
    giftRollingInit = function(){
        $('.gift-item').eq(num).addClass('active') // 첫번째에 active 추가
        gsap.to('.first-bar',5,{
            width:"100%",
            ease:"none",
            onComplete:function(){
                gsap.set('.guage',{width:'0%'})
            }
        })
        num = 1; // 다음 li의 index
    } 
    giftRollingInit();

    giftRolling = function(){
        gift_Rolling = setInterval(function(){ //자동롤링 함수 선언
            bar = $('.gift-item').eq(num).find('.guage')// 게이지바 선언
            $('.gift-item').eq(num).addClass('active').siblings().removeClass('active')// addclass
            guageBar = gsap.to(bar,5,{
                width:"100%",
                ease:"none",
                onComplete:function(){
                    gsap.set('.guage',{width:"0%"})
                } // 애니메이션 실행 후 진행되는 메서드
            })// 게이지바 애니메이션 설정
            
            num === 2 ? num = 0 : num++// 조건문 num이 3이되면 0대입, 아니면 증감
        },5000)
    }
    giftRolling(); // 이때 자동롤링은 5초뒤에 실행되므로 초기 세팅 함수 선언

    // 5. sc-selection 텍스트 애니메이션 - each문 활용
    $('.thumb-item').each(function(i,el){
        idx1 = $(this).index(); // index
        idx2 = $(this).index()+1; // index+1
        gsap.set('.text-item',{opacity:0}) // 텍스트영역 초기세팅 opacity 0
        const textAni = gsap.timeline({
            scrollTrigger:{
                trigger:el,
                start:"top 20%",
                end:"bottom top",
                markers:true,
                toggleActions:"play pause resume reverse"
            }
        })
        .to('.text-item:nth-child('+idx1+')',{opacity:0,y:-100})
        .to('.text-item:nth-child('+idx2+')',{opacity:1})
    })

    // 6. sc-product hover 
    $(window).resize(function(){ 
        if (window.innerWidth >= 768) {  
            $('.sc-product .column-left').hover(function(){
                gsap.to('.thumb-wrap .thumb-box',{scale:1.05})
            },function(){
                gsap.to('.thumb-wrap .thumb-box',{scale:1})
            });
            }
        }).resize();
        
    // 7. swiper slide
    const swiper = new Swiper(".slide", {
        // speed:1000,
        slidesPerView: "auto",
        spaceBetween: 30,
      });


    // 8. btn-menu 클릭시 gnb-area등장
    $('.btn-menu').click(function(){
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
            $('.gnb-area').removeClass('active')
            $('.link-order').animate({opacity:1})
        } else {
            $(this).addClass('active')
            $('.gnb-area').addClass('active')
            $('.link-order').animate({opacity:0})
        }
    });

})