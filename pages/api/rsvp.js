// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const sgMail = require("@sendgrid/mail");

/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse } res
 * @returns
 */
export default async function handler(req, res) {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error("Missing SENDGRID_API_KEY env variable.");
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  if (req.method === "POST") {
    const text = `
    Names: ${req.body.names}
    RSVP: ${req.body.rsvp}
    Dietary Requirements: ${req.body["dietary-requirements"]}
    Kids: ${req.body.kids}
    Transport: ${req.body.kids}
    Questions: ${req.body.questions}
`;

    const msgMe = {
      to: ["killer.paolo@gmail.com"], // Change to your recipient
      cc: ["annarpa93@gmail.com"],
      from: "info@annaepaolo.com", // Change to your verified sender
      replyTo: "killer.paolo@gmail.com",
      subject: "RSVP matrimonio",
      text,
    };

    if (process.env.LOG_ONLY_EMAILS === "true") {
      console.log(`Sending email: ${text}`);
    } else {
      try {
        await sgMail.send(msgMe);
      } catch (e) {
        console.error(e);
        return res.status(500).json({});
      }
    }
    res.status(200).json({});
  }
}
