
// Mock data for CRM dashboard

export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  employees: number;
  revenue: string;
  status: 'active' | 'inactive' | 'lead';
  logo?: string;
  createdAt: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  companyId: string;
  avatar?: string;
  lastContacted?: string;
  notes?: string;
}

export interface Deal {
  id: string;
  name: string;
  value: number;
  stage: 'lead' | 'discovery' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  companyId: string;
  contactId: string;
  createdAt: string;
  closingDate?: string;
  probability?: number;
  notes?: string;
}

export interface DashboardStats {
  totalCompanies: number;
  activeCompanies: number;
  totalDeals: number;
  totalContacts: number;
  dealsValue: number;
  closedDealsValue: number;
  dealsByStage: Record<Deal['stage'], number>;
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task';
  title: string;
  description?: string;
  date: string;
  relatedTo?: {
    type: 'company' | 'contact' | 'deal';
    id: string;
    name: string;
  };
}

// Mock Companies
export const companies: Company[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    industry: 'Technology',
    location: 'San Francisco, CA',
    employees: 250,
    revenue: '$25M',
    status: 'active',
    logo: 'https://images.unsplash.com/photo-1568122506084-57d12d22b683?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: '2023-01-15T08:00:00.000Z'
  },
  {
    id: '2',
    name: 'Globex Industries',
    industry: 'Manufacturing',
    location: 'Chicago, IL',
    employees: 500,
    revenue: '$50M',
    status: 'active',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: '2023-02-10T10:30:00.000Z'
  },
  {
    id: '3',
    name: 'Soylent Corp',
    industry: 'Food & Beverage',
    location: 'New York, NY',
    employees: 150,
    revenue: '$18M',
    status: 'inactive',
    logo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: '2023-03-05T14:15:00.000Z'
  },
  {
    id: '4',
    name: 'Initech Software',
    industry: 'Technology',
    location: 'Austin, TX',
    employees: 75,
    revenue: '$8M',
    status: 'active',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: '2023-04-20T09:45:00.000Z'
  },
  {
    id: '5',
    name: 'Stark Industries',
    industry: 'Defense',
    location: 'Los Angeles, CA',
    employees: 1000,
    revenue: '$100M',
    status: 'active',
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: '2023-05-12T11:20:00.000Z'
  },
  {
    id: '6',
    name: 'Umbrella Corp',
    industry: 'Pharmaceuticals',
    location: 'Boston, MA',
    employees: 300,
    revenue: '$40M',
    status: 'lead',
    logo: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: '2023-06-08T16:30:00.000Z'
  }
];

// Mock Contacts
export const contacts: Contact[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@acme.com',
    phone: '(555) 123-4567',
    position: 'CEO',
    companyId: '1',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    lastContacted: '2023-06-15T10:00:00.000Z',
    notes: 'Key decision maker'
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@globex.com',
    phone: '(555) 234-5678',
    position: 'CTO',
    companyId: '2',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    lastContacted: '2023-06-10T14:30:00.000Z'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.b@soylent.com',
    phone: '(555) 345-6789',
    position: 'Marketing Director',
    companyId: '3',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    lastContacted: '2023-06-05T09:15:00.000Z'
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.d@initech.com',
    phone: '(555) 456-7890',
    position: 'Sales Manager',
    companyId: '4',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    lastContacted: '2023-06-12T16:45:00.000Z',
    notes: 'Interested in our premium plan'
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.w@stark.com',
    phone: '(555) 567-8901',
    position: 'COO',
    companyId: '5',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    lastContacted: '2023-06-08T11:30:00.000Z'
  },
  {
    id: '6',
    firstName: 'Jennifer',
    lastName: 'Taylor',
    email: 'jennifer.t@umbrella.com',
    phone: '(555) 678-9012',
    position: 'Procurement Manager',
    companyId: '6',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    lastContacted: '2023-06-01T13:00:00.000Z',
    notes: 'Follow up on proposal'
  },
  {
    id: '7',
    firstName: 'Robert',
    lastName: 'Anderson',
    email: 'robert.a@acme.com',
    phone: '(555) 789-0123',
    position: 'CIO',
    companyId: '1',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    lastContacted: '2023-06-14T15:20:00.000Z'
  },
  {
    id: '8',
    firstName: 'Lisa',
    lastName: 'Martinez',
    email: 'lisa.m@globex.com',
    phone: '(555) 890-1234',
    position: 'HR Director',
    companyId: '2',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    lastContacted: '2023-06-07T10:45:00.000Z'
  }
];

