'use client'
import React, { useState } from 'react';
import { Lock, Shield, Wifi, Cloud, MonitorSmartphone, Eye, EyeOff, Power, Globe } from 'lucide-react';

const countries = [
  { code: "US", name: "Estados Unidos", flag: "🇺🇸", ip: "149.48.62.54" },
  { code: "UK", name: "Reino Unido", flag: "🇬🇧", ip: "84.233.18.45" },
  { code: "JP", name: "Japão", flag: "🇯🇵", ip: "43.286.91.127" },
  { code: "BR", name: "Brasil", flag: "🇧🇷", ip: "177.54.144.89" },
  { code: "DE", name: "Alemanha", flag: "🇩🇪", ip: "46.181.198.76" },
  { code: "FR", name: "França", flag: "🇫🇷", ip: "51.178.42.135" },
  { code: "CA", name: "Canadá", flag: "🇨🇦", ip: "142.93.165.201" },
  { code: "AU", name: "Austrália", flag: "🇦🇺", ip: "13.211.45.198" },
];

export default function VPNPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [showDataFlow, setShowDataFlow] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[3]);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleToggleConnection = () => {
    if (isConnected) {
      setShowDataFlow(false);
      setTimeout(() => setIsConnected(false), 300);
    } else {
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnected(true);
        setShowDataFlow(true);
        setIsConnecting(false);
      }, 1500);
    }
  };

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    const country = countries.find(c => c.code === countryCode);
    if (country) {
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
      {/* Glossy background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/10 to-blue-600/20" />
      
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
              background: `radial-gradient(circle, rgba(59, 130, 246, ${Math.random() * 0.15 + 0.05}), transparent)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header with Cloud VPN branding */}
        <header className="text-center mb-16">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
            <h1 className="relative text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 bg-clip-text text-transparent drop-shadow-lg">
              Cloud VPN
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/80 font-medium">
            Sua privacidade protegida na nuvem
          </p>
        </header>

        {/* Control Panel */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl shadow-2xl border border-blue-300/20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {/* Country Selector */}
              <div className="flex-1 w-full md:w-auto">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Escolha o Servidor
                </label>
                <select
                  value={selectedCountry.code}
                  onChange={handleCountryChange}
                  disabled={isConnecting}
                  className="w-full md:w-[280px] h-14 text-lg bg-white/50 backdrop-blur border border-gray-300 rounded-xl px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      <span className="text-2xl mr-3">{country.flag}</span>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Connect Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={handleToggleConnection}
                  disabled={isConnecting}
                  className={`h-14 px-8 text-lg font-bold rounded-xl transition-all duration-500 ${
                    isConnected
                      ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-400/30'
                      : 'bg-gradient-to-r from-green-500 to-blue-500 hover:shadow-lg hover:shadow-blue-500/40'
                  } ${isConnecting ? 'animate-pulse' : ''} text-white`}
                >
                  <Power className={`w-6 h-6 mr-2 transition-transform duration-500 ${isConnected ? 'rotate-180' : ''}`} />
                  {isConnecting ? 'Conectando...' : isConnected ? 'Desconectar' : 'Conectar VPN'}
                </button>
              </div>
            </div>

            {/* Connection Status */}
            <div className="mt-6 text-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 ${
                isConnected 
                  ? 'bg-green-500/20 text-green-600' 
                  : 'bg-gray-500/50 text-gray-600'
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
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
                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse" />
                <div className={`relative w-48 h-48 rounded-3xl bg-gradient-to-br from-white to-white/80 backdrop-blur-xl shadow-2xl flex items-center justify-center transition-all duration-1000 ${
                  !isConnected ? 'ring-4 ring-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                }`}>
                  <MonitorSmartphone className="w-24 h-24 text-blue-500 drop-shadow-lg" />
                  {!isConnected && (
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-red-500/20 backdrop-blur flex items-center justify-center shadow-lg animate-pulse">
                      <EyeOff className="w-8 h-8 text-red-500 drop-shadow-lg" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center space-y-3">
                <div className={`inline-block px-6 py-3 rounded-2xl backdrop-blur-xl transition-all duration-1000 ${
                  !isConnected ? 'bg-red-500/20 shadow-lg' : 'bg-gray-500/50'
                }`}>
                  <p className="text-sm font-semibold text-gray-700 mb-1">IP Público</p>
                  <p className={`text-2xl font-bold font-mono transition-all duration-1000 ${
                    !isConnected ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    192.168.0.12
                  </p>
                </div>
                <p className={`text-sm font-medium transition-all duration-1000 ${
                  !isConnected ? 'text-red-600' : 'text-gray-600'
                }`}>
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
                    <div className="h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" />
                  </div>
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-4 h-4 rounded-full bg-blue-400 shadow-lg animate-pulse"
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
                <div className="absolute inset-0 bg-blue-500/30 blur-3xl rounded-full animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 via-blue-500/20 to-blue-700/20 blur-2xl rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className={`relative w-64 h-64 rounded-full bg-gradient-to-br from-blue-400/90 via-blue-500/90 to-blue-600/90 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center transition-all duration-1000 ${
                  isConnected ? 'scale-110 shadow-[0_0_60px_rgba(59,130,246,0.5)]' : 'scale-100'
                }`}>
                  <Cloud className="w-32 h-32 text-white mb-4 drop-shadow-2xl" />
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">Cloud VPN</h3>
                    <div className={`flex items-center justify-center space-x-2 transition-all duration-1000 ${isConnected ? 'opacity-100' : 'opacity-0'}`}>
                      <Shield className="w-6 h-6 text-green-300 animate-pulse drop-shadow-lg" />
                      <span className="text-white font-semibold drop-shadow-md">Criptografado</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security badges */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 backdrop-blur-xl shadow-lg">
                  <Lock className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-gray-800">Túnel Seguro</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-xl shadow-lg">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-800">100% Privado</span>
                </div>
              </div>
            </div>

            {/* Connected Device - After VPN */}
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full animate-pulse" />
                <div className={`relative w-48 h-48 rounded-3xl bg-gradient-to-br from-white to-white/80 backdrop-blur-xl shadow-2xl flex items-center justify-center transition-all duration-1000 ${
                  isConnected ? 'ring-4 ring-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'shadow-[0_0_20px_rgba(100,116,139,0.2)]'
                }`}>
                  <Wifi className="w-24 h-24 text-green-500 drop-shadow-lg" />
                  {isConnected && (
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-green-500/20 backdrop-blur flex items-center justify-center shadow-lg animate-pulse">
                      <Shield className="w-8 h-8 text-green-500 drop-shadow-lg" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center space-y-3">
                <div className={`inline-block px-6 py-3 rounded-2xl backdrop-blur-xl transition-all duration-1000 ${
                  isConnected ? 'bg-green-500/20 shadow-lg' : 'bg-gray-500/50'
                }`}>
                  <p className="text-sm font-semibold text-gray-700 mb-1">IP Protegido</p>
                  <p className={`text-2xl font-bold font-mono transition-all duration-1000 ${
                    isConnected ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {isConnected ? selectedCountry.ip : '---.---.--.--'}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className={`text-sm font-medium transition-all duration-1000 ${
                    isConnected ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {isConnected ? '🛡️ Totalmente Protegido' : '○ Aguardando...'}
                  </p>
                  {isConnected && (
                    <p className="text-xs text-gray-600">
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
            <div className="group p-6 rounded-3xl bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-blue-300/20">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Criptografia Total</h3>
              <p className="text-gray-600">
                Todos os seus dados passam por um túnel criptografado, impossível de interceptar.
              </p>
            </div>

            <div className="group p-6 rounded-3xl bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-green-300/20">
              <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">IP Anônimo</h3>
              <p className="text-gray-600">
                Seu IP real fica oculto, e você navega com um IP diferente e seguro.
              </p>
            </div>

            <div className="group p-6 rounded-3xl bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-purple-300/20">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Zero Rastreamento</h3>
              <p className="text-gray-600">
                Nenhum site ou provedor consegue rastrear sua atividade online.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
