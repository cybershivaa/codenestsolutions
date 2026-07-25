import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import type { ClientUser } from "@/lib/client-api";
import type { User } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export interface RegisterPayload {
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  country?: string;
  password: string;
  confirmPassword: string;
  referralCode?: string;
  acceptTerms: true;
}

interface AuthState {
  user: ClientUser | null;
  loading: boolean;
  configured: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<{ message: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateProfile: (updates: Partial<ClientUser>) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

const Ctx = createContext<AuthState | null>(null);

function mapProfileAndAuthToClientUser(authUser: User, profile: ProfileRow): ClientUser {
  return {
    _id: authUser.id,
    email: authUser.email || "",
    fullName:
      profile.display_name ||
      authUser.user_metadata?.display_name ||
      authUser.user_metadata?.fullName ||
      "",
    phone: profile.phone || authUser.user_metadata?.phone || "",
    companyName:
      profile.company_name ||
      authUser.user_metadata?.company_name ||
      authUser.user_metadata?.companyName ||
      "",
    industry: profile.industry || "",
    gstNumber: profile.gst_number || "",
    address: profile.address || "",
    city: profile.city || "",
    state: profile.state || "",
    country: profile.country || authUser.user_metadata?.country || "",
    pincode: profile.pincode || "",
    website: profile.website || "",
    linkedin: profile.linkedin || "",
    timezone: profile.timezone || "",
    profilePhotoUrl: profile.avatar_url || authUser.user_metadata?.avatar_url || "",
    companyLogoUrl: profile.company_logo_url || "",
    emailVerified: authUser.email_confirmed_at ? true : false,
    createdAt: profile.created_at || authUser.created_at,
    lastLoginAt: authUser.last_sign_in_at,
  };
}

function mapAuthToClientUser(authUser: User): ClientUser {
  return {
    _id: authUser.id,
    email: authUser.email || "",
    fullName: authUser.user_metadata?.display_name || authUser.user_metadata?.fullName || "",
    phone: authUser.user_metadata?.phone || "",
    companyName: authUser.user_metadata?.company_name || authUser.user_metadata?.companyName || "",
    country: authUser.user_metadata?.country || "",
    emailVerified: authUser.email_confirmed_at ? true : false,
    createdAt: authUser.created_at,
    lastLoginAt: authUser.last_sign_in_at,
  };
}

export function ClientAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ClientUser | null>(null);
  const [loading, setLoading] = useState(true);

  // We are using Supabase, so it's always configured
  const configured = true;

  const refreshUser = useCallback(async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) {
        setUser(null);
        setLoading(false);
        return;
      }
      const authUser = session.user;
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .maybeSingle();

      if (error || !profile) {
        setUser(mapAuthToClientUser(authUser));
      } else {
        setUser(mapProfileAndAuthToClientUser(authUser, profile));
      }
    } catch (e) {
      console.error("Error refreshing user:", e);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const authUser = session.user;
        try {
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", authUser.id)
            .maybeSingle();

          if (error || !profile) {
            setUser(mapAuthToClientUser(authUser));
          } else {
            setUser(mapProfileAndAuthToClientUser(authUser, profile));
          }
        } catch {
          setUser(mapAuthToClientUser(authUser));
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Run initial fetch
    refreshUser();

    return () => {
      subscription.unsubscribe();
    };
  }, [refreshUser]);

  const login = useCallback(
    async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      await refreshUser();
    },
    [refreshUser],
  );

  const register = useCallback(async (payload: RegisterPayload) => {
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          fullName: payload.fullName,
          display_name: payload.fullName,
          phone: payload.phone,
          companyName: payload.companyName,
          company_name: payload.companyName,
          country: payload.country,
        },
        emailRedirectTo: `${window.location.origin}/client/login`,
      },
    });

    if (error) throw error;

    return {
      message: data.session
        ? "Account created and logged in!"
        : "Account created! Please check your email for confirmation link.",
    };
  }, []);

  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    async (updates: Partial<ClientUser>) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      if (!userId) throw new Error("No active session");

      // Map camelCase fields to snake_case table columns
      const dbUpdates: Partial<ProfileRow> = {};
      if (updates.fullName !== undefined) dbUpdates.display_name = updates.fullName;
      if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
      if (updates.companyName !== undefined) dbUpdates.company_name = updates.companyName;
      if (updates.industry !== undefined) dbUpdates.industry = updates.industry;
      if (updates.gstNumber !== undefined) dbUpdates.gst_number = updates.gstNumber;
      if (updates.address !== undefined) dbUpdates.address = updates.address;
      if (updates.city !== undefined) dbUpdates.city = updates.city;
      if (updates.state !== undefined) dbUpdates.state = updates.state;
      if (updates.country !== undefined) dbUpdates.country = updates.country;
      if (updates.pincode !== undefined) dbUpdates.pincode = updates.pincode;
      if (updates.website !== undefined) dbUpdates.website = updates.website;
      if (updates.linkedin !== undefined) dbUpdates.linkedin = updates.linkedin;
      if (updates.timezone !== undefined) dbUpdates.timezone = updates.timezone;
      if (updates.profilePhotoUrl !== undefined) dbUpdates.avatar_url = updates.profilePhotoUrl;
      if (updates.companyLogoUrl !== undefined) dbUpdates.company_logo_url = updates.companyLogoUrl;

      const { error } = await supabase.from("profiles").update(dbUpdates).eq("id", userId);

      if (error) throw error;
      await refreshUser();
    },
    [refreshUser],
  );

  const forgotPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/client/reset-password`,
    });
    if (error) throw error;
  }, []);

  const updatePassword = useCallback(async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      user,
      loading,
      configured,
      login,
      register,
      logout,
      refreshUser,
      updateProfile,
      forgotPassword,
      updatePassword,
    }),
    [
      user,
      loading,
      configured,
      login,
      register,
      logout,
      refreshUser,
      updateProfile,
      forgotPassword,
      updatePassword,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useClientAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useClientAuth must be used inside <ClientAuthProvider>");
  return ctx;
}

export function useRequireClientAuth() {
  const { user, loading } = useClientAuth();
  const navigate = useNavigate();
  return useCallback(
    (onAuthed?: () => void) => {
      if (loading) return false;
      if (!user) {
        const redirect =
          typeof window !== "undefined" ? window.location.pathname + window.location.search : "/";
        navigate({ to: "/client/login", search: { redirect } as never });
        return false;
      }
      onAuthed?.();
      return true;
    },
    [user, loading, navigate],
  );
}
