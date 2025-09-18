export type Theme = 'dark' | 'light';

export interface CrackleEffect {
  id: number;
  x: number;
  y: number;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface ParallaxOffset {
  x: number;
  y: number;
}

export interface StepCardProps {
  theme: Theme;
  n: number;
  title: string;
  text: string;
  icon: 'link' | 'music' | 'sparkles';
}

export interface FeatureCardProps {
  title: string;
  description: string;
  theme: Theme;
}

export interface TestimonialProps {
  quote: string;
  author: string;
  image: string;
  imageAlt: string;
  theme: Theme;
}

export interface BenefitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  theme: Theme;
}
