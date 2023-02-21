const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

//-----------
const BASE_URL = "http://localhost:3000";
const EMAIL = "alokranjanjoshi02@gmail.com";
const MAILING_ID =
  "717076525801-go5i413lcnsdhiphjn2ff1357g6uk9mg.apps.googleusercontent.com";
const MAILING_SECRET = "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";
const MAILING_ACCESS =
  "ya29.a0AVvZVso-d0eLBwRMA7jrv0quP2GKqVKbrBMoKzSITsuQLYyryPOq9xrevQqRuO5B3MO-UN_Hip6vrnLXnBQkf3eXVBDl2PuMcP3Iq2porhFDXCN4oSYjdB2qm3MbcttNBsUHao06wXmfFzshB1qpDpya0b5DaCgYKAS8SARASFQGbdwaIC9CRNUjRhJXcne0fbHh78w0163";
const MAILING_REFRESH =
  "1//04hzmSoedHZv1CgYIARAAGAQSNwF-L9Ir8beOhHg_494QtqtGGCilTj54vegY2aau89RTB8i4mJv99K2bxZLPom_a9_P1qUToBx8";
//--------------

const oauth_link = "https://developers.google.com/oauthplayground";

//creating the client with id, secret, auth_link
const auth2client = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  oauth_link
);

exports.sendVerificationEmail = async (email, name, url) => {
  //if the access token is expired then it'll regenerate the access token
  auth2client.setCredentials({
    refresh_token: MAILING_REFRESH,
  });

  const accessToken = await auth2client.getAccessToken();

  const smtp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });

  const mailOptions = {
    from: EMAIL,
    to: email,
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;font-weight:600;color:#3b5998">
<span>Action requires : Activate your account</span>
</div>
<div style="padding:.5rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;font-size:17px;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;font-weight:600">
<span>Hello ${name}</span>
<div style="padding:10px 0;margin-bottom:.5rem">
<span style="padding:.5rem 0">
You recently created an green-farm. To complete your registration, Please
confirm your account.</span>
</div>
<a href="${url}" style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600;border-radius:.5rem">Confirm your account</a>
<br />
</div>`,
    subject: "Green-Farm verification email",
  };

  smtp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
