<?php
session_start();

if (count($_SESSION['txns']) > 0) 
{
		$transactions = &$_SESSION['txns'];
		// Sort transactions based on "updated_at" timestamp
		function date_compare($a, $b)
		{
			if (date($a["updated_at"]) == date($b["updated_at"]))
				return 0;

			return (date($a['updated_at']) < date($b['updated_at'])) ? -1 : 1;

		}

		usort($transactions, "date_compare");
		
		
		$cols = array_keys($_SESSION['txns'][0]);
}
?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Robinhood-Insights : Get powerful insights into your Robinhood Portfolio</title>
  <meta name="description" content="Robinhood-Insights provides powerful insights into your Robinhood portfolio with a responsive and cool Dashboard &amp;.">
  <meta name="keywords" content="Robinhood, finance, portfolio, robinhood insights, robinhood export, robinhood holdings, robinhood analysis, robinhood portfolio analysis ">
  <meta name="author" content="Praveen Palanisamy">
  <!-- Favicon -->
  <link rel="shortcut icon" href="favicon.ico">
  <link rel="icon" href="favicon.ico" type="image/x-icon">
  <!-- Data table CSS -->
  <link href="vendors/bower_components/datatables/media/css/jquery.dataTables.min.css" rel="stylesheet" type="text/css">
  <link href="vendors/bower_components/jquery-toast-plugin/dist/jquery.toast.min.css" rel="stylesheet" type="text/css">
  <!-- Custom CSS -->
  <link href="dist/css/style.css" rel="stylesheet" type="text/css"> </head>

<!--START -->

<!-- jQuery -->
<script src="vendors/bower_components/jquery/dist/jquery.min.js"></script>
<script type="text/javascript">

	var Queue = function() {
				 var functionSet=(function() {
					 var _elements=[]; // creating a private array
					 return [
					 // put function
					 function()
						{ return _elements.push .apply(_elements,arguments); },
					  // get function
					 function()
						{ return _elements.shift .apply(_elements,arguments); },
					 function() { return _elements.length; },
					 function(n) { return _elements.length=n; }];
				 })();
				 this.put=functionSet[0];
				 this.get=functionSet[1];
				 this.getLength=functionSet[2];
				 this.setLength=functionSet[3];
				 // initializing the queue with given arguments
				 this.put.apply(this,arguments);
	};

	var txns = <?php echo json_encode($transactions); ?>;
	//Calculate Holdings
	if(Array.isArray(txns) && txns.length)
	{
		//Cols: "average_price", "name", "quantity", "side", "symbol", "updated_at" 
		
		// 1. Keep track of the buy/sell to calc holdings per stock in a FIFO Queue
		var txnsQ ={};
		for (var i=0 ; i< txns.length ; i++)
		{
			var stockName = txns[i]['symbol'];
			if (txnsQ[stockName] == undefined)
				txnsQ[stockName] = new Queue();
			
			var qty = txns[i]['quantity'];
			if (txns[i]['side'] == 'buy')
			{
				for( var t=0; t < qty; t++)
					txnsQ[stockName].put([ txns[i]['name'], txns[i]['updated_at'], txns[i]['average_price'] ]);
			}

			if ( txns[i]['side'] == 'sell')
			{
				for(var t=0; t < qty; t++)
					var temp = txnsQ[stockName].get(); // Pop sold shares out of the holdings Q
			}
		}

		// 2. 

		portfolio=[];

		one_year_ago= new Date(); one_year_ago.setMonth(one_year_ago.getMonth() - 12);
		for(var key in txnsQ)
		{
			var shares=[], num_shares=0, avg_cost=0.0, longT_holdings=0;
			while ( txnsQ[key].getLength())
			{
				var item = txnsQ[key].get();
				shares.push(item);
				num_shares++;
				avg_cost= avg_cost + parseFloat(item[2]);//average_price
				purchase_date = new Date(item[1]);//updated_at
				if ( purchase_date < one_year_ago)//Buy date b4 1 yr
					longT_holdings++;

			}

			portfolio.push({'symbol':key, 'shares':shares, 'num_shares':num_shares, 'avg_cost_per_share':avg_cost/num_shares, 'num_long_term_holdings':longT_holdings});

		}

		
		
	}

		
	
