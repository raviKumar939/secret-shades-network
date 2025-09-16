import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Activity, Shield, Eye } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Overview of your private social network activity and connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-surface-dark border-muted/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Connections</CardTitle>
                <Users className="h-4 w-4 text-cyber-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">23</div>
                <p className="text-xs text-muted-foreground">
                  +3 from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-surface-dark border-muted/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Groups</CardTitle>
                <Shield className="h-4 w-4 text-electric-purple" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">8</div>
                <p className="text-xs text-muted-foreground">
                  2 private, 6 public
                </p>
              </CardContent>
            </Card>

            <Card className="bg-surface-dark border-muted/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Privacy Score</CardTitle>
                <Eye className="h-4 w-4 text-neon-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neon-green">92%</div>
                <p className="text-xs text-muted-foreground">
                  Excellent privacy
                </p>
              </CardContent>
            </Card>

            <Card className="bg-surface-dark border-muted/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                <Activity className="h-4 w-4 text-cyber-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">12</div>
                <p className="text-xs text-muted-foreground">
                  Last 7 days
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-surface-dark border-muted/20">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Connections</CardTitle>
                <CardDescription>Your latest network additions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Alice.eth", status: "verified", time: "2 hours ago" },
                    { name: "Bob.ens", status: "pending", time: "1 day ago" },
                    { name: "Carol.crypto", status: "verified", time: "3 days ago" }
                  ].map((connection, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-primary rounded-full" />
                        <div>
                          <p className="font-medium text-foreground">{connection.name}</p>
                          <p className="text-xs text-muted-foreground">{connection.time}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={connection.status === "verified" ? "default" : "secondary"}
                        className={connection.status === "verified" ? "bg-neon-green/20 text-neon-green" : ""}
                      >
                        {connection.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-surface-dark border-muted/20">
              <CardHeader>
                <CardTitle className="text-foreground">Privacy Alerts</CardTitle>
                <CardDescription>Recent privacy-related notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-cyber-blue/10 rounded-lg border border-cyber-blue/20">
                    <p className="text-sm font-medium text-foreground">New connection request</p>
                    <p className="text-xs text-muted-foreground">Someone wants to connect with you</p>
                  </div>
                  <div className="p-3 bg-electric-purple/10 rounded-lg border border-electric-purple/20">
                    <p className="text-sm font-medium text-foreground">Privacy policy updated</p>
                    <p className="text-xs text-muted-foreground">Review your privacy settings</p>
                  </div>
                  <div className="p-3 bg-neon-green/10 rounded-lg border border-neon-green/20">
                    <p className="text-sm font-medium text-foreground">Encryption key rotated</p>
                    <p className="text-xs text-muted-foreground">Your data is now more secure</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;