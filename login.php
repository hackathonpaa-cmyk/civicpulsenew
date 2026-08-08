<?php

session_start();

require "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Please login using the login form.");
}

$email = $_POST["email"];
$password = $_POST["password"];

$sql = "SELECT id, email, password FROM users WHERE email = ?";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    die("SQL error: " . $conn->error);
}

$stmt->bind_param("s", $email);

$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 1) {

    $user = $result->fetch_assoc();

    if (password_verify($password, $user["password"])) {

        $_SESSION["user_id"] = $user["id"];
        $_SESSION["email"] = $user["email"];

        echo "Login successful!";

    } else {

        echo "Incorrect password.";

    }

} else {

    echo "No account found with this email.";

}

?>