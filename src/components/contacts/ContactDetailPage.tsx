
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  User,
  Building2,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Briefcase,
  Clock,
  ArrowLeft,
  Edit,
  Trash2,
  Plus,
  MessageSquare,
  BarChart3,
  FileText,
  CheckCircle2
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
  getContactById, 
  getCompanyById,
  formatDate,
  Activity
} from "@/data/mockData";

export function ContactDetailPage() {
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

  const contact = id ? getContactById(id) : null;
  const company = contact ? getCompanyById(contact.companyId) : null;

  if (!isLoading && !contact) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <User className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Contact Not Found</h2>
        <p className="text-muted-foreground mb-6">The contact you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/contacts')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Contacts
        </Button>
      </div>
    );
  }

  // Mock activities for this contact
  const activities: Activity[] = [
    {
      id: '1',
      type: 'call',
      title: `Call with ${contact?.firstName} ${contact?.lastName}`,
      description: 'Discussed upcoming project requirements',
      date: '2023-06-15T10:00:00.000Z',
      relatedTo: {
        type: 'contact',
        id: id || '',
        name: `${contact?.firstName} ${contact?.lastName}`
      }
    },
    {
      id: '2',
      type: 'email',
      title: 'Sent proposal follow-up',
      date: '2023-06-10T14:30:00.000Z',
      relatedTo: {
        type: 'contact',
        id: id || '',
        name: `${contact?.firstName} ${contact?.lastName}`
      }
    },
    {
      id: '3',
      type: 'meeting',
      title: 'Initial consultation',
      description: 'Introduced our services and discussed potential collaboration',
      date: '2023-05-25T15:00:00.000Z',
      relatedTo: {
        type: 'contact',
        id: id || '',
        name: `${contact?.firstName} ${contact?.lastName}`
      }
    }
  ];

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
      {/* Header with back button */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate('/contacts')}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>
      </div>

      {/* Contact Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center md:items-start">
          <Avatar className="h-32 w-32">
            <AvatarImage src={contact?.avatar} alt={`${contact?.firstName} ${contact?.lastName}`} />
            <AvatarFallback className="text-3xl">
              {contact?.firstName.charAt(0)}{contact?.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex gap-2 mt-4">
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
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{contact?.firstName} {contact?.lastName}</h1>
              <div className="flex items-center gap-3 text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{contact?.position}</span>
                </div>
                {company && (
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    <span>{company.name}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-sm">{contact?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p className="text-sm">{contact?.phone}</p>
              </div>
              {contact?.lastContacted && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Contacted</p>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <p className="text-sm">{formatDate(contact.lastContacted)}</p>
                  </div>
                </div>
              )}
            </div>
            
            {company && (
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Company</p>
                  <p className="text-sm">{company.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Industry</p>
                  <p className="text-sm">{company.industry}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <p className="text-sm">{company.location}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Details Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="deals">Deals</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <GlassCard className="md:col-span-2">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h3>
                    <p className="text-sm">{contact?.firstName} {contact?.lastName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Position</h3>
                    <p className="text-sm">{contact?.position}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                    <p className="text-sm">{contact?.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone</h3>
                    <p className="text-sm">{contact?.phone}</p>
                  </div>
                  {company && (
                    <>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Company</h3>
                        <p className="text-sm">{company.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Industry</h3>
                        <p className="text-sm">{company.industry}</p>
                      </div>
                    </>
                  )}
                </div>
                {contact?.notes && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Notes</h3>
                      <p className="text-sm text-muted-foreground">
                        {contact.notes}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </GlassCard>

            <GlassCard>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activities.slice(0, 3).map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      {activity.description && (
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formatDate(activity.date)}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" size="sm">
                  View All Activities
                </Button>
              </CardContent>
            </GlassCard>
          </div>

          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Tasks</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCircle2 className="h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="text-lg font-semibold mb-2">No upcoming tasks</h3>
                <p className="text-sm text-muted-foreground mb-4">There are no tasks scheduled for this contact.</p>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </CardContent>
          </GlassCard>
        </TabsContent>
        
        {/* Activities Tab */}
        <TabsContent value="activities" className="mt-4">
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Activities</CardTitle>
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
              <div className="space-y-6">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{activity.title}</p>
                        <Badge variant="outline" className="capitalize">
                          {activity.type}
                        </Badge>
                      </div>
                      {activity.description && (
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      )}
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                          {formatDate(activity.date)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </GlassCard>
        </TabsContent>
        
        {/* Deals Tab */}
        <TabsContent value="deals" className="mt-4">
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Related Deals</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Deal
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No deals found</h3>
                <p className="text-sm text-muted-foreground mb-6">This contact isn't associated with any deals yet.</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Deal
                </Button>
              </div>
            </CardContent>
          </GlassCard>
        </TabsContent>
        
        {/* Notes Tab */}
        <TabsContent value="notes" className="mt-4">
          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Notes</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Note
              </Button>
            </CardHeader>
            <CardContent>
              {contact?.notes ? (
                <div className="p-4 rounded-lg border">
                  <p className="text-sm">{contact.notes}</p>
                  <p className="text-xs text-muted-foreground mt-2">Last updated: {formatDate(contact.lastContacted || '')}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No notes found</h3>
                  <p className="text-sm text-muted-foreground mb-6">There are no notes for this contact yet.</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              )}
            </CardContent>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
