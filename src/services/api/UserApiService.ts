import { BaseApiService } from './BaseApiService';
import type { User, CreateUserRequest, UpdateUserRequest, UserQueryParams, PaginatedResponse } from './types';

// User-specific API Service (SOLID: Single Responsibility, Open/Closed)
export class UserApiService extends BaseApiService<User, CreateUserRequest, UpdateUserRequest> {
  constructor() {
    super('/users');
  }

  // User-specific methods (SOLID: Open/Closed Principle)
  async getUsers(params?: UserQueryParams): Promise<PaginatedResponse<User>> {
    return this.getAll(params as Record<string, any>);
  }

  async getUserById(id: string): Promise<User> {
    return this.getById(id);
  }

  async createUser(data: CreateUserRequest): Promise<User> {
    return this.create(data);
  }

  async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    return this.update(id, data);
  }

  async deleteUser(id: string): Promise<void> {
    return this.delete(id);
  }

  // User-specific business logic methods
  async activateUser(id: string): Promise<User> {
    return this.update(id, { isActive: true });
  }

  async deactivateUser(id: string): Promise<User> {
    return this.update(id, { isActive: false });
  }

  async changeUserRole(id: string, role: User['role']): Promise<User> {
    return this.update(id, { role });
  }

  // Search users by email or name
  async searchUsers(query: string): Promise<User[]> {
    const response = await this.getAll({ search: query, limit: 50 });
    return response.data;
  }

  // Get users by role
  async getUsersByRole(role: User['role']): Promise<User[]> {
    const response = await this.getAll({ role, limit: 100 });
    return response.data;
  }

  // Get active users only
  async getActiveUsers(): Promise<User[]> {
    const response = await this.getAll({ isActive: true, limit: 100 });
    return response.data;
  }
}

// Singleton instance (DRY principle)
export const userApiService = new UserApiService();
