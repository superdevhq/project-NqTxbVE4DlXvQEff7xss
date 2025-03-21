
import { useState, useEffect } from "react";
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Users,
  BarChart3,
  MapPin,
  Briefcase,
  DollarSign
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  companies, 
  Company, 
  getContactsByCompanyId, 
  getDealsByCompanyId,
  formatCurrency
} from "@/data/mockData";

export function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(companies);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCompanies(companies);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredCompanies(
        companies.filter(
          (company) =>
            company.name.toLowerCase().includes(query) ||
            company.industry.toLowerCase().includes(query) ||
            company.location.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery]);

  const getStatusColor = (status: Company["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "inactive":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      case "lead":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
        <p className="text-muted-foreground">
          Manage and track your business relationships.
        </p>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search companies..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Company
          </Button>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="h-32 animate-pulse bg-muted" />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
                    <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="h-8 animate-pulse rounded bg-muted" />
                    <div className="h-8 animate-pulse rounded bg-muted" />
                  </div>
                </CardContent>
              </Card>
            ))
          : filteredCompanies.map((company) => {
              const contacts = getContactsByCompanyId(company.id);
              const deals = getDealsByCompanyId(company.id);
              const totalDealsValue = deals.reduce((sum, deal) => sum + deal.value, 0);
              
              return (
                <GlassCard key={company.id} className="overflow-hidden">
                  <div 
                    className="h-32 bg-cover bg-center" 
                    style={{ 
                      backgroundImage: `url(${company.logo || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'})` 
                    }}
                  >
                    <div className="h-full w-full bg-gradient-to-t from-background/80 to-transparent p-4 flex items-end">
                      <Badge className={getStatusColor(company.status)}>
                        {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <Avatar className="h-12 w-12 border-4 border-background -mt-10">
                        <AvatarImage src={company.logo} alt={company.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {company.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Company</DropdownMenuItem>
                          <DropdownMenuItem>Add Contact</DropdownMenuItem>
                          <DropdownMenuItem>Add Deal</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-2">
                      <h3 className="text-lg font-semibold">{company.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Briefcase className="h-3 w-3" />
                        <span>{company.industry}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{company.location}</span>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 rounded-md border p-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">Contacts</p>
                          <p className="text-sm font-medium">{contacts.length}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-md border p-2">
                        <BarChart3 className="h-4 w-4 text-green-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">Deals</p>
                          <p className="text-sm font-medium">{deals.length}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 px-6 py-3">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{company.employees} employees</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{formatCurrency(totalDealsValue)}</span>
                      </div>
                    </div>
                  </CardFooter>
                </GlassCard>
              );
            })}
      </div>

      {filteredCompanies.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
          <Building2 className="h-10 w-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No companies found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}
