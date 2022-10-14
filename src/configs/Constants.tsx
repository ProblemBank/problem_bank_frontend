export const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://problem-bank-backend.darkube.app'
    : 'http://localhost:8000';