<?php

// =======================
// DATABASE CONNECTION
// =======================

$host = "localhost";
$user = "root";
$password = "";
$database = "users";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// =======================
// REGISTER
// =======================

if (isset($_POST["register"])) {

    $name = $_POST["name"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Hash the password before storing it
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Check if email already exists
    $check = $conn->prepare(
        "SELECT id FROM users WHERE email = ?"
    );

    $check->bind_param("s", $email);
    $check->execute();

    $result = $check->get_result();

    if ($result->num_rows > 0) {

        echo "Email already registered.";

    } else {

        // Insert new user
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

            // Registration successful
            header("Location: hper.html");
            exit();

        } else {

            echo "Registration failed.";

        }

        $stmt->close();
    }

    $check->close();
}


// =======================
// LOGIN
// =======================

if (isset($_POST["login"])) {

    $email = $_POST["email"];
    $password = $_POST["password"];

    // Find user by email
    $stmt = $conn->prepare(
        "SELECT id, name, password
         FROM users
         WHERE email = ?"
    );

    $stmt->bind_param("s", $email);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows === 1) {

        $user = $result->fetch_assoc();

        // Check password
        if (password_verify($password, $user["password"])) {

            // Login successful
            header("Location: hper.html");
            exit();

        } else {

            echo "Incorrect password.";

        }

    } else {

        echo "Email not found.";

    }

    $stmt->close();
}


// =======================
// CLOSE DATABASE
// =======================

$conn->close();

?>