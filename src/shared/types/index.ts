export interface SessionDto {
  token?: string;
  userId?: number;
  isVerified: boolean;
  signUpTab: number;
}

export interface SessionContextCompleteDto {
  session: SessionContextDto;
  setSession: (newSession: Partial<SessionContextDto>) => void;
}

export interface SessionContextDto extends SessionDto {
  isVerified: boolean;
  signUpTab: number;
}
