export default `
mutation savePromoCodeToWallet($input: SavePromoCodeToWalletInput!) {
    SavePromoCodeToWallet(input: $input) {
      clientMutationId
      customer {
        id
      }
    }
  }
`
