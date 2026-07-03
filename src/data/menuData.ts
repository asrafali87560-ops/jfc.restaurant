import { MenuItem, MenuCategory, Review } from '../types';

import tandooriMasalaChaapImg from '../assets/images/tandoori_masala_chaap_1782819018806.jpg';
import shahiChaapRollImg from '../assets/images/shahi_chaap_roll_1782819034125.jpg';
import paneerLababdarImg from '../assets/images/paneer_lababdar_1782819046503.jpg';
import butterNaanImg from '../assets/images/butter_naan_1782819057763.jpg';
import garlicNaanImg from '../assets/images/garlic_naan_1782819068580.jpg';
import lacchaParathaImg from '../assets/images/laccha_paratha_1782819081969.jpg';

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'chaap',
    name: 'Legendary Chaap Specials',
    hindiName: 'विशेष सोया चाप',
    description: 'Our world-famous, high-protein soy-based delicacies. Sizzled in traditional tandoor, marinated with select spice blends, and basted with pure butter & cream.',
    icon: 'Flame',
  },
  {
    id: 'starters',
    name: 'Tandoori Starters',
    hindiName: 'तंदूरी स्टार्टर्स',
    description: 'Traditional charcoal-fired appetizers including hand-crafted paneer tikka, soy kebabs, and stuffed mushrooms served with tangy mint chutney.',
    icon: 'Sparkles',
  },
  {
    id: 'mains',
    name: 'Main Course Specialties',
    hindiName: 'मुख्य भोजन',
    description: 'Rich, aromatic, and slow-cooked Indian classics. Perfectly crafted for memorable family dinners.',
    icon: 'UtensilsCrossed',
  },
  {
    id: 'breads',
    name: 'Gourmet Indian Breads',
    hindiName: 'तंदूरी रोटियां',
    description: 'Freshly baked in our clay tandoor. Crispy on the outside, soft on the inside, and brushed with premium Amul butter.',
    icon: 'Cookie',
  },
  {
    id: 'chinese',
    name: 'Indo-Chinese Delights',
    hindiName: 'इंडो-चाइनीज व्यंजन',
    description: 'High-flame wok-tossed street style classics combining rich Indian spices with Chinese zest.',
    icon: 'FlameKindling',
  },
  {
    id: 'beverages',
    name: 'Cooling Refreshments',
    hindiName: 'शीतल पेय',
    description: 'Sip on our classic sweet lassi, fresh lime sodas, and mocktails to balance the tandoori heat.',
    icon: 'GlassWater',
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- CHAAP SPECIALS ---
  {
    id: 'c1',
    name: 'Afghani Royal Malai Chaap',
    hindiName: 'अफ़गानी मलाई चाप',
    description: 'Our #1 bestseller for 3 years. Soy chaap marinated in cashew-nut paste, cardamom, fresh herbs, and thick cream, charcoal-grilled to melt-in-your-mouth perfection.',
    price: 240,
    category: 'chaap',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600',
    isVeg: true,
    isPopular: true,
    isChefSpecial: true,
    isHighProtein: true,
    spiceLevel: 1,
    proteinGrams: 24,
    nutrition: {
      calories: 380,
      protein: 24,
      carbs: 14,
      fat: 26,
      allergens: ['Soy', 'Dairy', 'Cashew Nuts'],
      ingredients: ['High-protein Soya flour', 'Cashew paste', 'Fresh double cream', 'Green cardamom', 'Amul Butter']
    },
  },
  {
    id: 'c2',
    name: 'Tandoori Masala Chaap',
    hindiName: 'तंदूरी मसाला चाप',
    description: 'Infused with robust Kashmiri chillies, hand-crushed spices, and tangy mustard oil marinade, grilled until smokey and blistered.',
    price: 220,
    category: 'chaap',
    image: tandooriMasalaChaapImg,
    isVeg: true,
    isPopular: true,
    isHighProtein: true,
    spiceLevel: 3,
    proteinGrams: 22,
    nutrition: {
      calories: 320,
      protein: 22,
      carbs: 18,
      fat: 16,
      allergens: ['Soy', 'Dairy'],
      ingredients: ['Textured soya chunks', 'Thick hung curd', 'Kashmiri red chilli', 'Cold-pressed mustard oil', 'Kasturi methi', 'Chef secret spice blend']
    },
  },
  {
    id: 'c3',
    name: 'Achari Tikka Chaap',
    hindiName: 'अचारी सोया चाप',
    description: 'For the spice lovers. Marinated in old-fashioned pickle spices, mustard oil, and sour yogurt, cooked in clay oven.',
    price: 230,
    category: 'chaap',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=600',
    isVeg: true,
    spiceLevel: 3,
    isHighProtein: true,
    proteinGrams: 21,
  },
  {
    id: 'c4',
    name: 'Kashmiri Shahi Chaap Roll',
    hindiName: 'शाही चाप रोल',
    description: 'Tender Afghani malai chaap wrapped in flaky rumali roti with sliced onions, green mint chutney, and counter-bhaiya\'s secret blend of spices.',
    price: 180,
    category: 'chaap',
    image: shahiChaapRollImg,
    isVeg: true,
    isPopular: true,
    spiceLevel: 2,
    isHighProtein: true,
    proteinGrams: 18,
    nutrition: {
      calories: 450,
      protein: 18,
      carbs: 48,
      fat: 20,
      allergens: ['Gluten (Wheat)', 'Soy', 'Dairy'],
      ingredients: ['Fine wheat rumali flatbread', 'Afghani soy chaap chunks', 'Double cream & cashew marinade', 'Sliced red onions', 'Spicy green mint chutney']
    },
  },
  {
    id: 'c5',
    name: 'Haryali Mint-Coriander Chaap',
    hindiName: 'हरियाली पुदीना चाप',
    description: 'A vibrant, herbal marinade of fresh mint leaves, coriander, green chilies, and yogurt, grilled with a hint of lemon juice.',
    price: 220,
    category: 'chaap',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    isVeg: true,
    spiceLevel: 2,
    isHighProtein: true,
    proteinGrams: 23,
  },

  // --- STARTERS ---
  {
    id: 's1',
    name: 'Aromatic Paneer Tikka Shashlik',
    hindiName: 'पनीर टिक्का शशलिक',
    description: 'Thick slabs of rich dairy paneer, skewered with colorful bell peppers and red onions, grilled with spices.',
    price: 260,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600',
    isVeg: true,
    isPopular: true,
    spiceLevel: 2,
  },
  {
    id: 's2',
    name: 'Stuffed Mushroom Duets',
    hindiName: 'भरवां मशरूम टिक्का',
    description: 'Fresh mushroom caps stuffed with spiced cottage cheese, minced herbs, and cheese, coated in a golden tandoor glaze.',
    price: 250,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600',
    isVeg: true,
    spiceLevel: 1,
  },

  // --- MAINS ---
  {
    id: 'm1',
    name: 'Slow-Cooked Signature Dal Makhani',
    hindiName: 'दाल मखनी (विशेष)',
    description: 'Black lentils and kidney beans slow-simmered for 24 hours on a charcoal tandoor hearth, finished with churned butter and dairy cream.',
    price: 210,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600',
    isVeg: true,
    isPopular: true,
    isChefSpecial: true,
    spiceLevel: 1,
  },
  {
    id: 'm2',
    name: 'Shahi Paneer Lababdar',
    hindiName: 'शाही पनीर लबाबदार',
    description: 'Paneer cubes folded into a luxurious, mildly sweet gravy of fresh tomatoes, cashews, honey, and dried fenugreek leaves (Kasuri Methi).',
    price: 280,
    category: 'mains',
    image: paneerLababdarImg,
    isVeg: true,
    isPopular: true,
    spiceLevel: 2,
    nutrition: {
      calories: 390,
      protein: 14,
      carbs: 12,
      fat: 32,
      allergens: ['Dairy', 'Cashew Nuts'],
      ingredients: ['Fresh dairy cottage cheese cubes', 'Cashew-nut paste', 'Vine-ripened tomatoes', 'Raw wild honey', 'Amul fresh cream', 'Kasuri methi']
    },
  },
  {
    id: 'm3',
    name: 'Kadai Soya Chaap Gravy',
    hindiName: 'कढ़ाई सोया चाप ग्रेवी',
    description: 'Tender roasted chaap chunkies simmered in a semi-dry, robust masala gravy of crushed spices, bell peppers, tomatoes, and fresh ginger.',
    price: 260,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600',
    isVeg: true,
    isHighProtein: true,
    spiceLevel: 3,
    proteinGrams: 25,
  },

  // --- BREADS ---
  {
    id: 'b1',
    name: 'Amul Butter Naan',
    hindiName: 'बटर नान',
    description: 'Leavened flatbread made with fine wheat flour, baked freshly in tandoor and generously brushed with melted Amul butter.',
    price: 60,
    category: 'breads',
    image: butterNaanImg,
    isVeg: true,
    spiceLevel: 1,
    nutrition: {
      calories: 280,
      protein: 7,
      carbs: 42,
      fat: 9,
      allergens: ['Gluten (Wheat)', 'Dairy'],
      ingredients: ['Leavened fine wheat flour', 'Yogurt starter', 'Melted Amul butter glaze', 'Kalonji (Nigella seeds)']
    },
  },
  {
    id: 'b2',
    name: 'Garlic Butter Naan',
    hindiName: 'लहसुन बटर नान',
    description: 'Infused with chopped garlic cloves and fresh cilantro, baked to a delicious crisp and glazed with butter.',
    price: 75,
    category: 'breads',
    image: garlicNaanImg,
    isVeg: true,
    isPopular: true,
    spiceLevel: 1,
    nutrition: {
      calories: 295,
      protein: 8,
      carbs: 43,
      fat: 10,
      allergens: ['Gluten (Wheat)', 'Dairy'],
      ingredients: ['Leavened fine wheat flour', 'Roasted minced garlic', 'Amul butter glaze', 'Fresh coriander leaves']
    },
  },
  {
    id: 'b3',
    name: 'Laccha Paratha',
    hindiName: 'लच्छा परांठा',
    description: 'Multi-layered, flaky whole wheat flatbread crafted with delicate folds, baked on tandoori walls.',
    price: 70,
    category: 'breads',
    image: lacchaParathaImg,
    isVeg: true,
    spiceLevel: 1,
    nutrition: {
      calories: 310,
      protein: 6,
      carbs: 38,
      fat: 14,
      allergens: ['Gluten (Whole Wheat)', 'Dairy (Ghee)'],
      ingredients: ['Whole wheat flour (Atta)', 'Layered pure cow ghee', 'Ajwain (Carom seeds)']
    },
  },

  // --- INDO-CHINESE ---
  {
    id: 'ch1',
    name: 'Spicy Chilli Garlic Noodles',
    hindiName: 'चिली गार्लिक नूडल्स',
    description: 'Wok-tossed noodles with colorful julienned veggies, crushed garlic, and a punchy dark soy and homemade chili sauce blend.',
    price: 160,
    category: 'chinese',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600',
    isVeg: true,
    isPopular: true,
    spiceLevel: 3,
  },
  {
    id: 'ch2',
    name: 'Sizzling Chilli Paneer Dry',
    hindiName: 'चिली पनीर ड्राई',
    description: 'Crispy pan-fried paneer cubes tossed with fresh spring onions, bell peppers, and green chilies in a spicy soy-chili reduction.',
    price: 220,
    category: 'chinese',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600',
    isVeg: true,
    spiceLevel: 3,
  },

  // --- BEVERAGES ---
  {
    id: 'v1',
    name: 'Saffron Pistachio Sweet Lassi',
    hindiName: 'केसर पिस्ता लस्सी',
    description: 'Thick, creamy yogurt drink churned slowly, scented with pure Kashmiri saffron and garnished with crushed slivered pistachios.',
    price: 90,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    isVeg: true,
    isPopular: true,
    spiceLevel: 1,
  },
  {
    id: 'v2',
    name: 'Spiced Mint Masala Shikanji',
    hindiName: 'मसाला शिकंजी',
    description: 'Refreshing carbonated water with fresh mint pulp, squeezy lemon, black salt, and a robust roasted cumin seed spice blend.',
    price: 70,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    isVeg: true,
    spiceLevel: 1,
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev1',
    author: 'Asraf Ali (Local Guide)',
    rating: 5,
    date: '2026-06-15',
    comment: 'I order from here regularly specially their chaap .. I have not been to this place yet but their food is fantastic. Eating from here from last 2-3 years. The overall food was delicious too yum and counter wale bhaiya rcb kae fan hai bhaiya ki mst body bani hui hai gym rat 🐀 apart from that the space is just medium in size not too big not too small good service.',
    isFeatured: true,
    isLocalGuide: true,
  },
  {
    id: 'rev2',
    author: 'Pranav Sharma',
    rating: 5,
    date: '2026-06-28',
    comment: 'The Afghani Malai Chaap here is absolutely celestial. Best in Raj Nagar Extension by far! The delivery is always hot, and the counter manager bhaiya is super friendly and highly motivated. High protein options are a plus for gym goers.',
    isFeatured: false,
    isLocalGuide: false,
  },
  {
    id: 'rev3',
    author: 'Nisha Singhal',
    rating: 4,
    date: '2026-05-10',
    comment: 'Great family dining spot! Not too noisy, service is prompt and very courteous. The Dal Makhani was extremely creamy and paired beautifully with Garlic Naan. Highly recommended for weekend family meals.',
    isFeatured: false,
    isLocalGuide: false,
  }
];

