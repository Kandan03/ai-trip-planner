# 🌍 AI Trip Planner

An intelligent trip planning application that uses AI to generate personalized travel itineraries. Built with Next.js, powered by Google's Gemini AI, and featuring real-time database synchronization with Convex.

## ✨ Features

- **AI-Powered Itineraries**: Generate customized trip plans using Google's Gemini Pro AI
- **Smart Trip Planning**: Input destination, duration, budget, and travel group size for personalized recommendations
- **Real-Time Photo Integration**: Automatic fetching of place photos using Google Places API
- **User Authentication**: Secure sign-in with Clerk authentication
- **Trip Management**: Save, view, and manage all your planned trips
- **Interactive Maps**: Direct Google Maps integration for hotels and attractions
- **Detailed Itineraries**: Day-by-day breakdown with hotels, activities, time slots, and pricing
- **Responsive Design**: Beautiful UI that works seamlessly across all devices

## 🚀 Tech Stack

- **Framework**: Next.js 16.0.1 with React 19
- **AI**: Google Generative AI (Gemini Pro)
- **Database**: Convex (Real-time database)
- **Authentication**: Clerk
- **APIs**: Google Places API (New) v1, Google Maps API
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, Lucide Icons
- **HTTP Client**: Axios

## 📋 Prerequisites

Before running this project, you need to obtain API keys from:

1. **Google AI Studio**: Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Google Cloud Platform**: Enable and get API keys for:
   - Google Places API (New)
   - Google Maps API
3. **Clerk**: Sign up at [Clerk](https://clerk.com) for authentication keys
4. **Convex**: Create a project at [Convex](https://convex.dev)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-trip-planner.git
cd ai-trip-planner
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_GOOGLE_PLACE_API_KEY=your_google_places_api_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CONVEX_URL=your_convex_url
```

4. Set up Convex:
```bash
npx convex dev
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
ai-trip-planner/
├── src/
│   ├── app/
│   │   ├── trip/              # Trip creation page
│   │   ├── trip-details/      # Trip details view
│   │   ├── my-trips/          # User trips listing
│   │   └── layout.js          # Root layout
│   ├── components/
│   │   ├── trip/              # Trip-related components
│   │   │   ├── HotelCard.jsx
│   │   │   ├── PlaceCard.jsx
│   │   │   ├── Itinerary.jsx
│   │   │   └── TripCard.jsx
│   │   └── ui/                # Reusable UI components
│   ├── sections/
│   │   ├── Header.jsx         # Navigation header
│   │   └── Hero.jsx           # Landing page hero
│   ├── services/
│   │   ├── AIModal.jsx        # Gemini AI integration
│   │   └── GlobalApi.jsx      # Google Places API
│   ├── lib/
│   │   └── google-photos.js   # Photo fetching utilities
│   └── constants/
│       └── options.jsx        # Trip planning options
├── convex/
│   ├── schema.ts              # Database schema
│   ├── trips.ts               # Trip mutations/queries
│   └── users.ts               # User management
└── public/                    # Static assets
```

## 🎯 How It Works

1. **Plan Your Trip**: Enter destination, trip duration, budget preference, and number of travelers
2. **AI Generation**: Gemini Pro AI analyzes your inputs and generates a comprehensive itinerary
3. **Save to Database**: Trip data is saved to Convex with real-time synchronization
4. **View Details**: Access detailed day-by-day plans with hotels, activities, timing, and costs
5. **Photo Integration**: Real place photos are automatically fetched from Google Places API
6. **Manage Trips**: View all your saved trips and access them anytime

## 🔑 Key Features Breakdown

### AI Trip Generation
- Powered by Google's Gemini-1.5-pro model
- Generates hotels, daily itineraries, activities, and timing
- Considers budget constraints and traveler preferences

### Real-Time Database
- Convex provides instant synchronization
- Secure user data with email-based queries
- Efficient trip storage and retrieval

### Photo Integration
- Automatic place photo fetching from Google Places API
- Fallback gradients for locations without photos
- Optimized image loading with error handling

### User Experience
- Clean, modern interface with Tailwind CSS
- Loading states and error handling
- Responsive design for mobile and desktop
- Smooth navigation and transitions

## 🚧 Future Enhancements

- [ ] Trip editing and updating
- [ ] Trip deletion functionality
- [ ] Share trips with other users
- [ ] Export itinerary as PDF
- [ ] Budget tracking and expense management
- [ ] Collaborative trip planning
- [ ] Weather integration
- [ ] Flight and accommodation booking links

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Kandan03/ai-trip-planner/issues).

## 👨‍💻 Author

**Somaskandan B**
- GitHub: [@Kandan03](https://github.com/Kandan03)

## 🙏 Acknowledgments

- Google Generative AI for powerful AI capabilities
- Clerk for seamless authentication
- Convex for real-time database functionality
- Next.js team for the amazing framework

---

Made with ❤️ and AI

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
