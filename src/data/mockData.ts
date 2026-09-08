import { GalleryItem, ProjectItem, BlogPost, CoreValue, Hotspot } from '../types';

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'cantilever-balcony',
    name: 'Floating Skyline Terrace',
    subtitle: 'Master Suite Private Deck',
    categoryLabel: 'Master Sanctuary & Suites',
    position: [1.8, 2.2, 1.2],
    cameraPosition: [3.2, 3.0, 3.8],
    cameraTarget: [1.8, 2.0, 1.0],
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
    description: 'Cantilevered glass deck with teak wood soffits offering panoramic coastal sunrises and refreshing sea breezes.',
    specs: [
      { label: 'Deck Area', value: '420 Sq.Ft.' },
      { label: 'Balustrade', value: '15mm Toughened Glass' },
      { label: 'Orientation', value: 'East Facing Ocean Glimpse' }
    ]
  },
  {
    id: 'infinity-pool',
    name: 'Private Reflection Pool',
    subtitle: 'Courtyard Aquatics',
    categoryLabel: 'Pool & Grounds',
    position: [-2.2, 0.2, 2.0],
    cameraPosition: [-3.8, 1.8, 4.0],
    cameraTarget: [-2.0, 0.1, 1.8],
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85',
    description: 'Temperature-controlled lap pool embedded into Italian travertine stonework with discreet concealed overflow drains and ambient fiber-optic mood illumination.',
    specs: [
      { label: 'Length', value: '38 Feet' },
      { label: 'Filtration', value: 'Ozone Mineral System' },
      { label: 'Decking', value: 'FSC Teak & Travertine' }
    ]
  },
  {
    id: 'double-height-living',
    name: 'Double-Height Atrium',
    subtitle: 'Architectural Great Room',
    categoryLabel: 'Living & Great Room',
    position: [0.2, 1.2, 0.4],
    cameraPosition: [0.8, 2.0, 4.2],
    cameraTarget: [0.0, 1.0, 0.2],
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    description: 'Dramatic 22-foot floor-to-ceiling curtain wall with automated solar shading, allowing natural light to cascade through both levels.',
    specs: [
      { label: 'Ceiling Height', value: '22 Feet' },
      { label: 'Glazing', value: 'Triple Low-E Acoustic' },
      { label: 'Chandelier Support', value: 'Reinforced 300kg Span' }
    ]
  },
  {
    id: 'smart-entry',
    name: 'Biometric Portico',
    subtitle: 'Private Driveway & Garage',
    categoryLabel: 'Facade & Architecture',
    position: [-1.4, 0.1, 3.1],
    cameraPosition: [-1.6, 1.2, 5.5],
    cameraTarget: [-1.2, 0.3, 2.8],
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    description: 'Undercover dual EV-charging portico framed in fluted dark basalt and integrated facial-recognition digital entry security.',
    specs: [
      { label: 'Car Bays', value: '3 Full Size SUVs' },
      { label: 'EV Station', value: '22kW Dual Superchargers' },
      { label: 'Security', value: 'AI Biometric & LPR' }
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'facade-cascading',
    title: 'Contemporary Cascading Facade',
    category: 'Facade',
    categoryLabel: 'Facade & Architecture',
    location: 'MYSA Villas, Vettuvankeni ECR',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    description: 'Warm sandstone cladding paired with dark slate accents, cantilevered terraces, and ambient architectural lighting.',
    area: 'Villa 04 • 5,400 Sq.Ft.'
  },
  {
    id: 'dusk-elevation',
    title: 'Evening Dusk Ambience & Travertine Lighting',
    category: 'Facade',
    categoryLabel: 'Facade & Architecture',
    location: 'Main Gated Enclave Street View',
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
    description: 'Warm 2700K perimeter cove illumination highlights the hand-cut travertine walls and floating cantilever steps as dusk settles over the coast.',
    area: 'Full Villa Elevation • 3 Levels'
  },
  {
    id: 'twilight-pool',
    title: 'Private Infinity Plunge Pool & Courtyard Deck',
    category: 'Pool & Grounds',
    categoryLabel: 'Pool & Grounds',
    location: 'Ground Floor Courtyard',
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85',
    description: 'Integrated fiber-optic underwater lighting, dual water curtain spouts, and non-slip flamed granite deck surrounded by coastal foliage.',
    area: '38-Ft Lap Pool • Travertine Deck'
  },
  {
    id: 'grand-living',
    title: 'Sun-Drenched Double-Height Great Room',
    category: 'Living',
    categoryLabel: 'Living & Great Room',
    location: 'Ground Level Heart',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    description: 'Expansive 22-foot high structural volume with full-height acoustic fluted oak wall, custom Italian leather furnishings, and direct garden access.',
    area: '850 Sq.Ft. • 22-Ft Ceiling'
  },
  {
    id: 'scandinavian-living',
    title: 'Scandinavian Living & Media Lounge',
    category: 'Living',
    categoryLabel: 'Living & Great Room',
    location: 'Ground Level Family Wing',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    description: 'Clean architectural lines with recessed warm LED perimeter wash, natural timber accents, and imported composite Italian marble.',
    area: '620 Sq.Ft.'
  },
  {
    id: 'master-sanctuary',
    title: 'The Master Sanctuary Suite',
    category: 'Master Suite',
    categoryLabel: 'Master Sanctuary & Suites',
    location: 'First Level East Wing',
    imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85',
    description: 'Minimalist Scandinavian-inspired bedroom with integrated fluted headboard, ambient cove lighting, engineered oak floors, and floor-to-ceiling garden views.',
    area: '620 Sq.Ft. • King Suite'
  },
  {
    id: 'master-loft',
    title: 'Master Bedroom Loft with Timber Trusses',
    category: 'Master Suite',
    categoryLabel: 'Master Sanctuary & Suites',
    location: 'First Level Private Wing',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85',
    description: 'Cathedral double-height ceiling showcasing exposed natural timber trusses, floor-to-ceiling balcony glazing, and walk-in dressing lounge.',
    area: '540 Sq.Ft. • Cathedral Volume'
  },
  {
    id: 'dining-pavilion',
    title: 'Bespoke Dining Pavilion & Wine Lounge',
    category: 'Dining',
    categoryLabel: 'Dining & Kitchen',
    location: 'Ground Level Garden Wing',
    imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85',
    description: '10-seater smoked oak table beneath bespoke hand-blown kinetic glass pendants, opening directly onto the outdoor reflection pool.',
    area: '480 Sq.Ft.'
  },
  {
    id: 'chef-kitchen',
    title: 'Minimalist Chef Kitchen & Waterfall Island',
    category: 'Dining',
    categoryLabel: 'Dining & Kitchen',
    location: 'Ground Level Culinary Suite',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    description: 'Seamless waterfall quartz island, concealed Gaggenau appliances, Blum touch-to-open walnut cabinetry, and separate butler preparation pantry.',
    area: '420 Sq.Ft.'
  },
  {
    id: 'travertine-spa',
    title: 'Travertine Spa Ensuite with Freestanding Tub',
    category: 'Spa',
    categoryLabel: 'Spa & Ensuite',
    location: 'Master Retreat Ensuite',
    imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=85',
    description: 'Monolithic freestanding soaking tub carved from solid limestone with ceiling-mounted rainfall shower and private bamboo lightwell.',
    area: '280 Sq.Ft. • Master Bath'
  },
  {
    id: 'penthouse-terrace',
    title: 'Penthouse Stargazing Terrace & Sky Pergola',
    category: 'Pool & Grounds',
    categoryLabel: 'Pool & Grounds',
    location: 'Level 2 Rooftop Suite',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    description: 'Entertainment pergola lounge with open-air coastal seating, built-in barbecue station, and panoramic views of the Bay of Bengal coastline.',
    area: '1,200 Sq.Ft. Open Terrace'
  },
  {
    id: 'sunrise-balcony',
    title: 'Sunrise Balcony Suite & Timber Louvers',
    category: 'Master Suite',
    categoryLabel: 'Master Sanctuary & Suites',
    location: 'First Level Front Elevation',
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
    description: 'Private cantilevered balcony deck featuring motorized timber louvers that calibrate natural ventilation and coastal sea breezes.',
    area: '180 Sq.Ft. Balcony Deck'
  },
  {
    id: 'central-driveway',
    title: 'Central Arrival Driveway & Twin Portico',
    category: 'Facade',
    categoryLabel: 'Facade & Architecture',
    location: 'Gated Enclave Private Boulevard',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    description: 'Hand-laid Belgian cobble driveway, covered dual-vehicle parking porticos, and illuminated landscaping leading to the bespoke villa entrances.',
    area: 'Dual-Portico Entrance'
  }
];

