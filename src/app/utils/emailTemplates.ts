export const forgotOtpTemplate = (otp: string) => `
  <div style="font-family: Arial, sans-serif">
    <h2>Reset Your Password</h2>
    <p>Your OTP code is:</p>
    <h1 style="letter-spacing: 5px">${otp}</h1>
    <p>This code will expire in 5 minutes.</p>
  </div>
`;
