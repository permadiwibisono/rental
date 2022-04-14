interface JWTUser {
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  iss: string;
  id: string;
  email: string;
  roles: string[];
}
