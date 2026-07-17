export interface SessionPayload {
  userId: number;
  email: string;
  name: string;
  role: string;
  roleId: number;
  permissions: string[];
  createdAt: number;
}

const encoder = new TextEncoder();

function getSecretKey(): string {
  return process.env.SESSION_SECRET || 'temporary-fallback-secret-for-dev-session-rowshanara';
}

function arrayBufferToHex(buffer: ArrayBuffer): string {
  return Array.prototype.map.call(new Uint8Array(buffer), (x: number) => ('00' + x.toString(16)).slice(-2)).join('');
}

function hexToUint8Array(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

export async function encryptSession(payload: SessionPayload): Promise<string> {
  const payloadStr = JSON.stringify(payload);
  const payloadBase64 = typeof btoa !== 'undefined' 
    ? btoa(unescape(encodeURIComponent(payloadStr))) 
    : Buffer.from(payloadStr).toString('base64');
  
  // HMAC-SHA256 signature
  const secret = getSecretKey();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(payloadBase64)
  );
  const signatureHex = arrayBufferToHex(signature);
  
  return `${payloadBase64}.${signatureHex}`;
}

export async function decryptSession(token: string): Promise<SessionPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    
    const [payloadBase64, signatureHex] = parts;
    
    const secret = getSecretKey();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    const signatureBytes = hexToUint8Array(signatureHex);
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes as any,
      encoder.encode(payloadBase64)
    );
    
    if (!isValid) return null;
    
    const payloadStr = typeof atob !== 'undefined' 
      ? decodeURIComponent(escape(atob(payloadBase64))) 
      : Buffer.from(payloadBase64, 'base64').toString('utf8');
    return JSON.parse(payloadStr) as SessionPayload;
  } catch (error) {
    console.error('Failed to decrypt session:', error);
    return null;
  }
}

export function hasPermission(permissions: string[], permission: string): boolean {
  return permissions.includes(permission);
}

export function hasAnyPermission(permissions: string[], perms: string[]): boolean {
  return perms.some(p => permissions.includes(p));
}

export function hasAllPermissions(permissions: string[], perms: string[]): boolean {
  return perms.every(p => permissions.includes(p));
}

export function isSuperAdmin(role: string): boolean {
  return role === 'super-admin';
}
