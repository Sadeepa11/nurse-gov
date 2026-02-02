import nodemailer from "nodemailer";

export async function POST(request) {
  const body = await request.json();
  const { name, hospital, id_number, phone, email, subject, message } = body;

  // configure transporter
  const transporter = nodemailer.createTransport({
    host: "ultra66.lhws.net", // replace with your email SMTP host
    port: 465, // or 587
    secure: true,
    auth: {
      user: "info@acnu.lk", // your email
      pass: "gZa)AjcS6hKwTdGZ", // email password or app password
    },
  });

  const mailOptions = {
    from: email,
    to: "info@acnu.lk",
    subject: subject || "New Contact Form Submission",
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Hospital:</strong> ${hospital}</p>
      <p><strong>ID Number:</strong> ${id_number}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: "Email sent successfully" }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Email sending failed" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
