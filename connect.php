<?php

$db_name = 'mysql:host=localhost;dbname=food_db';
$user_name = 'root';
$user_password = '';
$xmlFilePath = 'xml/menu.xml';
try{
    $conn = new PDO($db_name, $user_name, $user_password);
    $connected = true;
}catch(PDOException $e){
    $connected = false;
}
?>