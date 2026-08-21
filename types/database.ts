export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: { id: string, created_at: string, email: string | null }
        Insert: { id: string, created_at?: string, email?: string | null }
        Update: { id?: string, created_at?: string, email?: string | null }
      }
      subscriptions: {
        Row: { id: string, user_id: string, status: string, plan_id: string }
        Insert: { id?: string, user_id: string, status: string, plan_id: string }
        Update: { id?: string, user_id?: string, status?: string, plan_id?: string }
      }
      credits_wallet: {
        Row: { id: string, user_id: string, balance: number }
        Insert: { id?: string, user_id: string, balance?: number }
        Update: { id?: string, user_id?: string, balance?: number }
      }
      credit_transactions: {
        Row: { id: string, user_id: string, amount: number, type: string, description: string | null }
        Insert: { id?: string, user_id: string, amount: number, type: string, description?: string | null }
        Update: { id?: string, user_id?: string, amount?: number, type?: string, description?: string | null }
      }
      video_generations: {
        Row: { id: string, user_id: string, prompt: string, status: string, created_at: string }
        Insert: { id?: string, user_id: string, prompt: string, status?: string, created_at?: string }
        Update: { id?: string, user_id?: string, prompt?: string, status?: string, created_at?: string }
      }
      daily_usage: {
        Row: { id: string, user_id: string, date: string, count: number }
        Insert: { id?: string, user_id: string, date: string, count?: number }
        Update: { id?: string, user_id?: string, date?: string, count?: number }
      }
      payments: {
        Row: { id: string, user_id: string, amount: number, currency: string, status: string }
        Insert: { id?: string, user_id: string, amount: number, currency: string, status: string }
        Update: { id?: string, user_id?: string, amount?: number, currency?: string, status?: string }
      }
      admin_roles: {
        Row: { user_id: string, role: string }
        Insert: { user_id: string, role: string }
        Update: { user_id?: string, role?: string }
      }
      generation_queue: {
        Row: { id: string, generation_id: string, status: string }
        Insert: { id?: string, generation_id: string, status?: string }
        Update: { id?: string, generation_id?: string, status?: string }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

