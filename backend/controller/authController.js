const SocialSkill = require("../model/socialSkill");
const User = require("../model/user");
const Departement = require("../model/departement");
const Unite = require("../model/unite");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const ResetPasswordToken = require("../model/ResetPasswordToken");
const { promisify } = require("util");

const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const verifyToken = promisify(jwt.verify);

const test = (req, res) => {
  res.json("test is working");
};

//register endpoint
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmedPassword,
      role,
      departement,
      unite,
    } = req.body;
    //check if name was entered
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }

    const nameExist = await User.findOne({ name });
    if (nameExist) {
      return res.json({
        error: "Name is already taken",
      });
    }

    //check is password is good
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be at least 6 characters long",
      });
    }

    // check if confirmed password matches password
    if (password !== confirmedPassword) {
      return res.json({
        error: "Confirmed password does not match password",
      });
    }

    //check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken already",
      });
    }

    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }

    // Vérifier si l'email se termine par @esprit.tn
    if (!email.endsWith("@esprit.tn")) {
      return res.json({
        error: "Email must end with @esprit.tn",
      });
    }

    const hashedPassword = await hashPassword(password);
    const hashedConfirmedPassword = await hashPassword(confirmedPassword);

    const emailToken = crypto.randomBytes(20).toString("hex");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      confirmedPassword: hashedConfirmedPassword,
      departement,
      role,
      unite,
      emailToken,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "marwakb4@gmail.com",
      to: email,
      subject: "Confirmation of your registration",
      html: `<!DOCTYPE html>
      <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
      
      <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><!--<![endif]-->
        <style>
          * {
            box-sizing: border-box;
          }
      
          body {
            margin: 0;
            padding: 0;
          }
      
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }
      
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }
      
          p {
            line-height: inherit
          }
      
          .desktop_hide,
          .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
          }
      
          .image_block img+div {
            display: none;
          }
      
          @media (max-width:700px) {
            .desktop_hide table.icons-inner {
              display: inline-block !important;
            }
      
            .icons-inner {
              text-align: center;
            }
      
            .icons-inner td {
              margin: 0 auto;
            }
      
            .mobile_hide {
              display: none;
            }
      
            .row-content {
              width: 100% !important;
            }
      
            .stack .column {
              width: 100%;
              display: block;
            }
      
            .mobile_hide {
              min-height: 0;
              max-height: 0;
              max-width: 0;
              overflow: hidden;
              font-size: 0px;
            }
      
            .desktop_hide,
            .desktop_hide table {
              display: table !important;
              max-height: none !important;
            }
          }
        </style>
      </head>
      
      <body style="background-color: #fff0e3; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff0e3;">
          <tbody>
            <tr>
              <td>
                <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px; margin: 0 auto;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="empty_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad">
                                      <div></div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px; margin: 0 auto;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <div class="spacer_block block-1" style="height:35px;line-height:35px;font-size:1px;">&#8202;</div>
                                <table class="heading_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="text-align:center;width:100%;">
                                      <h1 style="margin: 0; color: #101010; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 27px; font-weight: normal; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 32.4px;"><strong>Would you like <br>to confirm your registration?</strong></h1>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px; margin: 0 auto;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="16.666666666666668%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <div class="spacer_block block-1" style="height:0px;line-height:0px;font-size:1px;">&#8202;</div>
                              </td>
                              <td class="column column-2" width="66.66666666666667%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:10px;padding-top:10px;">
                                      <div style="color:#848484;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;line-height:180%;text-align:center;mso-line-height-alt:25.2px;">
                                        <p style="margin: 0;">&nbsp;</p>
                                        <p style="margin: 0;">Please confirm your registration by clicking on the provided button</p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <div class="spacer_block block-2" style="height:10px;line-height:10px;font-size:1px;">&#8202;</div>
                                <table class="button_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad">
                                      <div class="alignment" align="center"><!--[if mso]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${process.env.CLIENT_URL1}/confirm/${emailToken}" style="height:47px;width:185px;v-text-anchor:middle;" arcsize="10%" strokeweight="0.75pt" strokecolor="#101" fillcolor="#101">
      <w:anchorlock/>
      <v:textbox inset="0px,0px,0px,0px">
      <center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px">
      <![endif]--><a href="${process.env.CLIENT_URL1}/confirm/${emailToken}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#101;border-radius:4px;width:auto;border-top:1px solid #101;font-weight:400;border-right:1px solid #101;border-bottom:1px solid #101;border-left:1px solid #101;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;">Confirm registration</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#101112;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:15px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:18px;">
                                        <p style="margin: 0;">Alternatively, you can click the following button&nbsp;</p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="button_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad">
                                      <div class="alignment" align="center"><!--[if mso]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${process.env.CLIENT_URL}/confirm/${emailToken}" style="height:42px;width:124px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#7747FF">
      <w:anchorlock/>
      <v:textbox inset="0px,0px,0px,0px">
      <center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px">
      <![endif]--><a href="${process.env.CLIENT_URL}/confirm/${emailToken}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#7747FF;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;">click on me&nbsp;</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
                                    </td>
                                  </tr>
                                </table>
                                <div class="spacer_block block-6" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
                              </td>
                              <td class="column column-3" width="16.666666666666668%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <div class="spacer_block block-1" style="height:0px;line-height:0px;font-size:1px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                
              </td>
            </tr>
          </tbody>
        </table><!-- End -->
      </body>
      
      </html>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.json({ error: "Failed to send confirmation email!" });
      }
      console.log("Email sent: " + info.response);
      res.json({ message: "A confirmation email has been sent" });
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const confirmEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ emailToken: token });

    if (!user) {
      return res.json({ error: "Invalid or expired token" });
    }

    user.isEmailVerified = true;
    user.emailToken = "";
    user.badges.push("New Member");

    await user.save();

    res.json({ message: "Your account has been successfully activated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "No users found" });
    }
    // Vérifier si le compte de l'utilisateur est actif
    if (!user.isActive) {
      return res.json({ error: "Account Disabled" });
    }

    if (!user.emailToken && !user.isEmailVerified) {
      return res.json({
        error: "Please verify your email address to activate your account!",
      });
    }

    // Vérifier si les mots de passe correspondent
    const match = await comparePassword(password, user.password);
    if (match) {
      // Récupérer les détails du département associé à l'utilisateur
      const departement = await Departement.findById(user.departement);
      // Récupérer les détails de l'unité associée à l'utilisateur
      const unite = await Unite.findById(user.unite);

      // Créer le token JWT en incluant toutes les informations nécessaires
      const tokenPayload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        addresse: user.addresse,
        gouvernorat: user.gouvernorat,
        telephone: user.telephone,
        dateNaissance: user.dateNaissance,
        gender: user.gender,
        departement: departement.name, // inclure seulement le nom du département
        unite: unite.name, // Inclure seulement le nom de l'unité
        socialSkills: user.socialSkills,
        technicalSkills: user.technicalSkills,
        profileImage: user.profileImage,
        coverImage: user.coverImage,
      };

      jwt.sign(tokenPayload, process.env.JWT_SECRET, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(user);
      });
    } else {
      res.json({ error: "Passwords do not match" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json(null);
    }

    const decodedToken = await verifyToken(token, process.env.JWT_SECRET);
    const {
      id,
      email,
      name,
      role,
      addresse,
      gouvernorat,
      dateNaissance,
      telephone,
      gender,
      departement,
      unite,
      socialSkills,
      technicalSkills,
      profileImage,
      coverImage,
    } = decodedToken;

    if (!id) {
      return res.status(400).json({ error: "User ID not found in token" });
    }

    const socialSkillsList = await Promise.all(
      socialSkills.map(async (element) => {
        return await SocialSkill.findById(element);
      })
    );

    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.json({
      id,
      email,
      name,
      role,
      addresse,
      gouvernorat,
      dateNaissance,
      telephone,
      gender,
      departement,
      unite,
      socialSkills: socialSkillsList,
      technicalSkills,
      profileImage,
      coverImage,
    });
  } catch (error) {
    console.error("Error while decoding/verifying token:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logout successful" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "No users found with this email" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordToken = await ResetPasswordToken.create({
      userId: user._id,
      token: resetToken,
      expires: Date.now() + 3600000, // 1 hour
    });

    // Send reset token to user's email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // const mailOptions = {
    //   from: 'marwakb4@gmail.com',
    //   to: email,
    //   subject: 'Password reset request',
    //   text: ` Click this link to reset your password: ${process.env.CLIENT_URL}/reset/${resetToken} or click this link  ${process.env.CLIENT_URL1}/reset/${resetToken}`,
    // };
    const mailOptions = {
      from: "marwakb4@gmail.com",
      to: email,
      subject: "Password Reset Request",
      html: `
      <!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><!--<![endif]-->
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		@media (max-width:700px) {
			.desktop_hide table.icons-inner {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style>
</head>

<body style="background-color: #fff0e3; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff0e3;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px; margin: 0 auto;" width="680">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="empty_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div></div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px; margin: 0 auto;" width="680">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:35px;line-height:35px;font-size:1px;">&#8202;</div>
													<table class="heading_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="text-align:center;width:100%;">
																<h1 style="margin: 0; color: #101010; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 27px; font-weight: normal; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 32.4px;"><strong>Forgot Your Password?</strong></h1>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px; margin: 0 auto;" width="680">
										<tbody>
											<tr>
												<td class="column column-1" width="16.666666666666668%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:0px;line-height:0px;font-size:1px;">&#8202;</div>
												</td>
												<td class="column column-2" width="66.66666666666667%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:10px;padding-top:10px;">
																<div style="color:#848484;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;line-height:180%;text-align:center;mso-line-height-alt:25.2px;">
																	<p style="margin: 0;">You have requested a password reset.<br>Please click the button below to reset your password</p>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-2" style="height:10px;line-height:10px;font-size:1px;">&#8202;</div>
													<table class="button_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${process.env.CLIENT_URL1}/reset/${resetToken}" style="height:47px;width:162px;v-text-anchor:middle;" arcsize="10%" strokeweight="0.75pt" strokecolor="#101" fillcolor="#101">
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px">
<![endif]--><a href="${process.env.CLIENT_URL1}/reset/${resetToken}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#101;border-radius:4px;width:auto;border-top:1px solid #101;font-weight:400;border-right:1px solid #101;border-bottom:1px solid #101;border-left:1px solid #101;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;">Reset Password</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#101112;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:15px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:18px;">
																	<p style="margin: 0;">Alternatively, you can click the following button&nbsp;</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="button_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${process.env.CLIENT_URL}/reset/${resetToken}" style="height:42px;width:120px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#7747FF">
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px">
<![endif]--><a href="${process.env.CLIENT_URL}/reset/${resetToken}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#7747FF;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;">click on me&nbsp;</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-6" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
												</td>
												<td class="column column-3" width="16.666666666666668%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:0px;line-height:0px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px; margin: 0 auto;" width="680">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
			
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table><!-- End -->
</body>

</html>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.json({ error: "Failed to send email" });
      }
      console.log("Email sent: " + info.response);
      res.json({ message: "Email sent with password reset instructions" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const resetPasswordToken = await ResetPasswordToken.findOne({ token });
    if (!resetPasswordToken || resetPasswordToken.expires < Date.now()) {
      return res.json({ error: "Invalid or expired token" });
    }

    const user = await User.findById(resetPasswordToken.userId);
    if (!user) {
      return res.json({ error: "No user found" });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });

    // Delete the reset token
    await ResetPasswordToken.deleteOne({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  logout,
  forgotPassword,
  resetPassword,
  confirmEmail,
};
