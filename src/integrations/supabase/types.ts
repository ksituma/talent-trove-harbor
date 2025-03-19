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
      applications: {
        Row: {
          applicant_data: Json
          created_at: string | null
          id: string
          job_id: number
          status: string
          updated_at: string | null
        }
        Insert: {
          applicant_data: Json
          created_at?: string | null
          id?: string
          job_id: number
          status?: string
          updated_at?: string | null
        }
        Update: {
          applicant_data?: Json
          created_at?: string | null
          id?: string
          job_id?: number
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      education: {
        Row: {
          certificate_url: string | null
          created_at: string | null
          education_level: string
          field_of_study: string | null
          graduation_date: string | null
          id: string
          institution: string
          user_id: string | null
        }
        Insert: {
          certificate_url?: string | null
          created_at?: string | null
          education_level: string
          field_of_study?: string | null
          graduation_date?: string | null
          id?: string
          institution: string
          user_id?: string | null
        }
        Update: {
          certificate_url?: string | null
          created_at?: string | null
          education_level?: string
          field_of_study?: string | null
          graduation_date?: string | null
          id?: string
          institution?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "education_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      experience: {
        Row: {
          created_at: string | null
          designation: string
          end_date: string | null
          id: string
          job_group: string | null
          organization: string
          start_date: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          designation: string
          end_date?: string | null
          id?: string
          job_group?: string | null
          organization: string
          start_date: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          designation?: string
          end_date?: string | null
          id?: string
          job_group?: string | null
          organization?: string
          start_date?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experience_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          closing_date: string
          created_at: string | null
          department: string
          description: string
          education: string
          experience: string
          id: number
          location: string
          requirements: string[]
          responsibilities: string[]
          salary_range: string | null
          status: string
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          closing_date: string
          created_at?: string | null
          department: string
          description: string
          education: string
          experience: string
          id?: number
          location: string
          requirements: string[]
          responsibilities: string[]
          salary_range?: string | null
          status?: string
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          closing_date?: string
          created_at?: string | null
          department?: string
          description?: string
          education?: string
          experience?: string
          id?: number
          location?: string
          requirements?: string[]
          responsibilities?: string[]
          salary_range?: string | null
          status?: string
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      professional_bodies: {
        Row: {
          body_name: string
          certificate_url: string | null
          created_at: string | null
          id: string
          membership_date: string
          user_id: string | null
        }
        Insert: {
          body_name: string
          certificate_url?: string | null
          created_at?: string | null
          id?: string
          membership_date: string
          user_id?: string | null
        }
        Update: {
          body_name?: string
          certificate_url?: string | null
          created_at?: string | null
          id?: string
          membership_date?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "professional_bodies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      publications: {
        Row: {
          created_at: string | null
          id: string
          publication_date: string
          title: string
          url: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          publication_date: string
          title: string
          url?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          publication_date?: string
          title?: string
          url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "publications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referees: {
        Row: {
          created_at: string | null
          designation: string
          email: string
          id: string
          mobile: string
          name: string
          organization: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          designation: string
          email: string
          id?: string
          mobile: string
          name: string
          organization: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          designation?: string
          email?: string
          id?: string
          mobile?: string
          name?: string
          organization?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referees_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      short_courses: {
        Row: {
          certificate_url: string | null
          completion_date: string
          course_name: string
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          certificate_url?: string | null
          completion_date: string
          course_name: string
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          certificate_url?: string | null
          completion_date?: string
          course_name?: string
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "short_courses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
