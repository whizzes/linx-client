declare module '@whizzes/linx' {
  export type Link = {
    id: string;
    hash: string;
    originalUrl: string;
    expiresAt: Date;
  };
}
