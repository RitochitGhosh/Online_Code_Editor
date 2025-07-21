import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server"; 
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { api, internal } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/lemon-squeezy-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const payloadString = await request.text();
    const signature = request.headers.get("X-Signature");

    if (!signature) {
      return new Response("Missing X-Signature header", { status: 400 });
    }

    try {
      const payload = await ctx.runAction(internal.lemonSqueezy.verifyWebhook, {
        payload: payloadString,
        signature,
      });

      if (payload.meta.event_name === "order_created") {
        const { data } = payload;

        const { success } = await ctx.runMutation(api.users.upgradeToPro, {
          email: data.attributes.user_email,
          lemonSqueezyCustomerId: data.attributes.customer_id.toString(),
          lemonSqueezyOrderId: data.id,
          amount: data.attributes.total,
        });

        if (success) {
            // TODO: Send email to user...
        }
      }

      return new Response("Webhook processed successfully", { status: 200 });
    } catch (error) {
      console.log("Webhook error:", error);
      return new Response("Error processing webhook", { status: 500 });
    }
  }),
});

http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        console.log("WEBHOOK controller: Got request ");
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET; // stored in conver env_var
        if (!webhookSecret) throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");

        const svix_id = request.headers.get("svix-id");
        const svix_signature = request.headers.get("svix-signature");
        const svix_timestamp = request.headers.get("svix-timestamp");

        if (!svix_id || !svix_signature || !svix_timestamp) {
            return new Response("Error : no svix headers", {
                status: 400
            });
        }

        const payload = await request.json();
        const body = JSON.stringify(payload);

        const wh = new Webhook(webhookSecret);
        let evt: WebhookEvent;

        try {
            evt = wh.verify(body, {
                "svix-id": svix_id,
                "svix-signature": svix_signature,
                "svix-timestamp": svix_timestamp,
            }) as WebhookEvent;

        } catch (error) {
            console.error("Error in verifying webhook: ", error);
            return new Response("Error occured", { status: 400 });
        }

        const eventType = evt.type;
        if (eventType === "user.created") {
            const { id, email_addresses, first_name, last_name  } = evt.data;

            const email = email_addresses[0].email_address;
            const name = `${first_name || ""} ${last_name || ""}`.trim();

            try {
                await ctx.runMutation(api.users.syncUser, {
                    userId: id,
                    email,
                    name,
                });

            } catch (error) {
                console.error("Error in creating users: ", error);
                return new Response("Error in creating user!", {
                    status: 500,
                });
            }

            return new Response("Webhook processed successfully", {
                status: 200,
            });
        }

        return new Response("Event ignored", { status: 200 });
    }),
});

export default http;