import {
  Users,
  Inbox,
  FolderKanban,
  DollarSign,
  Newspaper,
  Briefcase,
  UserRoundSearch,
  Sparkles,
  Activity,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { PageHeader } from "@/admin/components/PageHeader";
import { StatCard } from "@/admin/components/StatCard";
import { ChartCard } from "@/admin/components/ChartCard";
import { AnimatedCounter } from "@/admin/hooks/useAnimatedNumber";
import { StatusBadge } from "@/admin/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  monthlyVisitors,
  monthlyLeads,
  monthlyRevenue,
  topServices,
  trafficSources,
  leads,
  adminUsers,
  activities,
} from "@/admin/data/dummy";

const PIE_COLORS = ["#4F46E5", "#8B5CF6", "#06B6D4", "#22c55e", "#f59e0b"];

export function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your website performance, leads and business KPIs."
        actions={
          <>
            <Button variant="outline" size="sm">
              Last 30 days
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-3)] text-white"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Generate Report
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          gradient
          label="Total Visitors"
          delta={12}
          icon={<Users className="h-5 w-5" />}
          value={<AnimatedCounter value={128432} />}
        />
        <StatCard
          label="Total Leads"
          delta={8}
          icon={<Inbox className="h-5 w-5" />}
          value={<AnimatedCounter value={5824} />}
        />
        <StatCard
          label="Projects"
          delta={4}
          icon={<FolderKanban className="h-5 w-5" />}
          value={<AnimatedCounter value={142} />}
        />
        <StatCard
          gradient
          label="Revenue"
          delta={22}
          icon={<DollarSign className="h-5 w-5" />}
          value={<AnimatedCounter value={412000} prefix="$" />}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Published Blogs"
          delta={3}
          icon={<Newspaper className="h-5 w-5" />}
          value={<AnimatedCounter value={87} />}
        />
        <StatCard
          label="Portfolio Items"
          delta={2}
          icon={<FolderKanban className="h-5 w-5" />}
          value={<AnimatedCounter value={42} />}
        />
        <StatCard
          label="Open Careers"
          delta={-1}
          icon={<UserRoundSearch className="h-5 w-5" />}
          value={<AnimatedCounter value={6} />}
        />
        <StatCard
          label="Active Services"
          delta={0}
          icon={<Briefcase className="h-5 w-5" />}
          value={<AnimatedCounter value={12} />}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard
          title="Monthly Visitors"
          description="Sessions vs unique visitors"
          className="lg:col-span-2"
        >
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={monthlyVisitors}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="name" fontSize={11} stroke="currentColor" opacity={0.5} />
                <YAxis fontSize={11} stroke="currentColor" opacity={0.5} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#4F46E5"
                  fill="url(#g1)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="value2"
                  stroke="#06B6D4"
                  fill="url(#g2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Traffic Sources" description="Distribution by channel">
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={trafficSources}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {trafficSources.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Monthly Leads" description="Qualified inbound">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={monthlyLeads}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="name" fontSize={11} stroke="currentColor" opacity={0.5} />
                <YAxis fontSize={11} stroke="currentColor" opacity={0.5} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Top Services" description="Bookings this quarter">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={topServices} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis type="number" fontSize={11} stroke="currentColor" opacity={0.5} />
                <YAxis
                  type="category"
                  dataKey="name"
                  fontSize={11}
                  stroke="currentColor"
                  opacity={0.5}
                  width={70}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} fill="#06B6D4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Revenue" description="Trailing 12 months (USD)" className="mt-4">
        <div className="h-64">
          <ResponsiveContainer>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="name" fontSize={11} stroke="currentColor" opacity={0.5} />
              <YAxis fontSize={11} stroke="currentColor" opacity={0.5} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                fill="url(#gR)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard
          title="Recent Leads"
          description="Latest inbound enquiries"
          className="lg:col-span-2"
        >
          <ul className="divide-y divide-border/60">
            {leads.slice(0, 6).map((l) => (
              <li key={l.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <div className="font-medium">
                    {l.name} <span className="text-muted-foreground">· {l.company}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {l.service} — {l.budget}
                  </div>
                </div>
                <StatusBadge status={l.status} />
              </li>
            ))}
          </ul>
        </ChartCard>

        <ChartCard
          title="Latest Activity"
          description="Team updates"
          action={<Activity className="h-4 w-4 text-muted-foreground" />}
        >
          <ul className="space-y-3">
            {activities.map((a) => (
              <li key={a.id} className="flex items-start gap-3 text-sm">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--brand)]" />
                <div className="flex-1">
                  <div>
                    <span className="font-medium">{a.who}</span>{" "}
                    <span className="text-muted-foreground">{a.what}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{a.when}</div>
                </div>
              </li>
            ))}
          </ul>
        </ChartCard>
      </div>

      <ChartCard title="Recent Users" description="Recently active team members" className="mt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-muted-foreground">
              <tr>
                <th className="py-2 text-left font-medium">User</th>
                <th className="py-2 text-left font-medium">Role</th>
                <th className="py-2 text-left font-medium">Status</th>
                <th className="py-2 text-left font-medium">Last active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {adminUsers.map((u) => (
                <tr key={u.id}>
                  <td className="py-3">
                    <div className="font-medium">{u.name}</div>
                    <div className="text-xs text-muted-foreground">{u.email}</div>
                  </td>
                  <td className="py-3">
                    <StatusBadge status={u.role} />
                  </td>
                  <td className="py-3">
                    <StatusBadge status={u.status} />
                  </td>
                  <td className="py-3 text-muted-foreground">{u.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
