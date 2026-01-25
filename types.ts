
export interface UserStats {
  usedTraffic: number; // in GB
  totalTraffic: number; // in GB
  expiryDate: string;
  status: 'active' | 'expired' | 'suspended';
  subscriptionLink: string;
}

export interface ServerNode {
  id: string;
  name: string;
  location: string;
  countryCode: string;
  load: number; // 0-100
  ping: number; // ms
  protocol: 'VLESS' | 'Trojan' | 'Shadowsocks';
  isOnline: boolean;
}

export type ViewState = 'dashboard' | 'profile';
