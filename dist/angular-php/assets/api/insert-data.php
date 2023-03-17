<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

include(__DIR__."/dbconnect.php");
$post_data = json_decode(file_get_contents("php://input"), true);

if(empty($post_data)){
    echo json_encode("Found Empty Data");
}
else{

date_default_timezone_set('Asia/Kolkata');
$today=date('d-m-Y H:i');  
    
$sql = "INSERT INTO User_tbl (Name,SYS,DIA,PULSE,IST) VALUES('".trim($post_data['Name'])."',".$post_data['SYS'].",".$post_data['DIA'].",".$post_data['PULSE'].",".$today.")";
if ($conn->query($sql) === TRUE) {

$data = array("status"=>1, "message"=>"New record created successfully");
echo json_encode($data);
} else {
    $data = array("status"=>0, "message"=>"Error: " . $sql . "<br>" . $conn->error);
    echo json_encode($data);
}
$conn->close();
}
?>



