import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, eventType, message } = body;

    if (!name || !email || !eventType || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Send email to you
    const internalEmail = await resend.emails.send({
      from: "Starbook <noreply@elitestarbook.com>",
      to: "alex@elitestarbook.com",
      reply_to: email,
      subject: `New Contact Form Submission - ${eventType}`,
      html: `
  <div style="background-color:#000000; color:#ffffff; font-family:Arial, sans-serif; padding:24px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; margin:0 auto; background-color:#111111; border:1px solid #374151; border-radius:8px;">
      <tr>
        <td style="padding:32px;">
          <h2 style="font-size:24px; color:#ffffff; margin-bottom:16px;">🎉 New Booking Inquiry</h2>

          <p style="font-size:16px; color:#D1D5DB; margin-bottom:8px;"><strong style="color:#ffffff;">Name:</strong> ${name}</p>
          <p style="font-size:16px; color:#D1D5DB; margin-bottom:8px;"><strong style="color:#ffffff;">Email:</strong> ${email}</p>
          <p style="font-size:16px; color:#D1D5DB; margin-bottom:8px;"><strong style="color:#ffffff;">Phone:</strong> ${phone || "N/A"}</p>
          <p style="font-size:16px; color:#D1D5DB; margin-bottom:8px;"><strong style="color:#ffffff;">Event Type:</strong> ${eventType}</p>

          <hr style="border:1px solid #374151; margin:24px 0;" />

          <h3 style="font-size:20px; color:#ffffff; margin-bottom:12px;">Message</h3>
          <p style="font-size:16px; color:#D1D5DB; line-height:1.6;">${message.replace(/\n/g, "<br/>")}</p>

          <div style="margin-top:32px; text-align:center;">
            <a href="mailto:${email}" style="background-color:#2563EB; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:bold; display:inline-block;">
              Reply to ${name}
            </a>
          </div>
        </td>
      </tr>
    </table>

    <p style="font-size:12px; color:#9CA3AF; text-align:center; margin-top:24px;">
      Sent from elitestarbook.com contact form
    </p>
  </div>
`,
    });

    // ✅ Send confirmation to the user
    const confirmationEmail = await resend.emails.send({
      from: "Starbook <noreply@elitestarbook.com>",
      to: email,
      subject: "We received your booking request!",
      html: `
  <div style="background-color:#000000; color:#ffffff; font-family:Arial, sans-serif; padding:24px;">
    <div style="max-width:600px; margin:0 auto; border:1px solid #374151; border-radius:8px; padding:32px; background-color:#111111;">
      <h2 style="font-size:24px; color:#2563EB; margin-bottom:16px;">Hey ${name},</h2>

      <p style="font-size:16px; color:#D1D5DB; line-height:1.6;">
        Thanks for reaching out to <strong style="color:#ffffff;">Starbook</strong>! 🎉<br /><br />
        We’ve received your request regarding the 
        <strong style="color:#ffffff;">${eventType}</strong> and will respond within 24 hours.
      </p>

      <hr style="margin:24px 0; border:1px solid #374151;" />

      <h3 style="font-size:18px; color:#2563EB; margin-bottom:12px;">Here's what you submitted:</h3>
      <p style="font-size:16px; color:#D1D5DB; margin-bottom:8px;">
        <strong style="color:#ffffff;">Phone:</strong> ${phone || "N/A"}
      </p>
      <p style="font-size:16px; color:#D1D5DB; margin-bottom:8px;">
        <strong style="color:#ffffff;">Message:</strong><br />${message.replace(/\n/g, "<br/>")}
      </p>

      <p style="margin-top:32px; font-size:16px; color:#9CA3AF;">
        If you have any urgent updates, reply to this email directly.
      </p>

      <p style="margin-top:16px; font-size:16px; color:#D1D5DB;">– The Starbook Team</p>
    </div>

    <p style="font-size:12px; color:#9CA3AF; text-align:center; margin-top:24px;">
      This is an automated confirmation from elitestarbook.com
    </p>
  </div>
`,
    });

    return NextResponse.json({
      success: true,
      internalEmail,
      confirmationEmail,
    });
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
