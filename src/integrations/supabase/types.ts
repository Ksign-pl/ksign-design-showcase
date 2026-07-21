export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      briefs: {
        Row: {
          brand_colors: string | null;
          company_name: string | null;
          content_notes: string | null;
          created_at: string;
          goals: string | null;
          id: string;
          industry: string | null;
          inspirations: string | null;
          logo_url: string | null;
          order_id: string;
          phone: string | null;
        };
        Insert: {
          brand_colors?: string | null;
          company_name?: string | null;
          content_notes?: string | null;
          created_at?: string;
          goals?: string | null;
          id?: string;
          industry?: string | null;
          inspirations?: string | null;
          logo_url?: string | null;
          order_id: string;
          phone?: string | null;
        };
        Update: {
          brand_colors?: string | null;
          company_name?: string | null;
          content_notes?: string | null;
          created_at?: string;
          goals?: string | null;
          id?: string;
          industry?: string | null;
          inspirations?: string | null;
          logo_url?: string | null;
          order_id?: string;
          phone?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "briefs_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      demo_events: {
        Row: {
          created_at: string;
          demo_id: string;
          event_type: string;
          id: string;
          metadata: Json;
        };
        Insert: {
          created_at?: string;
          demo_id: string;
          event_type: string;
          id?: string;
          metadata?: Json;
        };
        Update: {
          created_at?: string;
          demo_id?: string;
          event_type?: string;
          id?: string;
          metadata?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "demo_events_demo_id_fkey";
            columns: ["demo_id"];
            isOneToOne: false;
            referencedRelation: "demos";
            referencedColumns: ["id"];
          },
        ];
      };
      demos: {
        Row: {
          advisor_id: string;
          advisor_name: string | null;
          brand_color: string | null;
          city: string;
          client_email: string;
          company_name: string;
          content: Json | null;
          created_at: string;
          expired_at: string | null;
          expires_at: string | null;
          generated_at: string | null;
          id: string;
          logo_url: string | null;
          main_service: string;
          package_id: string;
          paid_at: string | null;
          purge_after: string | null;
          sent_at: string | null;
          site_type: string;
          slug: string;
          status: Database["public"]["Enums"]["demo_status"];
          stripe_session_id: string | null;
          target_audience: string;
          updated_at: string;
        };
        Insert: {
          advisor_id: string;
          advisor_name?: string | null;
          brand_color?: string | null;
          city: string;
          client_email: string;
          company_name: string;
          content?: Json | null;
          created_at?: string;
          expired_at?: string | null;
          expires_at?: string | null;
          generated_at?: string | null;
          id?: string;
          logo_url?: string | null;
          main_service: string;
          package_id: string;
          paid_at?: string | null;
          purge_after?: string | null;
          sent_at?: string | null;
          site_type: string;
          slug: string;
          status?: Database["public"]["Enums"]["demo_status"];
          stripe_session_id?: string | null;
          target_audience: string;
          updated_at?: string;
        };
        Update: {
          advisor_id?: string;
          advisor_name?: string | null;
          brand_color?: string | null;
          city?: string;
          client_email?: string;
          company_name?: string;
          content?: Json | null;
          created_at?: string;
          expired_at?: string | null;
          expires_at?: string | null;
          generated_at?: string | null;
          id?: string;
          logo_url?: string | null;
          main_service?: string;
          package_id?: string;
          paid_at?: string | null;
          purge_after?: string | null;
          sent_at?: string | null;
          site_type?: string;
          slug?: string;
          status?: Database["public"]["Enums"]["demo_status"];
          stripe_session_id?: string | null;
          target_audience?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      email_resend_attempts: {
        Row: {
          created_at: string;
          email_type: string;
          error_message: string | null;
          id: string;
          idempotency_key: string | null;
          order_id: string;
          recipient_email: string | null;
          status: string;
        };
        Insert: {
          created_at?: string;
          email_type?: string;
          error_message?: string | null;
          id?: string;
          idempotency_key?: string | null;
          order_id: string;
          recipient_email?: string | null;
          status: string;
        };
        Update: {
          created_at?: string;
          email_type?: string;
          error_message?: string | null;
          id?: string;
          idempotency_key?: string | null;
          order_id?: string;
          recipient_email?: string | null;
          status?: string;
        };
        Relationships: [];
      };
      email_send_log: {
        Row: {
          created_at: string;
          error_message: string | null;
          id: string;
          message_id: string | null;
          metadata: Json | null;
          recipient_email: string;
          status: string;
          template_name: string;
        };
        Insert: {
          created_at?: string;
          error_message?: string | null;
          id?: string;
          message_id?: string | null;
          metadata?: Json | null;
          recipient_email: string;
          status: string;
          template_name: string;
        };
        Update: {
          created_at?: string;
          error_message?: string | null;
          id?: string;
          message_id?: string | null;
          metadata?: Json | null;
          recipient_email?: string;
          status?: string;
          template_name?: string;
        };
        Relationships: [];
      };
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number;
          batch_size: number;
          id: number;
          retry_after_until: string | null;
          send_delay_ms: number;
          transactional_email_ttl_minutes: number;
          updated_at: string;
        };
        Insert: {
          auth_email_ttl_minutes?: number;
          batch_size?: number;
          id?: number;
          retry_after_until?: string | null;
          send_delay_ms?: number;
          transactional_email_ttl_minutes?: number;
          updated_at?: string;
        };
        Update: {
          auth_email_ttl_minutes?: number;
          batch_size?: number;
          id?: number;
          retry_after_until?: string | null;
          send_delay_ms?: number;
          transactional_email_ttl_minutes?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      email_unsubscribe_tokens: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          token: string;
          used_at: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          token: string;
          used_at?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          token?: string;
          used_at?: string | null;
        };
        Relationships: [];
      };
      order_checklist_progress: {
        Row: {
          checked_indices: number[];
          created_at: string;
          notes: Json;
          order_id: string;
          updated_at: string;
        };
        Insert: {
          checked_indices?: number[];
          created_at?: string;
          notes?: Json;
          order_id: string;
          updated_at?: string;
        };
        Update: {
          checked_indices?: number[];
          created_at?: string;
          notes?: Json;
          order_id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          amount_cents: number;
          brief_completed: boolean;
          created_at: string;
          currency: string;
          customer_email: string | null;
          customer_name: string | null;
          environment: string;
          id: string;
          price_id: string;
          product_name: string;
          status: string;
          stripe_customer_id: string | null;
          stripe_payment_intent_id: string | null;
          stripe_session_id: string;
          updated_at: string;
        };
        Insert: {
          amount_cents: number;
          brief_completed?: boolean;
          created_at?: string;
          currency?: string;
          customer_email?: string | null;
          customer_name?: string | null;
          environment?: string;
          id?: string;
          price_id: string;
          product_name: string;
          status?: string;
          stripe_customer_id?: string | null;
          stripe_payment_intent_id?: string | null;
          stripe_session_id: string;
          updated_at?: string;
        };
        Update: {
          amount_cents?: number;
          brief_completed?: boolean;
          created_at?: string;
          currency?: string;
          customer_email?: string | null;
          customer_name?: string | null;
          environment?: string;
          id?: string;
          price_id?: string;
          product_name?: string;
          status?: string;
          stripe_customer_id?: string | null;
          stripe_payment_intent_id?: string | null;
          stripe_session_id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      suppressed_emails: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          metadata: Json | null;
          reason: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          metadata?: Json | null;
          reason: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          metadata?: Json | null;
          reason?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string };
        Returns: boolean;
      };
      email_queue_dispatch: { Args: never; Returns: undefined };
      enqueue_email: {
        Args: { payload: Json; queue_name: string };
        Returns: number;
      };
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
      move_to_dlq: {
        Args: {
          dlq_name: string;
          message_id: number;
          payload: Json;
          source_queue: string;
        };
        Returns: number;
      };
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number };
        Returns: {
          message: Json;
          msg_id: number;
          read_ct: number;
        }[];
      };
    };
    Enums: {
      app_role: "admin" | "user";
      demo_status: "draft" | "sent" | "paid" | "expired";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      demo_status: ["draft", "sent", "paid", "expired"],
    },
  },
} as const;
