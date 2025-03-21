
import { useState, useEffect } from "react";
import { 
  Calendar as CalendarIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal,
  Clock,
  Users,
  Building2
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
import { Calendar } from "@/components/ui/calendar";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  formatDate,
  getContactById,
  getCompanyById
} from "@/data/mockData";

// Mock calendar events
interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  type: 'meeting' | 'call' | 'task' | 'reminder';
  relatedTo?: {
    type: 'contact' | 'company' | 'deal';
    id: string;
  };
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Meeting with John Smith',
    description: 'Discuss new project requirements',
    date: new Date(2023, 5, 15, 10, 0),
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    type: 'meeting',
    relatedTo: {
      type: 'contact',
      id: '1'
    }
  },
  {
    id: '2',
    title: 'Call with Globex Industries',
    date: new Date(2023, 5, 16, 14, 30),
    startTime: '2:30 PM',
    endTime: '3:00 PM',
    type: 'call',
    relatedTo: {
      type: 'company',
      id: '2'
    }
  },
  {
    id: '3',
    title: 'Follow up with Stark Industries',
    date: new Date(2023, 5, 18, 9, 0),
    type: 'task',
    relatedTo: {
      type: 'company',
      id: '5'
    }
  },
  {
    id: '4',
    title: 'Prepare proposal for Acme Corp',
    date: new Date(2023, 5, 20, 0, 0),
    type: 'task',
    relatedTo: {
      type: 'company',
      id: '1'
    }
  },
  {
    id: '5',
    title: 'Quarterly review meeting',
    description: 'Review Q2 performance and plan for Q3',
    date: new Date(2023, 5, 25, 13, 0),
    startTime: '1:00 PM',
    endTime: '3:00 PM',
    type: 'meeting'
  }
];

export function CalendarPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Get events for the selected date
  const selectedDateEvents = selectedDate 
    ? mockEvents.filter(event => 
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear()
      )
    : [];

  // Get dates with events for highlighting in the calendar
  const datesWithEvents = mockEvents.map(event => {
    const date = new Date(event.date);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  });

  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'call':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'task':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'reminder':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      default:
        return '';
    }
  };

  const formatEventTime = (event: CalendarEvent) => {
    if (event.startTime && event.endTime) {
      return `${event.startTime} - ${event.endTime}`;
    } else if (event.startTime) {
      return event.startTime;
    } else {
      return 'All day';
    }
  };

  const getRelatedEntity = (event: CalendarEvent) => {
    if (!event.relatedTo) return null;
    
    if (event.relatedTo.type === 'contact') {
      const contact = getContactById(event.relatedTo.id);
      if (!contact) return null;
      return {
        name: `${contact.firstName} ${contact.lastName}`,
        icon: <Users className="h-3 w-3" />,
        type: 'Contact'
      };
    } else if (event.relatedTo.type === 'company') {
      const company = getCompanyById(event.relatedTo.id);
      if (!company) return null;
      return {
        name: company.name,
        icon: <Building2 className="h-3 w-3" />,
        type: 'Company'
      };
    }
    
    return null;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground">
          Schedule and manage your appointments and tasks.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Calendar */}
        <div className="md:w-[350px]">
          <GlassCard>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Calendar</CardTitle>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => navigateMonth('next')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className="rounded-md border"
                modifiers={{
                  event: datesWithEvents
                }}
                modifiersStyles={{
                  event: {
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    textDecorationColor: 'var(--primary)',
                    textDecorationThickness: '2px',
                    textUnderlineOffset: '4px'
                  }
                }}
              />
              <div className="mt-4 space-y-1">
                <h3 className="text-sm font-medium">Upcoming Events</h3>
                <div className="space-y-2">
                  {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-muted" />
                        <div className="h-4 w-full animate-pulse rounded bg-muted" />
                      </div>
                    ))
                  ) : mockEvents.slice(0, 3).map(event => (
                    <div key={event.id} className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${
                        event.type === 'meeting' ? 'bg-blue-500' :
                        event.type === 'call' ? 'bg-green-500' :
                        event.type === 'task' ? 'bg-yellow-500' :
                        'bg-purple-500'
                      }`} />
                      <p className="text-xs truncate">{event.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </CardFooter>
          </GlassCard>
        </div>

        {/* Events for selected date */}
        <div className="flex-1">
          <GlassCard>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {selectedDate ? formatDate(selectedDate.toISOString()) : 'No date selected'}
                  </CardTitle>
                  <CardDescription>
                    {selectedDateEvents.length} {selectedDateEvents.length === 1 ? 'event' : 'events'}
                  </CardDescription>
                </div>
                <Tabs value={view} onValueChange={(v) => setView(v as 'month' | 'week' | 'day')}>
                  <TabsList className="grid w-[180px] grid-cols-3">
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="day">Day</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex gap-4 p-4 rounded-lg border animate-pulse">
                      <div className="w-16 h-16 rounded-md bg-muted flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-3/4 rounded bg-muted" />
                        <div className="h-4 w-1/2 rounded bg-muted" />
                        <div className="h-4 w-full rounded bg-muted" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map(event => {
                    const relatedEntity = getRelatedEntity(event);
                    
                    return (
                      <div key={event.id} className="flex gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className="w-16 h-16 rounded-md bg-muted flex-shrink-0 flex flex-col items-center justify-center">
                          <CalendarIcon className="h-6 w-6 text-muted-foreground" />
                          <p className="text-xs font-medium mt-1">{formatEventTime(event)}</p>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{event.title}</h3>
                            <Badge className={getEventTypeColor(event.type)}>
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </Badge>
                          </div>
                          {event.description && (
                            <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                          )}
                          {relatedEntity && (
                            <div className="flex items-center gap-1 mt-2">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                {relatedEntity.icon}
                                <span>{relatedEntity.type}:</span>
                              </div>
                              <span className="text-xs text-primary">{relatedEntity.name}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Edit Event</DropdownMenuItem>
                              <DropdownMenuItem>Reschedule</DropdownMenuItem>
                              <DropdownMenuItem>Add Reminder</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No events for this day</h3>
                  <p className="text-sm text-muted-foreground mb-6">There are no events scheduled for the selected date.</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </div>
              )}
            </CardContent>
          </GlassCard>
        </div>
      </div>

      {/* Upcoming Events */}
      <GlassCard>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Your schedule for the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-3 animate-pulse">
                  <div className="h-12 w-12 rounded-md bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-muted" />
                    <div className="h-3 w-1/2 rounded bg-muted" />
                  </div>
                  <div className="h-6 w-20 rounded-full bg-muted" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {mockEvents.map(event => {
                const relatedEntity = getRelatedEntity(event);
                
                return (
                  <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 rounded-md bg-muted flex-shrink-0 flex flex-col items-center justify-center">
                      <p className="text-xs font-medium">{event.date.toLocaleDateString('en-US', { month: 'short' })}</p>
                      <p className="text-lg font-bold">{event.date.getDate()}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium truncate">{event.title}</h3>
                        {relatedEntity && (
                          <div className="flex items-center gap-1 text-xs text-primary">
                            {relatedEntity.icon}
                            <span className="truncate">{relatedEntity.name}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatEventTime(event)}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getEventTypeColor(event.type)}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </GlassCard>
    </div>
  );
}
