$(function() {
$('.slider div:gt(0)').hide();

setInterval(function () {
       $('.slider :first-child').fadeOut()
                                .next('div')
                                .fadeIn()
                                .end()
                                .appendTo('.slider');
}, 4000);
});

$(".hover").mouseleave(
   function () {
     $(this).removeClass("hover");
   }
 );
