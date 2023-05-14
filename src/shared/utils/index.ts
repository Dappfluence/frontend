export const shortHandAddress = (address: string, len: number = 3) => {
  return `${address.slice(0, len)}...${address.slice(-len)}`
}
