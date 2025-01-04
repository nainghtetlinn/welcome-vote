export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      candidates: {
        Row: {
          bio: string | null
          created_at: string
          event_id: string
          gender: Database["public"]["Enums"]["gender"]
          id: string
          name: string
          photo_url: string | null
          roll_no: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          event_id: string
          gender?: Database["public"]["Enums"]["gender"]
          id?: string
          name: string
          photo_url?: string | null
          roll_no: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          event_id?: string
          gender?: Database["public"]["Enums"]["gender"]
          id?: string
          name?: string
          photo_url?: string | null
          roll_no?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidates_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidates_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events_with_counts"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          active: boolean
          created_at: string
          duration_in_min: number
          id: string
          name: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          duration_in_min: number
          id?: string
          name: string
        }
        Update: {
          active?: boolean
          created_at?: string
          duration_in_min?: number
          id?: string
          name?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          candidate_id: string
          category_id: number
          created_at: string
          event_id: string
          id: string
          session_token: string
        }
        Insert: {
          candidate_id: string
          category_id: number
          created_at?: string
          event_id: string
          id?: string
          session_token?: string
        }
        Update: {
          candidate_id?: string
          category_id?: number
          created_at?: string
          event_id?: string
          id?: string
          session_token?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events_with_counts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      events_with_counts: {
        Row: {
          active: boolean | null
          candidates_count: number | null
          created_at: string | null
          duration_in_min: number | null
          id: string | null
          name: string | null
          votes_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      fetch_events_with_counts: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          active: boolean
          duration_in_min: number
          created_at: string
          candidates_count: number
          votes_count: number
        }[]
      }
    }
    Enums: {
      gender: "male" | "female"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
