// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const text = `
      Names: ${req.body.names}
      RSVP: ${req.body.rsvp}
      Dietary Requirements: ${req.body["dietary-requirementes"]}
      Kids: ${req.body.kids}
      Transport: ${req.body.kids}
      Questions: ${req.body.questions}
    `;

    const msgMe = {
      to: "killer.paolo@gmail.com", // Change to your recipient
      from: "killer.paolo@gmail.com", // Change to your verified sender
      subject: "RSVP matrimonio",
      text,
    };

    const msgAnna = {
      ...msgMe,
      to: "annarpa93@gmail.com",
    };
    if (process.env.LOG_ONLY_EMAILS === "true") {
      console.log(`Sending email: ${text}`);
    } else {
      sgMail
        .send(msgMe)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(JSON.stringify(error));
        });

      sgMail
        .send(msgAnna)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(JSON.stringify(error));
        });
    }

    return res.status(200).json({});
  }
}
