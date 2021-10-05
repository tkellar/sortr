import mongoose from 'mongoose';

class BaseCRUDService<T> {
  private model: mongoose.Model<T>;

  constructor(model: mongoose.Model<T>) {
    this.model = model;
  }

  async getById(id: string): Promise<mongoose.Document<T> | null> {
    const entity = await this.model.findById(id);

    return entity;
  }

  async update(id: string, update: mongoose.UpdateQuery<T>): Promise<mongoose.Document<T>> {
    const entity = await this.model.findByIdAndUpdate(id, update, { new: true });

    return entity;
  }

  async create(entity: T): Promise<mongoose.Document<T>> {
    const created = await this.model.create(entity);

    return created;
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}

export default BaseCRUDService;
