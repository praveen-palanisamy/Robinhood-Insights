/*Dashboard Init*/
 
"use strict"; 

/*****Ready function start*****/
$(document).ready(function(){
	$('#statement').DataTable({
		"bFilter": false,
		"bLengthChange": false,
		"bPaginate": false,
		"bInfo": false,
	});
});
/*****Ready function end*****/

/*****Load function start*****/
$(window).load(function(){
	window.setTimeout(function(){
		$.toast({
			heading: 'Welcome to Elmer',
			text: 'Use the predefined ones, or specify a custom position object.',
			position: 'bottom-left',
			loaderBg:'#f8b32d',
			icon: 'success',
			hideAfter: 3500, 
			stack: 6
		});
	}, 3000);
});
/*****Load function* end*****/

/*****E-Charts function start*****/
var echartsConfig = function() { 
	if( $('#e_chart_1').length > 0 ){
		var eChart_1 = echarts.init(document.getElementById('e_chart_1'));
		var option = {
			tooltip: {
				trigger: 'axis',
				backgroundColor: 'rgba(33,33,33,1)',
				borderRadius:0,
				padding:10,
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: 'rgba(33,33,33,1)'
					}
				},
				textStyle: {
					color: '#fff',
					fontStyle: 'normal',
					fontWeight: 'normal',
					fontFamily: "'Roboto', sans-serif",
					fontSize: 12
				}	
			},
			grid:{
				show:false,
			},

			legend: {
				show:false,
			},

			singleAxis: {
				top: 0,
				bottom: 20,
				axisTick: {
					show:false
				},
				type: 'time',
				axisPointer: {
					animation: true,
					label: {
						show: true
					}
				},
				axisLabel: {
					textStyle: {
						color: '#878787',
						fontStyle: 'normal',
						fontWeight: 'normal',
						fontFamily: "'Roboto', sans-serif",
						fontSize: 12
					}
				},
				axisLine: {
						show:false
				},
				splitLine: {
					show: false,
				}
			},

			series: [
				{
					type: 'themeRiver',
					color: ['#d36ee8', '#119dd2', '#667add'],
					label: {
						normal: {
							show: false
						}
					},
					itemStyle: {
						emphasis: {
							shadowBlur: 5,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					},
					data: [['2015/11/08',10,'DQ'],['2015/11/09',15,'DQ'],['2015/11/10',35,'DQ'],
					['2015/11/14',7,'DQ'],['2015/11/15',2,'DQ'],['2015/11/16',17,'DQ'],
					['2015/11/17',33,'DQ'],['2015/11/18',40,'DQ'],['2015/11/19',32,'DQ'],
					['2015/11/20',26,'DQ'],['2015/11/21',35,'DQ'],['2015/11/22',40,'DQ'],
					['2015/11/23',32,'DQ'],['2015/11/24',26,'DQ'],['2015/11/25',22,'DQ'],
					['2015/11/08',35,'TY'],['2015/11/09',36,'TY'],['2015/11/10',37,'TY'],
					['2015/11/11',22,'TY'],['2015/11/12',24,'TY'],['2015/11/13',26,'TY'],
					['2015/11/14',34,'TY'],['2015/11/15',21,'TY'],['2015/11/16',18,'TY'],
					['2015/11/17',45,'TY'],['2015/11/18',32,'TY'],['2015/11/19',35,'TY'],
					['2015/11/20',30,'TY'],['2015/11/21',28,'TY'],['2015/11/22',27,'TY'],
					['2015/11/23',26,'TY'],['2015/11/24',15,'TY'],['2015/11/25',30,'TY'],
					['2015/11/26',35,'TY'],['2015/11/27',42,'TY'],['2015/11/28',42,'TY'],
					['2015/11/08',21,'SS'],['2015/11/09',25,'SS'],['2015/11/10',27,'SS'],
					['2015/11/11',23,'SS'],['2015/11/12',24,'SS'],['2015/11/13',21,'SS'],
					['2015/11/14',35,'SS'],['2015/11/15',39,'SS'],['2015/11/16',40,'SS'],
					['2015/11/17',36,'SS'],['2015/11/18',33,'SS'],['2015/11/19',43,'SS'],
					['2015/11/20',40,'SS'],['2015/11/21',34,'SS'],['2015/11/22',28,'SS'],
					]
				}
			]
		};
		eChart_1.setOption(option);
		eChart_1.resize();
	}
	if( $('#e_chart_2').length > 0 ){
		var eChart_2 = echarts.init(document.getElementById('e_chart_2'));
		var option1 = {
			  series: [{
				type: 'liquidFill',
				data: [0.7, 0.5, 0.4],
				color: ['#119dd2', '#d36ee8', '#667add'],
				backgroundStyle: {
					borderWidth: 0,
					color: 'rgba(255,255,255,0)',
					shadowBlur: 0
				},
				itemStyle: {
					normal: {
						shadowBlur: 5,
						shadowColor: 'rgba(0, 0, 0, .5)'
					}
				},
				 shape: 'container',
				outline: {
					show: false
				},
				label: {
					normal: {
						fontSize: 20
					}
				}
			}]
		};
		eChart_2.setOption(option1);
		eChart_2.resize();
	}
	if( $('#e_chart_3').length > 0 ){
		var eChart_3 = echarts.init(document.getElementById('e_chart_3'));
		var option3 = {
			tooltip : {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)",
				backgroundColor: 'rgba(33,33,33,1)',
				borderRadius:0,
				padding:10,
				textStyle: {
					color: '#fff',
					fontStyle: 'normal',
					fontWeight: 'normal',
					fontFamily: "'Roboto', sans-serif",
					fontSize: 12
				}	
			},
			legend: {
				show:false
			},
			toolbox: {
				show : false,
			},
			calculable : true,
			itemStyle: {
				 normal: {
					 shadowBlur: 5,
					 shadowColor: 'rgba(0, 0, 0, 0.5)'
				 }
			},
			series : [
				{
					name:'Advertising',
					type:'pie',
					radius : '80%',
					center : ['50%', '50%'],
					roseType : 'radius',
					color: ['#119dd2', '#d36ee8', '#667add'],
					label: {
						normal: {
							fontFamily: "'Roboto', sans-serif",
							fontSize: 12
						}
					},
					data:[
						{value:335, name:'Active'},
						{value:310, name:'Closed'},
						{value:274, name:'Hold'},
					].sort(function (a, b) { return a.value - b.value; }),
				},
			],
			animationType: 'scale',
			animationEasing: 'elasticOut',
			animationDelay: function (idx) {
				return Math.random() * 1000;
			}	
		};
		eChart_3.setOption(option3);
		eChart_3.resize();
	}
}
/*****E-Charts function end*****/

