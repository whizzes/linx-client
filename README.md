<div>
  <h1 align="center">Linx</h1>
  <h4 align="center">API Client for Linx</h4>
</div>

> Still under early development. The underlying server is available on [whizzes/linx][1].

## Getting Started

```bash
npm install @whizzes/linx
```

## Usage

```typescript
import { Client } from '@whizzes/linx/browser';

import type { Linx } from '@whizzes/linx/browser';

// The URL where Linx is hosted
const linxServer = 'http://localhost:3000';

// Create a Client instance
const linx = new Client(linxServer);

let url = '';
let error = null;
let link: Linx.Link | null = null;

async function createLink(): Promise<void> {
  try {
    link = await linx.new(url);
  } catch (err) {
    error = err.toString();
  }
}
```

## Contributions

Every contribution to this project is welcome, feel free to open PRs and issues
if you find fit for any.

## License

Licensed under the MIT license. Refer to the `LICENSE` file.

[1]: https://github.com/whizzes/linx
