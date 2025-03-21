
import { useEffect, useState } from "react";
import { 
  Building2, 
  Users, 
  BarChart3, 
  DollarSign,
  Phone,
  Mail,
  Calendar,
  FileText,
  CheckCircle2
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stat } from "@/components/ui/Stat";
import { GlassCard } from "@/components/ui/GlassCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  getDashboardStats, 
  formatCurrency, 
  formatDate, 
  getCompanyById, 
  getContactById,
  Activity
} from "@/data/mockData";

export function DashboardPage() {
  const [stats, setStats] = useState(getDashboardStats());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'call':
        return <Phone className="h-4 w-4 text-blue-500" />;
      case 'email':
        return <Mail className="h-4 w-4 text-purple-500" />;
      case 'meeting':
        return <Calendar className="h-4 w-4 text-green-500" />;
      case 'note':
        return <FileText className="h-4 w-4 text-yellow-500" />;
      case 'task':
        return <CheckCircle2 className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your CRM data.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Stat
          title="Total Companies"
          value={stats.totalCompanies}
          icon={<Building2 className="h-5 w-5 text-primary" />}
          variant="primary"
          isLoading={isLoading}
        />
        <Stat
          title="Total Contacts"
          value={stats.totalContacts}
          icon={<Users className="h-5 w-5 text-blue-500" />}
          variant="info"
          isLoading={isLoading}
        />
        <Stat
          title="Active Deals"
          value={stats.totalDeals}
          icon={<BarChart3 className="h-5 w-5 text-yellow-500" />}
          variant="warning"
          isLoading={isLoading}
        />
        <Stat
          title="Total Value"
          value={formatCurrency(stats.dealsValue)}
          icon={<DollarSign className="h-5 w-5 text-green-500" />}
          variant="success"
          trend={{ value: 12, isUpward: true }}
          isLoading={isLoading}
        />
      </div>

      {/* Deals Pipeline & Activities */}
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Deals Pipeline</CardTitle>
            <CardDescription>Current deals by stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!isLoading ? (
                <>
                  <div className="grid grid-cols-6 gap-2">
                    {['lead', 'discovery', 'proposal', 'negotiation', 'closed-won', 'closed-lost'].map((stage) => (
                      <div key={stage} className="flex flex-col items-center">
                        <div className="text-xs font-medium capitalize mb-2">
                          {stage.replace('-', ' ')}
                        </div>
                        <div 
                          className={`w-full h-2 rounded-full ${
                            stage === 'closed-won' 
                              ? 'bg-green-500' 
                              : stage === 'closed-lost' 
                                ? 'bg-red-500' 
                                : 'bg-blue-500'
                          }`}
                        />
                        <div className="mt-1 text-sm font-medium">
                          {stats.dealsByStage[stage as keyof typeof stats.dealsByStage] || 0}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="rounded-lg bg-muted p-3">
                      <div className="text-sm font-medium">Open Deals</div>
                      <div className="text-2xl font-bold">
                        {stats.totalDeals - 
                          (stats.dealsByStage['closed-won'] || 0) - 
                          (stats.dealsByStage['closed-lost'] || 0)}
                      </div>
                    </div>
                    <div className="rounded-lg bg-green-500/10 p-3">
                      <div className="text-sm font-medium text-green-600">Won Deals</div>
                      <div className="text-2xl font-bold text-green-600">
                        {stats.dealsByStage['closed-won'] || 0}
                      </div>
                    </div>
                    <div className="rounded-lg bg-red-500/10 p-3">
                      <div className="text-sm font-medium text-red-600">Lost Deals</div>
                      <div className="text-2xl font-bold text-red-600">
                        {stats.dealsByStage['closed-lost'] || 0}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="h-2 w-full animate-pulse rounded-full bg-muted" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-20 animate-pulse rounded-lg bg-muted" />
                    <div className="h-20 animate-pulse rounded-lg bg-muted" />
                    <div className="h-20 animate-pulse rounded-lg bg-muted" />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            {!isLoading ? (
              <div className="space-y-4">
                {stats.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      {activity.description && (
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                      )}
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                          {formatDate(activity.date)}
                        </p>
                        {activity.relatedTo && (
                          <p className="text-xs text-primary">
                            {activity.relatedTo.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <GlassCard title="Top Companies" className="col-span-1">
              {!isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 5].map((id) => {
                    const company = getCompanyById(id.toString());
                    if (!company) return null;
                    return (
                      <div key={company.id} className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={company.logo} alt={company.name} />
                          <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{company.name}</p>
                          <p className="text-xs text-muted-foreground">{company.industry}</p>
                        </div>
                        <div className="text-sm font-medium">{company.revenue}</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                        <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                      </div>
                      <div className="h-4 w-12 animate-pulse rounded bg-muted" />
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>

            <GlassCard title="Key Contacts" className="col-span-1">
              {!isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 5].map((id) => {
                    const contact = getContactById(id.toString());
                    if (!contact) return null;
                    const company = getCompanyById(contact.companyId);
                    return (
                      <div key={contact.id} className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={contact.avatar} alt={`${contact.firstName} ${contact.lastName}`} />
                          <AvatarFallback>{contact.firstName.charAt(0)}{contact.lastName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{contact.firstName} {contact.lastName}</p>
                          <p className="text-xs text-muted-foreground">{contact.position} at {company?.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                        <div className="h-3 w-32 animate-pulse rounded bg-muted" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>

            <GlassCard title="Upcoming Tasks" className="col-span-1">
              {!isLoading ? (
                <div className="space-y-3">
                  {[
                    { id: 1, title: "Follow up with Stark Industries", date: "2023-06-25" },
                    { id: 2, title: "Prepare proposal for Acme Corp", date: "2023-06-27" },
                    { id: 3, title: "Schedule meeting with Globex", date: "2023-06-30" }
                  ].map((task) => (
                    <div key={task.id} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-primary">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{task.title}</p>
                        <p className="text-xs text-muted-foreground">Due {formatDate(task.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-5 w-5 animate-pulse rounded-full bg-muted" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-full animate-pulse rounded bg-muted" />
                        <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          </div>
        </TabsContent>
        <TabsContent value="performance" className="mt-4">
          <GlassCard>
            <div className="h-[300px] w-full flex items-center justify-center">
              <p className="text-muted-foreground">Performance metrics will be available in the next update.</p>
            </div>
          </GlassCard>
        </TabsContent>
        <TabsContent value="insights" className="mt-4">
          <GlassCard>
            <div className="h-[300px] w-full flex items-center justify-center">
              <p className="text-muted-foreground">Insights will be available in the next update.</p>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
