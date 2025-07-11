import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, eventType, message } = body;

    const data = await resend.emails.send({
      from: "Starbook <noreply@yourdomain.com>",
      to: "abhuluimendestiny@gmail.com",
      subject: `New Contact Form Submission - ${eventType}`,
      html: `
  <div style="background-color:#000000; color:#ffffff; font-family:Arial, sans-serif; padding:24px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; margin:0 auto; background-color:#111111; border:1px solid #374151; border-radius:8px;">
      <tr>
        <td style="padding:32px;">
          <h2 style="font-size:24px; color:#ffffff; margin-bottom:16px;">🎉 New Booking Inquiry</h2>

          <p style="font-size:16px; color:#D1D5DB; margin-bottom:8px;">
            <strong style="color:#ffffff;">Name:</strong> ${name}
          </p>
          <p style="font-size:16px; color:#D1D5DB; margin-bottom:8px;">
            <strong style="color:#ffffff;">Email:</strong> ${email}
          </p>
          <p style="font-size:16px; color:#D1D5DB; margin-bottom:8px;">
            <strong style="color:#ffffff;">Phone:</strong> ${phone || "N/A"}
          </p>
          <p style="font-size:16px; color:#D1D5DB; margin-bottom:8px;">
            <strong style="color:#ffffff;">Event Type:</strong> ${eventType}
          </p>

          <hr style="border:1px solid #374151; margin:24px 0;" />

          <h3 style="font-size:20px; color:#ffffff; margin-bottom:12px;">Message</h3>
          <p style="font-size:16px; color:#D1D5DB; line-height:1.6;">
            ${message.replace(/\n/g, "<br/>")}
          </p>

          <div style="margin-top:32px; text-align:center;">
            <a href="mailto:${email}" style="background-color:#2563EB; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:bold; display:inline-block;">
              Reply to ${name}
            </a>
          </div>
        </td>
      </tr>
    </table>

    <p style="font-size:12px; color:#9CA3AF; text-align:center; margin-top:24px;">
      Sent from Starbook.com contact form
    </p>
  </div>
`,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Resend Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
