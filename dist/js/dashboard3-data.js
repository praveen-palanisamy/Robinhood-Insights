/*Dashboard3 Init*/
 
"use strict"; 

/*****Ready function start*****/
$(document).ready(function(){
	$('#support_table').DataTable({
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
			color: ['#d36ee8', '#119dd2', '#667add'],
			series : [
				{
					name:'漏斗图',
					type:'funnel',
					x: '0%',
					y: 20,
					//x2: 80,
					y2: 60,
					width: '100%',
					height:'80%',
					// height: {totalHeight} - y - y2,
					min: 0,
					max: 100,
					minSize: '0%',
					maxSize: '100%',
					sort : 'ascending', // 'ascending', 'descending'
					gap :0,
					
					data:[
						{value:100,},
						{value:80,},
						{value:100,},
						
					].sort(function (a, b) { return a.value - b.value}),
					roseType: true,
					label: {
						normal: {
							formatter: function (params) {
								return params.name + ' ' + params.value + '%';
							},
							position: 'center',
							fontStyle: 'normal',
							fontWeight: 'normal',
							fontFamily: "'Roboto', sans-serif",
							fontSize: 12
						}
					},
					itemStyle: {
						normal: {
							borderWidth: 0,
							shadowBlur: 5,
							shadowOffsetX: 0,
							shadowOffsetY: 5,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
					
				}
				
			]
		};

		eChart_1.setOption(option);
		eChart_1.resize();
	}
	if( $('#e_chart_2').length > 0 ){
		var eChart_2 = echarts.init(document.getElementById('e_chart_2'));
		var option1 = {
			tooltip : {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			color: ['#fd7397','#d36ee8', '#119dd2', '#667add'],
			series : [
				{
					name: 'task',
					type: 'pie',
					radius : '60%',
					center: ['50%', '50%'],
					tooltip : {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)",
						backgroundColor: 'rgba(33,33,33,1)',
						borderRadius:0,
						padding:10,
					},
					data:[
						{value:335, name:'task 1'},
						{value:310, name:'task 2'},
						{value:734, name:'task 3'},
						{value:135, name:'task 4'},
				   ],
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		};
		eChart_2.setOption(option1);
		eChart_2.resize();
	}
	if( $('#e_chart_3').length > 0 ){
		var eChart_3 = echarts.init(document.getElementById('e_chart_3'));
		var colors = ['#667add', '#fd7397'];
		var option3 = {
			color: colors,

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
				top: 30,
				bottom: 10,
				containLabel: true,
			},
			xAxis: [
				{
					type: 'category',
					axisTick: {
						alignWithLabel: true
					},
					axisLine: {
						show:false
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
					axisPointer: {
						label: {
							formatter: function (params) {
								return params.value
									+ (params.seriesData.length ? '：' + params.seriesData[0].data : '');
							}
						}
					},
					data: ["2016-1", "2016-2", "2016-3", "2016-4", "2016-5", "2016-6", "2016-7", "2016-8", "2016-9", "2016-10", "2016-11", "2016-12"]
				},
				{
					type: 'category',
					axisTick: {
						alignWithLabel: true
					},
					axisLine: {
						show:false
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
					axisPointer: {
						label: {
							formatter: function (params) {
								return  params.value
									+ (params.seriesData.length ? '：' + params.seriesData[0].data : '');
							}
						}
					},
					data: ["2015-1", "2015-2", "2015-3", "2015-4", "2015-5", "2015-6", "2015-7", "2015-8", "2015-9", "2015-10", "2015-11", "2015-12"]
				}
			],
			yAxis: [
				{
					type: 'value',
					axisLine: {
						show:false
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
					splitLine: {
						show: false,
					}
				}
			],
			series: [
				{
					name:'2015',
					type:'line',
					xAxisIndex: 1,
					smooth: true,
					data: [4.6, 1.9, 3.0, 6.4, 8.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
				},
				{
					name:'2016',
					type:'line',
					smooth: true,
					data: [32.9, 15.9, 1.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
				}
			]
		};

		eChart_3.setOption(option3);
		eChart_3.resize();
	}
	if( $('#e_chart_4').length > 0 ){
		var eChart_4 = echarts.init(document.getElementById('e_chart_4'));
		var option4 = {
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
			grid: {
				left: '10%',
				right: '10%',
				bottom: '15%'
			},
			yAxis: {
				type: 'category',
				data: ['Adjacent to subway', 'Away from subway'],
				nameTextStyle: {
					color: '#878787',
					fontSize: 14,
				},
				axisLine: {
					show:false
				},
				
				axisTick:{
					show:false,
				},
				axisLabel:{
					rotate:90,
					textStyle: {
						color: '#878787',
						fontStyle: 'normal',
						fontWeight: 'normal',
						fontFamily: "'Roboto', sans-serif",
						fontSize: 12
					}
				},
				splitLine: {
					show: false
				}
			},
			
			xAxis: {
				type: 'value',
				
				nameTextStyle: {
					color: '#878787',
					fontSize: 14,
				},
				axisLine: {
					show:false
				},
				axisLabel:{
					textStyle: {
						color: '#878787',
						fontStyle: 'normal',
						fontWeight: 'normal',
						fontFamily: "'Roboto', sans-serif",
						fontSize: 12
					}
				},
				splitLine: {
					show:false
				}
				
			},
			series: [{
					name: 'boxplot',
					type: 'boxplot',
					data: [
						[216, 599.5, 694, 504, 980],
						[216, 599.5, 694, 504, 980]
					],
					itemStyle: {
						normal:{
							borderColor: {
							type: 'linear',
							x: 1,
							y: 0,
							x2: 0,
							y2: 0,
							colorStops: [{
								offset: 0,
								color: '#667add' // 0% 
							}, {
								offset: 1,
								color: '#119dd2' // 100% 
							}],
							globalCoord: false //
						},
						borderWidth:2,
						color: {
							type: 'linear',
							x: 1,
							y: 0,
							x2: 0,
							y2: 0,
							colorStops: [{
								offset: 0,
								color: 'rgba(0,0,0,0)'  // 0% 处的颜色
							}, {
								offset: 1,
								color: 'rgba(0,0,0,0)' // 100% 处的颜色
							}],
							globalCoord: false // 缺省为 false
						},
					}
					},
					tooltip: {
						formatter: function(param) {
							return [

								'upper: ' + param.data[5],
								'Q3: ' + param.data[4],
								'median: ' + param.data[3],
								'Q1: ' + param.data[2],
								'lower: ' + param.data[1]
							].join('<br/>')
						}
					}
				},

			]
		};
		eChart_4.setOption(option4);
		eChart_4.resize();
	}
}
/*****E-Charts function end*****/

/*****Sparkline function start*****/
var sparklineLogin = function() { 
		if( $('#sparkline_4').length > 0 ){
			$("#sparkline_4").sparkline([2,4,4,6,8,5,6,4,8,6,6,2 ], {
				type: 'line',
				width: '100%',
				height: '45',
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
	var sparkResize;
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