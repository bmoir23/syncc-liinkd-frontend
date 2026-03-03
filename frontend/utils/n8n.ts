"use client";

export interface N8nWebhookPayload {
  event: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

export interface N8nWebhookResult {
  success: boolean;
  data?: unknown;
  error?: string;
  duration?: number;
}

export async function triggerN8nWebhook(
  webhookUrl: string,
  payload: Omit<N8nWebhookPayload, "timestamp">
): Promise<N8nWebhookResult> {
  const start = Date.now();
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        timestamp: new Date().toISOString(),
      }),
    });

    const duration = Date.now() - start;

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
        duration,
      };
    }

    let data: unknown;
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return { success: true, data, duration };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
      duration: Date.now() - start,
    };
  }
}

export function validateWebhookUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}
