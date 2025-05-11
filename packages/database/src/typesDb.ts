export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name?: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      comment: {
        Row: {
          content: string;
          created_at: string;
          id: number;
          is_deleted: boolean;
          nickname: string;
          parent_id: number | null;
          post_id: number;
          updated_at: string | null;
        };
        Insert: {
          content?: string;
          created_at?: string;
          id?: number;
          is_deleted: boolean;
          nickname?: string;
          parent_id?: number | null;
          post_id: number;
          updated_at?: string | null;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: number;
          is_deleted?: boolean;
          nickname?: string;
          parent_id?: number | null;
          post_id?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "comment_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: true;
            referencedRelation: "comment";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comment_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
        ];
      };
      likes: {
        Row: {
          created_at: string;
          id: number;
          post_id: number;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          post_id: number;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          post_id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
        ];
      };
      post_categories: {
        Row: {
          category_id: number;
          id: number;
          post_id: number;
        };
        Insert: {
          category_id: number;
          id?: number;
          post_id: number;
        };
        Update: {
          category_id?: number;
          id?: number;
          post_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "post_categories_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_categories_id_fkey1";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
        ];
      };
      posts: {
        Row: {
          authority: Database["public"]["Enums"]["role"];
          category: string;
          content: string;
          created_at: string;
          description: string;
          id: number;
          release_date: string;
          slug: string;
          thumbnail: string | null;
          title: string;
        };
        Insert: {
          authority: Database["public"]["Enums"]["role"];
          category?: string;
          content?: string;
          created_at?: string;
          description?: string;
          id?: number;
          release_date?: string;
          slug?: string;
          thumbnail?: string | null;
          title?: string;
        };
        Update: {
          authority?: Database["public"]["Enums"]["role"];
          category?: string;
          content?: string;
          created_at?: string;
          description?: string;
          id?: number;
          release_date?: string;
          slug?: string;
          thumbnail?: string | null;
          title?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          created_at: string;
          gmail: string;
          google_id: string;
          id: string;
          name: string;
          picture: string | null;
          role: Database["public"]["Enums"]["role"];
        };
        Insert: {
          created_at?: string;
          gmail?: string;
          google_id?: string;
          id?: string;
          name?: string;
          picture?: string | null;
          role?: Database["public"]["Enums"]["role"];
        };
        Update: {
          created_at?: string;
          gmail?: string;
          google_id?: string;
          id?: string;
          name?: string;
          picture?: string | null;
          role?: Database["public"]["Enums"]["role"];
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      role: "admin" | "editor" | "viewer";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      role: ["admin", "editor", "viewer"],
    },
  },
} as const;
