import ky from 'ky-universal';

import type { KyInstance } from 'ky/distribution/types/ky';

export class Client {
  private client: KyInstance;

  constructor(prefixUrl: URL) {
    this.client = ky.create({
      prefixUrl: prefixUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public async new(originalUrl: string): Promise<Linx.Link> {
    // Validates `originalUrl` to be a valid URL string
    new URL(originalUrl);

    const response = await this.client.post('new', {
      body: JSON.stringify({
        url: originalUrl,
      }),
    });
    const json = await response.json();

    if (response.ok) {
      return json as Linx.Link;
    }

    const message = (json as { message: string; })?.message;

    // As of today we don't have enough use cases to implement
    // dedicated errors. Instead we just take the error message
    // and provide it as a `Error.message` value.
    throw new Error(message);
  }
}
