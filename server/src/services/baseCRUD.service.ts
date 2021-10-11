import mongoose from 'mongoose';

class BaseCRUDService<T> {
  protected model: mongoose.Model<T>;

  constructor(model: mongoose.Model<T>) {
    this.model = model;
  }

  async getById(id: string): Promise<(mongoose.Document<T> & T) | null> {
    return this.model.findById(id);
  }

  async update(id: string, update: mongoose.UpdateQuery<T>): Promise<mongoose.Document<T> & T> {
    return this.model.findByIdAndUpdate(id, update, { new: true });
  }

  async create(entity: T): Promise<mongoose.Document<T> & T> {
    return this.model.create(entity);
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}

export default BaseCRUDService;
