<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Verify Your Email</title>
</head>
<body>
    <h2>Hello {{ $user->name }},</h2>

    <p>Thank you for registering. Please click the link below to verify your email:</p>

    <p>
        <a href="{{ url('/verify-email?token=' . $token) }}">
            Verify Email
        </a>
    </p>

    <p>This link will expire in 30 minutes.</p>
</body>
</html>
