export function authorFilter(authorPublicKey) {
  return {
    memcmp: {
      offset: 8, // Discriminator.
      bytes: authorPublicKey,
    },
  };
}

export function topicFilter(topic) {
  return {
    memcmp: {
      offset: 8 + 32 + 8 + 4, // Discriminator.
      bytes: bs58.encode(Buffer.from(topic)),
    },
  };
}
