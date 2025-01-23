import { ShipEngine } from 'shipengine'; // Import ShipEngine


if (!process.env.SHIPENGINE_API_KEY) {
  throw new Error('SHIPENGINE_API_KEY is not set in environment variables');
}

const shipEngine = new ShipEngine({
  apiKey: process.env.SHIPENGINE_API_KEY as string, // Ensure API key is a string
});

export { shipEngine };
