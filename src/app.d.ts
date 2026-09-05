// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const FormValidation: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Block: {
    standard: (selector: string, options?: Record<string, unknown>) => void;
    remove: (selector: string) => void;
  };

  interface Window {
    Helpers: {
      getCssVar: (name: string) => string;
    };
  }
}

export { };
