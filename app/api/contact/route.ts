import { NextResponse } from "next/server"
import { z } from "zod"

const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string()
})

const WEBHOOK_URL = process.env.WEBHOOK_URL!

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = bodySchema.parse(body)
  } catch (err) {
    console.error(err)
    return NextResponse.error()
  }
}