export type ScreenType = 'home' | 'explore' | 'onboarding' | 'auth' | 'messages' | 'profile';

export interface Pro {
  id: string;
  name: string;
  role: string;
  category: string;
  rate: string;
  hourlyNum: number;
  rating: number;
  tasksCompleted: number;
  distance: string;
  availability: string;
  verified: boolean;
  avatarUrl: string;
  badge?: string;
  badgeColor?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  prosCount: number;
  badge?: string;
  badgeType?: 'hot' | 'surge' | 'dot' | '24/7';
  color: string;
  bgColor: string;
}

export interface Conversation {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  time: string;
  tag: string;
  unreadCount?: number;
  status: 'online' | 'offline';
  messages: {
    sender: 'user' | 'pro';
    text: string;
    timestamp: string;
  }[];
}
