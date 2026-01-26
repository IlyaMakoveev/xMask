
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
    <svg 
      viewBox="0 0 1000 1000" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={props.className}
      style={{ display: 'block' }}
    >
      <path 
        d="M499.634 365.176C499.634 365.176 468.851 315.921 436.977 302.853C363.63 272.782 313.668 307.307 235.543 301.19C186.84 297.377 66.25 288.933 66.25 288.933C66.25 288.933 129.145 395.319 189.687 425.779C259.873 461.091 328.396 429.183 388.389 425.295C425.743 422.874 460.073 560.082 460.073 560.082C460.073 560.082 328.429 630.584 152.105 568.421C152.105 568.421 225.67 685.27 269.504 703.344C362.83 741.826 500.567 666.663 500.567 666.663C500.567 666.663 639.057 740.972 732.143 701.913C775.864 683.568 848.703 566.265 848.703 566.265C672.767 629.518 540.689 559.833 540.689 559.833C540.689 559.833 574.169 422.414 611.538 424.604C671.554 428.12 740.273 459.602 810.239 423.857C870.591 393.023 932.825 286.25 932.825 286.25C932.825 286.25 812.291 295.441 763.613 299.555C685.527 306.155 635.351 271.941 562.192 302.465C530.4 315.73 499.634 365.176 499.634 365.176Z" 
        fill="url(#whaleGradient)"
      />
      <defs>
        <linearGradient id="whaleGradient" x1="422.362" y1="702.338" x2="484.343" y2="264.573" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00A6FF"/>
          <stop offset="1" stopColor="#67C2F2"/>
        </linearGradient>
      </defs>
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
