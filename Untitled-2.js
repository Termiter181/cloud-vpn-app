import { useState } from "react";
import { Lock, Shield, Wifi, Cloud, MonitorSmartphone, Eye, EyeOff, Power, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Country {
  code: string;
  name: string;
  flag: string;
  ip: string;
}

const countries: Country[] = [
  { code: "US", name: "Estados Unidos", flag: "🇺🇸", ip: "149.40.62.54" },
  { code: "UK", name: "Reino Unido", flag: "🇬🇧", ip: "84.233.10.45" },
  { code: "JP", name: "Japão", flag: "🇯🇵", ip: "43.206.91.127" },
  { code: "BR", name: "Brasil", flag: "🇧🇷", ip: "177.54.144.89" },
  { code: "DE", name: "Alemanha", flag: "🇩🇪", ip: "46.101.198.76" },
  { code: "FR", name: "França", flag: "🇫🇷", ip: "51.178.42.135" },
  { code: "CA", name: "Canadá", flag: "🇨🇦", ip: "142.93.165.201" },
  { code: "AU", name: "Austrália", flag: "🇦🇺", ip: "13.211.45.198" },
];

const VPNDiagram = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [showDataFlow, setShowDataFlow] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[1]);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleToggleConnection = () => {
    if (isConnected) {
      // Desconectar
      setShowDataFlow(false);
      setTimeout(() => {
        setIsConnected(false);
      }, 300);
    } else {
      // Conectar
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnected(true);
        setShowDataFlow(true);
        setIsConnecting(false);
      }, 1500);
    }
  };

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      // Se já está conectado, reconecta com novo país
      if (isConnected) {
        setShowDataFlow(false);
        setTimeout(() => {
          setSelectedCountry(country);
          setShowDataFlow(true);
        }, 500);
      } else {
        setSelectedCountry(country);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Glossy background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 via-primary/10 to-primary-dark/20" />
      
      {/* Subtle flag backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {countries.map((country, i) => (
          <div
            key={country.code}
            className="absolute text-[200px] opacity-[0.02] animate-float select-none"
            style={{
              left: `${(i * 15) % 90}%`,
              top: `${(i * 20) % 80}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${15 + i * 2}s`,
            }}
          >
            {country.flag}
          </div>
        ))}
      </div>
      
      {/* Floating bubbles effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full backdrop-blur-sm animate-float"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, hsl(var(--primary) / ${Math.random() * 0.15 + 0.05}), transparent)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-vpn-secure/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-light/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header with Cloud VPN branding */}
        <header className="text-center mb-16">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <h1 className="relative text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-primary-light via-primary to-primary-dark bg-clip-text text-transparent drop-shadow-lg">
              Cloud VPN
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-foreground/80 font-medium">
            Sua privacidade protegida na nuvem
          </p>
        </header>

        {/* Control Panel */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl shadow-glossy border border-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {/* Country Selector */}
              <div className="flex-1 w-full md:w-auto">
                <label className="block text-sm font-semibold text-muted-foreground mb-3">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Escolha o Servidor
                </label>
                <Select
                  value={selectedCountry.code}
                  onValueChange={handleCountryChange}
                  disabled={isConnecting}
                >
                  <SelectTrigger className="w-full md:w-[280px] h-14 text-lg bg-background/50 backdrop-blur">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code} className="text-lg py-3">
                        <span className="text-2xl mr-3">{country.flag}</span>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Connect Button */}
              <div className="flex flex-col items-center">
                <label className="block text-sm font-semibold text-muted-foreground mb-3 md:invisible">
                  Ação
                </label>
                <Button
                  onClick={handleToggleConnection}
                  disabled={isConnecting}
                  size="lg"
                  className={`h-14 px-8 text-lg font-bold transition-all duration-500 ${
                    isConnected
                      ? 'bg-destructive hover:bg-destructive/90 shadow-lg shadow-destructive/30'
                      : 'bg-gradient-to-r from-vpn-secure to-primary hover:shadow-lg hover:shadow-primary/40'
                  } ${isConnecting ? 'animate-pulse' : ''}`}
                >
                  <Power className={`w-6 h-6 mr-2 transition-transform duration-500 ${isConnected ? 'rotate-180' : ''}`} />
                  {isConnecting ? 'Conectando...' : isConnected ? 'Desconectar' : 'Conectar VPN'}
                </Button>
              </div>
            </div>

            {/* Connection Status */}
            <div className="mt-6 text-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 ${
                isConnected 
                  ? 'bg-vpn-secure/20 text-vpn-secure' 
                  : 'bg-muted/50 text-muted-foreground'
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  isConnected ? 'bg-vpn-secure animate-pulse' : 'bg-muted-foreground'
                }`} />
                <span className="font-semibold">
                  {isConnecting ? 'Estabelecendo conexão segura...' : isConnected ? `Conectado - ${selectedCountry.flag} ${selectedCountry.name}` : 'Desconectado'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main VPN Diagram */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* User Device - Before VPN */}
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                <div className={`relative w-48 h-48 rounded-3xl bg-gradient-to-br from-card to-card/80 backdrop-blur-xl shadow-glossy flex items-center justify-center transition-all duration-1000 ${!isConnected ? 'ring-4 ring-destructive/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'shadow-[0_0_20px_rgba(59,130,246,0.2)]'}`}>
                  <MonitorSmartphone className="w-24 h-24 text-primary drop-shadow-lg" />
                  {!isConnected && (
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-destructive/20 backdrop-blur flex items-center justify-center shadow-lg animate-pulse">
                      <EyeOff className="w-8 h-8 text-destructive drop-shadow-lg" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center space-y-3">
                <div className={`inline-block px-6 py-3 rounded-2xl backdrop-blur-xl transition-all duration-1000 ${!isConnected ? 'bg-destructive/20 shadow-lg' : 'bg-muted/50'}`}>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">IP Público</p>
                  <p className={`text-2xl font-bold font-mono transition-all duration-1000 ${!isConnected ? 'text-destructive' : 'text-foreground/50'}`}>
                    192.168.0.12
                  </p>
                </div>
                <p className={`text-sm font-medium transition-all duration-1000 ${!isConnected ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {!isConnected ? '⚠️ Não Protegido' : '✓ Conexão Original'}
                </p>
              </div>
            </div>

            {/* VPN Tunnel - Center */}
            <div className="relative flex flex-col items-center">
              {/* Animated data flow */}
              {showDataFlow && (
                <>
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-transparent via-primary to-transparent animate-data-flow" />
                  </div>
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-4 h-4 rounded-full bg-vpn-glow shadow-lg animate-bubble-flow"
                      style={{
                        left: `${10 + i * 12}%`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  ))}
                </>
              )}

              {/* VPN Cloud */}
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-light/20 via-primary/20 to-primary-dark/20 blur-2xl rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className={`relative w-64 h-64 rounded-full bg-gradient-to-br from-primary-light/90 via-primary/90 to-primary-dark/90 backdrop-blur-xl shadow-float flex flex-col items-center justify-center transition-all duration-1000 ${isConnected ? 'scale-110 shadow-[0_0_60px_rgba(59,130,246,0.5)]' : 'scale-100'}`}>
                  <Cloud className="w-32 h-32 text-white mb-4 drop-shadow-2xl" />
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">Cloud VPN</h3>
                    <div className={`flex items-center justify-center space-x-2 transition-all duration-1000 ${isConnected ? 'opacity-100' : 'opacity-0'}`}>
                      <Shield className="w-6 h-6 text-vpn-secure animate-pulse drop-shadow-lg" />
                      <span className="text-white font-semibold drop-shadow-md">Criptografado</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security badges */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-vpn-secure/20 backdrop-blur-xl shadow-lg">
                  <Lock className="w-5 h-5 text-vpn-secure" />
                  <span className="text-sm font-semibold text-foreground">Túnel Seguro</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-xl shadow-lg">
                  <Eye className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">100% Privado</span>
                </div>
              </div>
            </div>

            {/* Connected Device - After VPN */}
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-vpn-secure/20 blur-2xl rounded-full animate-pulse" />
                <div className={`relative w-48 h-48 rounded-3xl bg-gradient-to-br from-card to-card/80 backdrop-blur-xl shadow-glossy flex items-center justify-center transition-all duration-1000 ${isConnected ? 'ring-4 ring-vpn-secure/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'shadow-[0_0_20px_rgba(100,116,139,0.2)]'}`}>
                  <Wifi className="w-24 h-24 text-vpn-secure drop-shadow-lg" />
                  {isConnected && (
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-vpn-secure/20 backdrop-blur flex items-center justify-center shadow-lg animate-pulse">
                      <Shield className="w-8 h-8 text-vpn-secure drop-shadow-lg" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center space-y-3">
                <div className={`inline-block px-6 py-3 rounded-2xl backdrop-blur-xl transition-all duration-1000 ${isConnected ? 'bg-vpn-secure/20 shadow-lg' : 'bg-muted/50'}`}>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">IP Protegido</p>
                  <p className={`text-2xl font-bold font-mono transition-all duration-1000 ${isConnected ? 'text-vpn-secure' : 'text-foreground/50'}`}>
                    {isConnected ? selectedCountry.ip : '---.---.--.--'}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className={`text-sm font-medium transition-all duration-1000 ${isConnected ? 'text-vpn-secure' : 'text-muted-foreground'}`}>
                    {isConnected ? '🛡️ Totalmente Protegido' : '○ Aguardando...'}
                  </p>
                  {isConnected && (
                    <p className="text-xs text-muted-foreground">
                      <span className="text-2xl mr-1">{selectedCountry.flag}</span>
                      {selectedCountry.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Educational Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="group p-6 rounded-3xl bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl shadow-glossy hover:shadow-float transition-all duration-500 border border-primary/20">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Criptografia Total</h3>
              <p className="text-muted-foreground">
                Todos os seus dados passam por um túnel criptografado, impossível de interceptar.
              </p>
            </div>

            <div className="group p-6 rounded-3xl bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl shadow-glossy hover:shadow-float transition-all duration-500 border border-primary/20">
              <div className="w-16 h-16 rounded-2xl bg-vpn-secure/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <Shield className="w-8 h-8 text-vpn-secure" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">IP Anônimo</h3>
              <p className="text-muted-foreground">
                Seu IP real fica oculto, e você navega com um IP diferente e seguro.
              </p>
            </div>

            <div className="group p-6 rounded-3xl bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl shadow-glossy hover:shadow-float transition-all duration-500 border border-primary/20">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <Eye className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Zero Rastreamento</h3>
              <p className="text-muted-foreground">
                Nenhum site ou provedor consegue rastrear sua atividade online.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VPNDiagram;