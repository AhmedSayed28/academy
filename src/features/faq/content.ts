export interface FaqItem {
  question: string;
  answer: string;
  action?: {
    label: string;
    href: `/${string}`;
  };
}

export const faqItems = [
  {
    question: "What is Academy?",
    answer:
      "Academy is a technology education platform focused on practical, career-oriented learning. It helps visitors discover structured technology courses and learning tracks built around understanding and application.",
    action: { label: "Learn more about Academy", href: "/about" },
  },
  {
    question: "How does Academy approach learning?",
    answer:
      "The learning approach connects strong fundamentals with deliberate practice, realistic scenarios, and project-based application. The goal is to help learners understand technology and use it with growing confidence.",
  },
  {
    question: "How can I explore courses and learning tracks?",
    answer:
      "The Courses page lists published course information, while the Tracks page introduces the technology directions Academy plans to support. A published course page is the source of truth for details specific to that course.",
    action: { label: "Browse courses", href: "/courses" },
  },
  {
    question: "What does registering general interest do?",
    answer:
      "Registering interest lets you share your contact details and the technology area you want to explore. Academy can use those details to follow up when there is a relevant, confirmed opportunity.",
    action: { label: "Register general interest", href: "/register-interest" },
  },
  {
    question: "Does registering interest confirm enrollment or reserve a place?",
    answer:
      "No. Registering general interest is not enrollment, does not reserve a place, and does not confirm a course, date, schedule, or price.",
  },
  {
    question: "Where can I find details that vary by course?",
    answer:
      "Check the published course page for confirmed information about that course. If a detail is not published, contact Academy rather than assuming it applies.",
    action: { label: "Contact Academy", href: "/contact" },
  },
  {
    question: "How can I contact Academy?",
    answer:
      "Use the Contact page to send a question about Academy, its learning approach, or the technology education you are looking for.",
    action: { label: "Send a question", href: "/contact" },
  },
] as const satisfies readonly FaqItem[];

export const homepageFaqItems = faqItems.slice(0, 4);
