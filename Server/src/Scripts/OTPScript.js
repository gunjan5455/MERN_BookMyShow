const OTPScript = (name, email, otp) => {
  return `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 500px;
            margin: 20px auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .otp-code {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
            margin: 20px 0;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>

    <div class="email-container">
        <h2>OTP Verification</h2>
        <p>Hi! ${name}</P>
        <p>Use the following One-Time Password (OTP) for forget password verification:</p>
        
        <div class="otp-code">${otp}</div>
        
        <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
        
        <div class="footer">
            <p>Regards, <br> Book my Show</p>
        </div>
    </div>

</body>
</html>

`;
};
module.exports = OTPScript;
