export abstract class BaseApiClient {
  protected static async get<TRes>(info: RequestInfo): Promise<TRes> {
    const res = await fetch(info, {
      method: 'GET',
    });

    if (res.ok && res.status === 200) {
      return res.json();
    }

    throw new Error();
  }

  protected static async post<TRes>(info: RequestInfo, body: TRes): Promise<TRes> {
    const res = await fetch(info, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.ok && res.status === 201) {
      return res.json();
    }

    throw new Error();
  }

  protected static async patch<TRes>(info: RequestInfo, body: Partial<TRes>): Promise<TRes> {
    const res = await fetch(info, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.ok && res.status === 200) {
      return res.json();
    }

    throw new Error();
  }
}
