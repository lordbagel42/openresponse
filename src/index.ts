import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { describeRoute, openAPISpecs } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { route } from "./message";

const app = new OpenAPIHono();

app.openapi(route, (c) => {
	const { message } = c.req.valid("json");
	return c.json(
		{
			uuid: crypto.randomUUID(),
			response: `You submitted: ${message}`,
		},
		200 // You should specify the status code even if it is 200.
	);
});

// The OpenAPI documentation will be available at /doc
app.doc("/doc", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "My API",
	},
});

app.get("/api", Scalar({ url: "/doc" }));

export default app;
