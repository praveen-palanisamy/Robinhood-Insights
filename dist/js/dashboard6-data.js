/*Dashboard Init*/
 
"use strict"; 

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
			toolbox: {
				show: true,
				orient: 'vertical',
				left: 'right',
				top: 'center',
				showTitle: false,
				feature: {
					mark: {show: true},
					magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
					restore: {show: true},
				}
			},
			grid: {
				left: '3%',
				right: '10%',
				bottom: '3%',
				containLabel: true
			},
			xAxis : [
				{
					type : 'category',
					data : ['2011','2012','2013','2014','2015','2016','2017'],
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
				}
			],
			yAxis : [
				{
					type : 'value',
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
						show: false,
					}
				}
			],
			series : [
				{
					name:'1',
					type:'bar',
					data:[320, 332, 301, 334, 390, 330, 320]
				},
				{
					name:'2',
					type:'bar',
					stack: 'st1',
					data:[120, 132, 101, 134, 90, 230, 210]
				},
				{
					name:'3',
					type:'line',
					stack: 'st1',
					data:[220, 182, 191, 234, 290, 330, 310]
				},
				{
					name:'4',
					type:'bar',
					stack: 'st1',
					data:[50, 32, 1, 154, 190, 330, 410]
				}
			]
		};

		eChart_1.setOption(option);
		eChart_1.resize();
	}
}
/*****E-Charts function end*****/

/*****Sparkline function start*****/
var sparklineLogin = function() { 
	if( $('#sparkline_6').length > 0 ){
		$("#sparkline_6").sparkline([12,4,7,3,8,6,8,5], {
			type: 'bar',
			width: '100%',
			height: '124',
			barWidth: '3',
			resize: true,
			barSpacing: '10',
			barColor: '#667add',
			highlightSpotColor: '#667add'
		});
	}	
	if( $('#sparkline_7').length > 0 ){
		$("#sparkline_7").sparkline([5,4,24], {
			type: 'pie',
			width: '100',
			height: '100',
			sliceColors: ['#d36ee8', '#119dd2', '#667add'],
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
	echartResize = setTimeout(echartsConfig, 300);
}).resize(); 
/*****Resize function end*****/

/*****Function Call start*****/
sparklineLogin();
echartsConfig();
/*****Function Call end*****/