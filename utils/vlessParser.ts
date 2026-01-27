
export const parseVless = (url: string) => {
  try {
    if (!url.startsWith('vless://')) return null;
    
    const [main, hash] = url.split('#');
    const name = hash ? decodeURIComponent(hash) : 'Unknown';
    
    const parts = main.replace('vless://', '').split('@');
    if (parts.length !== 2) return null;
    
    const uuid = parts[0];
    const [addressPort, query] = parts[1].split('?');
    const [address, port] = addressPort.split(':');
    
    const searchParams = new URLSearchParams(query);
    
    return {
      name,
      uuid,
      address,
      port,
      security: searchParams.get('security') || 'none',
      sni: searchParams.get('sni') || '',
      type: searchParams.get('type') || 'tcp',
      serviceName: searchParams.get('serviceName') || '',
      flow: searchParams.get('flow') || '',
      fp: searchParams.get('fp') || ''
    };
  } catch (e) {
    console.error('Failed to parse VLESS link', e);
    return null;
  }
};
