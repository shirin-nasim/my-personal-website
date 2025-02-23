export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      appointments: {
        Row: {
          id: string;
          patient_name: string;
          patient_email: string;
          patient_phone: string;
          appointment_date: string;
          appointment_time: string;
          notes: string | null;
          status: "pending" | "confirmed" | "cancelled";
          created_at: string;
        };
        Insert: {
          id?: string;
          patient_name: string;
          patient_email: string;
          patient_phone: string;
          appointment_date: string;
          appointment_time: string;
          notes?: string | null;
          status?: "pending" | "confirmed" | "cancelled";
          created_at?: string;
        };
        Update: {
          id?: string;
          patient_name?: string;
          patient_email?: string;
          patient_phone?: string;
          appointment_date?: string;
          appointment_time?: string;
          notes?: string | null;
          status?: "pending" | "confirmed" | "cancelled";
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
