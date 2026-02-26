import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, phone, lookingFor } = await request.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      )
    }

    const firstName = name.split(" ")[0]

    // Attempt to send welcome email via Resend if API key is configured
    const resendKey = process.env.RESEND_API_KEY
    let emailSent = false

    if (resendKey) {
      try {
        const { Resend } = await import("resend")
        const resend = new Resend(resendKey)

        const { error: resendError } = await resend.emails.send({
          from: "Orbitara <onboarding@resend.dev>",
          to: email,
          subject: "Welcome to Orbitara — You're on the List",
          html: `
            <div style="font-family: 'Georgia', serif; max-width: 560px; margin: 0 auto; padding: 48px 24px; color: #e5e5e5; background-color: #0B0B0D;">
              <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 24px; margin-bottom: 32px;">
                <h1 style="font-size: 14px; letter-spacing: 0.3em; text-transform: uppercase; font-weight: 600; color: #f5f5f5; margin: 0;">
                  ORBITARA
                </h1>
              </div>

              <h2 style="font-size: 28px; font-weight: 300; color: #f5f5f5; margin: 0 0 16px 0; line-height: 1.2;">
                Welcome, ${firstName}.
              </h2>

              <p style="font-size: 15px; line-height: 1.7; color: #999; margin: 0 0 20px 0;">
                You've been added to the Orbitara drop list. This means you'll be among the first to know when we release new curated collections of rare and exceptional items.
              </p>

              <p style="font-size: 15px; line-height: 1.7; color: #999; margin: 0 0 20px 0;">
                Here's what to expect:
              </p>

              <ul style="font-size: 15px; line-height: 1.9; color: #999; padding-left: 20px; margin: 0 0 24px 0;">
                <li><strong style="color: #ccc;">Drop alerts</strong> — Early access notifications before each new drop goes live.</li>
                <li><strong style="color: #ccc;">Site passwords</strong> — Exclusive passwords to access the collection before anyone else.</li>
                <li><strong style="color: #ccc;">Priority sourcing</strong> — Our team will work to find exactly what you're looking for.</li>
              </ul>

              <p style="font-size: 15px; line-height: 1.7; color: #999; margin: 0 0 32px 0;">
                Until then, sit tight. Something exceptional is coming.
              </p>

              <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; margin-top: 32px;">
                <p style="font-size: 12px; color: #555; margin: 0; letter-spacing: 0.1em;">
                  ORBITARA — Rare Finds, Curated Drops
                </p>
              </div>
            </div>
          `,
        })

        if (resendError) {
          console.error("[Orbitara] Resend error:", JSON.stringify(resendError))
        } else {
          emailSent = true
        }
      } catch (emailErr) {
        // Email sending failed but we still want to register the user's interest
        console.error("[Orbitara] Email send failed:", emailErr)
      }
    } else {
      console.warn("[Orbitara] RESEND_API_KEY not set — skipping welcome email")
    }

    // Log the request for record-keeping regardless of email outcome
    console.log(
      `[Orbitara] New access request: ${name} (${email})${phone ? `, phone: ${phone}` : ""}${lookingFor ? `, looking for: ${lookingFor}` : ""} | Email sent: ${emailSent}`
    )

    // Always return success to the user — their signup is registered
    return NextResponse.json({
      success: true,
      emailSent,
    })
  } catch (err) {
    console.error("[Orbitara] API error:", err)
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    )
  }
}
