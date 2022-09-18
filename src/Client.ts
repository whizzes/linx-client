const DEFAULT_HTTP_HEADERS: Record<string, string> = {
  'content-type': 'application/json',
}

export class Client {
  private prefixUrl: URL;

  constructor(prefixUrl: URL) {
    this.prefixUrl = prefixUrl;
  }

  public async new(originalUrl: string): Promise<Linx.Link> {
    // Validates `originalUrl` to be a valid URL string
    new URL(originalUrl);

    const response = await fetch(this.uri('new'), {
      body: JSON.stringify({
        url: originalUrl,
      }),
      headers: {
        ...DEFAULT_HTTP_HEADERS,
      }
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

  private uri(path: string): string {
    return `${this.prefixUrl.toString()}/${path}`;
  }
}
