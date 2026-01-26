
import React from 'react';
import { UserStats } from './types';

export const MOCK_USER: UserStats = {
  usedTraffic: 42.5,
  totalTraffic: 100,
  expiryDate: '31.12.2024',
  status: 'active',
  subscriptionLink: 'vless://789-abc-def@server.remnawave.io:443?security=reality&sni=google.com&fp=chrome&type=grpc&serviceName=grpc#Premium-Global'
};

export const ICONS = {
  WhaleLogo: (props: any) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path 
        d="M50 56.5C53.5 45.5 65.5 42.5 83.5 32.5C92.5 27.5 95.5 29.5 90.5 29.5C75.5 29.5 60.5 42.5 50 56.5ZM50 56.5C46.5 45.5 34.5 42.5 16.5 32.5C7.5 27.5 4.5 29.5 9.5 29.5C24.5 29.5 39.5 42.5 50 56.5ZM50 60.5C53.5 71.5 65.5 74.5 83.5 84.5C92.5 89.5 95.5 87.5 90.5 87.5C75.5 87.5 60.5 74.5 50 60.5ZM50 60.5C46.5 71.5 34.5 74.5 16.5 84.5C7.5 89.5 4.5 87.5 9.5 87.5C24.5 87.5 39.5 74.5 50 60.5Z" 
        fill="currentColor"
        transform="translate(0, -15)"
      />
      <path 
        d="M50 55C55 45 70 42 90 28C95 25 90 28 80 30C65 33 55 45 50 55Z" 
        fill="currentColor" 
        className="opacity-80"
      />
      <path 
        d="M50 55C45 45 30 42 10 28C5 25 10 28 20 30C35 33 45 45 50 55Z" 
        fill="currentColor" 
        className="opacity-80"
      />
      <path 
        d="M50 60C55 70 70 73 90 85C95 88 90 85 80 83C65 80 55 70 50 60Z" 
        fill="currentColor"
      />
      <path 
        d="M50 60C45 70 30 73 10 85C5 88 10 85 20 83C35 80 45 70 50 60Z" 
        fill="currentColor"
      />
    </svg>
  ),
  Dashboard: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
  ),
  Profile: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Copy: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
  )
};