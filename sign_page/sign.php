<?php

$servername = "sql12.freesqldatabase.com";
$username = "sql12757350";
$password = "EsQ44D4QPN";
$dbname = "sql12757350";
$conn = new mysqli ($servername, $username, $password, $dbname);    

if ($conn->connect_error) {
    die("Өгөгдлийн сангмйн холболтонд алдаа гарлаа");
}
else{
    echo "success";
}



?>