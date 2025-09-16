import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Users, Bell, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PrivacySetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: React.ElementType;
}

const PrivacyControls = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<PrivacySetting[]>([
    {
      id: "default-private",
      title: "Default to Private",
      description: "New connections are hidden by default",
      enabled: true,
      icon: Shield
    },
    {
      id: "public-visibility",
      title: "Allow Public Discovery",
      description: "Others can find you through mutual connections",
      enabled: false,
      icon: Eye
    },
    {
      id: "group-recommendations",
      title: "Group Recommendations",
      description: "Suggest groups based on encrypted network analysis",
      enabled: true,
      icon: Users
    },
    {
      id: "connection-notifications",
      title: "Connection Notifications",
      description: "Get notified about new connection requests",
      enabled: true,
      icon: Bell
    }
  ]);

  const toggleSetting = (id: string) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
    
    toast({
      title: "Privacy Setting Updated",
      description: "Your preferences have been saved securely.",
    });
  };

  return (
    <Card className="p-6 gradient-surface border border-electric-purple/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
          <Settings className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Privacy Controls</h2>
          <p className="text-sm text-muted-foreground">
            Manage your network visibility and data sharing
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {settings.map((setting) => {
          const IconComponent = setting.icon;
          
          return (
            <div key={setting.id} className="p-4 bg-surface-dark rounded-lg border border-muted/20">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-8 h-8 bg-muted/20 rounded-lg flex items-center justify-center mt-1">
                    <IconComponent className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">{setting.title}</h3>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                </div>
                
                <Switch
                  checked={setting.enabled}
                  onCheckedChange={() => toggleSetting(setting.id)}
                  className="data-[state=checked]:bg-cyber-blue"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-surface-darker rounded-lg border border-neon-green/20">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-neon-green mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">End-to-End Encryption</h4>
            <p className="text-sm text-muted-foreground">
              All your connection data is encrypted with your wallet's private key. 
              Only you can decrypt and view your complete social graph.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PrivacyControls;