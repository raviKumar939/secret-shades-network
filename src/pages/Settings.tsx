import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Shield, Key, Bell, User, Trash2 } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Settings
            </h1>
            <p className="text-lg text-muted-foreground">
              Configure your account, security, and privacy preferences.
            </p>
          </div>

          <div className="space-y-6">
            {/* Account Settings */}
            <Card className="bg-surface-dark border-muted/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-cyber-blue" />
                  <CardTitle className="text-foreground">Account Settings</CardTitle>
                </div>
                <CardDescription>Manage your profile and account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Enter your username" className="bg-background border-muted/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" placeholder="Tell others about yourself" className="bg-background border-muted/20" />
                </div>
                <Button className="gradient-primary">Save Changes</Button>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-surface-dark border-muted/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-electric-purple" />
                  <CardTitle className="text-foreground">Security & Privacy</CardTitle>
                </div>
                <CardDescription>Configure your security and privacy options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <Separator className="bg-muted/20" />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Auto-lock Wallet</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically disconnect wallet after inactivity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator className="bg-muted/20" />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Anonymous Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Hide your identity from other users
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-surface-dark border-muted/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-neon-green" />
                  <CardTitle className="text-foreground">Notifications</CardTitle>
                </div>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Connection Requests</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when someone wants to connect
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator className="bg-muted/20" />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Privacy Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Alerts about privacy-related events
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator className="bg-muted/20" />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Group Invitations</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications for group invitations
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Advanced Settings */}
            <Card className="bg-surface-dark border-muted/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-cyber-blue" />
                  <CardTitle className="text-foreground">Advanced</CardTitle>
                </div>
                <CardDescription>Advanced configuration and data management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Export Data</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Download all your data in an encrypted format
                  </p>
                  <Button variant="outline" className="border-cyber-blue/50 hover:bg-cyber-blue/10">
                    Export My Data
                  </Button>
                </div>
                
                <Separator className="bg-muted/20" />
                
                <div className="space-y-2">
                  <Label>Reset Encryption Keys</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Generate new encryption keys for enhanced security
                  </p>
                  <Button variant="outline" className="border-electric-purple/50 hover:bg-electric-purple/10">
                    Reset Keys
                  </Button>
                </div>
                
                <Separator className="bg-muted/20" />
                
                <div className="space-y-2">
                  <Label className="text-destructive flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Danger Zone
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Permanently delete your account and all associated data
                  </p>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;