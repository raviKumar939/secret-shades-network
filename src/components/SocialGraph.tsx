import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Eye, EyeOff, Lock, Globe } from "lucide-react";

interface Connection {
  id: string;
  name: string;
  isVisible: boolean;
  mutualConnections: number;
  groups: string[];
}

const mockConnections: Connection[] = [
  {
    id: "1",
    name: "Alice.eth",
    isVisible: true,
    mutualConnections: 12,
    groups: ["Crypto", "Privacy Advocates"]
  },
  {
    id: "2", 
    name: "Bob.lens",
    isVisible: false,
    mutualConnections: 8,
    groups: ["Web3 Builders"]
  },
  {
    id: "3",
    name: "Charlie.ens",
    isVisible: true,
    mutualConnections: 15,
    groups: ["DeFi", "Privacy Advocates"]
  }
];

const SocialGraph = () => {
  const [connections, setConnections] = useState(mockConnections);

  const toggleVisibility = (id: string) => {
    setConnections(prev => 
      prev.map(conn => 
        conn.id === id ? { ...conn, isVisible: !conn.isVisible } : conn
      )
    );
  };

  const visibleConnections = connections.filter(c => c.isVisible).length;
  const totalConnections = connections.length;

  return (
    <div className="space-y-6">
      <Card className="p-6 gradient-surface border border-cyber-blue/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Your Network</h2>
              <p className="text-sm text-muted-foreground">
                {visibleConnections}/{totalConnections} connections visible
              </p>
            </div>
          </div>
          
          <Badge variant="outline" className="border-neon-green text-neon-green">
            <Lock className="w-3 h-3 mr-1" />
            Encrypted
          </Badge>
        </div>

        <div className="grid gap-4">
          {connections.map((connection) => (
            <div key={connection.id} className="p-4 bg-surface-dark rounded-lg border border-muted/20">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-foreground">{connection.name}</h3>
                    <Badge variant={connection.isVisible ? "default" : "secondary"} className="text-xs">
                      {connection.isVisible ? (
                        <><Globe className="w-2 h-2 mr-1" /> Public</>
                      ) : (
                        <><Lock className="w-2 h-2 mr-1" /> Private</>
                      )}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {connection.mutualConnections} mutual connections
                  </p>
                  
                  <div className="flex gap-1 flex-wrap">
                    {connection.groups.map((group, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-electric-purple/50">
                        {group}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleVisibility(connection.id)}
                  className="ml-3 hover:bg-cyber-blue/10"
                >
                  {connection.isVisible ? (
                    <Eye className="w-4 h-4 text-cyber-blue" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SocialGraph;