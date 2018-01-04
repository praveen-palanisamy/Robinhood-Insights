<?php
require_once('vendors/Requests.php');
// Make sure Requests can load internal classes
Requests::register_autoloader();
class Robinhood {
    public $endpoints = ['accounts' => 'https://api.robinhood.com/accounts/', 'ach_iav_auth' => 'https://api.robinhood.com/ach/iav/auth/', 'ach_relationships' => 'https://api.robinhood.com/ach/relationships/', 'ach_transfers' => 'https://api.robinhood.com/ach/transfers/', 'applications' => 'https://api.robinhood.com/applications/', 'document_requests' => 'https://api.robinhood.com/upload/document_requests/', 'dividends' => 'https://api.robinhood.com/dividends/', 'edocuments' => 'https://api.robinhood.com/documents/', 'employment' => 'https://api.robinhood.com/user/employment', 'investment_profile' => 'https://api.robinhood.com/user/investment_profile/', 'instruments' => 'https://api.robinhood.com/instruments/', 'login' => 'https://api.robinhood.com/api-token-auth/', 'margin_upgrades' => 'https://api.robinhood.com/margin/upgrades/', 'markets' => 'https://api.robinhood.com/markets/', 'notification_settings' => 'https://api.robinhood.com/settings/notifications/', 'notifications' => 'https://api.robinhood.com/notifications/', 'orders' => 'https://api.robinhood.com/orders/', 'password_reset' => 'https://api.robinhood.com/password_reset/request/', 'portfolios' => 'https://api.robinhood.com/portfolios/', 'positions' => 'https://api.robinhood.com/positions/', 'quotes' => 'https://api.robinhood.com/quotes/', 'user' => 'https://api.robinhood.com/user/', 'watchlists' => 'https://api.robinhood.com/watchlists/'];
    public $session = null;
    public $username = null;
    public $password = null;
    public $headers = null;
    public $auth_token = null;
    public $positions = null;
    function __construct() {
        $this->session = new Requests_Session();
        
        $this->headers = ['Accept' => '*/*', 'Accept-Encoding' => 'gzip, deflate', 'Accept-Language' => 'en;q=1, fr;q=0.9, de;q=0.8, ja;q=0.7, nl;q=0.6, it;q=0.5', 'Content-Type' => 'application/x-www-form-urlencoded; charset=utf-8', 'X-Robinhood-API-Version' => '1.0.0', 'Connection' => 'keep-alive', 'User-Agent' => 'Robinhood/823 (iPhone; iOS 7.1.2; Scale/2.00)'];
        $this->session->headers = $this->headers;
		/*
		$options = array(
		'http' => array(
			'header'  => array_map(function ($k, $v) {return "$k:$v";}, array_keys($header), $header),
			'method'  => 'POST',
			'ignore_errors' => true, 
			'content' => http_build_query($login)
		)
	);
		 */
    }
    function login($username,$password,$mfa_code=null) {
        $this->username = $username;
        $this->password = $password;
        $this->mfa_code = $mfa_code;
        if ($mfa_code) {
            $fields = ['password' => $this->password, 'username' => $this->username, 'mfa_code' => $this->mfa_code];
        }
        else {
            $fields = [ 'username' => $this->username, 'password' => $this->password ];
        }
        try {
            $data = http_build_query($fields);
        }
        catch(Exception $e) {
                        $data = http_build_query($fields);
        }
		 $res = kwargs_method_call($this->session, 'post', [$this->endpoints['login']], ["data" => $data]);

        $res = json_decode((string)$res->body,true);
        
		if (array_key_exists('token', $res))
		{
			$this->auth_token = $res['token'];
			$this->headers['Authorization'] = 'Token ' . $this->auth_token;
			$this->session->headers = $this->headers;
			print("auth received; Session headers= <br>");
			print_r($this->session->headers);
			return true;

		}
		else
			return $res;
    }

    function get_endpoint($endpoint=null) 
    {
        $res = $this->session->get($this->endpoints[$endpoint]);
        return json_decode($res->body, true);
    }
    function get_custom_endpoint($endpoint=null) 
    {
        $res = $this->session->get($endpoint);
        return json_decode($res->body, true);
    }
    function investment_profile() {
        $this->session->get($this->endpoints['investment_profile']);
    }
    function instruments($stock=null) {
        if (($stock == null)) {
            $res = $this->session->get($this->endpoints['instruments']);
        }
        else {
            $res = kwargs_method_call($this->session, 'get', [$this->endpoints['instruments']], ["params" => ['query' => $stock->upper()]]);
        }
        $res = $res->json();
        return $res['results'];
    }
    
    function get_quote($stock=null) {
        $data = $this->quote_data($stock);
        return $data['symbol'];
    }
    function print_quote($stock=null) {
        $data = $this->quote_data($stock);
        pyjslib_printnl($data['symbol'] . ': $' . $data['last_trade_price']);
    }
    function print_quotes($stocks) {
        foreach( pyjslib_range(count($stocks)) as $i ) {
            $this->print_quote($stocks[$i]);
        }
    }
    function ask_price($stock=null) {
        return $this->quote_data($stock)['ask_price'];
    }
    function ask_size($stock=null) {
        return $this->quote_data($stock)['ask_size'];
    }
    function bid_price($stock=null) {
        return $this->quote_data($stock)['bid_price'];
    }
    function bid_size($stock=null) {
        return $this->quote_data($stock)['bid_size'];
    }
    function last_trade_price($stock=null) {
        return $this->quote_data($stock)['last_trade_price'];
    }
    
    function previous_close($stock=null) {
        return $this->quote_data($stock)['previous_close'];
    }
    function previous_close_date($stock=null) {
        return $this->quote_data($stock)['previous_close_date'];
    }
    function adjusted_previous_close($stock=null) {
        return $this->quote_data($stock)['adjusted_previous_close'];
    }
    function symbol($stock=null) {
        return $this->quote_data($stock)['symbol'];
    }
    function last_updated_at($stock=null) {
        return $this->quote_data($stock)['updated_at'];
    }
    
    function place_buy_order($instrument,$quantity,$bid_price=null) {
        $transaction = 'buy';
        return $this->place_order($instrument, $quantity, $bid_price, $transaction);
    }
    function place_sell_order($instrument,$quantity,$bid_price=null) {
        $transaction = 'sell';
        return $this->place_order($instrument, $quantity, $bid_price, $transaction);
    }
    
}

function kwargs_method_call( $obj, $method, $ordered, $named ) {
    
    $num_ordered = count($ordered);
    $count = 1;

    $refFunc = new ReflectionMethod($obj, $method);
    foreach( $refFunc->getParameters() as $param ){
        //invokes ReflectionParameter::__toString
        if( $count > $num_ordered ) {
            $name = $param->name;
            $default = $param->isDefaultValueAvailable() ? $param->getDefaultValue() : null;
            $ordered[] = @$named[$name] ?: $default;
        }
        
        $count ++;
    }
   
    $callable = [$obj, $method]; 
    return call_user_func_array($callable, $ordered);
}

?>
