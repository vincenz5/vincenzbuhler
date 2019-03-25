<?php
    $host = "localhost"; // Host name 
    $username = "vincenzb_v"; // Mysql username 
    $password = "passwords"; // Mysql password 
    $db_name = "vincenzb_1"; // Database name 

$con=mysqli_connect($host, $username, $password, $db_name);
// Check connection
if (mysqli_connect_errno())
{
echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$result = mysqli_query($con,"SELECT * FROM contacts");

echo "<table border='1'>
<tr>
<th>Name</th>
<th>Industry</th>
<th>Contact</th>
<th>Location</th>
</tr>";

while($row = mysqli_fetch_array($result))
{
echo "<tr>";
echo "<td>" . $row['name'] . "</td>";
echo "<td>" . $row['industry'] . "</td>";
echo "<td>" . $row['contact'] . "</td>";
echo "<td>" . $row['location'] . "</td>";
echo "</tr>";
}
echo "</table>";

mysqli_close($con);
?>