import { verifyWebhook } from "@clerk/nextjs/webhooks";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req);

    // Connect to MongoDB
    await connectDB();

    const eventType = evt.type;

    if (eventType === "user.created") {
      // Access the user data from evt.data, not evt directly
      const userData = evt.data;

      // Extract useful info from payload
      const newUser = new User({
        id: userData.id,
        firstname: userData.first_name || null,      
        lastname: userData.last_name || null,        
        username: userData.username || null,
        fullname: `${userData.first_name ?? ""} ${userData.last_name ?? ""}`.trim(),
        EmailAddress: userData.email_addresses?.[0]?.email_address || null, 
      });

      console.log("New user data:", newUser);

      // Save to MongoDB
      await newUser.save();
    }

    console.log(
      `Received webhook with ID ${evt.data.id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}