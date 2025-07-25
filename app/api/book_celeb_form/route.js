import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      eventDate,
      budget,
      eventType,
      location,
      description,
      fullName,
      jobTitle,
      organization,
      phone,
      email,
      address,
      airport,
    } = data;

    if (!email || !fullName || !eventType || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // 📧 Send to admin
    const internalEmail = await resend.emails.send({
      from: "Starbook <noreply@elitestarbook.com>",
      to: ["alex@elitestarbook.com"],
      reply_to: email,
      subject: `New Booking Inquiry for ${eventType}`,
      html: `
        <div style="background-color:#000000; color:#ffffff; font-family:Arial, sans-serif; padding:24px;">
          <div style="max-width:600px; margin:0 auto; border:1px solid #374151; border-radius:8px; background-color:#111111; padding:32px;">
            <h2 style="color:#2563EB;">🎤 New Booking Inquiry</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "N/A"}</p>
            <p><strong>Event Type:</strong> ${eventType}</p>
            <p><strong>Event Date:</strong> ${eventDate || "N/A"}</p>
            <p><strong>Budget:</strong> ${budget || "N/A"}</p>
            <p><strong>Location:</strong> ${location || "N/A"}</p>
            <p><strong>Nearest Airport:</strong> ${airport || "N/A"}</p>
            <p><strong>Organization:</strong> ${organization || "N/A"}</p>
            <p><strong>Job Title:</strong> ${jobTitle || "N/A"}</p>
            <p><strong>Address:</strong> ${address || "N/A"}</p>
            <hr style="border:1px solid #374151; margin:20px 0;" />
            <p><strong>Description:</strong><br/>${description.replace(/\n/g, "<br/>")}</p>
          </div>
          <p style="color:#9CA3AF; text-align:center; margin-top:24px;">Sent from elitestarbook.com</p>
        </div>
      `,
    });

    // 📧 Send confirmation to user
    const confirmationEmail = await resend.emails.send({
      from: "Starbook <noreply@elitestarbook.com>",
      to: email,
      subject: "We received your booking request!",
      html: `
        <div style="background-color:#000000; color:#ffffff; font-family:Arial, sans-serif; padding:24px;">
          <div style="max-width:600px; margin:0 auto; border:1px solid #374151; border-radius:8px; background-color:#111111; padding:32px;">
            <h2 style="color:#2563EB;">Hey ${fullName},</h2>
            <p style="color:#D1D5DB;">
              Thanks for contacting <strong style="color:white;">Starbook</strong>! 🎉<br />
              We received your request regarding <strong>${eventType}</strong> and will get back to you shortly.
            </p>
            <hr style="margin:20px 0; border:1px solid #374151;" />
            <p><strong>Phone:</strong> ${phone || "N/A"}</p>
            <p><strong>Message:</strong><br/>${description.replace(/\n/g, "<br/>")}</p>
            <p style="margin-top:20px; color:#9CA3AF;">You can reply to this email if you have updates.</p>
            <p style="margin-top:16px; color:#D1D5DB;">– The Starbook Team</p>
          </div>
          <p style="color:#9CA3AF; text-align:center; margin-top:24px;">This is an automated email from elitestarbook.com</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      internalEmail,
      confirmationEmail,
    });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
