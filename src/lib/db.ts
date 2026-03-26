import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

export const connectDb = async (): Promise<void> => {
  try {
    if (cachedConnection && cachedConnection.readyState === 1) {
      console.log("Using cached database connection");
      return;
    }
    if (!process.env.MONGO_DB_URL) {
      throw new Error("MONGO_DB_URL is not defined in environment variables");
    }
    // Retry to avoid noisy logs from intermittent Atlas/DNS hiccups.
    const maxAttempts = 3;
    let lastError: unknown = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
          dbName: "PropertyDb",
        });
        cachedConnection = connection;
        console.log("DB connected");
        return;
      } catch (err) {
        lastError = err;
        console.error(
          `[DB] Connect attempt ${attempt}/${maxAttempts} failed:`,
          err instanceof Error ? err.message : err,
        );
        if (attempt < maxAttempts) {
          // Basic backoff.
          await new Promise((r) => setTimeout(r, attempt * 500));
        }
      }
    }

    console.error("Failed to connect with database:", lastError);
  } catch (error) {
    console.error("Failed to connect with database:", error);
  }
};