// Mock Deals
export const deals: Deal[] = [
  {
    id: '1',
    name: 'Enterprise Software Package',
    value: 75000,
    stage: 'proposal',
    companyId: '1',
    contactId: '1',
    createdAt: '2023-05-10T09:00:00.000Z',
    closingDate: '2023-07-15T00:00:00.000Z',
    probability: 60,
    notes: 'Proposal sent, awaiting feedback'
  },
  {
    id: '2',
    name: 'Manufacturing Equipment',
    value: 120000,
    stage: 'negotiation',
    companyId: '2',
    contactId: '2',
    createdAt: '2023-04-15T14:30:00.000Z',
    closingDate: '2023-06-30T00:00:00.000Z',
    probability: 80,
    notes: 'Negotiating final terms'
  },
  {
    id: '3',
    name: 'Food Processing System',
    value: 45000,
    stage: 'closed-lost',
    companyId: '3',
    contactId: '3',
    createdAt: '2023-03-20T11:15:00.000Z',
    closingDate: '2023-05-01T00:00:00.000Z',
    probability: 0,
    notes: 'Lost to competitor'
  },
  {
    id: '4',
    name: 'Software Maintenance Contract',
    value: 25000,
    stage: 'closed-won',
    companyId: '4',
    contactId: '4',
    createdAt: '2023-05-05T10:45:00.000Z',
    closingDate: '2023-06-01T00:00:00.000Z',
    probability: 100,
    notes: 'Contract signed'
  },
  {
    id: '5',
    name: 'Defense System Upgrade',
    value: 250000,
    stage: 'discovery',
    companyId: '5',
    contactId: '5',
    createdAt: '2023-06-01T15:00:00.000Z',
    closingDate: '2023-08-15T00:00:00.000Z',
    probability: 40,
    notes: 'Initial requirements gathering'
  },
  {
    id: '6',
    name: 'Pharmaceutical Equipment',
    value: 85000,
    stage: 'lead',
    companyId: '6',
    contactId: '6',
    createdAt: '2023-06-10T13:30:00.000Z',
    closingDate: '2023-09-01T00:00:00.000Z',
    probability: 20,
    notes: 'Initial contact made'
  },
  {
    id: '7',
    name: 'IT Infrastructure Upgrade',
    value: 95000,
    stage: 'proposal',
    companyId: '1',
    contactId: '7',
    createdAt: '2023-05-20T09:30:00.000Z',
    closingDate: '2023-07-30T00:00:00.000Z',
    probability: 65,
    notes: 'Proposal under review'
  }
];

// Mock Activities
export const activities: Activity[] = [
  {
    id: '1',
    type: 'call',
    title: 'Call with John Smith',
    description: 'Discussed proposal details',
    date: '2023-06-15T10:00:00.000Z',
    relatedTo: {
      type: 'contact',
      id: '1',
      name: 'John Smith'
    }
  },
  {
    id: '2',
    type: 'email',
    title: 'Sent proposal to Globex Industries',
    date: '2023-06-14T14:30:00.000Z',
    relatedTo: {
      type: 'company',
      id: '2',
      name: 'Globex Industries'
    }
  },
  {
    id: '3',
    type: 'meeting',
    title: 'Discovery meeting with Stark Industries',
    description: 'Initial requirements gathering',
    date: '2023-06-13T15:00:00.000Z',
    relatedTo: {
      type: 'company',
      id: '5',
      name: 'Stark Industries'
    }
  },
  {
    id: '4',
    type: 'note',
    title: 'Notes from Initech meeting',
    description: 'They need additional features',
    date: '2023-06-12T16:45:00.000Z',
    relatedTo: {
      type: 'deal',
      id: '4',
      name: 'Software Maintenance Contract'
    }
  },
  {
    id: '5',
    type: 'task',
    title: 'Follow up with Umbrella Corp',
    date: '2023-06-20T13:00:00.000Z',
    relatedTo: {
      type: 'company',
      id: '6',
      name: 'Umbrella Corp'
    }
  }
];

// Dashboard Stats
export const getDashboardStats = (): DashboardStats => {
  const totalCompanies = companies.length;
  const activeCompanies = companies.filter(c => c.status === 'active').length;
  const totalDeals = deals.length;
  const totalContacts = contacts.length;
  const dealsValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const closedDealsValue = deals
    .filter(deal => deal.stage === 'closed-won')
    .reduce((sum, deal) => sum + deal.value, 0);

  const dealsByStage = deals.reduce((acc, deal) => {
    acc[deal.stage] = (acc[deal.stage] || 0) + 1;
    return acc;
  }, {} as Record<Deal['stage'], number>);

  return {
    totalCompanies,
    activeCompanies,
    totalDeals,
    totalContacts,
    dealsValue,
    closedDealsValue,
    dealsByStage,
    recentActivities: activities.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, 5)
  };
};

// Helper function to get company by ID
export const getCompanyById = (id: string): Company | undefined => {
  return companies.find(company => company.id === id);
};

// Helper function to get contact by ID
export const getContactById = (id: string): Contact | undefined => {
  return contacts.find(contact => contact.id === id);
};

// Helper function to get deal by ID
export const getDealById = (id: string): Deal | undefined => {
  return deals.find(deal => deal.id === id);
};

// Helper function to get contacts by company ID
export const getContactsByCompanyId = (companyId: string): Contact[] => {
  return contacts.filter(contact => contact.companyId === companyId);
};

// Helper function to get deals by company ID
export const getDealsByCompanyId = (companyId: string): Deal[] => {
  return deals.filter(deal => deal.companyId === companyId);
};

// Helper function to format currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
