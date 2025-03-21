
import { useState, useEffect } from "react";
import { 
  BarChart3, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Building2,
  Users,
  Calendar,
  DollarSign,
  ChevronRight,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  deals, 
  Deal, 
  getCompanyById,
  getContactById,
  formatCurrency,
  formatDate
} from "@/data/mockData";

export function DealsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>(deals);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<"board" | "list">("board");

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredDeals(deals);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredDeals(
        deals.filter(
          (deal) =>
            deal.name.toLowerCase().includes(query) ||
            getCompanyById(deal.companyId)?.name.toLowerCase().includes(query) ||
            getContactById(deal.contactId)?.firstName.toLowerCase().includes(query) ||
            getContactById(deal.contactId)?.lastName.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery]);

  const getStageColor = (stage: Deal["stage"]) => {
    switch (stage) {
      case "lead":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "discovery":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "proposal":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "negotiation":
        return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      case "closed-won":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "closed-lost":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "";
    }
  };

  const stageOrder: Deal["stage"][] = [
    "lead",
    "discovery",
    "proposal",
    "negotiation",
    "closed-won",
    "closed-lost",
  ];

  const groupedDeals = stageOrder.reduce(
    (acc, stage) => {
      acc[stage] = filteredDeals.filter((deal) => deal.stage === stage);
      return acc;
    },
    {} as Record<Deal["stage"], Deal[]>
  );

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Deals</h1>
        <p className="text-muted-foreground">
          Track and manage your sales pipeline.
        </p>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search deals..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={activeView} onValueChange={(v) => setActiveView(v as "board" | "list")}>
            <TabsList className="grid w-[180px] grid-cols-2">
              <TabsTrigger value="board">Board</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Deal
          </Button>
        </div>
      </div>

      {/* Deals Board View */}
      {activeView === "board" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {stageOrder.map((stage) => (
            <div key={stage} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Badge className={`${getStageColor(stage)} capitalize`}>
                  {stage.replace("-", " ")}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {groupedDeals[stage]?.length || 0} deals
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {isLoading ? (
                  Array.from({ length: 2 }).map((_, index) => (
                    <Card key={index} className="animate-pulse">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="h-5 w-3/4 rounded bg-muted" />
                          <div className="h-4 w-1/2 rounded bg-muted" />
                          <div className="h-4 w-full rounded bg-muted" />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : groupedDeals[stage]?.length > 0 ? (
                  groupedDeals[stage].map((deal) => {
                    const company = getCompanyById(deal.companyId);
                    const contact = getContactById(deal.contactId);
                    
                    return (
                      <GlassCard key={deal.id}>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{deal.name}</h3>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <MoreHorizontal className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Deal</DropdownMenuItem>
                                  <DropdownMenuItem>Move to Next Stage</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Building2 className="h-3 w-3" />
                              <span>{company?.name}</span>
                            </div>
                            {contact && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Users className="h-3 w-3" />
                                <span>{contact.firstName} {contact.lastName}</span>
                              </div>
                            )}
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-1 font-medium">
                                <DollarSign className="h-3 w-3" />
                                <span>{formatCurrency(deal.value)}</span>
                              </div>
                              {deal.closingDate && (
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  <span>{formatDate(deal.closingDate)}</span>
                                </div>
                              )}
                            </div>
                            {deal.probability !== undefined && (
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-muted-foreground">Probability</span>
                                  <span className="font-medium">{deal.probability}%</span>
                                </div>
                                <Progress value={deal.probability} className="h-1" />
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </GlassCard>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-4">
                    <p className="text-sm text-muted-foreground">No deals</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Deals List View */}
      {activeView === "list" && (
        <Card>
          <CardHeader className="p-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
              <div className="col-span-4">Deal</div>
              <div className="col-span-2">Company</div>
              <div className="col-span-2">Stage</div>
              <div className="col-span-1">Value</div>
              <div className="col-span-2">Closing Date</div>
              <div className="col-span-1"></div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-4 border-t p-4 animate-pulse"
                >
                  <div className="col-span-4">
                    <div className="h-5 w-3/4 rounded bg-muted" />
                  </div>
                  <div className="col-span-2">
                    <div className="h-5 w-full rounded bg-muted" />
                  </div>
                  <div className="col-span-2">
                    <div className="h-5 w-full rounded bg-muted" />
                  </div>
                  <div className="col-span-1">
                    <div className="h-5 w-full rounded bg-muted" />
                  </div>
                  <div className="col-span-2">
                    <div className="h-5 w-full rounded bg-muted" />
                  </div>
                  <div className="col-span-1"></div>
                </div>
              ))
            ) : filteredDeals.length > 0 ? (
              filteredDeals.map((deal) => {
                const company = getCompanyById(deal.companyId);
                
                return (
                  <div
                    key={deal.id}
                    className="grid grid-cols-12 gap-4 border-t p-4 hover:bg-muted/50"
                  >
                    <div className="col-span-4">
                      <div className="font-medium">{deal.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {deal.notes && deal.notes.length > 30
                          ? `${deal.notes.substring(0, 30)}...`
                          : deal.notes}
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <span>{company?.name}</span>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <Badge className={`${getStageColor(deal.stage)} capitalize`}>
                        {deal.stage.replace("-", " ")}
                      </Badge>
                    </div>
                    <div className="col-span-1 flex items-center font-medium">
                      {formatCurrency(deal.value)}
                    </div>
                    <div className="col-span-2 flex items-center text-sm text-muted-foreground">
                      {deal.closingDate ? formatDate(deal.closingDate) : "-"}
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center p-8">
                <BarChart3 className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No deals found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="flex w-full items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredDeals.length} of {deals.length} deals
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="font-medium">
                    {deals.filter((d) => d.stage === "closed-won").length} Won
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="font-medium">
                    {deals.filter((d) => d.stage === "closed-lost").length} Lost
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="font-medium">
                    {formatCurrency(
                      deals
                        .filter((d) => d.stage === "closed-won")
                        .reduce((sum, deal) => sum + deal.value, 0)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
