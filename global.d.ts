

import { PrismaClient } from "@prisma/client";

declare global {
  var prismadb: PrismaClient | undefined;
}
