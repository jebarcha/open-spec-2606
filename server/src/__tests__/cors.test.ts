import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('CORS', () => {
  it('includes CORS allow-origin header and returns 204 on preflight OPTIONS request', async () => {
    const res = await request(app)
      .options('/api/tasks')
      .set('Origin', 'http://localhost:5173')
      .set('Access-Control-Request-Method', 'GET');
    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:5173');
    expect(res.status).toBe(204);
  });

  it('includes CORS allow-origin header on regular GET request', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Origin', 'http://localhost:5173');
    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:5173');
  });
});
