
export interface UserStats {
  usedTraffic: number; // в ГБ
  totalTraffic: number; // в ГБ
  expiryDate: string; // Формат: DD.MM.YYYY
  status: 'active' | 'expired' | 'suspended';
  subscriptionLink: string;
  // Технические детали, распарсенные из подписки
  details?: {
    address: string;
    port: string;
    uuid: string;
    security: string;
    sni: string;
    type: string;
    serviceName?: string;
  };
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
