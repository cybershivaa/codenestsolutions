import { supabase } from "./client";

export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: Record<string, any>;
}

export interface AuthError {
  message: string;
  status?: number;
}

/**
 * Sign up a new user with email and password
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  displayName?: string,
): Promise<{ user: AuthUser; error: AuthError | null }> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName },
      emailRedirectTo: `${window.location.origin}/auth?callback=true`,
    },
  });

  if (error) {
    return { user: null as any, error: { message: error.message, status: error.status } };
  }

  return {
    user: {
      id: data.user?.id || "",
      email: data.user?.email || "",
      user_metadata: data.user?.user_metadata,
    },
    error: null,
  };
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(
  email: string,
  password: string,
): Promise<{ user: AuthUser; error: AuthError | null }> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { user: null as any, error: { message: error.message, status: error.status } };
  }

  return {
    user: {
      id: data.user?.id || "",
      email: data.user?.email || "",
      user_metadata: data.user?.user_metadata,
    },
    error: null,
  };
}

/**
 * Sign in with magic link (passwordless)
 */
export async function signInWithMagicLink(email: string): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth?callback=true`,
    },
  });

  if (error) {
    return { error: { message: error.message, status: error.status } };
  }

  return { error: null };
}

/**
 * Sign in with OAuth provider
 */
export async function signInWithProvider(
  provider: "google" | "github" | "discord",
): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth?callback=true`,
    },
  });

  if (error) {
    return { error: { message: error.message, status: error.status } };
  }

  return { error: null };
}

/**
 * Reset password with email link
 */
export async function resetPassword(email: string): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  if (error) {
    return { error: { message: error.message, status: error.status } };
  }

  return { error: null };
}

/**
 * Update user password
 */
export async function updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    return { error: { message: error.message, status: error.status } };
  }

  return { error: null };
}

/**
 * Sign out user
 */
export async function signOut(): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: { message: error.message, status: error.status } };
  }

  return { error: null };
}

/**
 * Get current session
 */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return { session: null, error: { message: error.message, status: error.status } };
  }

  return { session: data.session, error: null };
}

/**
 * Verify OTP token from email link
 */
export async function verifyOtp(
  email: string,
  token: string,
): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    return { error: { message: error.message, status: error.status } };
  }

  return { error: null };
}
