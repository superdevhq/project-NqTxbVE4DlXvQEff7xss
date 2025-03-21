
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Building2,
  Users,
  BarChart3,
  MapPin,
  Briefcase,
  DollarSign,
  Globe,
  Phone,
  Mail,
  Calendar,
  ArrowLeft,
  Edit,
  Trash2,
  Plus
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  getCompanyById, 
  getContactsByCompanyId, 
  getDealsByCompanyId,
  formatCurrency,
  formatDate
} from "@/data/mockData";

export function CompanyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const company = id ? getCompanyById(id) : null;
  const contacts = id ? getContactsByCompanyId(id) : [];
  const deals = id ? getDealsByCompanyId(id) : [];
  const totalDealsValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const activeDeals = deals.filter(deal => 
    !['closed-won', 'closed-lost'].includes(deal.stage)
  );
  const wonDeals = deals.filter(deal => deal.stage === 'closed-won');
  const lostDeals = deals.filter(deal => deal.stage === 'closed-lost');

  if (!isLoading && !company) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Building2 className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Company Not Found</h2>
        <p className="text-muted-foreground mb-6">The company you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/companies')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Companies
        </Button>
      </div>
    );
  }

  const getStatusColor = (status?: 'active' | 'inactive' | 'lead') => {
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
      {/* Header with back button */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate('/companies')}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>
      </div>

      {/* Company Header */}
      <div className="relative">
        <div 
          className="h-48 w-full rounded-lg bg-cover bg-center" 
          style={{ 
            backgroundImage: `url(${company?.logo || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'})` 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent rounded-lg" />
        </div>
        
        <div className="relative -mt-24 px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={company?.logo} alt={company?.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {company?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold">{company?.name}</h1>
                  {company?.status && (
                    <Badge className={getStatusColor(company.status)}>
                      {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{company?.industry}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{company?.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Company Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contacts</p>
                <p className="text-2xl font-bold">{contacts.length}</p>
              </div>
              <div className="rounded-full p-2 bg-blue-500/10">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Deals</p>
                <p className="text-2xl font-bold">{activeDeals.length}</p>
              </div>
              <div className="rounded-full p-2 bg-yellow-500/10">
                <BarChart3 className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">{formatCurrency(totalDealsValue)}</p>
              </div>
              <div className="rounded-full p-2 bg-green-500/10">
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Employees</p>
                <p className="text-2xl font-bold">{company?.employees}</p>
              </div>
              <div className="rounded-full p-2 bg-purple-500/10">
                <Building2 className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company Details Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="deals">Deals</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <GlassCard className="md:col-span-2">
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Industry</h3>
                    <p className="text-sm">{company?.industry}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Location</h3>
                    <p className="text-sm">{company?.location}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Employees</h3>
                    <p className="text-sm">{company?.employees}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Annual Revenue</h3>
                    <p className="text-sm">{company?.revenue}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Website</h3>
                    <div className="flex items-center gap-1 text-primary">
                      <Globe className="h-3 w-3" />
                      <a href="#" className="text-sm hover:underline">www.{company?.name.toLowerCase().replace(/\s+/g, '')}.com</a>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Customer Since</h3>
                    <p className="text-sm">{company?.createdAt ? formatDate(company.createdAt) : 'N/A'}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">
                    {company?.name} is a leading company in the {company?.industry} industry, based in {company?.location}. 
                    With {company?.employees} employees, they have established themselves as a significant player in the market.
                  </p>
                </div>
              </CardContent>
            </GlassCard>

            <GlassCard>
              <CardHeader>
                <CardTitle>Key Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contacts.slice(0, 3).map(contact => (
                  <div key={contact.id} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={contact.avatar} alt={`${contact.firstName} ${contact.lastName}`} />
                      <AvatarFallback>{contact.firstName.charAt(0)}{contact.lastName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{contact.firstName} {contact.lastName}</p>
                      <p className="text-xs text-muted-foreground">{contact.position}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                ))}
                {contacts.length > 3 && (
                  <Button variant="outline" className="w-full" size="sm">
                    View All Contacts
                  </Button>
                )}
                {contacts.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-6">
                    <Users className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-4">No contacts found</p>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Contact
                    </Button>
                  </div>
                )}
              </CardContent>
            </GlassCard>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <GlassCard>
              <CardHeader>
                <CardTitle>Deal Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-green-500/10 p-3">
                      <div className="text-sm font-medium text-green-600">Won</div>
                      <div className="text-xl font-bold text-green-600">{wonDeals.length}</div>
                      <div className="text-xs text-green-600/80">{formatCurrency(wonDeals.reduce((sum, deal) => sum + deal.value, 0))}</div>
                    </div>
                    <div className="rounded-lg bg-red-500/10 p-3">
                      <div className="text-sm font-medium text-red-600">Lost</div>
                      <div className="text-xl font-bold text-red-600">{lostDeals.length}</div>
                      <div className="text-xs text-red-600/80">{formatCurrency(lostDeals.reduce((sum, deal) => sum + deal.value, 0))}</div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-blue-500/10 p-3">
                    <div className="text-sm font-medium text-blue-600">Active Deals</div>
                    <div className="text-xl font-bold text-blue-600">{activeDeals.length}</div>
                    <div className="text-xs text-blue-600/80">{formatCurrency(activeDeals.reduce((sum, deal) => sum + deal.value, 0))}</div>
                  </div>
                </div>
              </CardContent>
            </GlassCard>

            <GlassCard className="md:col-span-2">
              <CardHeader>
                <CardTitle>Recent Deals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deals.slice(0, 3).map(deal => (
                    <div key={deal.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{deal.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`${
                            deal.stage === 'closed-won' 
                              ? 'bg-green-500/10 text-green-600 border-green-500/20' 
                              : deal.stage === 'closed-lost'
                                ? 'bg-red-500/10 text-red-600 border-red-500/20'
                                : 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                          } capitalize`}>
                            {deal.stage.replace('-', ' ')}
                          </Badge>
                          <p className="text-xs text-muted-foreground">
                            {deal.closingDate ? formatDate(deal.closingDate) : 'No date'}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-medium">{formatCurrency(deal.value)}</p>
                    </div>
                  ))}
                  {deals.length > 3 && (
                    <Button variant="outline" className="w-full" size="sm">
                      View All Deals
                    </Button>
                  )}
                  {deals.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-6">
                      <BarChart3 className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-4">No deals found</p>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Deal
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </GlassCard>
          </div>
        </TabsContent>
        
        {/* Contacts Tab */}
        <TabsContent value="contacts" className="mt-4">
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Contacts</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </CardHeader>
            <CardContent>
              {contacts.length > 0 ? (
                <div className="space-y-4">
                  {contacts.map(contact => (
                    <div key={contact.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={contact.avatar} alt={`${contact.firstName} ${contact.lastName}`} />
                        <AvatarFallback>{contact.firstName.charAt(0)}{contact.lastName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{contact.firstName} {contact.lastName}</p>
                        <p className="text-xs text-muted-foreground truncate">{contact.position}</p>
                      </div>
                      <div className="hidden md:flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{contact.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{contact.phone}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No contacts found</h3>
                  <p className="text-sm text-muted-foreground mb-6">This company doesn't have any contacts yet.</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contact
                  </Button>
                </div>
              )}
            </CardContent>
          </GlassCard>
        </TabsContent>
        
        {/* Deals Tab */}
        <TabsContent value="deals" className="mt-4">
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Deals</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Deal
              </Button>
            </CardHeader>
            <CardContent>
              {deals.length > 0 ? (
                <div className="space-y-4">
                  {deals.map(deal => (
                    <div key={deal.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{deal.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`${
                            deal.stage === 'closed-won' 
                              ? 'bg-green-500/10 text-green-600 border-green-500/20' 
                              : deal.stage === 'closed-lost'
                                ? 'bg-red-500/10 text-red-600 border-red-500/20'
                                : 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                          } capitalize`}>
                            {deal.stage.replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>
                      <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm font-medium">{formatCurrency(deal.value)}</span>
                        </div>
                        {deal.closingDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{formatDate(deal.closingDate)}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex md:hidden items-center">
                        <span className="text-sm font-medium">{formatCurrency(deal.value)}</span>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No deals found</h3>
                  <p className="text-sm text-muted-foreground mb-6">This company doesn't have any deals yet.</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Deal
                  </Button>
                </div>
              )}
            </CardContent>
          </GlassCard>
        </TabsContent>
        
        {/* Activities Tab */}
        <TabsContent value="activities" className="mt-4">
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Activities</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Activity
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No activities found</h3>
                <p className="text-sm text-muted-foreground mb-6">There are no recent activities for this company.</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Activity
                </Button>
              </div>
            </CardContent>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
