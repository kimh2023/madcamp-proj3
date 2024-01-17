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

interface vertex {
  x: number;
  y: number;
}

export interface ProductDto {
  id: number;
  name: string;
  score: number;
  image: string;
  link: string;
  price: number;
  rating: number;
  pinned: boolean;
}

export interface LocalizedObjectAnnotationDto {
  name: string;
  score: number;
  vertices: vertex[];
  products?: Array<ProductDto | null>;
}

export interface SessionImageDto {
  blobUrl: string;
  localizedObjectAnnotations: LocalizedObjectAnnotationDto[];
  base64: string;
}
