import { Card, CardBody, CardHeader, Progress, Chip } from '@heroui/react';
import { 
  Users, 
  TrendingUp, 
  Activity, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Clock,
  Settings
} from 'lucide-react';

export default function Home() {
  const stats = [
    {
      title: 'Total Users',
      value: '2,350',
      change: '+20.1%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'primary'
    },
    {
      title: 'Revenue',
      value: '$45,231',
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'success'
    },
    {
      title: 'Active Sessions',
      value: '1,234',
      change: '-2.1%',
      changeType: 'negative' as const,
      icon: Activity,
      color: 'warning'
    },
    {
      title: 'Growth Rate',
      value: '12.5%',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'secondary'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'user',
      message: 'New user registered',
      time: '2 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'payment',
      message: 'Payment processed successfully',
      time: '5 minutes ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'system',
      message: 'System backup completed',
      time: '10 minutes ago',
      status: 'primary'
    },
    {
      id: 4,
      type: 'alert',
      message: 'High CPU usage detected',
      time: '15 minutes ago',
      status: 'warning'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'danger': return 'danger';
      default: return 'primary';
    }
  };

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users className="w-4 h-4" />;
      case 'payment': return <DollarSign className="w-4 h-4" />;
      case 'system': return <Activity className="w-4 h-4" />;
      case 'alert': return <Clock className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-base-orange to-orange-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, Admin! 👋
            </h1>
            <p className="text-orange-100 text-lg">
              Here's what's happening with your dashboard today.
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <Chip color="default" variant="flat" className="text-base-orange">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Chip>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Charts and Activity Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="xl:col-span-2">
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`p-2 rounded-full bg-${getStatusColor(activity.status)}-100`}>
                      {getStatusIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                    <Chip 
                      color={getStatusColor(activity.status) as any} 
                      variant="flat" 
                      size="sm"
                    >
                      {activity.type}
                    </Chip>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* Progress Card */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">CPU Usage</span>
                  <span className="font-medium text-gray-900">68%</span>
                </div>
                <Progress 
                  value={68} 
                  color="primary" 
                  className="h-2"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Memory</span>
                  <span className="font-medium text-gray-900">45%</span>
                </div>
                <Progress 
                  value={45} 
                  color="success" 
                  className="h-2"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Storage</span>
                  <span className="font-medium text-gray-900">82%</span>
                </div>
                <Progress 
                  value={82} 
                  color="warning" 
                  className="h-2"
                />
              </div>
            </CardBody>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Add New User</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Generate Report</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900">System Settings</span>
                  </div>
                </button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
