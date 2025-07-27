import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      startDate,
      endDate,
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

    // Validation for required fields
    if (
      !email ||
      !fullName ||
      !eventType ||
      !description ||
      !startDate ||
      !endDate
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Format date range for display
    const eventDateRange = `${startDate} to ${endDate}`;

    // 📧 Send to admin
    const internalEmail = await resend.emails.send({
      from: "Starbook <noreply@elitestarbook.com>",
      to: ["alex@elitestarbook.com"],
      reply_to: email,
      subject: `New Booking Inquiry for ${eventType}`,
      html: `
        <div style="color:#ffffff; font-family:Arial, sans-serif; padding:24px;">
          <div style="max-width:600px; margin:0 auto; border:1px solid #374151; border-radius:8px; background-color:#111111; padding:32px;">
            <h2 style="color:#2563EB;">🎤 New Booking Inquiry</h2>
            
            <h3 style="color:#10B981; margin-top:24px;">Contact Information</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Job Title:</strong> ${jobTitle}</p>
            <p><strong>Organization:</strong> ${organization}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Nearest Airport:</strong> ${airport}</p>
            
            <h3 style="color:#10B981; margin-top:24px;">Event Details</h3>
            <p><strong>Event Type:</strong> ${eventType}</p>
            <p><strong>Event Dates:</strong> ${eventDateRange}</p>
            <p><strong>Budget:</strong> ${budget}</p>
            <p><strong>Location:</strong> ${location}</p>
            
            <hr style="border:1px solid #374151; margin:24px 0;" />
            <h3 style="color:#10B981;">Event Description</h3>
            <div style="background-color:#1F2937; padding:16px; border-radius:8px; border-left:4px solid #2563EB;">
              ${description.replace(/\n/g, "<br/>")}
            </div>
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
        <div style=" color:#ffffff; font-family:Arial, sans-serif; padding:24px;">
          <div style="max-width:600px; margin:0 auto; border:1px solid #374151; border-radius:8px; background-color:#111111; padding:32px;">
            <h2 style="color:#2563EB;">Hey ${fullName},</h2>
            <p style="color:#D1D5DB;">
              Thanks for contacting <strong style="color:white;">Starbook</strong>! 🎉<br />
              We received your request for your <strong>${eventType}</strong> and will get back to you shortly.
            </p>
            
            <div style="background-color:#1F2937; padding:16px; border-radius:8px; margin:20px 0;">
              <h3 style="color:#10B981; margin:0 0 12px 0;">Your Request Summary</h3>
              <p><strong>Event:</strong> ${eventType}</p>
              <p><strong>Dates:</strong> ${eventDateRange}</p>
              <p><strong>Location:</strong> ${location}</p>
              <p><strong>Budget:</strong> ${budget}</p>
            </div>
            
            <hr style="margin:24px 0; border:1px solid #374151;" />
            <p><strong>Your Message:</strong></p>
            <div style="background-color:#1F2937; padding:12px; border-radius:6px; margin:8px 0;">
              ${description.replace(/\n/g, "<br/>")}
            </div>
            
            <p style="margin-top:24px; color:#9CA3AF;">
              We'll review your request and get back to you within 24 hours. You can reply to this email if you have any updates or questions.
            </p>
            <p style="margin-top:16px; color:#D1D5DB;">– The Starbook Team</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Booking request submitted successfully!",
      internalEmail: internalEmail.data,
      confirmationEmail: confirmationEmail.data,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error.message || "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
