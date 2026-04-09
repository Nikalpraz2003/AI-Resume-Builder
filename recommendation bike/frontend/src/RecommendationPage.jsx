import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SparklesIcon, StarIcon, BoltIcon, CogIcon } from '@heroicons/react/24/solid';
import { HeartIcon, ShareIcon } from '@heroicons/react/24/outline';

const RecommendationPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [popularBikes, setPopularBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('popular');
  const [userPreferences, setUserPreferences] = useState({
    bikeTypes: [],
    electricPreference: 'No Preference',
    maxBudgetPerHour: 50,
    preferredFrameSize: 'M'
  });

  // Mock user ID - in a real app, this would come from authentication
  const userId = '64f5a1b2c3d4e5f6a7b8c9d0';

  useEffect(() => {
    fetchRecommendations();
  }, [activeTab]);

  const fetchRecommendations = async () => {
    setLoading(true);
    // Simulate API call delay for demo
    setTimeout(() => {
      setRecommendations(getMockRecommendations());
      setLoading(false);
    }, 1000);
  };

  const getMockRecommendations = () => {
    const allBikes = [
      {
        _id: '1',
        name: 'Trek Mountain Explorer',
        type: 'Mountain',
        brand: 'Trek',
        electric: false,
        gearCount: 21,
        weight: 14.5,
        frameSize: 'L',
        color: 'Black',
        description: 'Rugged mountain bike perfect for trail adventures with excellent suspension and grip.',
        pricePerHour: 15,
        pricePerDay: 80,
        rating: 4.5,
        popularity: 85,
        images: ['/images/trek-mountain.jpg']
      },
      {
        _id: '2',
        name: 'Specialized E-Road Turbo',
        type: 'Road',
        brand: 'Specialized',
        electric: true,
        gearCount: 11,
        weight: 16.8,
        frameSize: 'M',
        color: 'Blue',
        description: 'Electric road bike with powerful motor assistance for long-distance comfort rides.',
        pricePerHour: 25,
        pricePerDay: 120,
        rating: 4.8,
        popularity: 95,
        images: ['/images/specialized-e-road.jpg']
      },
      {
        _id: '3',
        name: 'Giant Hybrid Comfort',
        type: 'Hybrid',
        brand: 'Giant',
        electric: false,
        gearCount: 8,
        weight: 12.3,
        frameSize: 'M',
        color: 'Green',
        description: 'Versatile hybrid bike ideal for city commuting and light trail riding.',
        pricePerHour: 12,
        pricePerDay: 60,
        rating: 4.2,
        popularity: 70,
        images: ['/images/giant-hybrid.jpg']
      },
      {
        _id: '4',
        name: 'Rad Power E-Bike',
        type: 'Electric',
        brand: 'Rad Power',
        electric: true,
        gearCount: 7,
        weight: 29.1,
        frameSize: 'L',
        color: 'White',
        description: 'Powerful electric bike with long battery life and cargo capacity for urban commuting.',
        pricePerHour: 20,
        pricePerDay: 100,
        rating: 4.6,
        popularity: 88,
        images: ['/images/rad-power-ebike.jpg']
      },
      {
        _id: '5',
        name: 'Cannondale BMX Pro',
        type: 'BMX',
        brand: 'Cannondale',
        electric: false,
        gearCount: 1,
        weight: 11.2,
        frameSize: 'S',
        color: 'Red',
        description: 'Professional BMX bike designed for tricks, jumps, and street riding.',
        pricePerHour: 10,
        pricePerDay: 45,
        rating: 4.1,
        popularity: 45,
        images: ['/images/cannondale-bmx.jpg']
      },
      {
        _id: '6',
        name: 'Priority City Cruiser',
        type: 'City',
        brand: 'Priority',
        electric: false,
        gearCount: 3,
        weight: 13.6,
        frameSize: 'M',
        color: 'Cream',
        description: 'Elegant city bike with belt drive system for smooth, maintenance-free riding.',
        pricePerHour: 8,
        pricePerDay: 40,
        rating: 4.0,
        popularity: 60,
        images: ['/images/priority-city.jpg']
      },
      {
        _id: '7',
        name: 'Canyon E-Mountain Beast',
        type: 'Mountain',
        brand: 'Canyon',
        electric: true,
        gearCount: 12,
        weight: 22.5,
        frameSize: 'L',
        color: 'Matte Black',
        description: 'High-performance electric mountain bike with full suspension for extreme trails.',
        pricePerHour: 30,
        pricePerDay: 150,
        rating: 4.9,
        popularity: 92,
        images: ['/images/canyon-e-mountain.jpg']
      },
      {
        _id: '8',
        name: 'Brompton Folding Genius',
        type: 'Folding',
        brand: 'Brompton',
        electric: false,
        gearCount: 6,
        weight: 11.8,
        frameSize: 'S',
        color: 'Orange',
        description: 'Compact folding bike perfect for multimodal commuting and easy storage.',
        pricePerHour: 14,
        pricePerDay: 70,
        rating: 4.3,
        popularity: 75,
        images: ['/images/brompton-folding.jpg']
      }
    ];

    // Different sorting based on active tab
    switch (activeTab) {
      case 'popular':
        return allBikes.sort((a, b) => b.popularity - a.popularity);
      case 'personalized':
        // Simulate personalized recommendations (prefer electric and mountain bikes)
        return allBikes
          .sort((a, b) => {
            const aScore = (a.electric ? 20 : 0) + (a.type === 'Mountain' ? 15 : 0) + a.rating * 5;
            const bScore = (b.electric ? 20 : 0) + (b.type === 'Mountain' ? 15 : 0) + b.rating * 5;
            return bScore - aScore;
          });
      case 'content-based':
        // Simulate ML-based content recommendations
        return allBikes.sort((a, b) => b.rating - a.rating);
      default:
        return allBikes;
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const BikeCard = ({ bike }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <BoltIcon className="h-8 w-8 text-white" />
            </div>
            <p className="text-sm text-gray-600">Bike Image</p>
          </div>
        </div>
        {bike.electric && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Electric
          </div>
        )}
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
          {bike.type}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 truncate">{bike.name}</h3>
          <div className="flex gap-1">
            <button className="p-1 hover:bg-gray-100 rounded">
              <HeartIcon className="h-4 w-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <ShareIcon className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">{bike.brand} • {bike.color}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">{renderStars(bike.rating)}</div>
          <span className="text-sm text-gray-600">({bike.rating})</span>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            Popular
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{bike.description}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <CogIcon className="h-3 w-3" />
            {bike.gearCount} gears
          </div>
          <div>Weight: {bike.weight}kg</div>
          <div>Size: {bike.frameSize}</div>
          <div>Popularity: {bike.popularity}%</div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold text-blue-600">${bike.pricePerHour}/hour</div>
            <div className="text-sm text-gray-500">${bike.pricePerDay}/day</div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bike Recommendations</h1>
              <p className="text-gray-600 mt-1">Discover the perfect bike for your next adventure</p>
            </div>
            <div className="flex items-center gap-2">
              <SparklesIcon className="h-6 w-6 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">AI-Powered Suggestions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recommendation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'popular', name: 'Most Popular', desc: 'Top-rated bikes by users' },
                { id: 'personalized', name: 'For You', desc: 'Based on your preferences' },
                { id: 'content-based', name: 'AI Suggestions', desc: 'ML-powered recommendations' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div>{tab.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{tab.desc}</div>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Algorithm Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <SparklesIcon className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900">How Recommendations Work</h3>
              <p className="text-blue-700 text-sm mt-1">
                {activeTab === 'popular' && 'Showing bikes with highest ratings and rental frequency from all users.'}
                {activeTab === 'personalized' && 'Using your preferences and rental history to find bikes you\'ll love.'}
                {activeTab === 'content-based' && 'Advanced ML algorithm analyzes bike features using TF-IDF vectorization and cosine similarity to find bikes similar to your interests.'}
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded mb-3"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Bike Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((bike) => (
              <BikeCard key={bike._id} bike={bike} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && recommendations.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <BoltIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bikes found</h3>
            <p className="text-gray-500">Try adjusting your preferences or check back later.</p>
          </div>
        )}

        {/* Recommendation Stats */}
        {!loading && recommendations.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Recommendation Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{recommendations.length}</div>
                <div className="text-sm text-gray-500">Bikes Found</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {(recommendations.reduce((acc, bike) => acc + bike.rating, 0) / recommendations.length).toFixed(1)}
                </div>
                <div className="text-sm text-gray-500">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  ${Math.round(recommendations.reduce((acc, bike) => acc + bike.pricePerHour, 0) / recommendations.length)}
                </div>
                <div className="text-sm text-gray-500">Avg Price/Hour</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {recommendations.filter(bike => bike.electric).length}
                </div>
                <div className="text-sm text-gray-500">Electric Bikes</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationPage;
