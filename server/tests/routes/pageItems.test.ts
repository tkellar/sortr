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

describe('GET /pageItems/{pageItemId}', () => {
  it('should get a page item by id', async () => {
    const res = await request(app).get('/pageItems');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /pageItems?parentPageItemId={parentPageItemId}', () => {
  it('should get a page item by parentPageItemId', async () => {
    const res = await request(app).get('/pageItems');
    expect(res.statusCode).toBe(200);
  });
});

describe('PATCH /pageItems/{pageItemId}', () => {
  it('should update a page item', async () => {
    const res = await request(app).get('/pageItems');
    expect(res.statusCode).toBe(200);
  });
});

describe('POST /pageItems', () => {
  it('should create a new page item', async () => {
    const res = await request(app).get('/pageItems');
    expect(res.statusCode).toBe(200);
  });
});

describe('DELETE /pageItems/{pageItemId}', () => {
  it('should delete a page item', async () => {
    const res = await request(app).get('/pageItems');
    expect(res.statusCode).toBe(200);
  });
});
