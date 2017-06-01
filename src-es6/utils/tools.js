/**
 * Created by zhuangjianjia on 17/6/2.
 */


// //计算核心函数`sufuCaculate`，这里扩展了`Array`类，只是为了方便调用，前提是得取个个性一点的名字，不然哪一天官方也出个同名的内置方法，你的项目就悲催了！
// Array.prototype.sufuCaculate = function () {
//   if((!this)||this.length<5){throw new Error('sufuCaculate()参数错误')}
//   var card5 = this, before10Count = 0, after10Count = 0, maxSameCount = getMaxSameCount(this);
//   if(maxSameCount == 4){return 14} //4张相同的,返回'炸弹'
//   if(this.every(function (x) {return x<5;})){return 13}//5张牌都小于5,返回'五小'
//   if(this.every(function (x) {return x>10;})){return 12}//5张牌全为花,返回'五花'
//
//   turnTrueValue(card5);//把大于10的牌变成10,并计算等于10的牌的数量
//   if(before10Count == 1 && after10Count == 5){return 11}//5张牌中一张为10，另外4张为花,返回'四花'
// //用了三层的for循环才实现了，求前辈们指点好一点的逻辑！
//   for(var i = 0; i<3; i++){
//     for(var j = i+1;j<4;j++){
//       for(var k = j+1;k<5;k++){
//         if(sum([card5[i],card5[j],card5[k]]) == 0){
//           var copy = card5.slice();
//           delete copy[i];
//           delete copy[j];
//           delete copy[k];
//           var a = sum(copy.filter(function(){return true}));
//           if(a == 0){return 10}//牛牛
//           else{return a}//a牛
//         }
//       }
//     }
//   }
//   return 0;//'无牛'
//   //求和并求于10
//   function sum(arr){
//     return arr.reduce(function(a,b){return a+b})%10
//   }
//   //获得最大相同牌数
//   function getMaxSameCount(card5){
//     var count = 1, sameCardCount = 1;
//     for(var i = 0; i<5; i++){
//       for(var j = 0; j<5;j++){
//         if(j == i){continue}
//         if(card5.indexOf(card5[i],j)>0){
//           count++;
//         }
//       }
//       sameCardCount = Math.max(count,sameCardCount);
//       count = 1;
//     }
//     return sameCardCount;
//   }
//   //把大于10的牌全部转为10
//   function turnTrueValue(card5){
//     for(var i = 0; i<5; i++){
//       if(card5[i] === 10){before10Count++}
//       card5[i] = card5[i]>=10 ? 10 : card5[i];
//       if(card5[i] === 10){after10Count++}
//     }
//   }
// };