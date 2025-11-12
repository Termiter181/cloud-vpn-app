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
  const [selectedCountry, setSelectedCountry] = useState(countries[3]);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleToggleConnection = () => {
    if (isConnected) {
      setIsConnected(false);
    } else {
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnected(true);
        setIsConnecting(false);
      }, 1500);
    }
  };

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Cloud VPN
          </h1>
          <p className="text-xl text-gray-600">Sua privacidade protegida na nuvem</p>
        </header>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg border border-blue-200">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex-1 w-full">
                <label className="block text-sm font-semibold text-gray-600 mb-3">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Escolha o Servidor
                </label>
                <select
                  value={selectedCountry.code}
                  onChange={handleCountryChange}
                  disabled={isConnecting}
                  className="w-full p-4 text-lg bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col items-center">
                <button
                  onClick={handleToggleConnection}
                  disabled={isConnecting}
                  className={`h-14 px-8 text-lg font-bold rounded-xl transition-all duration-500 ${
                    isConnected
                      ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-300'
                      : 'bg-gradient-to-r from-green-500 to-blue-500 hover:shadow-lg hover:shadow-blue-300'
                  } ${isConnecting ? 'animate-pulse' : ''} text-white`}
                >
                  <Power className="w-6 h-6 mr-2 inline" />
                  {isConnecting ? 'Conectando...' : isConnected ? 'Desconectar' : 'Conectar VPN'}
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                isConnected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                }`} />
                <span className="font-semibold">
                  {isConnected ? `Conectado - ${selectedCountry.flag} ${selectedCountry.name}` : 'Desconectado'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <div className={`w-40 h-40 rounded-2xl bg-white shadow-lg flex items-center justify-center mx-auto ${
                !isConnected ? 'ring-4 ring-red-200' : ''
              }`}>
                <MonitorSmartphone className="w-16 h-16 text-blue-500" />
              </div>
              <p className="mt-4 text-gray-600">Seu dispositivo</p>
            </div>

            <div className="text-center">
              <div className={`w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-2xl flex items-center justify-center mx-auto ${
                isConnected ? 'scale-110 shadow-blue-400' : ''
              }`}>
                <Cloud className="w-20 h-20 text-white" />
              </div>
              <p className="mt-4 text-gray-600">Cloud VPN</p>
            </div>

            <div className="text-center">
              <div className={`w-40 h-40 rounded-2xl bg-white shadow-lg flex items-center justify-center mx-auto ${
                isConnected ? 'ring-4 ring-green-200' : ''
              }`}>
                <Wifi className="w-16 h-16 text-green-500" />
              </div>
              <p className="mt-4 text-gray-600">Internet Protegida</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
