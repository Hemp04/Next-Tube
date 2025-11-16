// app/api/clerk-webhook/route.ts
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { users } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  // Get the webhook secret from environment variables
  const webhookSecret = process.env.CLERK_SIGNING_SECRET;

  if (!webhookSecret) {
    throw new Error("CLERK_WEBHOOK_SECRET not set");
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If headers are missing, return an error
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- missing svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.text();

  // Create a new Svix instance
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;

  // Verify the payload
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying the webhook:", err);
    return new Response("Error occurred -- verification failed", {
      status: 400,
    });
  }

  // Process the webhook event
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with ID ${id} and type ${eventType} received`);
  console.log("Event data:", evt.data);

  // Handle specific events (e.g., user.created, user.updated)
  if (eventType === "user.created") {
    const { data } = evt;
    await db.insert(users).values({
      clerkId: data.id,
      name: `${data.first_name} ${data.last_name}`,
      imageUrl: data.image_url,
    });
  }

  if (eventType === "user.deleted") {
    const { data } = evt;
    if (!data.id) {
      return new Response("Missing user id", { status: 400 });
    }
    await db.delete(users).where(eq(users.clerkId, data.id));
  }
  if (eventType === "user.updated") {
    const { data } = evt;
    await db
      .update(users)
      .set({
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
      })
      .where(eq(users.clerkId, data.id));
  }

  return new NextResponse("OK", { status: 200 });
}