/*****Sparkline function start*****/
var sparklineLogin = function() { 
	if( $('#sparkline_1').length > 0 ){
		$("#sparkline_1").sparkline([2,4,4,6,8,5,6,4,8,6,6,2 ], {
			type: 'bar',
			width: '100%',
			height: '35',
			barWidth: '5',
			barSpacing: '5',
			barColor: '#667add',
			highlightSpotColor: '#667add'
		});
	}	
	if( $('#sparkline_2').length > 0 ){
		$("#sparkline_2").sparkline([0,2,8,6,8,5,3,5,7,2,4], {
			type: 'bar',
			width: '100%',
			height: '35',
			barWidth: '5',
			barSpacing: '5',
			barColor: '#667add',
			highlightSpotColor: '#667add'
		});
	}	
	if( $('#sparkline_3').length > 0 ){
		$("#sparkline_3").sparkline([0, 23, 43, 35, 44, 45, 56, 37, 40, 45, 56, 7, 10], {
			type: 'bar',
			width: '100%',
			height: '35',
			barWidth: '5',
			barSpacing: '5',
			barColor: '#667add',
			highlightSpotColor: '#667add'
		});
	}
	if( $('#sparkline_4').length > 0 ){
		$("#sparkline_4").sparkline([0,2,8,6,8,5,6,4,8,6,6,2 ], {
			type: 'line',
			width: '100%',
			height: '50',
			lineColor: '#667add',
			fillColor: '#667add',
			minSpotColor: '#667add',
			maxSpotColor: '#667add',
			spotColor: '#667add',
			highlightLineColor: '#667add',
			highlightSpotColor: '#667add'
		});
	}	
}
/*****Sparkline function end*****/

/*****Resize function start*****/
var sparkResize,echartResize;
$(window).on("resize", function () {
	/*Sparkline Resize*/
	clearTimeout(sparkResize);
	sparkResize = setTimeout(sparklineLogin, 200);
	
	/*E-Chart Resize*/
	clearTimeout(echartResize);
	echartResize = setTimeout(echartsConfig, 200);
}).resize(); 
/*****Resize function end*****/

/*****Function Call start*****/
sparklineLogin();
echartsConfig();
/*****Function Call end*****/