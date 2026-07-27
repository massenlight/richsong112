export interface TargetRole {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  keyOutcomes: string[];
  caseImageUrl?: string;
}

export interface CourseModule {
  id: number;
  badge: string;
  title: string;
  description: string;
  lessons: string[];
  duration: string;
  icon: string;
  imageUrl?: string;
  imagePosition?: 'top' | 'side';
}

export interface ImageSlot {
  id: string;
  name: string;
  description: string;
  currentUrl: string;
  aspectRatio: string;
  recommendedWidth: number;
  recommendedHeight: number;
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  threadsHandle: string;
  role: string;
  planId: string;
}
