// change a string eg: "Solana Is Awesome" to "solana-is-awesome"
export function changeStringToSlug(string) {
  return string
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}
