import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import { resetStore } from '../store';

describe('Tasks API', () => {
  beforeEach(() => {
    resetStore();
  });

  describe('GET /api/tasks', () => {
    it('returns empty array when no tasks exist', async () => {
      const res = await request(app).get('/api/tasks');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('returns all tasks', async () => {
      await request(app).post('/api/tasks').send({ title: 'Task 1' });
      const res = await request(app).get('/api/tasks');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
    });
  });

  describe('POST /api/tasks', () => {
    it('creates a task with status InProgress and returns 201', async () => {
      const res = await request(app).post('/api/tasks').send({ title: 'New Task' });
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ title: 'New Task', status: 'InProgress' });
      expect(res.body.id).toBeDefined();
    });

    it('returns 400 when title is missing', async () => {
      const res = await request(app).post('/api/tasks').send({});
      expect(res.status).toBe(400);
    });

    it('creates task with all fields', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: 'Task', description: 'Desc', assignedTo: 'Alice' });
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        title: 'Task',
        description: 'Desc',
        assignedTo: 'Alice',
        status: 'InProgress',
      });
    });

    it('response body includes all required fields', async () => {
      const res = await request(app).post('/api/tasks').send({ title: 'Task' });
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('title');
      expect(res.body).toHaveProperty('description');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('assignedTo');
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('returns task when found', async () => {
      const created = await request(app).post('/api/tasks').send({ title: 'Find Me' });
      const res = await request(app).get(`/api/tasks/${created.body.id}`);
      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Find Me');
    });

    it('returns 404 when not found', async () => {
      const res = await request(app).get('/api/tasks/nonexistent');
      expect(res.status).toBe(404);
    });
  });

  describe('PATCH /api/tasks/:id', () => {
    it('updates task status and returns 200', async () => {
      const created = await request(app).post('/api/tasks').send({ title: 'Task' });
      const res = await request(app)
        .patch(`/api/tasks/${created.body.id}`)
        .send({ status: 'Done' });
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('Done');
    });

    it('accepts all valid status values', async () => {
      const statuses = ['ToDo', 'InProgress', 'Review', 'Done'];
      for (const status of statuses) {
        const created = await request(app).post('/api/tasks').send({ title: 'Task' });
        const res = await request(app)
          .patch(`/api/tasks/${created.body.id}`)
          .send({ status });
        expect(res.status).toBe(200);
        expect(res.body.status).toBe(status);
      }
    });

    it('returns 400 for invalid status', async () => {
      const created = await request(app).post('/api/tasks').send({ title: 'Task' });
      const res = await request(app)
        .patch(`/api/tasks/${created.body.id}`)
        .send({ status: 'INVALID' });
      expect(res.status).toBe(400);
    });

    it('returns 400 when title is set to empty string', async () => {
      const created = await request(app).post('/api/tasks').send({ title: 'Task' });
      const res = await request(app)
        .patch(`/api/tasks/${created.body.id}`)
        .send({ title: '' });
      expect(res.status).toBe(400);
    });

    it('returns 400 when title is set to blank string', async () => {
      const created = await request(app).post('/api/tasks').send({ title: 'Task' });
      const res = await request(app)
        .patch(`/api/tasks/${created.body.id}`)
        .send({ title: '   ' });
      expect(res.status).toBe(400);
    });

    it('returns 404 when task not found', async () => {
      const res = await request(app).patch('/api/tasks/nonexistent').send({ status: 'Done' });
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('deletes task and returns 204', async () => {
      const created = await request(app).post('/api/tasks').send({ title: 'Delete Me' });
      const res = await request(app).delete(`/api/tasks/${created.body.id}`);
      expect(res.status).toBe(204);
      const list = await request(app).get('/api/tasks');
      expect(list.body).toHaveLength(0);
    });

    it('returns 404 when not found', async () => {
      const res = await request(app).delete('/api/tasks/nonexistent');
      expect(res.status).toBe(404);
    });
  });
});
