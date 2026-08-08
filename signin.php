<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - Education in AI</title>
</head>

<body>

    <h2>Create Account</h2>

    <form action="register.php" method="POST">

        <input
            type="text"
            name="name"
            placeholder="Name"
            required
        >

        <br><br>

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
            Register
        </button>

    </form>

</body>

</html>