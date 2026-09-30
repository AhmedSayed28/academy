export interface FaqItem {
  question: string;
  answer: string;
  action?: {
    label: string;
    href: `/${string}`;
  };
}
