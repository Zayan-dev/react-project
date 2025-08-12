import type { User, CreateUserRequest, UpdateUserRequest, UserQueryParams, PaginatedResponse } from './types';

// Mock data for development
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@mindset.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    email: 'john.doe@mindset.com',
    name: 'John Doe',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isActive: true,
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '3',
    email: 'jane.smith@mindset.com',
    name: 'Jane Smith',
    role: 'moderator',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    isActive: true,
    createdAt: '2024-01-25T09:15:00Z',
    updatedAt: '2024-01-25T09:15:00Z',
  },
  {
    id: '4',
    email: 'bob.wilson@mindset.com',
    name: 'Bob Wilson',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    isActive: false,
    createdAt: '2024-02-01T11:45:00Z',
    updatedAt: '2024-02-01T11:45:00Z',
  },
  {
    id: '5',
    email: 'alice.johnson@mindset.com',
    name: 'Alice Johnson',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isActive: true,
    createdAt: '2024-02-05T16:20:00Z',
    updatedAt: '2024-02-05T16:20:00Z',
  },
];

// Helper function to simulate API delay
const simulateApiDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to filter and paginate users
const filterAndPaginateUsers = (
  users: User[],
  params: UserQueryParams = {}
): PaginatedResponse<User> => {
  let filteredUsers = [...users];

  // Apply search filter
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredUsers = filteredUsers.filter(
      user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
    );
  }

  // Apply role filter
  if (params.role) {
    filteredUsers = filteredUsers.filter(user => user.role === params.role);
  }

  // Apply active filter
  if (params.isActive !== undefined) {
    filteredUsers = filteredUsers.filter(user => user.isActive === params.isActive);
  }

  // Apply sorting
  if (params.sortBy) {
    filteredUsers.sort((a, b) => {
      const aValue = a[params.sortBy!];
      const bValue = b[params.sortBy!];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return params.sortOrder === 'desc' 
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return params.sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
      }
      
      return 0;
    });
  }

  // Apply pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return {
    data: paginatedUsers,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(filteredUsers.length / limit),
      totalItems: filteredUsers.length,
      itemsPerPage: limit,
    },
  };
};

// Mock User API Service
export class MockUserApiService {
  private users: User[] = [...mockUsers];

  async getUsers(params?: UserQueryParams): Promise<PaginatedResponse<User>> {
    await simulateApiDelay();
    return filterAndPaginateUsers(this.users, params);
  }

  async getUserById(id: string): Promise<User> {
    await simulateApiDelay();
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createUser(data: CreateUserRequest): Promise<User> {
    await simulateApiDelay();
    
    // Simulate validation error
    if (this.users.some(u => u.email === data.email)) {
      throw new Error('User with this email already exists');
    }

    const newUser: User = {
      id: (this.users.length + 1).toString(),
      ...data,
      avatar: `https://images.unsplash.com/photo-${Math.random().toString(36).substring(7)}?w=150&h=150&fit=crop&crop=face`,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    return newUser;
  }

  async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    await simulateApiDelay();
    
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // Simulate validation error for email uniqueness
    if (data.email && this.users.some(u => u.id !== id && u.email === data.email)) {
      throw new Error('User with this email already exists');
    }

    const updatedUser = {
      ...this.users[userIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    await simulateApiDelay();
    
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    this.users.splice(userIndex, 1);
  }

  async activateUser(id: string): Promise<User> {
    return this.updateUser(id, { isActive: true });
  }

  async deactivateUser(id: string): Promise<User> {
    return this.updateUser(id, { isActive: false });
  }

  async changeUserRole(id: string, role: User['role']): Promise<User> {
    return this.updateUser(id, { role });
  }

  async searchUsers(query: string): Promise<User[]> {
    await simulateApiDelay();
    return this.users.filter(
      user => 
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    );
  }

  async getUsersByRole(role: User['role']): Promise<User[]> {
    await simulateApiDelay();
    return this.users.filter(user => user.role === role);
  }

  async getActiveUsers(): Promise<User[]> {
    await simulateApiDelay();
    return this.users.filter(user => user.isActive);
  }

  // Method to reset mock data (useful for testing)
  resetMockData(): void {
    this.users = [...mockUsers];
  }
}

// Export singleton instance
export const mockUserApiService = new MockUserApiService();
