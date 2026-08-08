<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="meow.css">
</head>
<body>
    <div class="container">
        <div class="formbox active" id="Login">

    <form action="login_register.php" method="post">

        <input type="email" name="email" placeholder="Email">

        <input type="password" name="password" placeholder="Password">

        <button type="submit" name="login" id="submit">
            Login
        </button>

    </form>

    <p>
        Don't have an account?
        <a href="#" onclick="showform('Register')">Register</a>
    </p>

</div>

        <div class="formbox" id="Register">

    <form action="login_register.php" method="post">

        <input type="text" name="name" id="name" placeholder="Name">

        <input type="email" name="email" id="email" placeholder="Email">

        <input type="password" name="password" id="password" placeholder="Password">

        <button type="submit" name="register" id="submit">
            Submit
        </button>

    </form>

    <p>
        Do have an account?
        <a href="#" onclick="showform('login')">Login</a>
    </p>

</div>
    </div>
</body>
<script src="script2.js"></script>
</html>