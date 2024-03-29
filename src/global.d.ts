declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
  }
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

// declare module '*.module.css' {
//   const classes: { [key: string]: string };
//   export default classes;
// }

// declare module '*.module.scss' {
//   const classes: { [key: string]: string };
//   export default classes;
// }

declare module '*.scss' {
  const src: string;
  export default src;
}

// declare module '*.module.sass' {
//   const classes: { [key: string]: string };
//   export default classes;
// }
