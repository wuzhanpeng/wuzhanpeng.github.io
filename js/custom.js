// Control the elevator button
$(function(){
	$(".elevator-button").mouseover(function() {
		$(this).css("background","url(/images/backtop.png) no-repeat 0px 0px");
	});
	$(".elevator-button").mouseout(function() {
		$(this).css("background","url(/images/backtop.png) no-repeat -70px 0px");
	});
});