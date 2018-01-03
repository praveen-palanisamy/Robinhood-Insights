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
    
}
?>