export const CORE_VALUES: CoreValue[] = [
  {
    id: 'quality',
    title: 'Uncompromising Quality',
    description: 'We are committed to the highest standards of craftsmanship, using premium materials and meticulous attention to detail to build homes that last for generations.',
    iconName: 'Compass'
  },
  {
    id: 'innovation',
    title: 'Pioneering Innovation',
    description: 'From smart home features to sustainable building practices, we embrace innovation to create homes that are not only luxurious but also intelligent and future-ready.',
    iconName: 'Zap'
  },
  {
    id: 'trust',
    title: 'Foundation of Trust',
    description: 'Transparency, integrity, and on-time delivery are the cornerstones of our relationship with clients. We build lasting trust by delivering on our promises, every time.',
    iconName: 'Shield'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'sustainable-luxury',
    title: 'Sustainable Luxury: Eco-Friendly Practices in Villa Construction',
    tag: 'Sustainability',
    readTime: '4 min read',
    date: 'February 2025',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    summary: 'How solar integration, passive cooling corridors, and rainwater harvesting are redefining high-end villa engineering in tropical Chennai.',
    content: [
      'True luxury in the modern era is intrinsically tied to sustainability. At Unifra, our architectural philosophy prioritizes ecological harmony without compromising on comfort or indulgence.',
      'Our villas incorporate dual-glazed low-emissivity glass to naturally reduce thermal heat absorption by up to 48%, significantly diminishing energy loads on air conditioning systems.',
      'From 10kW rooftop photovoltaic arrays to micro-percolation groundwater recharging systems, every Unifra development aims for a net-positive environmental footprint.'
    ]
  },
  {
    id: 'art-of-mysa',
    title: 'The Art of \'Mysa\': Bringing Swedish Cozy Contentment to Chennai',
    tag: 'Lifestyle',
    readTime: '5 min read',
    date: 'January 2025',
    imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
    summary: 'Infusing Nordic warmth and intentional spatial design into coastal Indian villas for deep tranquility and conscious living.',
    content: [
      'The Swedish concept of \'Mysa\' encompasses comfort, coziness, and enjoying the present moment with loved ones. It is an intentional sanctuary from the hurried pace of everyday life.',
      'In designing MYSA Villas along Chennai’s East Coast Road, we merged Scandinavian minimalism with warm coastal textures—natural teak, tactile linens, and sheltered breeze terraces.',
      'The result is a living space where every corner invites you to pause, sip your morning filter coffee, and savor quiet moments of pure contentment.'
    ]
  },
  {
    id: 'vettuvankeni-hotspot',
    title: 'Investment Hotspot: Why Vettuvankeni is Chennai\'s Premier Real Estate Destination',
    tag: 'Real Estate',
    readTime: '6 min read',
    date: 'December 2024',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    summary: 'Strategic coastal connectivity, serene residential zoning, and remarkable capital appreciation make ECR the gold standard for discerning investors.',
    content: [
      'Vettuvankeni has quietly evolved into Chennai’s most prestigious luxury villa enclave. Situated along the East Coast Road yet minutes away from the OMR IT Corridor and Adyar, it offers unrivaled convenience.',
      'With stringent low-density coastal zoning regulations, the area preserves its lush tree canopies, clean ocean air, and serene low-rise skyline.',
      'Historical price trends demonstrate a steady 12-15% annual capital appreciation, driven by intense demand from HNWIs, expatriates, and entrepreneurial leaders seeking privacy.'
    ]
  },
  {
    id: 'smart-homes-luxury',
    title: 'The Rise of Smart Homes: Integrating Technology into Luxury Living',
    tag: 'Innovation',
    readTime: '4 min read',
    date: 'November 2024',
    imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
    summary: 'Discrete, voice-activated automation, climate intelligence, and biometric access that anticipates your family’s every desire.',
    content: [
      'The best technology is invisible. In a Unifra villa, automation is not an overt display of gadgetry, but a silent butler that orchestrates your environment seamlessly.',
      'Circadian lighting automatically shifts from energizing morning hues to warm 2200K twilight tones as evening approaches, promoting healthy sleep cycles.',
      'Smart water sensors, motorized architectural louvers that respond to real-time wind speed, and automated pool chlorination ensure absolute peace of mind.'
    ]
  }
];

