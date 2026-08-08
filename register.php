<?php

include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $password = $_POST["password"];

    if (empty($name) || empty($email) || empty($password)) {
        die("All fields are required.");
    }

    // Check if email already exists
    $check = $conn->prepare(
        "SELECT id FROM users WHERE email = ?"
    );

    $check->bind_param("s", $email);
    $check->execute();

    $result = $check->get_result();

    if ($result->num_rows > 0) {
        die("Email already registered.");
    }

    // Hash password before storing it
    $hashedPassword = password_hash(
        $password,
        PASSWORD_DEFAULT
    );

    // Insert user
    $stmt = $conn->prepare(
        "INSERT INTO users (name, email, password)
         VALUES (?, ?, ?)"
    );

    $stmt->bind_param(
        "sss",
        $name,
        $email,
        $hashedPassword
    );

    if ($stmt->execute()) {

        echo "<h2>Registration successful!</h2>";
        echo "<p>Redirecting to dashboard...</p>";

        header("refresh:2;url=dashboard.html");

    } else {

        echo "Registration failed.";
    }

    $stmt->close();
    $check->close();
    $conn->close();
}

?>