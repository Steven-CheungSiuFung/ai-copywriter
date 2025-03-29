import { NextResponse } from 'next/server'

import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  fetch: async (url, options) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeout);
      return response;
    } catch (error) {
      throw new Error(`Request timed out: ${error.message}`);
    }
  }
});

// In production and preview deployments (on Vercel), the VERCEL_URL environment variable is set.
// In development (on your local machine), the NGROK_HOST environment variable is set.
const WEBHOOK_HOST = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NGROK_HOST;

export async function POST(req) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
    );
  }

  const reqContext = await req.json();
  if (!reqContext.prompt?.trim()) {
    return NextResponse.json({ error: "Prompt cannot be empty" }, { status: 400 });
  }

  try {
    const input = {
      prompt: reqContext.prompt,
      negative_prompt: reqContext.negative_prompt || "blurry, duplicate",
      go_fast: true,
      megapixels: "1",
      num_outputs: 1,
      aspect_ratio: "1:1",
      output_format: "webp",
      output_quality: 80,
      num_inference_steps: 4,
      guidance_scale: 7.5
    }

    const options = {
      model: 'black-forest-labs/flux-schnell',
      input: input
    }

    if (WEBHOOK_HOST) {
      options.webhook = `${WEBHOOK_HOST}/api/webhooks`
      options.webhook_events_filter = ["start", "completed"]
    }

    const prediction = await replicate.predictions.create(options);

    if (prediction?.error) {
      return NextResponse.json({ detail: prediction.error }, { status: 500 });
    }

    return NextResponse.json(prediction, { status: 201 });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json({
      error: error.message.includes("timed out") ?
        "Generation timed out, please simplify the description and try again" :
        `Generation Failure: ${error.message}`
    }, { status: 500 });
  }
}