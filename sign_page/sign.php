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
    if($_SERVER["REQUEST_METHOD"]=="post"){
        $uname = $_POST("uname");
        $upassword = $_POST("upassword");
        $upasswordconfic = $_POST("upasswordconfig");

        if($upassword != $upasswordconfic){
            echo "Хэрэглэгчийн нууц үг таарахгүй байна";
        }
        else{
            echo "<br><br>$uname, $upassword<br>";
            echo "Амжилттай";
        }
    }
    echo "success";
}



?>