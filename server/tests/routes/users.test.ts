import mongoose from 'mongoose';
import UserModel, { IUser } from '../../src/models/User.model';
import request from 'supertest';
import app from '../../src/app';

let johnDeer: mongoose.Document<IUser> & IUser;
let janeDoe: mongoose.Document<IUser> & IUser;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_TEST_CONNECTION ?? '');
});

beforeEach(async () => {
  johnDeer = await UserModel.create({
    firstName: 'John',
    lastName: 'Deer',
    email: 'john.deer@example.com',
    password: 'johnpwd',
  });

  janeDoe = await UserModel.create({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    password: 'janepwd',
  });
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /users/{userId}', () => {
  it('should return 404 if user does not exist', async () => {
    const randomObjectId = new mongoose.Types.ObjectId();

    const getRes = await request(app).get(`/api/v1/users/${randomObjectId}`);
    expect(getRes.statusCode).toBe(404);
  });

  it('should get a single user by id', async () => {
    const res = await request(app).get(`/api/v1/users/${johnDeer.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe(johnDeer.firstName);
    expect(res.body.lastName).toBe(johnDeer.lastName);
    expect(res.body.email).toBe(johnDeer.email);
    expect(res.body.password).toBe(johnDeer.password);
  });
});

describe('POST /users', () => {
  it('should create a new user', async () => {
    const res = await request(app).post('/api/v1/users').send({
      firstName: 'Derek',
      lastName: 'Jeter',
      email: 'djeter@yankees.com',
      password: 'baseball',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBeDefined();
    expect(res.body.firstName).toBe('Derek');
    expect(res.body.lastName).toBe('Jeter');
    expect(res.body.email).toBe('djeter@yankees.com');
    expect(res.body.password).toBe('baseball');

    const created = await UserModel.findById(res.body._id);
    expect(created).toBeTruthy();
    if (created) {
      expect(created.firstName).toBe('Derek');
      expect(created.lastName).toBe('Jeter');
      expect(created.email).toBe('djeter@yankees.com');
      expect(created.password).toBe('baseball');
    }
  });
});

describe('PATCH /users/{userId}', () => {
  it('should return 404 if user does not exist', async () => {
    const randomObjectId = new mongoose.Types.ObjectId();

    const patchRes = await request(app).patch(`/api/v1/users/${randomObjectId}`).send({
      firstName: 'Oops!',
    });
    expect(patchRes.statusCode).toBe(404);
  });

  it('should update a user', async () => {
    const res = await request(app).patch(`/api/v1/users/${johnDeer.id}`).send({
      lastName: 'Denver',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe(johnDeer.firstName);
    expect(res.body.lastName).toBe('Denver');
    expect(res.body.email).toBe(johnDeer.email);
    expect(res.body.password).toBe(johnDeer.password);

    const updated = await UserModel.findById(johnDeer.id);
    expect(updated).toBeTruthy();
    if (updated) {
      expect(updated.firstName).toBe(johnDeer.firstName);
      expect(updated.lastName).toBe('Denver');
      expect(updated.email).toBe(johnDeer.email);
      expect(updated.password).toBe(johnDeer.password);
    }
  });
});

describe('DELETE /users/{userId}', () => {
  it('should delete a user', async () => {
    const res = await request(app).delete(`/api/v1/users/${janeDoe.id}`);
    expect(res.statusCode).toBe(204);

    const deleted = await UserModel.findById(janeDoe.id);
    expect(deleted).toBeFalsy();

    const notDeleted = await UserModel.findById(johnDeer.id);
    expect(notDeleted).toBeTruthy();
  });
});
