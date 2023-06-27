export function getServiceName(defaultName: string): string {
  return `${process.env.SERVICE_NAME || defaultName}-${process.env.NODE_ENV}`;
}
