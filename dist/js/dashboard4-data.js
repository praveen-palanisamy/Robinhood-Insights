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
				
		var data = [
			[[48604,77,17096869,'Australia',1990],[21163,77.4,27662440,'Canada',1990],[1516,68,1154605773,'China',1990],[13670,74.7,10582082,'Cuba',1990],[28599,75,4986705,'Finland',1990],[29476,77.1,56943299,'France',1990],[31476,75.4,78958237,'Germany',1990],[28666,78.1,254830,'Iceland',1990],[1777,57.7,870601776,'India',1990],[29550,79.1,122249285,'Japan',1990],[2076,67.9,20194354,'North Korea',1990],[12087,72,42972254,'South Korea',1990],[24021,75.4,3397534,'New Zealand',1990],[43296,76.8,4240375,'Norway',1990],[10088,70.8,38195258,'Poland',1990],[19349,69.6,147568552,'Russia',1990],[10670,67.3,53994605,'Turkey',1990],[26424,75.7,57110117,'United Kingdom',1990],[37062,75.4,252847810,'United States',1990]],
			[[14056,81.8,23968973,'Australia',2015],[53294,81.7,35939927,'Canada',2015],[13334,76.9,1376048943,'China',2015],[21291,78.5,11389562,'Cuba',2015],[38923,80.8,5503457,'Finland',2015],[37599,81.9,64395345,'France',2015],[44053,81.1,80688545,'Germany',2015],[42182,82.8,329425,'Iceland',2015],[5903,66.8,1311050527,'India',2015],[36162,83.5,126573481,'Japan',2015],[1390,71.4,25155317,'North Korea',2015],[34644,80.7,50293439,'South Korea',2015],[34186,80.6,4528526,'New Zealand',2015],[64304,81.6,5210967,'Norway',2015],[24787,77.3,38611794,'Poland',2015],[23038,73.13,143456918,'Russia',2015],[19360,76.5,78665830,'Turkey',2015],[38225,81.4,64715810,'United Kingdom',2015],[53354,79.1,321773631,'United States',2015]]
		];

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
				top: 30,
				bottom: 10,
				containLabel: true,
			},
			xAxis: {
				axisLine: {
					show:false
				},
				axisLabel: {
					textStyle: {
						color: '#878787',
						fontFamily: "'Roboto', sans-serif",
						fontSize: 12
					}
				},
				splitLine: {
					show:false
				}
			},
			yAxis: {
				axisLine: {
					show:false
				},
				axisLabel: {
					textStyle: {
						color: '#878787',
						fontFamily: "'Roboto', sans-serif",
						fontSize: 12
					}
				},
				splitLine: {
					show:false
				},
				scale: true
			},
			series: [{
				name: '1990',
				data: data[0],
				type: 'scatter',
				symbolSize: function (data) {
					return Math.sqrt(data[2]) / 5e2;
				},
				label: {
					emphasis: {
						show: true,
						formatter: function (param) {
							return param.data[3];
						},
						position: 'top'
					}
				},
				itemStyle: {
					normal: {
						shadowBlur: 5,
						shadowColor: 'rgba(0, 0, 0, 0.5)',
						shadowOffsetY: 5,
						color: '#667add'
					}
				}
			}, {
				name: '2015',
				data: data[1],
				type: 'scatter',
				symbolSize: function (data) {
					return Math.sqrt(data[2]) / 5e2;
				},
				label: {
					emphasis: {
						show: true,
						formatter: function (param) {
							return param.data[3];
						},
						position: 'top'
					}
				},
				itemStyle: {
					normal: {
						shadowBlur: 5,
						shadowColor: 'rgba(0, 0, 0, 0.5)',
						shadowOffsetY: 5,
						color: '#667add',
					}
				}
			},
			{
				name: 'line',
				type: 'line',
				lineStyle: {
					normal: {
						color: 'rgba(102,122,221, 0.1)',
						type:'dotted',
						shadowBlur: 5,
						shadowColor: 'rgba(0, 0, 0, 0.1)',
						shadowOffsetY: 5,
					}
				},
				smooth: true,
				showSymbol: false,
				data: data[0],
				markPoint: {
					itemStyle: {
						normal: {
							color: 'transparent'
						}
					}
				}
		}]
		};
		eChart_1.setOption(option);
		eChart_1.resize();
	}
	if( $('#e_chart_2').length > 0 ){
		var eChart_2 = echarts.init(document.getElementById('e_chart_2'));
		var option1 = {
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
			yAxis: {
				type: 'value',
				axisTick: {
					show: false
				},
				axisLine: {
					show: false,
					lineStyle: {
						color: '#fff',
					}
				},
				splitLine: {
					show: false,
				},
			},
			xAxis: [{
					type: 'category',
					axisTick: {
						show: false
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: '#fff',
						}
					},
					data: ['Dt1', 'Dt2', 'Dt3']
				}, {
					type: 'category',
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						show: false
					},
					splitArea: {
						show: false
					},
					splitLine: {
						show: false
					},
					data: ['Dt1', 'Dt2', 'Dt3']
				},

			],
			series: [{
					name: 'Appoinment1',
					type: 'bar',
					xAxisIndex: 1,

					itemStyle: {
						normal: {
							show: true,
							color: '#667add',
							barBorderRadius: 0,
							borderWidth: 0,
							borderColor: '#fff',
						}
					},
					barWidth: '20%',
					data: [1000, 1000, 1000]
				}, {
					name: 'Appoinment2',
					type: 'bar',
					xAxisIndex: 1,

					itemStyle: {
						normal: {
							show: true,
							color: '#667add',
							barBorderRadius: 0,
							borderWidth: 0,
							borderColor: '#fff',
						}
					},
					barWidth: '20%',
					barGap: '100%',
					data: [1000, 1000, 1000]
				}, {
					name: 'Appoinment3',
					type: 'bar',
					itemStyle: {
						normal: {
							show: true,
							color: '#119dd2',
							barBorderRadius: 0,
							borderWidth: 0,
							borderColor: '#fff',
						}
					},
					label: {
						normal: {
							show: true,
							position: 'top',
							textStyle: {
								color: '#fff'
							}
						}
					},
					barWidth: '20%',
					data: [398, 419, 452]
				}, {
					name: 'Appoinment4',
					type: 'bar',
					barWidth: '20%',
					itemStyle: {
						normal: {
							show: true,
							color: '#d36ee8',
							barBorderRadius: 0,
							borderWidth: 0,
							borderColor: '#fff',
						}
					},
					label: {
						normal: {
							show: true,
							position: 'top',
							textStyle: {
								color: '#fff'
							}
						}
					},
					barGap: '100%',
					data: [425, 437, 484]
				}

			]
		};
		
		eChart_2.setOption(option1);
		eChart_2.resize();
	}
	if( $('#e_chart_3').length > 0 ){
		var eChart_3 = echarts.init(document.getElementById('e_chart_3'));
		var colors = ['#007153', '#d36ee8'];
		var option3 = {
			tooltip: {
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
			series: [
				{
					name:'',
					type:'pie',
					radius: ['42%', '55%'],
					color: ['#fd7397','#d36ee8', '#119dd2', '#667add'],
					label: {
						normal: {
							formatter: '{b}\n{d}%'
						},
				  
					},
					data:[
						{value:435, name:''},
						{value:679, name:''},
						{value:848, name:''},
						{value:348, name:''},
					]
				}
			]
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
			type: 'line',
			width: '100%',
			height: '35',
			lineColor: '#667add',
			fillColor: 'transparent',
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