export const SIGNATURE_PROJECTS: ProjectItem[] = [
  {
    id: 'mysa-villas',
    name: 'MYSA Luxe Villas',
    tagline: 'Swedish-Inspired Coastal Sanctuary',
    location: 'Vettuvankeni, ECR Chennai',
    type: 'Exclusive Gated Enclave of 6 Private Pool Villas',
    units: '6 Bespoke Units',
    carpetArea: '4,450 – 5,800 Sq.Ft.',
    priceStarting: '₹ 5.85 Cr*',
    status: 'Under Construction',
    statusBadge: 'Ongoing',
    badgeDays: '1333 DAYS IN',
    badgeSold: '3 of 6 Sold',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    description: 'Exclusive enclave of 6 Swedish-inspired 4BHK contemporary villas featuring private plunge pools, high-ceiling master suites, and double-height light atriums.',
    highlights: [
      'Private Temperature-Controlled Lap Pool',
      'Private Rooftop Sundeck with Sea Glimpse',
      'Double-Height Living Atrium & Glass Lift',
      'Schneider Smart Home Automation Suite'
    ],
    specs: {
      bedrooms: '4 & 5 BHK',
      bathrooms: '5.5 Ensuite',
      levels: 'G + 2 Floors',
      parking: '3 Car Stalls'
    }
  },
  {
    id: 'the-pearl-residences',
    name: 'The Pearl Residences',
    tagline: 'Modernist Beachside Triplexes',
    location: 'ECR, Chennai',
    type: 'Boutique Collection of 8 Coastal Mansions',
    units: '8 Mansions',
    carpetArea: '6,200 – 7,500 Sq.Ft.',
    priceStarting: '₹ 6.90 Cr*',
    status: 'Upcoming',
    statusBadge: 'Upcoming',
    badgeDays: 'LAUNCHING Q3 2025',
    badgeSold: 'Pre-Booking Open',
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    description: 'Expansive beachfront residences designed with panoramic floor-to-ceiling sea views, private elevators, and Scandinavian timber facade accents.',
    highlights: [
      '200 Meters Walking Distance to Beach',
      'Private Hydrotherapy Plunge Pool',
      'Italian Travertine & Greek Marble Floors',
      'Private 8-Seater Dolby Atmos Cinema Hall'
    ],
    specs: {
      bedrooms: '5 BHK Ultra',
      bathrooms: '6 Ensuite',
      levels: 'G + 3 Floors',
      parking: '4 Covered Bays'
    }
  },
  {
    id: 'orchid-gardens',
    name: 'Orchid Botanical Gardens',
    tagline: 'Sustainable Forest Villas',
    location: 'Kottivakkam, Chennai',
    type: 'Eco-Luxury Biophilic Living',
    units: '4 Exclusive Units',
    carpetArea: '3,800 – 4,900 Sq.Ft.',
    priceStarting: '₹ 4.95 Cr*',
    status: 'Upcoming',
    statusBadge: 'Upcoming',
    badgeDays: 'PERMIT APPROVED',
    badgeSold: 'Limited 4 Units',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    description: 'A botanical sanctuary integrating lush courtyard gardens with modernist geometric architecture and passive solar temperature control.',
    highlights: [
      '100% Solar-Powered Off-Grid Capability',
      'Private Zen Courtyard & Bamboo Grove',
      'Rainwater Harvesting & Organic Herb Patch',
      'Clubhouse with Olympic Lap Pool & Squash'
    ],
    specs: {
      bedrooms: '4 BHK Luxury',
      bathrooms: '4.5 Ensuite',
      levels: 'G + 2 Floors',
      parking: '2 Car Bays'
    }
  },
  {
    id: 'unifra-aurelia',
    name: 'Aurelia Heights',
    tagline: 'Adyar Riverfront Mansions',
    location: 'Boat Club Road, Chennai',
    type: 'Ultra-Exclusive Private Mansions',
    units: '8 Mansions',
    carpetArea: '5,400 Sq.Ft.',
    priceStarting: '₹ 7.20 Cr*',
    status: 'Ready to Move',
    statusBadge: 'Completed',
    badgeDays: '100% DELIVERED',
    badgeSold: 'Fully Sold Out',
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    description: 'Ultra-exclusive private mansions overlooking the Adyar riverfront with private infinity pools, Italian composite marble, and biometric gates.',
    highlights: [
      'Private Riverfront Terraces',
      'Italian Travertine Cladding',
      'Private Temperature-Controlled Pools',
      '100% On-Time Delivery Milestone'
    ],
    specs: {
      bedrooms: '4 & 5 BHK',
      bathrooms: '5 Ensuite',
      levels: 'G + 2 Floors',
      parking: '3 Covered Bays'
    }
  }
];
