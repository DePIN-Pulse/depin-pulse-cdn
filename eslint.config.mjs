import nextVitals from 'eslint-config-next/core-web-vitals';

export default [
  ...nextVitals,
  { ignores: ['.next/**', '.open-next/**', '.wrangler/**', 'next-env.d.ts'] },
];
