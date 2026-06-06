import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import { resetStore } from '../store';

describe('Team Members API', () => {
  beforeEach(() => {
    resetStore();
  });

  describe('GET /api/team-members', () => {
    it('returns empty array when no members exist', async () => {
      const res = await request(app).get('/api/team-members');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('returns all team members', async () => {
      await request(app).post('/api/team-members').send({ name: 'Alice' });
      const res = await request(app).get('/api/team-members');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].name).toBe('Alice');
    });
  });

  describe('POST /api/team-members', () => {
    it('creates a team member and returns 201', async () => {
      const res = await request(app).post('/api/team-members').send({ name: 'Bob' });
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ name: 'Bob' });
      expect(res.body.id).toBeDefined();
    });

    it('returns 400 when name is missing', async () => {
      const res = await request(app).post('/api/team-members').send({});
      expect(res.status).toBe(400);
    });

    it('returns 400 when name is empty string', async () => {
      const res = await request(app).post('/api/team-members').send({ name: '' });
      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /api/team-members/:id', () => {
    it('deletes a team member and returns 204', async () => {
      const created = await request(app).post('/api/team-members').send({ name: 'Charlie' });
      const res = await request(app).delete(`/api/team-members/${created.body.id}`);
      expect(res.status).toBe(204);
      const list = await request(app).get('/api/team-members');
      expect(list.body).toHaveLength(0);
    });

    it('returns 404 when team member not found', async () => {
      const res = await request(app).delete('/api/team-members/nonexistent');
      expect(res.status).toBe(404);
    });
  });
});
