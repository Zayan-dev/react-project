import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApiService } from '../../services/api/UserApiService';
import { mockUserApiService } from '../../services/api/MockUserApiService';
import type { User, CreateUserRequest, UpdateUserRequest, UserQueryParams } from '../../services/api/types';

// Use mock service in development, real service in production
const apiService = import.meta.env.DEV ? mockUserApiService : userApiService;

// Query keys (DRY principle - centralized key management)
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: UserQueryParams) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

// Custom hook for fetching users (DRY principle)
export const useUsers = (params?: UserQueryParams) => {
  return useQuery({
    queryKey: userKeys.list(params || {}),
    queryFn: () => apiService.getUsers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Custom hook for fetching a single user
export const useUser = (id: string) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => apiService.getUserById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Custom hook for searching users
export const useSearchUsers = (query: string) => {
  return useQuery({
    queryKey: [...userKeys.lists(), 'search', query],
    queryFn: () => apiService.searchUsers(query),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    gcTime: 5 * 60 * 1000,
  });
};

// Custom hook for fetching users by role
export const useUsersByRole = (role: User['role']) => {
  return useQuery({
    queryKey: [...userKeys.lists(), 'role', role],
    queryFn: () => apiService.getUsersByRole(role),
    enabled: !!role,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Custom hook for fetching active users
export const useActiveUsers = () => {
  return useQuery({
    queryKey: [...userKeys.lists(), 'active'],
    queryFn: () => apiService.getActiveUsers(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Mutation hooks
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserRequest) => apiService.createUser(data),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) =>
      apiService.updateUser(id, data),
    onSuccess: (updatedUser) => {
      // Update user in cache
      queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser);
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiService.deleteUser(id),
    onSuccess: (_, deletedId) => {
      // Remove user from cache
      queryClient.removeQueries({ queryKey: userKeys.detail(deletedId) });
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

export const useActivateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiService.activateUser(id),
    onSuccess: (updatedUser) => {
      // Update user in cache
      queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser);
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiService.deactivateUser(id),
    onSuccess: (updatedUser) => {
      // Update user in cache
      queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser);
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

export const useChangeUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: User['role'] }) =>
      apiService.changeUserRole(id, role),
    onSuccess: (updatedUser) => {
      // Update user in cache
      queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser);
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};
