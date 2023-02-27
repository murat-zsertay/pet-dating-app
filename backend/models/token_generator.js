import JWT from "jsonwebtoken";

export class TokenGenerator {
  static jsonwebtoken (user_id) {
    const secret = process.env.JWT_SECRET
    return JWT.sign(
      {
        user_id,
        iat: Math.floor(Date.now() / 1000),

        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + 10 * 60
      },
      secret
    )
  }
}
