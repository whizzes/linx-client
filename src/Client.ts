import type { Link } from '@whizzes/linx';

const DEFAULT_HTTP_HEADERS: Record<string, string> = {
  'content-type': 'application/json',
};

export class Client {
  private prefixUrl: URL;

  constructor(prefixUrl: URL) {
    this.prefixUrl = prefixUrl;
  }

  /**
   * Creates a new Link through Linx with the provided URL.
   *
   * Internally validates the `originalUrl` to be a valid URL instance.
   */
  public async new(originalUrl: string): Promise<Link> {
    new URL(originalUrl);

    return await this.post('new', {
      url: originalUrl,
    });
  }

  private uri(path: string): string {
    return `${this.prefixUrl.toString()}${path}`;
  }

  private async post<T, U>(
    path: string,
    body: T,
    options: RequestInit = {},
  ): Promise<U> {
    const extendedOptions: RequestInit = {
      ...options,
      headers: {
        ...DEFAULT_HTTP_HEADERS,
        ...options.headers,
      },
      method: 'POST',
      body: JSON.stringify(body),
    };

    const response = await fetch(this.uri(path), extendedOptions);
    const responseBody = await response.json();

    if (response.ok) {
      return responseBody as U;
    }

    const message = (responseBody as { message: string })?.message;

    // As of today we don't have enough use cases to implement
    // dedicated errors. Instead we just take the error message
    // and provide it as a `Error.message` value.
    throw new Error(message);
  }
}
