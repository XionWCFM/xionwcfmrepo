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
          can_view: boolean;
          content: string;
          created_at: string;
          description: string;
          id: number;
          release_date: string;
          thumbnail: string | null;
          title: string;
        };
        Insert: {
          authority: Database["public"]["Enums"]["role"];
          can_view?: boolean;
          content?: string;
          created_at?: string;
          description?: string;
          id?: number;
          release_date?: string;
          thumbnail?: string | null;
          title?: string;
        };
        Update: {
          authority?: Database["public"]["Enums"]["role"];
          can_view?: boolean;
          content?: string;
          created_at?: string;
          description?: string;
          id?: number;
          release_date?: string;
          thumbnail?: string | null;
          title?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          created_at: string;
          "\bemail": string;
          id: string;
          password: string;
          role: Database["public"]["Enums"]["role"];
        };
        Insert: {
          created_at?: string;
          "\bemail"?: string;
          id?: string;
          password?: string;
          role?: Database["public"]["Enums"]["role"];
        };
        Update: {
          created_at?: string;
          "\bemail"?: string;
          id?: string;
          password?: string;
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

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
