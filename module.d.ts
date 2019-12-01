declare module "*.svg" {
  const content: string;
  export default content;
}

declare namespace JSX {
  interface IntrinsicElements {
    marquee: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        behavior?: string;
        direction?: string;
      },
      any
    >;
  }
}
