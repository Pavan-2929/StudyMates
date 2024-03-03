//  const mailSender = require("../utils/mailSender.js");
// // import mailSender from "../utils/mailsender.js";
// import mailSender from "../utils/mailsender.js";

import mailSender from "../utils/mailSender.js";

const mailsendercontroller = async (req, res) => {
  try {
    const { email, subject, body } = req.body;
    // console.log(email, subject, body);
    const response = await mailSender(email, "subgjecr", "body");
    console.log("mail controller : ", response);
    return res.status(200).json({
      success: true,
      message: "send email successfully",
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

export default mailsendercontroller;
