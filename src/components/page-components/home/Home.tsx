import { Card, CardBody, CardHeader } from "@heroui/react";

export default function Home() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-semibold text-base-darkGray">
          Welcome to Dashboard
        </h1>
        <p className="text-muted-foreground mt-2 text-base-darkGray">
          Here's what's happening with your account today.
        </p>
      </div>

      <Card className="my-2  !rounded-base">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium">Total Users</p>
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold">2,350</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardBody>
      </Card>

      <Card className="my-2  !rounded-base">
        <CardHeader>
          <p>Recent Activity</p>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New user registered</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Payment processed successfully
                </p>
                <p className="text-xs text-muted-foreground">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">System backup completed</p>
                <p className="text-xs text-muted-foreground">10 minutes ago</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
