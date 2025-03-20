// app/api/auth/siwsol/route.ts
import { createSiwaHandler } from "@vmkit/connect-avm/server";

const handler = createSiwaHandler();

export const GET = handler.GET;
export const PUT = handler.PUT;
export const POST = handler.POST;
export const DELETE = handler.DELETE;