<?php
//sinclude_once '../vendor/autoload.php';
include_once '../../../../vendor/autoload.php';

use IEXBase\TronAPI\Tron;

$tron = new Tron();

//option 1
$tron->sendTransaction('TRWBqiqoFZysoAeyR1J35ibuyc8EvhUAoY','TRciLQZn8NSd1NEVch93RXHcYrVV9ETkJM',100000);

//option 2
//$tron->send('TRWBqiqoFZysoAeyR1J35ibuyc8EvhUAoY','TRciLQZn8NSd1NEVch93RXHcYrVV9ETkJMTRciLQZn8NSd1NEVch93RXHcYrVV9ETkJM',100000);

//option 3
//$tron->sendTrx('TRWBqiqoFZysoAeyR1J35ibuyc8EvhUAoY','TRciLQZn8NSd1NEVch93RXHcYrVV9ETkJM',1000);