</script>

<!--END -->

<body>
  <!-- Preloader -->
  <div class="preloader-it">
    <div class="la-anim-1"></div>
  </div>
  <!-- /Preloader -->
  <div class="wrapper  theme-1-active pimary-color-blue">
    <!-- Top Menu Items -->
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="mobile-only-brand pull-left">
        <div class="nav-header pull-left">
          <div class="logo-wrap">
            <a href="index.html">
              <span class="brand-text">Robinhood-Insights</span></a>
          </div>
        </div>
        <a id="toggle_nav_btn" class="toggle-left-nav-btn inline-block ml-20 pull-left" href="javascript:void(0);"><i class="zmdi zmdi-menu"></i></a>
        <a id="toggle_mobile_search" data-toggle="collapse" data-target="#search_form" class="mobile-only-view" href="javascript:void(0);"><i class="zmdi zmdi-search"></i></a>
        <a id="toggle_mobile_nav" class="mobile-only-view" href="javascript:void(0);"><i class="zmdi zmdi-more"></i></a>
        <form id="search_form" role="search" class="top-nav-search collapse pull-left">
          <div class="input-group">
            <input type="text" name="example-input1-group2" class="form-control" placeholder="Search"> <span class="input-group-btn">
						<button type="button" class="btn  btn-default" data-target="#search_form" data-toggle="collapse" aria-label="Close" aria-expanded="true"><i class="zmdi zmdi-search"></i></button>
						</span> </div>
        </form>
      </div>
      <div id="mobile_only_nav" class="mobile-only-nav pull-right">
        <ul class="nav navbar-right top-nav pull-right">
          <li class="dropdown alert-drp">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="zmdi zmdi-notifications top-nav-icon"></i><span class="top-nav-icon-badge">1</span></a>
            <ul class="dropdown-menu alert-dropdown" data-dropdown-in="bounceIn" data-dropdown-out="bounceOut">
              <li>
                <div class="notification-box-head-wrap"> <span class="notification-box-head pull-left inline-block">notifications</span>
                  <a class="txt-danger pull-right clear-notifications inline-block" href="javascript:void(0)"> clear all </a>
                  <div class="clearfix"></div>
                  <hr class="light-grey-hr ma-0"> </div>
              </li>
              <li>
                <div class="streamline message-nicescroll-bar">
                  <hr class="light-grey-hr ma-0">
                  <div class="sl-item">
                    <a href="javascript:void(0)">
                      <div class="icon bg-yellow"> <i class="zmdi zmdi-trending-down"></i> </div>
                      <div class="sl-content"> <span class="inline-block capitalize-font  pull-left truncate head-notifications txt-warning">Imbalanced Portfolio</span> <span class="inline-block font-11 pull-right notifications-time">1pm</span>
                        <div class="clearfix"></div>
                        <p class="truncate">Consider rebalancing your portfolio to balance the risks. Click here for more insights and suggestions</p>
                      </div>
                    </a>
                  </div>
                  <hr class="light-grey-hr ma-0">
                </div>
              </li>
              <li>
                <div class="notification-box-bottom-wrap">
                  <hr class="light-grey-hr ma-0">
                  <a class="block text-center read-all" href="javascript:void(0)"> read all </a>
                  <div class="clearfix"></div>
                </div>
              </li>
            </ul>
          </li>
          <li class="dropdown auth-drp">
            <a href="#" class="dropdown-toggle pr-0" data-toggle="dropdown">
              <img src="dist/img/user1.png" alt="user_auth" class="user-auth-img img-circle"><span class="user-online-status"></span></a>
            <ul class="dropdown-menu user-auth-dropdown" data-dropdown-in="flipInX" data-dropdown-out="flipOutX">
              <li>
                <a href="profile.html"><i class="zmdi zmdi-account"></i><span>Profile</span></a>
              </li>
              <li>
                <a href="#"><i class="zmdi zmdi-settings"></i><span>Settings</span></a>
              </li>
              <li class="divider"></li>
              <li>
                <a href="#"><i class="zmdi zmdi-power"></i><span>Log Out</span></a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
    <!-- /Top Menu Items -->
    <!-- Left Sidebar Menu -->
    <div class="fixed-sidebar-left">
      <ul class="nav navbar-nav side-nav nicescroll-bar">
        <li class="navigation-header"> <span>Navigation</span> <i class="zmdi zmdi-more"></i> </li>
        <li>
          <a class="active" href="javascript:void(0);" data-toggle="collapse" data-target="#dashboard_dr">
            <div class="pull-left"><i class="zmdi zmdi-landscape mr-20"></i><span class="right-nav-text">Dashboard</span></div>
          </a>
        </li>
        <li>
          <a href="export.php" data-toggle="collapse" data-target="#ecom_dr">
            <div class="pull-left"><i class="zmdi zmdi-edit mr-20"></i><span class="right-nav-text">Export-Transactions</span></div>
            <div class="pull-right"><span class="label label-primary">New</span></div>
            <div class="clearfix"></div>
          </a>
        </li>
      </ul>
    </div>
    <!-- /Left Sidebar Menu -->
    <!-- Right Sidebar Menu -->
    <!-- /Right Sidebar Menu -->
    <!-- Main Content -->
    <div class="page-wrapper">
      <div class="container-fluid pt-25">
        <!-- Row -->
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
            <div class="panel panel-default card-view panel-refresh">
              <div class="refresh-container">
                <div class="la-anim-1"></div>
              </div>
              <div class="panel-heading">
                <div class="pull-left">
                  <h6 class="panel-title txt-dark">Number of shares : Long-term Holding | Short-term Holdings</h6>
                </div>
                <div class="pull-right">
                  <a href="#" class="pull-left inline-block refresh mr-15"> <i class="zmdi zmdi-replay"></i> </a>
                  <a href="#" class="pull-left inline-block full-screen mr-15"> <i class="zmdi zmdi-fullscreen"></i> </a>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="panel-wrapper collapse in">
                <div class="panel-body">
                  <div id="e_chart_3" class="" style="height:215px;"></div>
                  <hr class="light-grey-hr row mt-10 mb-15">
                  <div class="label-chatrs">
                    <div class=""> <span class="clabels clabels-lg inline-block bg-primary mr-10 pull-left"></span> <span class="clabels-text font-12 inline-block txt-dark capitalize-font pull-left"><span class="block font-15 weight-500 mb-5">44.46% Long-term holdings</span>
                      <span
                        class="block txt-grey">356 visits</span>
                        </span>
                        <div id="sparkline_1" class="pull-right" style="width: 100px; overflow: hidden; margin: 0px auto;"></div>
                        <div class="clearfix"></div>
                    </div>
                  </div>
                  <hr class="light-grey-hr row mt-10 mb-15">
                  <div class="label-chatrs">
                    <div class=""> <span class="clabels clabels-lg inline-block bg-purple mr-10 pull-left"></span> <span class="clabels-text font-12 inline-block txt-dark capitalize-font pull-left"><span class="block font-15 weight-500 mb-5">5.54% Short-term holdings</span>
                      <span
                        class="block txt-grey">36 visits</span>
                        </span>
                        <div id="sparkline_2" class="pull-right" style="width: 100px; overflow: hidden; margin: 0px auto;"></div>
                        <div class="clearfix"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5 col-md-6 col-sm-6 col-xs-12">
            <div class="panel panel-default card-view panel-refresh">
              <div class="refresh-container">
                <div class="la-anim-1"></div>
              </div>
              <div class="panel-heading">
                <div class="pull-left">
                  <h6 class="panel-title txt-dark">Returns </h6>
                </div>
                <div class="pull-right">
                  <a href="#" class="pull-left inline-block refresh mr-15"> <i class="zmdi zmdi-replay"></i> </a>
                  <a href="#" class="pull-left inline-block full-screen mr-15"> <i class="zmdi zmdi-fullscreen"></i> </a>
                  <div class="pull-left inline-block dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false" role="button"><i class="zmdi zmdi-more-vert"></i></a>
                    <ul class="dropdown-menu bullet dropdown-menu-right" role="menu">
                      <li role="presentation">
                        <a href="javascript:void(0)" role="menuitem"><i class="icon wb-reply" aria-hidden="true"></i>Daily</a>
                      </li>
                      <li role="presentation">
                        <a href="javascript:void(0)" role="menuitem"><i class="icon wb-share" aria-hidden="true"></i>Weekly</a>
                      </li>
                      <li role="presentation">
                        <a href="javascript:void(0)" role="menuitem"><i class="icon wb-trash" aria-hidden="true"></i>Monthly</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="panel-wrapper collapse in">
                <div class="panel-body">
                  <div id="e_chart_1" class="" style="height:313px;"></div>
                  <ul class="flex-stat mt-40">
                    <li> <span class="block">Monthly Returns</span> <span class="block txt-dark weight-500 font-18"><span class="counter-anim">3,24,222</span></span>
                    </li>
                    <li> <span class="block">Weekly Returns</span> <span class="block txt-dark weight-500 font-18"><span class="counter-anim">1,23,432</span></span>
                    </li>
                    <li> <span class="block">Trend</span> <span class="block">
												<i class="zmdi zmdi-trending-up txt-success font-24"></i>
											</span> </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
            <div class="panel panel-default card-view">
              <div class="panel-heading">
                <div class="pull-left">
                  <h6 class="panel-title txt-dark">Top Performers</h6>
                </div>
                <div class="pull-right">
                  <a href="#" class="pull-left inline-block mr-15"> <i class="zmdi zmdi-download"></i> </a>
                  <a href="#" class="pull-left inline-block close-panel" data-effect="fadeOut"> <i class="zmdi zmdi-close"></i> </a>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="panel-wrapper collapse in">
                <div class="panel-body">
                  <div> <span class="pull-left inline-block capitalize-font txt-dark">
										Google Class A	
										</span> <span class="label label-primary pull-right">50%</span>
                    <div class="clearfix"></div>
                    <hr class="light-grey-hr row mt-10 mb-10"> <span class="pull-left inline-block capitalize-font txt-dark">
										Citibank	
										</span> <span class="label label-primary pull-right">10%</span>
                    <div class="clearfix"></div>
                    <hr class="light-grey-hr row mt-10 mb-10"> <span class="pull-left inline-block capitalize-font txt-dark">
										Microsoft	
										</span> <span class="label label-primary pull-right">30%</span>
                    <div class="clearfix"></div>
                    <hr class="light-grey-hr row mt-10 mb-10"> <span class="pull-left inline-block capitalize-font txt-dark">
										Apple	
										</span> <span class="label label-primary pull-right">10%</span>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /Row -->
        <!-- Row -->
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div class="panel panel-default card-view pa-0">
              <div class="panel-wrapper collapse in">
                <div class="panel-body pa-0">
                  <div class="sm-data-box">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-xs-6 text-center pl-0 pr-0 data-wrap-left"> <span class="txt-dark block counter"><span class="counter-anim">914,001</span></span> <span class="weight-500 uppercase-font block font-13">Dividends Received till-date</span> </div>
                        <div class="col-xs-6 text-center  pl-0 pr-0 data-wrap-right"> <i class="icon-user-following data-right-rep-icon txt-light-grey"></i> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div class="panel panel-default card-view pa-0">
              <div class="panel-wrapper collapse in">
                <div class="panel-body pa-0">
                  <div class="sm-data-box">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-xs-6 text-center pl-0 pr-0 data-wrap-left"> <span class="txt-dark block counter"><span class="counter-anim">46.41</span>%</span> <span class="weight-500 uppercase-font block">1-Yr Return</span> </div>
                        <div class="col-xs-6 text-center  pl-0 pr-0 data-wrap-right"> <i class="icon-control-rewind data-right-rep-icon txt-light-grey"></i> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div class="panel panel-default card-view pa-0">
              <div class="panel-wrapper collapse in">
                <div class="panel-body pa-0">
                  <div class="sm-data-box">
                    <div class="container-fluid">
                      <div class="row">
                        <div id="portfolioValue" class="col-xs-6 text-center pl-0 pr-0 data-wrap-left"> <span class="txt-dark block counter"><span class="counter-anim"> 0 </span></span> <span class="weight-500 uppercase-font block">Portfolio Value</span> </div>
                        <div class="col-xs-6 text-center  pl-0 pr-0 data-wrap-right"> <i class="icon-layers data-right-rep-icon txt-light-grey"></i> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div class="panel panel-default card-view pa-0">
              <div class="panel-wrapper collapse in">
                <div class="panel-body pa-0">
                  <div class="sm-data-box">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-xs-6 text-center pl-0 pr-0 data-wrap-left"> <span class="txt-dark block counter"><span class="counter-anim">46.43</span>%</span> <span class="weight-500 uppercase-font block">Lifetime Return</span> </div>
                        <div class="col-xs-6 text-center  pl-0 pr-0 pt-25  data-wrap-right">
                          <div id="sparkline_4" style="width: 100px; overflow: hidden; margin: 0px auto;"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /Row -->
        <!-- Row -->
        <div class="row">
          <div class="col-lg-4 col-md-5 col-sm-12 col-xs-12">
            <div class="panel panel-default card-view panel-refresh">
              <div class="refresh-container">
                <div class="la-anim-1"></div>
              </div>
              <div class="panel-heading">
                <div class="pull-left">
                  <h6 class="panel-title txt-dark">Live Portfolio Performance</h6>
                </div>
                <div class="pull-right">
                  <a href="#" class="pull-left inline-block refresh mr-15"> <i class="zmdi zmdi-replay"></i> </a>
                  <div class="pull-left inline-block dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false" role="button"><i class="zmdi zmdi-more-vert"></i></a>
                    <ul class="dropdown-menu bullet dropdown-menu-right" role="menu">
                      <li role="presentation">
                        <a href="javascript:void(0)" role="menuitem"><i class="icon wb-reply" aria-hidden="true"></i>option 1</a>
                      </li>
                      <li role="presentation">
                        <a href="javascript:void(0)" role="menuitem"><i class="icon wb-share" aria-hidden="true"></i>option 2</a>
                      </li>
                      <li role="presentation">
                        <a href="javascript:void(0)" role="menuitem"><i class="icon wb-trash" aria-hidden="true"></i>option 3</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="panel-wrapper collapse in">
                <div class="panel-body">
                  <div id="e_chart_2" class="" style="height:236px;"></div>
                  <div class="label-chatrs text-center mt-30">
                    <div class="inline-block mr-15"> <span class="clabels inline-block bg-primary mr-5"></span> <span class="clabels-text font-12 inline-block txt-dark capitalize-font">S&P 500</span> </div>
                    <div class="inline-block mr-15"> <span class="clabels inline-block bg-purple mr-5"></span> <span class="clabels-text font-12 inline-block txt-dark capitalize-font">DJIA</span> </div>
                    <div class="inline-block"> <span class="clabels inline-block bg-skyblue mr-5"></span> <span class="clabels-text font-12 inline-block txt-dark capitalize-font">Your Portfolio</span> </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8 col-md-7 col-sm-12 col-xs-12">
            <div class="panel panel-default card-view panel-refresh">
              <div class="refresh-container">
                <div class="la-anim-1"></div>
              </div>
              <div class="panel-heading">
                <div class="pull-left">
                  <h6 class="panel-title txt-dark">Your Watchlist</h6>
                </div>
                <div class="pull-right">
                  <a href="#" class="pull-left inline-block refresh mr-15"> <i class="zmdi zmdi-replay"></i> </a>
                  <a href="#" class="pull-left inline-block full-screen mr-15"> <i class="zmdi zmdi-fullscreen"></i> </a>
                  <div class="pull-left inline-block dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false" role="button"><i class="zmdi zmdi-more-vert"></i></a>
                    <ul class="dropdown-menu bullet dropdown-menu-right" role="menu">
                      <li role="presentation">
                        <a href="javascript:void(0)" role="menuitem"><i class="icon wb-reply" aria-hidden="true"></i>Edit</a>
                      </li>
                      <li role="presentation">
                        <a href="javascript:void(0)" role="menuitem"><i class="icon wb-share" aria-hidden="true"></i>Delete</a>
                      </li>
                      <li role="presentation">
                        <a href="javascript:void(0)" role="menuitem"><i class="icon wb-trash" aria-hidden="true"></i>New</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="panel-wrapper collapse in">
                <div class="panel-body row pa-0">
                  <div class="table-wrap">
                    <div class="table-responsive">
                      <table class="table table-hover mb-0">
                        <thead>
                          <tr>
                            <th>Company</th>
                            <th>Sector</th>
                            <th>Changes</th>
                            <th>Volume</th>
                            <th>Live Sentiment</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><span class="txt-dark weight-500">Facebook</span></td>
                            <td>Tech</td>
                            <td><span class="txt-success"><i class="zmdi zmdi-caret-up mr-10 font-20"></i><span>2.43%</span></span>
                            </td>
                            <td> <span class="txt-dark weight-500">$1478</span> </td>
                            <td> <span class="label label-primary">Active</span> </td>
                          </tr>
                          <tr>
                            <td><span class="txt-dark weight-500">Alphabet</span></td>
                            <td>Tech</td>
                            <td><span class="txt-success"><i class="zmdi zmdi-caret-up mr-10 font-20"></i><span>1.43%</span></span>
                            </td>
                            <td> <span class="txt-dark weight-500">$951</span> </td>
                            <td> <span class="label label-danger">Hot</span> </td>
                          </tr>
                          <tr>
                            <td><span class="txt-dark weight-500">Twitter</span></td>
                            <td>Tech</td>
                            <td><span class="txt-danger"><i class="zmdi zmdi-caret-down mr-10 font-20"></i><span>-8.43%</span></span>
                            </td>
                            <td> <span class="txt-dark weight-500">$632</span> </td>
                            <td> <span class="label label-default">Normal</span> </td>
                          </tr>
                          <tr>
                            <td><span class="txt-dark weight-500">Tesla</span></td>
                            <td>Automotive</td>
                            <td><span class="txt-success"><i class="zmdi zmdi-caret-up mr-10 font-20"></i><span>7.43%</span></span>
                            </td>
                            <td> <span class="txt-dark weight-500">$325</span> </td>
                            <td> <span class="label label-default">Normal</span> </td>
                          </tr>
                          <tr>
                            <td><span class="txt-dark weight-500">Paypal</span></td>
                            <td>Fin Tech</td>
                            <td><span class="txt-success"><i class="zmdi zmdi-caret-up mr-10 font-20"></i><span>9.43%</span></span>
                            </td>
                            <td> <span class="txt-dark weight-500">$258</span> </td>
                            <td> <span class="label label-primary">Active</span> </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Row -->
      </div>
      <!-- Footer -->
      <footer class="footer container-fluid pl-30 pr-30">
        <div class="row">
          <div class="col-sm-12">
            <p>2018 © Robinhood-Insights.</p>
          </div>
        </div>
      </footer>
      <!-- /Footer -->
    </div>
    <!-- /Main Content -->
  </div>
  <!-- /#wrapper -->
  <!-- JavaScript -->
  
  <!-- Bootstrap Core JavaScript -->
  <script src="vendors/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
  <!-- Data table JavaScript -->
  <script src="vendors/bower_components/datatables/media/js/jquery.dataTables.min.js"></script>
  <!-- Slimscroll JavaScript -->
  <script src="dist/js/jquery.slimscroll.js"></script>
  <!-- Progressbar Animation JavaScript -->
  <script src="vendors/bower_components/waypoints/lib/jquery.waypoints.min.js"></script>
  <script src="vendors/bower_components/jquery.counterup/jquery.counterup.min.js"></script>
  <!-- Fancy Dropdown JS -->
  <script src="dist/js/dropdown-bootstrap-extended.js"></script>
  <!-- Sparkline JavaScript -->
  <script src="vendors/jquery.sparkline/dist/jquery.sparkline.min.js"></script>
  <!-- Owl JavaScript -->
  <script src="vendors/bower_components/owl.carousel/dist/owl.carousel.min.js"></script>
  <!-- Switchery JavaScript -->
  <script src="vendors/bower_components/switchery/dist/switchery.min.js"></script>
  <!-- EChartJS JavaScript -->
  <script src="vendors/bower_components/echarts/dist/echarts-en.min.js"></script>
  <script src="vendors/echarts-liquidfill.min.js"></script>
  <!-- Toast JavaScript -->
  <script src="vendors/bower_components/jquery-toast-plugin/dist/jquery.toast.min.js"></script>
  <!-- Init JavaScript -->
  <script src="dist/js/init.js"></script>
  <script src="dist/js/dashboard-data.js"></script>
</body>

</html>
