import { useState } from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell,
  Button,
  Input,
  Select,
  SelectItem,
  Chip,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
  Pagination
} from '@heroui/react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  UserPlus,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Shield
} from 'lucide-react';
import { useUsers, useDeleteUser, useActivateUser, useDeactivateUser } from '../../../hooks/api/useUsers';
import type { User, UserRole } from '../../../services/api/types';

export default function Users() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | boolean>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // React Query hooks
  const { data: usersData, isLoading, error } = useUsers({
    page: currentPage,
    limit: itemsPerPage,
    search: searchQuery || undefined,
    role: roleFilter === 'all' ? undefined : roleFilter,
    isActive: statusFilter === 'all' ? undefined : statusFilter,
  });

  const deleteUserMutation = useDeleteUser();
  const activateUserMutation = useActivateUser();
  const deactivateUserMutation = useDeactivateUser();

  // Handle user actions
  const handleDeleteUser = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUserMutation.mutateAsync(id);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleToggleUserStatus = async (user: User) => {
    try {
      if (user.isActive) {
        await deactivateUserMutation.mutateAsync(user.id);
      } else {
        await activateUserMutation.mutateAsync(user.id);
      }
    } catch (error) {
      console.error('Failed to toggle user status:', error);
    }
  };

  // Get role color for chip
  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'danger';
      case 'moderator': return 'warning';
      case 'user': return 'primary';
      default: return 'default';
    }
  };

  // Get status color for chip
  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'success' : 'default';
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="w-full max-w-md">
          <CardBody className="text-center">
            <p className="text-red-500">Error loading users: {error.message}</p>
            <Button 
              color="primary" 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">Manage your application users</p>
        </div>
        <Button 
          color="primary" 
          startContent={<UserPlus className="w-4 h-4" />}
          className="mt-4 sm:mt-0"
        >
          Add User
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={<Search className="w-4 h-4 text-gray-400" />}
            />
            
            <Select
              placeholder="Filter by role"
              selectedKeys={[roleFilter]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as UserRole | 'all';
                setRoleFilter(selected);
              }}
              startContent={<Shield className="w-4 h-4 text-gray-400" />}
            >
              <SelectItem key="all">All Roles</SelectItem>
              <SelectItem key="admin">Admin</SelectItem>
              <SelectItem key="moderator">Moderator</SelectItem>
              <SelectItem key="user">User</SelectItem>
            </Select>

            <Select
              placeholder="Filter by status"
              selectedKeys={[statusFilter.toString()]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setStatusFilter(selected === 'all' ? 'all' : selected === 'true');
              }}
              startContent={<Filter className="w-4 h-4 text-gray-400" />}
            >
              <SelectItem key="all">All Status</SelectItem>
              <SelectItem key="true">Active</SelectItem>
              <SelectItem key="false">Inactive</SelectItem>
            </Select>

            <Select
              placeholder="Items per page"
              selectedKeys={[itemsPerPage.toString()]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setItemsPerPage(Number(selected));
              }}
            >
              <SelectItem key="5">5 per page</SelectItem>
              <SelectItem key="10">10 per page</SelectItem>
              <SelectItem key="20">20 per page</SelectItem>
              <SelectItem key="50">50 per page</SelectItem>
            </Select>
          </div>
        </CardBody>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">User List</h3>
            {isLoading && <Spinner size="sm" />}
          </div>
        </CardHeader>
        <CardBody>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <Spinner size="lg" />
            </div>
          ) : (
            <>
              <Table aria-label="Users table">
                <TableHeader>
                  <TableColumn>USER</TableColumn>
                  <TableColumn>ROLE</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>CREATED</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody emptyContent="No users found">
                  {usersData?.data?.map((user: User) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar 
                            src={user.avatar} 
                            name={user.name}
                            className="w-10 h-10"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          color={getRoleColor(user.role)} 
                          variant="flat" 
                          size="sm"
                        >
                          {user.role}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          color={getStatusColor(user.isActive)} 
                          variant="flat" 
                          size="sm"
                        >
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color={user.isActive ? "warning" : "success"}
                            onClick={() => handleToggleUserStatus(user)}
                            disabled={activateUserMutation.isPending || deactivateUserMutation.isPending}
                          >
                            {user.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                          </Button>
                          
                          <Dropdown>
                            <DropdownTrigger>
                              <Button isIconOnly size="sm" variant="light">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="User actions">
                              <DropdownItem 
                                key="edit" 
                                startContent={<Edit className="w-4 h-4" />}
                              >
                                Edit User
                              </DropdownItem>
                              <DropdownItem 
                                key="change-role"
                                startContent={<Shield className="w-4 h-4" />}
                              >
                                Change Role
                              </DropdownItem>
                              <DropdownItem 
                                key="delete" 
                                color="danger"
                                startContent={<Trash2 className="w-4 h-4" />}
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                Delete User
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {usersData?.pagination && usersData.pagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-gray-500">
                    Showing {((usersData.pagination.currentPage - 1) * usersData.pagination.itemsPerPage) + 1} to{' '}
                    {Math.min(usersData.pagination.currentPage * usersData.pagination.itemsPerPage, usersData.pagination.totalItems)} of{' '}
                    {usersData.pagination.totalItems} results
                  </p>
                  
                  <Pagination
                    total={usersData.pagination.totalPages}
                    page={currentPage}
                    onChange={setCurrentPage}
                    showControls
                    size="sm"
                  />
                </div>
              )}
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
