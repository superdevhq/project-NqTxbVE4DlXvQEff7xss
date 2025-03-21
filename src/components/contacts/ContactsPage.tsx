
import { useState, useEffect } from "react";
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Clock
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  contacts, 
  Contact, 
  getCompanyById,
  formatDate
} from "@/data/mockData";

export function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contacts);
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
      setFilteredContacts(contacts);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredContacts(
        contacts.filter(
          (contact) =>
            `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(query) ||
            contact.email.toLowerCase().includes(query) ||
            contact.position.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery]);

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
        <p className="text-muted-foreground">
          Manage your contacts and relationships.
        </p>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search contacts..."
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
            Add Contact
          </Button>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-20 w-20 animate-pulse rounded-full bg-muted" />
                    <div className="mt-4 space-y-2">
                      <div className="h-5 w-32 animate-pulse rounded bg-muted mx-auto" />
                      <div className="h-4 w-24 animate-pulse rounded bg-muted mx-auto" />
                    </div>
                    <div className="mt-4 space-y-2 w-full">
                      <div className="h-8 animate-pulse rounded bg-muted" />
                      <div className="h-8 animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          : filteredContacts.map((contact) => {
              const company = getCompanyById(contact.companyId);
              
              return (
                <GlassCard key={contact.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={contact.avatar} alt={`${contact.firstName} ${contact.lastName}`} />
                        <AvatarFallback className="text-lg">
                          {contact.firstName.charAt(0)}{contact.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold">{contact.firstName} {contact.lastName}</h3>
                        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                          <Briefcase className="h-3 w-3" />
                          <span>{contact.position}</span>
                        </div>
                        {company && (
                          <div className="flex items-center justify-center gap-1 text-sm text-primary">
                            <Building2 className="h-3 w-3" />
                            <span>{company.name}</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 w-full space-y-2">
                        <Button variant="outline" className="w-full justify-start" size="sm">
                          <Mail className="mr-2 h-4 w-4 text-blue-500" />
                          {contact.email}
                        </Button>
                        <Button variant="outline" className="w-full justify-start" size="sm">
                          <Phone className="mr-2 h-4 w-4 text-green-500" />
                          {contact.phone}
                        </Button>
                      </div>
                      {contact.lastContacted && (
                        <div className="mt-4 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Last contacted: {formatDate(contact.lastContacted)}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 p-2 flex justify-end">
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
                        <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                        <DropdownMenuItem>Add Task</DropdownMenuItem>
                        <DropdownMenuItem>Add Deal</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </GlassCard>
              );
            })}
      </div>

      {filteredContacts.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
          <Users className="h-10 w-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No contacts found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}
