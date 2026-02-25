import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    const { name, email, phone, lookingFor } = await request.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      )
    }

    // Lazy-init inside handler so the build doesn't crash when the env var is absent
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Send welcome email to the user
    const { error } = await resend.emails.send({
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
            Welcome, ${name.split(" ")[0]}.
          </h2>

          <p style="font-size: 15px; line-height: 1.7; color: #999; margin: 0 0 20px 0;">
            You've been added to the Orbitara drop list. This means you'll be among the first to know when we release new curated collections of rare and exceptional items.
          </p>

          <p style="font-size: 15px; line-height: 1.7; color: #999; margin: 0 0 20px 0;">
            Here's what to expect:
          </p>

          <ul style="font-size: 15px; line-height: 1.9; color: #999; padding-left: 20px; margin: 0 0 24px 0;">
            <li><strong style="color: #ccc;">Drop alerts</strong> — You'll receive early access notifications before each new drop goes live.</li>
            <li><strong style="color: #ccc;">Site passwords</strong> — When we drop, you'll get exclusive passwords to access the collection before anyone else.</li>
            <li><strong style="color: #ccc;">Priority sourcing</strong> — If you're looking for something specific, our team will work to find it for you.</li>
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

    if (error) {
      console.error("[v0] Resend error:", error)
      return NextResponse.json(
        { error: "Failed to send welcome email." },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[v0] API error:", err)
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    )
  }
}
