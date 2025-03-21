
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Building2,
  Users,
  Calendar,
  DollarSign,
  ArrowLeft,
  Edit,
  Trash2,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  ChevronRight,
  ChevronLeft
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
import { Progress } from "@/components/ui/progress";
import { 
  getDealById, 
  getCompanyById,
  getContactById,
  formatCurrency,
  formatDate,
  Deal
} from "@/data/mockData";

export function DealDetailPage() {
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

  const deal = id ? getDealById(id) : null;
  const company = deal ? getCompanyById(deal.companyId) : null;
  const contact = deal ? getContactById(deal.contactId) : null;

  if (!isLoading && !deal) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Deal Not Found</h2>
        <p className="text-muted-foreground mb-6">The deal you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/deals')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Deals
        </Button>
      </div>
    );
  }

  const getStageColor = (stage?: Deal["stage"]) => {
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

  const currentStageIndex = deal ? stageOrder.indexOf(deal.stage) : -1;
  const previousStage = currentStageIndex > 0 ? stageOrder[currentStageIndex - 1] : null;
  const nextStage = currentStageIndex < stageOrder.length - 3 ? stageOrder[currentStageIndex + 1] : null;

  return (
    <div className="space-y-6 fade-in">
      {/* Header with back button */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate('/deals')}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>
      </div>

      {/* Deal Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{deal?.name}</h1>
              {deal?.stage && (
                <Badge className={getStageColor(deal.stage)}>
                  {deal.stage.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3 text-muted-foreground mt-1">
              {company && (
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  <span>{company.name}</span>
                </div>
              )}
              {contact && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{contact.firstName} {contact.lastName}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
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

        {/* Deal Stage Progress */}
        {deal && deal.stage !== 'closed-won' && deal.stage !== 'closed-lost' && (
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Deal Progress</h3>
                <div className="flex items-center gap-2">
                  {previousStage && (
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Move Back
                    </Button>
                  )}
                  {nextStage && (
                    <Button size="sm">
                      Move Forward
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {stageOrder.slice(0, 4).map((stage, index) => (
                  <div key={stage} className="flex flex-col items-center">
                    <div className="text-xs font-medium capitalize mb-2">
                      {stage.replace('-', ' ')}
                    </div>
                    <div 
                      className={`w-full h-2 rounded-full ${
                        index <= currentStageIndex ? 'bg-blue-500' : 'bg-muted'
                      }`}
                    />
                  </div>
                ))}
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
          </Card>
        )}
      </div>

      {/* Deal Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Value</p>
                <p className="text-2xl font-bold">{formatCurrency(deal?.value || 0)}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Probability</p>
                <p className="text-2xl font-bold">{deal?.probability || 0}%</p>
              </div>
              <div className="rounded-full p-2 bg-blue-500/10">
                <BarChart3 className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Created</p>
                <p className="text-2xl font-bold">{formatDate(deal?.createdAt || '')}</p>
              </div>
              <div className="rounded-full p-2 bg-purple-500/10">
                <Clock className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Closing Date</p>
                <p className="text-2xl font-bold">{deal?.closingDate ? formatDate(deal.closingDate) : 'N/A'}</p>
              </div>
              <div className="rounded-full p-2 bg-yellow-500/10">
                <Calendar className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deal Details Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <GlassCard className="md:col-span-2">
              <CardHeader>
                <CardTitle>Deal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Deal Name</h3>
                    <p className="text-sm">{deal?.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Stage</h3>
                    <Badge className={getStageColor(deal?.stage)}>
                      {deal?.stage?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Value</h3>
                    <p className="text-sm">{formatCurrency(deal?.value || 0)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Probability</h3>
                    <p className="text-sm">{deal?.probability || 0}%</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Created Date</h3>
                    <p className="text-sm">{formatDate(deal?.createdAt || '')}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Closing Date</h3>
                    <p className="text-sm">{deal?.closingDate ? formatDate(deal.closingDate) : 'N/A'}</p>
                  </div>
                </div>
                {deal?.notes && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Notes</h3>
                      <p className="text-sm text-muted-foreground">
                        {deal.notes}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </GlassCard>

            <GlassCard>
              <CardHeader>
                <CardTitle>Related Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {company && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Company</h3>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={company.logo} alt={company.name} />
                        <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{company.name}</p>
                        <p className="text-xs text-muted-foreground">{company.industry}</p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                )}
                
                {contact && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Primary Contact</h3>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={contact.avatar} alt={`${contact.firstName} ${contact.lastName}`} />
                        <AvatarFallback>{contact.firstName.charAt(0)}{contact.lastName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{contact.firstName} {contact.lastName}</p>
                        <p className="text-xs text-muted-foreground">{contact.position}</p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </GlassCard>
          </div>

          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Deal Timeline</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 border-l">
                <div className="space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[25px] h-4 w-4 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="text-sm font-medium">Deal created</p>
                      <p className="text-xs text-muted-foreground">{formatDate(deal?.createdAt || '')}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[25px] h-4 w-4 rounded-full bg-purple-500"></div>
                    <div>
                      <p className="text-sm font-medium">Stage changed to {deal?.stage?.replace('-', ' ')}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(deal?.createdAt || '')}</p>
                    </div>
                  </div>
                  {deal?.closingDate && (
                    <div className="relative">
                      <div className="absolute -left-[25px] h-4 w-4 rounded-full bg-yellow-500"></div>
                      <div>
                        <p className="text-sm font-medium">Expected closing date set</p>
                        <p className="text-xs text-muted-foreground">{formatDate(deal.closingDate)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </GlassCard>
        </TabsContent>
        
        {/* Activities Tab */}
        <TabsContent value="activities" className="mt-4">
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Deal Activities</CardTitle>
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
                <p className="text-sm text-muted-foreground mb-6">There are no activities recorded for this deal yet.</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Activity
                </Button>
              </div>
            </CardContent>
          </GlassCard>
        </TabsContent>
        
        {/* Contacts Tab */}
        <TabsContent value="contacts" className="mt-4">
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Related Contacts</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </CardHeader>
            <CardContent>
              {contact ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={contact.avatar} alt={`${contact.firstName} ${contact.lastName}`} />
                      <AvatarFallback>{contact.firstName.charAt(0)}{contact.lastName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{contact.firstName} {contact.lastName}</p>
                      <p className="text-xs text-muted-foreground truncate">{contact.position}</p>
                    </div>
                    <Badge>Primary</Badge>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No contacts found</h3>
                  <p className="text-sm text-muted-foreground mb-6">This deal isn't associated with any contacts yet.</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contact
                  </Button>
                </div>
              )}
            </CardContent>
          </GlassCard>
        </TabsContent>
        
        {/* Files Tab */}
        <TabsContent value="files" className="mt-4">
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Deal Files</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No files found</h3>
                <p className="text-sm text-muted-foreground mb-6">There are no files attached to this deal yet.</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </div>
            </CardContent>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
