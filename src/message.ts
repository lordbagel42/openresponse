import { z } from "@hono/zod-openapi"; // For extending the Zod schema with OpenAPI properties
import { createRoute } from "@hono/zod-openapi";

const messageRequestSchema = z.object({
	message: z.string().min(3).openapi({
		description: "Message to submit for processing",
		example: "Can I get a phone from this?",
	}),
	username: z.string().openapi({
		description: "Username of the sender",
		example: "john_doe",
	}),
});

const messageResponseSchema = z.object({
	uuid: z.uuid(),
	response: z.string(),
});

export const route = createRoute({
	method: "post",
	path: "/message",
	request: {
		body: {
			content: {
				"application/json": {
					schema: messageRequestSchema,
				},
			},
		},
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: messageResponseSchema,
				},
			},
			description: "Submit a message for processing",
		},
	},
});
