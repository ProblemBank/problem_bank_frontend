export const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://backend.problembank.ir'
    : 'http://localhost:8000';