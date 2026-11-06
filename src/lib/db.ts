import {
  supabase,
  supabaseAdmin,
  isSupabaseConfigured,
  type Database,
} from "./supabase";

export { supabase, supabaseAdmin, isSupabaseConfigured };

export interface EnquiryInput {
  name: string;
  email: string;
  organization?: string | null;
  subject: string;
  message: string;
  status?: string;
}

export interface SubscriberInput {
  email: string;
  status?: string;
}

/**
 * Unified database adapter powered by Supabase.
 * Provides backwards-compatible methods for the contact & newsletter routes
 * while enabling full native Supabase capabilities.
 */
export const db = {
  client: supabaseAdmin,

  enquiry: {
    /**
     * Create a new contact enquiry in the Supabase 'enquiries' table.
     */
    async create({ data }: { data: EnquiryInput }) {
      if (!isSupabaseConfigured()) {
        console.warn(
          "[Supabase] NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not configured. Simulating submission in local dev."
        );
        return {
          id: "dev-simulated-id",
          ...data,
          created_at: new Date().toISOString(),
        };
      }

      const client = process.env.SUPABASE_SERVICE_ROLE_KEY
        ? supabaseAdmin
        : supabase;

      const { data: record, error } = await client
        .from("enquiries")
        .insert({
          name: data.name,
          email: data.email,
          organization: data.organization || null,
          subject: data.subject,
          message: data.message,
          status: data.status || "new",
        })
        .select()
        .single();

      if (error) {
        console.error("[Supabase Enquiry Error]:", error);
        throw new Error(error.message || "Failed to save enquiry in Supabase");
      }

      return record;
    },

    /**
     * Retrieve enquiries from Supabase.
     */
    async findMany(options?: { limit?: number; status?: string }) {
      const client = process.env.SUPABASE_SERVICE_ROLE_KEY
        ? supabaseAdmin
        : supabase;

      let query = client
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (options?.status) {
        query = query.eq("status", options.status);
      }
      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;
      if (error) {
        console.error("[Supabase Enquiry findMany Error]:", error);
        throw new Error(error.message);
      }
      return data || [];
    },
  },

  subscriber: {
    /**
     * Upsert a newsletter subscriber in the Supabase 'subscribers' table.
     */
    async upsert({
      where,
      update,
      create,
    }: {
      where: { email: string };
      update: { status?: string };
      create: { email: string; status?: string };
    }) {
      if (!isSupabaseConfigured()) {
        console.warn(
          "[Supabase] NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not configured. Simulating subscriber upsert in local dev."
        );
        return {
          id: "dev-simulated-id",
          email: where.email,
          status: create.status || update.status || "active",
          subscribed_at: new Date().toISOString(),
        };
      }

      const client = process.env.SUPABASE_SERVICE_ROLE_KEY
        ? supabaseAdmin
        : supabase;

      const { data: record, error } = await client
        .from("subscribers")
        .upsert(
          {
            email: where.email.toLowerCase().trim(),
            status: update.status || create.status || "active",
          },
          { onConflict: "email" }
        )
        .select()
        .single();

      if (error) {
        console.error("[Supabase Subscriber Error]:", error);
        throw new Error(error.message || "Failed to update subscriber in Supabase");
      }

      return record;
    },

    /**
     * Retrieve subscribers from Supabase.
     */
    async findMany(options?: { limit?: number; status?: string }) {
      const client = process.env.SUPABASE_SERVICE_ROLE_KEY
        ? supabaseAdmin
        : supabase;

      let query = client
        .from("subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });

      if (options?.status) {
        query = query.eq("status", options.status);
      }
      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;
      if (error) {
        console.error("[Supabase Subscriber findMany Error]:", error);
        throw new Error(error.message);
      }
      return data || [];
    },
  },
};
