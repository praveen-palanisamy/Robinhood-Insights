<?php

include("Robinhood.php");
$host  = $_SERVER['HTTP_HOST'];
$uri   = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');

session_start();
$logged_in = false;
$username = null;
$password = null;
$mfa_code = null;


if ($_SERVER["REQUEST_METHOD"] == "POST") 
{

	if( isset($_POST["Rusername"]) && isset($_POST["Rpassword"]) )
	{
		$username= test_input($_POST["Rusername"]);
		$password= test_input($_POST["Rpassword"]);
	}

	if( isset($_POST['mfa_code']) )
	{
		$mfa_code = test_input($_POST["mfa_code"]);
		$_SESSION['mfa_code'] = $mfa_code;
		if( isset($_SESSION['username']) && isset($_SESSION['password']))
		{
			$username = $_SESSION['username'];
			$password= $_SESSION['password'];
			//unset($_SESSION['username']);
			//unset($_SESSION['password']);

		}

	}

	$robinhood = new Robinhood();
	//while (($logged_in != true)) 
	while(!($logged_in === true))
	{
		if (isset($username) && isset($password) && isset($mfa_code) )
		{
			
				$logged_in = kwargs_method_call($robinhood, 'login', [], ["username" => $username,"password" => $password,"mfa_code" => $mfa_code]);

		}

		else if ( isset($username) && isset($password) ) 
		{

			unset($_SESSION['mfa_code']);// Unset stray/previous mfa

			print("Logging in with uNam & pswd ony");
			$logged_in = kwargs_method_call($robinhood, 'login', [], ["username" => $username,"password" => $password]);
			print("logged_in:");
			print_r($logged_in);

		}

		// Login incomplete. Requires MFA
		if (!($logged_in === true) /*&& ($logged_in->get('non_field_errors') == null)*/ && ($logged_in['mfa_required'] == true))
		{
			$_SESSION['mfa_needed'] = true;
			$_SESSION['username'] = $username;
			$_SESSION['password'] = $password;

			header("Location:http://$host$uri/login.php");
			exit();
			// Get mfa, and then
			//$logged_in = kwargs_method_call($robinhood, 'login', [], ["username" => $username,"password" => $password,"mfa_code" => $mfa_code]);
		}

		// Login failed
		if (isset($logged_in['non_field_errors'])) 
		{
			print("inside");
			print_r($logged_in);
			$password = '';
			$_SESSION['invalid_login'] = true;
			$_SESSION['error_msg'] = "Oops! Something is not right. Invalid Robinhood Login credentials provided";
			header("Location:http://$host$uri/login.php");
			print_r('Invalid username or password.  Try again.');
			exit();
		}
	}

if($logged_in === true)
{

	print("Logged In!!");


print('Pulling trades. Please wait...');
$trade_count = 0;
$queued_count = 0;
$orders = $robinhood->get_endpoint('orders');
$orders = var_export($orders, false);// 
var_dump($orders);
$paginated = true;
$page = 0;
while ($paginated) 
{
	foreach( array_values($orders['results']) as $i => $order) 
	{
        $executions = $order['executions'];
        $instrument = $robinhood->get_custom_endpoint($order['instrument']);
        $fields[($i + ($page * 100))]['symbol'] = $instrument['symbol'];
		foreach( array_keys($order) as $key =>  $value) 
		{
            if (($value != 'executions')) {
                $fields[($i + ($page * 100))][$value] = $order[$value];
            }
        }
		if (($order['state'] == 'filled')) 
		{
            $trade_count += 1;
			foreach( array_keys($executions[0]) as $key =>  $value) 
			{
                $fields[($i + ($page * 100))][$value] = $executions[0][$value];
            }
        }
		else if (($order['state'] == 'queued')) 
		{
            $queued_count += 1;
        }
    }
	print_r(sprintf("Summary #", $page, ":", "queued_count=", $queued_count));
	if (($orders['next'] != null)) 
	//if (isset($orders['next']))
	{
		$page = ($page + 1);
		$orders = $robinhood->get_custom_endpoint($orders['next']);
		$orders = var_export($orders, false);

		// Handle error cases when $orders turns out to be not valid
		if (isset($orders['results']))
			continue;
		else
		{
			print_r("Fetching next pages of orders failed.");
			$paginated = false;
		}
	}
	else 
	{
        $paginated = false;
    }
}

//if ($args->profit) {
//    $profit_csv = new profit_extractor($csv, $filename);
//}


}//logged in
}// if post 


function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
} 
