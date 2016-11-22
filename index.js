$(function(){

	for (var i=0;i<20;i++){
    for (var j=0;j<20;j++){
 /*var r=Math.floor(Math.random()*100);
  var g=Math.floor(Math.random()*0);
  var b=Math.floor(Math.random()*255);
  var color='rgba('+r+','+g+','+b+',0.5)'*/
  $('<div>')
  .addClass('fk')
  .attr('id',i+'_'+j)
  /*.css('backgroundColor',color)*/
  .appendTo('.zhezhao')
}
};
// 判断蛇会不会撞到自己
var dict={
  	'0-0':true,
  	'0-1':true,
  	'0-2':true
  }
var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
function finddiv(x,y){
	return $('#'+x+'_'+y);
}

$.each(she,function(i,v){
    finddiv(v.x,v.y).addClass('she')
});

 direction='you';
//判断
$(document).on('keyup',function(e){
	var biao={37:'zuo',38:'shang',39:'you',40:'xia'}
	var fanbiao={'zuo':37,'shang':38,'you':39,'xia':40}
	if(Math.abs(e.keyCode-fanbiao[direction])===2){
    	return;
    	}
	if(biao[e.keyCode]){
		direction=biao[e.keyCode]
	
	}

})
//放食物 不能放在蛇上
function putfood() {
		do{
		var a = Math.floor(Math.random() * 20);
		var b = Math.floor(Math.random() * 20);
		}while(dict[a+'_'+b]);

		 finddiv(a,b).addClass('food');
		
		return {x: a,y: b
			};
	
	}
	var food = putfood();
move=function(){
	var jiutou=she[she.length-1];
	if(direction=='you'){
		var xintou={x:jiutou.x,y:jiutou.y+1}
	}if(direction=='zuo'){
		var xintou={x:jiutou.x,y:jiutou.y-1}
	}if(direction=='shang'){
		var xintou={x:jiutou.x-1,y:jiutou.y}
	}if(direction=='xia'){
		var xintou={x:jiutou.x+1,y:jiutou.y}
	}
	//边界
	if (xintou.x > 19 || xintou.x < 0 || xintou.y > 19 || xintou.y < 0) {
			$('.tc').addClass('diaoluo');
		clearInterval(t);
			return;
		}
	if(dict[xintou.x+'_'+xintou.y]){
        clearInterval(t);
        $('.tc1').addClass('diaoluo');
             return;
        }   
        
	//吃到食物
	she.push(xintou);
       dict[xintou.x+'_'+xintou.y]=true;
    finddiv(xintou.x,xintou.y).addClass('she');
    
    if (xintou.x === food.x && xintou.y === food.y) {
      finddiv(food.x,food.y).removeClass('food');
      food = putfood();
    } else {
      //没吃到食物
      var weiba = she.shift();
      delete dict[weiba.x+'_'+weiba.y];
     finddiv(weiba.x,weiba.y).removeClass('she');
    }



};
    var flag=true;

	$(".stop").on("click",function(){
		if(flag==false){
			clearInterval(t);
			flag=true
		}
	})
	$(".chongxin").on("click",function(){
        $('.box').addClass('left');
        $('.zi').addClass('left');
        $('.zhezhao').addClass('top');
        if(flag==true){
			t = setInterval(move,300);
			flag=false;
		}
	})

	$(".zailai").on("click",function(){
		window.location.reload();
	})



})