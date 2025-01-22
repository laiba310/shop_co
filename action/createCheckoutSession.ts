import stripe from "@/lib/strip";
import { BasketItem } from "../store/store";
import { urlFor } from "@/sanity/lib/image";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedBasketItem = {
  Product: BasketItem["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata
) {
  try {
    const itemsWithoutPrice = items.filter((item) => item.Product.price == null);

    if (itemsWithoutPrice.length > 0) {
      console.error("Items without price:", itemsWithoutPrice);
      throw new Error("Some items do not have a price");
    }

    const customer = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    let customerId: string | undefined;
    if (customer.data.length > 0) {
      customerId = customer.data[0].id;
    }

    const isLocal = process.env.NODE_ENV === "development";
    const successUrl = process.env.SUCCESS_URL || 
      (isLocal ? "http://localhost:3000/success" : "https://shop-co-97pt.vercel.app/success");
    const cancelUrl = process.env.CANCEL_URL || 
      (isLocal ? "http://localhost:3000/basket" : "https://shop-co-97pt.vercel.app/basket");

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: items.map((item) => ({
        price_data: {
          currency: "PKR",
          unit_amount: Math.round(item.Product.price! * 100),
          product_data: {
            name: item.Product.name || "Unnamed Product",
            description: `Product ID: ${item.Product._id}`,
            metadata: {
              id: item.Product._id,
              images: item.Product.image
                ? urlFor(item.Product.image).url()
                : null,
            },
          },
        },
        quantity: item.quantity,
      })),
      shipping_address_collection: {
        allowed_countries: ["PK", "US"],
      },
      phone_number_collection: {
        enabled: true,
      },
    });

    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", {
      message: error,
      stack: error,
      items,
      metadata,
    });
    throw error;
  }
}