export const BHAIYA_QUOTES = [
  {
    trigger: 'motivation',
    category: 'Gym Motivation 💪',
    quote: 'Listen brother! Consistency is key. Just like you need 100% dedication in the gym to build muscle, we simmer our Dal Makhani for 24 hours to get that deep taste. Heavy lifts, clean eats, and double butter on cheat days!',
    action: 'Flexes biceps while packing your Malai Chaap'
  },
  {
    trigger: 'cricket',
    category: 'RCB Fanaticism ❤️',
    quote: 'Ee Sala Cup Namde, 100%! Kohli bhai is a legend. RCB runs in my blood. No matter what the scoreboard says, our support never fades. Order our special Red Chili Masala Chaap for that pure RCB fire!',
    action: 'Points proudly to the RCB flag behind the billing counter'
  },
  {
    trigger: 'diet',
    category: 'Protein Advice 🍗',
    quote: 'Searching for clean protein? Our Legendary Soya Chaap has 24g of high-quality plant protein per plate. Zero junk, pure clean energy. Grab an Afghani Royal Malai Chaap post-workout, and you are set for the day!',
    action: 'Checks your posture and hands you the water bottle'
  },
  {
    trigger: 'space',
    category: 'The Cozy Dining Vibe 🏡',
    quote: 'We kept the space perfect - medium size, cozy, comfortable. Not too big where you get lost, not too small where you feel crowded. Excellent service is what we aim for, making you feel right at home!',
    action: 'Arranges the comfortable wooden chair with a wide smile'
  }
];
