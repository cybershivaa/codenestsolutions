import { supabase } from "./client";

// ============= PROFILES =============

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();

  if (error) throw error;
  return data;
}

export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============= PROJECTS =============

export async function getProjects(limit = 10, offset = 0) {
  const { data, error, count } = await supabase
    .from("projects")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return { projects: data, count };
}

export async function getFeaturedProjects(limit = 6) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("order_index", { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getUserProjects(userId: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getProject(projectId: string) {
  const { data, error } = await supabase.from("projects").select("*").eq("id", projectId).single();

  if (error) throw error;
  return data;
}

export async function createProject(userId: string, project: any) {
  const { data, error } = await supabase
    .from("projects")
    .insert([{ ...project, user_id: userId }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProject(projectId: string, updates: any) {
  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", projectId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProject(projectId: string) {
  const { error } = await supabase.from("projects").delete().eq("id", projectId);

  if (error) throw error;
}

// ============= BLOG POSTS =============

export async function getBlogPosts(limit = 10, offset = 0) {
  const { data, error, count } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return { posts: data, count };
}

export async function getBlogPost(slug: string) {
  const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single();

  if (error) throw error;

  // Increment view count
  if (data) {
    await supabase
      .from("blog_posts")
      .update({ view_count: (data.view_count || 0) + 1 })
      .eq("id", data.id)
      .select();
  }

  return data;
}

export async function getUserBlogPosts(userId: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("author_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createBlogPost(authorId: string, post: any) {
  const { data, error } = await supabase
    .from("blog_posts")
    .insert([{ ...post, author_id: authorId }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateBlogPost(postId: string, updates: any) {
  const { data, error } = await supabase
    .from("blog_posts")
    .update(updates)
    .eq("id", postId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteBlogPost(postId: string) {
  const { error } = await supabase.from("blog_posts").delete().eq("id", postId);

  if (error) throw error;
}

// ============= TESTIMONIALS =============

export async function getTestimonials(limit = 10) {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("order_index", { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getFeaturedTestimonials(limit = 6) {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("featured", true)
    .order("order_index", { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function createTestimonial(testimonial: any) {
  const { data, error } = await supabase
    .from("testimonials")
    .insert([testimonial])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTestimonial(testimonialId: string, updates: any) {
  const { data, error } = await supabase
    .from("testimonials")
    .update(updates)
    .eq("id", testimonialId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTestimonial(testimonialId: string) {
  const { error } = await supabase.from("testimonials").delete().eq("id", testimonialId);

  if (error) throw error;
}

// ============= TEAM MEMBERS =============

export async function getTeamMembers(limit = 20) {
  const { data, error } = await supabase
    .from("team_members")
    .select("*, profiles(*)")
    .order("order_index", { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function createTeamMember(teamMember: any) {
  const { data, error } = await supabase
    .from("team_members")
    .insert([teamMember])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTeamMember(memberId: string, updates: any) {
  const { data, error } = await supabase
    .from("team_members")
    .update(updates)
    .eq("id", memberId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTeamMember(memberId: string) {
  const { error } = await supabase.from("team_members").delete().eq("id", memberId);

  if (error) throw error;
}

// ============= LEADS =============

export async function submitLead(lead: any) {
  const { data, error } = await supabase.from("leads").insert([lead]).select().single();

  if (error) throw error;
  return data;
}

export async function getLeads(status?: string, limit = 50, offset = 0) {
  let query = supabase.from("leads").select("*", { count: "exact" });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error, count } = await query
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return { leads: data, count };
}

export async function updateLead(leadId: string, updates: any) {
  const { data, error } = await supabase
    .from("leads")
    .update(updates)
    .eq("id", leadId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteLead(leadId: string) {
  const { error } = await supabase.from("leads").delete().eq("id", leadId);

  if (error) throw error;
}

// ============= SERVICES =============

export async function getServices() {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) throw error;
  return data;
}

export async function createService(service: any) {
  const { data, error } = await supabase.from("services").insert([service]).select().single();

  if (error) throw error;
  return data;
}

export async function updateService(serviceId: string, updates: any) {
  const { data, error } = await supabase
    .from("services")
    .update(updates)
    .eq("id", serviceId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteService(serviceId: string) {
  const { error } = await supabase.from("services").delete().eq("id", serviceId);

  if (error) throw error;
}
