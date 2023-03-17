<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
include(__DIR__."/dbconnect.php");
$post_data = json_decode(file_get_contents("php://input"), true);

$sql = "SELECT * FROM User_tbl ORDER BY Id DESC LIMIT 200";
$result = $conn->query($sql);
$list = array();
if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    $data = array("Id"=>$row["Id"], "Name"=>$row["Name"],"SYS"=>$row["SYS"],"DIA"=>$row["DIA"],"PULSE"=>$row["PULSE"],"IST"=>$row["IST"],"DateStamp"=>$row["DateStamp"]);
    array_push($list, $data);
  }
  $responseData = array("status"=>1, "message"=>"Data Fetched Seccessfully","data"=>$list);
  echo json_encode($responseData);
} else {
    $responseData = array("status"=>0, "message"=>"Something Went Wrong","data"=>null);
    echo json_encode($responseData);
}
$conn->close();
?> 