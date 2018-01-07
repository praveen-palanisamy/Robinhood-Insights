/*Dashboard Init*/
 
"use strict"; 

/*****Ready function start*****/
$(document).ready(function(){
	if( $('#employee_table').length > 0 ) {
		$('#employee_table').DataTable({
		 "bFilter": false,
		 "bLengthChange": false,
		 "bPaginate": false,
		 "bInfo": false,
		});
	}
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
		//data
		var data = [20, 82, 591, 234, 190, 330, 310];
		var markLineData = [];
		for (var i = 1; i < data.length; i++) {
			markLineData.push([{
				xAxis: i - 1,
				yAxis: data[i - 1],
				value: (data[i] + data[i-1]).toFixed(2)
			}, {
				xAxis: i,
				yAxis: data[i]
			}]);
		}

		//option
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
			color: ['#667add'],	
			grid:{
				top: 60,
				left:40,
				bottom: 30
			},
			xAxis: {
				data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				axisLine: {
					show:false
				},
				axisLabel: {
					textStyle: {
						color: '#878787',
						fontSize: 12,
						fontFamily: "'Roboto', sans-serif",
					}
				},
			},
			yAxis: {
				axisLine: {
					show:false
				},
				axisLabel: {
					textStyle: {
						color: '#878787',
						fontSize: 12,
						fontFamily: "'Roboto', sans-serif",
					}
				},
				splitLine: {
					show: false,
				},
			},
			series: [{
				type: 'line',
				data:data,
				markPoint: {
					data: [
						{type: 'max', name: '最大值'},
						{type: 'min', name: '最小值'}
					]
				},
				markLine: {
					smooth: true,
							effect: {
								show: true
							},
							distance: 10,
					label: {
						normal: {
							position: 'middle'
						}
					},
					symbol: ['none', 'none'],
					data: markLineData
				}
			}]
		};
		eChart_1.setOption(option);
		eChart_1.resize();
	}
	if( $('#e_chart_2').length > 0 ){
		var eChart_2 = echarts.init(document.getElementById('e_chart_2'));
		var option1 = {
			animation: false,
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
			color: ['#667add'],	
			grid: {
				top: 60,
				left:40,
				bottom: 30
			},
			xAxis: {
				type : 'category',
				splitLine: {show:false},
				axisLine: {
					show:false
				},
				axisLabel: {
					textStyle: {
						color: '#878787',
						fontSize: 12,
						fontFamily: "'Roboto', sans-serif",
					}
				},
				splitLine: {
					show:false
				},
				data : ['a','b','c','d','e','f']
			},
			yAxis: {
				type : 'value',
				axisLine: {
					show:false
				},
				axisLabel: {
					textStyle: {
						color: '#878787',
						fontSize: 12,
						fontFamily: "'Roboto', sans-serif",
					}
				},
				splitLine: {
					show:false
				},
			},
			series: [
				{
					name: 'bb1',
					type: 'bar',
					stack:  'a1',
					itemStyle: {
						normal: {
							barBorderColor: 'rgba(0,0,0,0)',
							color: 'rgba(0,0,0,0)'
						},
						emphasis: {
							barBorderColor: 'rgba(0,0,0,0)',
							color: 'rgba(0,0,0,0)'
						}
					},
					data: [0, 1700, 1400, 1200, 300, 0]
				},
				{
					name: 'aa1',
					type: 'bar',
					stack: 'a1',
					label: {
						normal: {
							show: true,
							position: 'inside'
						}
					},
					data:[2900, 1200, 300, 200, 900, 300]
				}
		]}
		eChart_2.setOption(option1);
		eChart_2.resize();
	}
	if( $('#e_chart_3').length > 0 ){
		var eChart_3 = echarts.init(document.getElementById('e_chart_3'));
		var option3 = {
			color: ['#fd7397','#d36ee8', '#119dd2', '#667add'],
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
			xAxis: {
				type: 'category',

				boundaryGap: false,
				splitLine: {
					show: false
				},
				axisLine: {
					show:false
				},
				axisLabel: {
					textStyle: {
						color: '#878787',
						fontSize: 12,
						fontFamily: "'Roboto', sans-serif",
					}
				},
				"splitArea": {
					"show": false
				},
				
				data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
			},
			grid: {
				left: '6%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			yAxis: {
				axisLine: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#878787',
						fontSize: 12,
						fontFamily: "'Roboto', sans-serif",
					}
				},
				splitLine: {
					show: false,
				},
			},
			series: [{
					name: 'A',
					type: 'line',
					smooth: true,
					symbol: 'circle',
					symbolSize: 4,
					showSymbol: false,
					lineStyle: {
						normal: {
							width: 0
						}
					},
					areaStyle: {
						normal: {
							opacity: "1",
						}
					},
					data: [0, 7.5, 1.0, 3.7, 0, 3, 8, 0,3.6, 4, 2, 0]
				},

				{
					name: 'B',
					type: 'line',
					smooth: true,
					symbol: 'circle',
					symbolSize: 4,
					showSymbol: false,
					lineStyle: {
						normal: {
							width: 0
						}
					},
					areaStyle: {
						normal: {
							opacity: "1",
						}
					},
					data: [0, 2.2, 2, 2.2, 0, 1.5, 0, 2.4, 1, 3, 1, 0]
				}, {
					name: 'C',
					type: 'line',
					smooth: true,
					symbol: 'circle',
					symbolSize: 4,
					showSymbol: false,
					lineStyle: {
						normal: {
							width: 0
						}
					},
					areaStyle: {
						normal: {
							opacity: "1",
						}
					},
					data: [0, 2.3, 0, 1.2, 1, 3, 0, 3.3, 0, 2, 0.3, 0]
				},

				{
					name: 'D',
					type: 'line',
					smooth: true,
					symbol: 'circle',
					symbolSize: 4,
					showSymbol: false,
					lineStyle: {
						normal: {
							width: 0
						}
					},
					areaStyle: {
						normal: {
							opacity: "1",
						}
					},
					data: [0, 10, 0.13,2,0, 2, 0, 3.7, 0, 1, 3, 0]
				}
			]
		};
		eChart_3.setOption(option3);
		eChart_3.resize();
	}
	if( $('#e_chart_4').length > 0 ){
		var eChart_4 = echarts.init(document.getElementById('e_chart_4'));
		var data = [];
		for (var i = 0; i <= 10; i++) {
			var theta = i / 200 * 260;
			var r = 5 * (1 + Math.sin(theta / 710 * Math.PI));
			data.push([r, theta]);
		}
		var option4 = {
			polar: {},
			tooltip: {
				trigger: 'axis',
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
			angleAxis: {
				type: 'value',
				startAngle: 0,
				axisLine: {
					lineStyle: {
						color: 'rgba(33, 33, 33, 0.1)'
					}
				},
				axisLabel: {
					textStyle: {
						color: '#878787',
						fontSize: 12,
						fontFamily: "'Roboto', sans-serif",
					}
				},
			},
			radiusAxis: {
				axisLine: {
					lineStyle: {
						color: 'rgba(33, 33, 33, 0.1)'
					}
				},
				axisLabel: {
					textStyle: {
						color: '#878787',
						fontSize: 12,
						fontFamily: "'Roboto', sans-serif",
					}
				},
			},
			series: [{
				coordinateSystem: 'polar',
				name: 'line',
				type: 'line',
				lineStyle: {
					normal: {
						color: '#667add',
					}
				},
				itemStyle: {
					normal: {
						color: '#667add',
					}
				},
				 areaStyle: {
					normal: {
						color: '#667add'
					}
					},
				
				data: data
			}]
		};
		eChart_4.setOption(option4);
		eChart_4.resize();
	}
}
/*****E-Charts function end*****/

/*****Resize function start*****/
var echartResize;
$(window).on("resize", function () {
	/*E-Chart Resize*/
	clearTimeout(echartResize);
	echartResize = setTimeout(echartsConfig, 200);
}).resize(); 
/*****Resize function end*****/

/*****Function Call start*****/
echartsConfig();
/*****Function Call end*****/