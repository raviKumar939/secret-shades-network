import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WalletConnect from "@/components/WalletConnect";
import { ArrowRight, Network, Eye, Users, Zap } from "lucide-react";
import heroNetwork from "@/assets/hero-network.jpg";

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroNetwork})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/70" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-6 bg-electric-purple/20 border-electric-purple/30 text-electric-purple animate-pulse-glow">
            <Network className="w-3 h-3 mr-1" />
            Privacy-First Web3 Social
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
            Your Network,<br />
            <span className="gradient-primary bg-clip-text text-transparent">Your Privacy</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect, share, and build communities with complete control over your social graph. 
            End-to-end encrypted connections that only you can decrypt.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="gradient-primary hover:shadow-glow transition-smooth text-lg px-8 py-6"
              onClick={() => document.getElementById('wallet-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-cyber-blue/50 hover:bg-cyber-blue/10 text-lg px-8 py-6"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-surface-dark rounded-xl border border-muted/20">
              <Eye className="w-8 h-8 text-cyber-blue mb-3" />
              <h3 className="font-semibold mb-2">Selective Visibility</h3>
              <p className="text-sm text-muted-foreground">Choose exactly who can see your connections</p>
            </div>
            <div className="p-6 bg-surface-dark rounded-xl border border-muted/20">
              <Network className="w-8 h-8 text-electric-purple mb-3" />
              <h3 className="font-semibold mb-2">Encrypted by Default</h3>
              <p className="text-sm text-muted-foreground">All data encrypted with your wallet key</p>
            </div>
            <div className="p-6 bg-surface-dark rounded-xl border border-muted/20">
              <Zap className="w-8 h-8 text-neon-green mb-3" />
              <h3 className="font-semibold mb-2">Web3 Native</h3>
              <p className="text-sm text-muted-foreground">Built for the decentralized future</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wallet Connection Section */}
      <section id="wallet-section" className="py-20 bg-gradient-to-br from-surface-darker to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Connect Your Identity
              </h2>
              <p className="text-lg text-muted-foreground">
                Your wallet is your identity. Connect to start building your private social graph.
              </p>
            </div>
            <WalletConnect />
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-background to-surface-darker">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-electric-purple/20 text-electric-purple border-electric-purple/30">
              <Users className="w-3 h-3 mr-1" />
              Privacy Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Built for Privacy, Designed for Connection
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Every feature is designed with privacy-first principles, giving you complete control 
              over your social data and digital identity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Zero-Knowledge Proofs",
                description: "Prove connections without revealing the actual network structure",
                icon: Network,
                color: "cyber-blue"
              },
              {
                title: "Selective Disclosure", 
                description: "Share specific parts of your network with granular control",
                icon: Eye,
                color: "electric-purple"
              },
              {
                title: "Encrypted Groups",
                description: "Join communities with complete membership privacy",
                icon: Users,
                color: "neon-green"
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="p-6 bg-surface-dark rounded-xl border border-muted/20 hover:shadow-glow transition-smooth">
                  <div className={`w-12 h-12 bg-${feature.color}/20 rounded-xl flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-6 h-6 text-${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-muted/20 bg-surface-darker">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Network className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">PrivateGraph</span>
          </div>
          <p className="text-muted-foreground">
            Your network, your privacy, your control.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;