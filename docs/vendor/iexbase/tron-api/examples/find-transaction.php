<?php
//include_once '../vendor/autoload.php';
include_once '../../../../vendor/autoload.php';

$tron = new \IEXBase\TronAPI\Tron();

$detail = $tron->getTransaction('bf6a7e1f923d8f7155e8473b5971f16f78a7d92399510b5c7e3a61456802a6c5');
var_dump($detail);