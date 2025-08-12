import { api } from '../../components/utils/axiosInstance';
import type { PaginatedResponse, ApiError } from './types';

// Base API Service Interface (SOLID: Interface Segregation)
export interface IBaseApiService<T, CreateRequest = Partial<T>, UpdateRequest = Partial<T>> {
  getAll(params?: Record<string, any>): Promise<PaginatedResponse<T>>;
  getById(id: string): Promise<T>;
  create(data: CreateRequest): Promise<T>;
  update(id: string, data: UpdateRequest): Promise<T>;
  delete(id: string): Promise<void>;
}

// Base API Service Implementation (SOLID: Single Responsibility, Open/Closed)
export abstract class BaseApiService<T, CreateRequest = Partial<T>, UpdateRequest = Partial<T>> 
  implements IBaseApiService<T, CreateRequest, UpdateRequest> {
  
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Generic method to handle API responses (DRY principle)
  protected async handleResponse<R>(response: Promise<any>): Promise<R> {
    try {
      const result = await response;
      // Extract data from axios response
      const responseData = result.data || result;
      
      if (responseData.success) {
        return responseData.data;
      }
      throw new Error(responseData.message || 'API request failed');
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generic error handling (DRY principle)
  protected handleError(error: any): ApiError {
    if (error.response) {
      return {
        message: error.response.data?.message || 'Request failed',
        status: error.response.status,
        code: error.response.data?.code,
      };
    }
    return {
      message: error.message || 'Network error',
      status: 0,
    };
  }

  // Generic CRUD operations (SOLID: Open/Closed Principle)
  async getAll(params?: Record<string, any>): Promise<PaginatedResponse<T>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.handleResponse(api.get(`${this.baseUrl}${queryString}`));
  }

  async getById(id: string): Promise<T> {
    return this.handleResponse(api.get(`${this.baseUrl}/${id}`));
  }

  async create(data: CreateRequest): Promise<T> {
    return this.handleResponse(api.post(this.baseUrl, data));
  }

  async update(id: string, data: UpdateRequest): Promise<T> {
    return this.handleResponse(api.put(`${this.baseUrl}/${id}`, data));
  }

  async delete(id: string): Promise<void> {
    await this.handleResponse(api.delete(`${this.baseUrl}/${id}`));
  }
}
