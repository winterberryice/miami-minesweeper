const DEBUG = false;

function logger(...args: unknown[]): void {
  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

// eslint-disable-next-line import/prefer-default-export
export { logger };
