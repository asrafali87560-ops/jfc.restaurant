export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVeg: boolean;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  isHighProtein?: boolean;
  spiceLevel: 1 | 2 | 3; // 1 = Mild, 2 = Medium, 3 = Spicy
  proteinGrams?: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  hindiName?: string;
  description: string;
  icon: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  tableType: 'standard' | 'lounge' | 'outdoor';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  isFeatured?: boolean;
  isLocalGuide?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}
