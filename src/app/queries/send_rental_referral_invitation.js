export default `
  mutation WebSendRentalReferralInvitation($referrals: SendRentalReferralInvitationInput!) {
    SendRentalReferralInvitation(input: $referrals) {
      referral_invitations {
        email
        success
        errors
      }
    }
  }
`
