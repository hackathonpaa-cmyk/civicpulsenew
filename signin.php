<?php

require "db.php";

$message = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $email = $_POST["email"];
    $password = $_POST["password"];

    // Check whether email already exists
    $sql = "SELECT id FROM users WHERE email = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {

        $message = "An account with this email already exists.";

    } else {

        // Hash the password before storing it
        $hashedPassword = password_hash(
            $password,
            PASSWORD_DEFAULT
        );

        $sql = "INSERT INTO users (email, password)
                VALUES (?, ?)";

        $stmt = $conn->prepare($sql);

        $stmt->bind_param(
            "ss",
            $email,
            $hashedPassword
        );

        if ($stmt->execute()) {

            $message = "Account created successfully!";

        } else {

            $message = "Something went wrong.";

        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <title>Create Account</title>

</head>

<body>

    <h1>Create Account</h1>

    <?php

    if ($message != "") {
        echo "<p>$message</p>";
    }

    ?>

    <form action="signin.php" method="POST">

        <input
            type="email"
            name="email"
            placeholder="Email"
            required
        >

        <br><br>

        <input
            type="password"
            name="password"
            placeholder="Password"
            required
        >

        <br><br>

        <button type="submit">
            Create Account
        </button>

    </form>

    <br>

    <a href="index.php">
        Already have an account? Login
    </a>

</body>

</html>