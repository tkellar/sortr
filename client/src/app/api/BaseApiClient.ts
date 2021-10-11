import axios from 'axios';

export abstract class BaseApiClient {
  protected static async get<TRes>(path: string): Promise<TRes> {
    const res = await axios.get<TRes>(path);

    if (res && res.status === 200) {
      return res.data;
    }

    throw new Error();
  }

  protected static async post<TRes>(path: string, body: TRes): Promise<TRes> {
    const res = await axios.post<TRes>(path, body);

    if (res && res.status === 201) {
      return res.data;
    }

    throw new Error();
  }

  protected static async patch<TRes>(path: string, body: TRes): Promise<TRes> {
    const res = await axios.patch<TRes>(path, body);

    if (res && res.status === 200) {
      return res.data;
    }

    throw new Error();
  }

  protected static async delete(path: string): Promise<void> {
    const res = await axios.delete(path);

    if (!res || res.status !== 200) {
      throw new Error();
    }
  }
}
