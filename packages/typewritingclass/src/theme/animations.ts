export const spin = 'spin 1s linear infinite'
export const ping = 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
export const pulse = 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
export const bounce = 'bounce 1s infinite'

export const keyframes = {
  spin: `@keyframes spin { to { transform: rotate(360deg); } }`,
  ping: `@keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }`,
  pulse: `@keyframes pulse { 50% { opacity: .5; } }`,
  bounce: `@keyframes bounce { 0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); } 50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); } }`,
}
