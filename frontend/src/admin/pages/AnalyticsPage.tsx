import { PageHeader } from "@/admin/components/PageHeader";
import { ChartCard } from "@/admin/components/ChartCard";
import { StatCard } from "@/admin/components/StatCard";
import { AnimatedCounter } from "@/admin/hooks/useAnimatedNumber";
import { Users, Eye, MousePointerClick, Clock } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { monthlyVisitors, monthlyLeads } from "@/admin/data/dummy";

export function AnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Deep-dive into traffic, engagement and conversions."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          gradient
          label="Sessions"
          delta={14}
          icon={<Users className="h-5 w-5" />}
          value={<AnimatedCounter value={94211} />}
        />
        <StatCard
          label="Page Views"
          delta={9}
          icon={<Eye className="h-5 w-5" />}
          value={<AnimatedCounter value={321840} />}
        />
        <StatCard
          label="CTR"
          delta={-2}
          icon={<MousePointerClick className="h-5 w-5" />}
          value={<AnimatedCounter value={4} suffix=".2%" />}
        />
        <StatCard
          label="Avg. Session"
          delta={5}
          icon={<Clock className="h-5 w-5" />}
          value={"3m 42s"}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Sessions over time">
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={monthlyVisitors}>
                <defs>
                  <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
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
                  fill="url(#ga)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Conversions">
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={monthlyLeads}>
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
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Top Pages" className="mt-4">
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart
              data={[
                { name: "/", value: 42120 },
                { name: "/services", value: 28941 },
                { name: "/portfolio", value: 19822 },
                { name: "/blog", value: 15644 },
                { name: "/pricing", value: 11933 },
                { name: "/contact", value: 8221 },
              ]}
            >
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
              <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#06B6D4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
