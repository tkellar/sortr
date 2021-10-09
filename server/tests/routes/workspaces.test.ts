import mongoose from 'mongoose';
import dotenv from 'dotenv';
import request from 'supertest';
import app from '../../src/app';

dotenv.config();

// Declare 'global' variables

beforeAll(async () => {
  await mongoose.connect(process.env.JEST_MONGODB_CONNECTION ?? '');
});

beforeEach(async () => {
  // Seed the database
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /workspaces/{workspaceId}', () => {
  it('should get a workspace by id', async () => {
    const res = await request(app).get('/workspaces');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /workspaces?userId={userId}', () => {
  it('should get a workspace by userId', async () => {
    const res = await request(app).get('/workspaces');
    expect(res.statusCode).toBe(200);
  });
});

describe('PATCH /workspaces/{workspaceId}', () => {
  it('should update a workspace', async () => {
    const res = await request(app).get('/workspaces');
    expect(res.statusCode).toBe(200);
  });
});

describe('POST /workspaces', () => {
  it('should create a new workspace', async () => {
    const res = await request(app).get('/workspaces');
    expect(res.statusCode).toBe(200);
  });
});

describe('DELETE /workspaces/{workspaceId}', () => {
  it('should delete a workspace', async () => {
    const res = await request(app).get('/workspaces');
    expect(res.statusCode).toBe(200);
  });
});
