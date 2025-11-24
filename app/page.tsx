'use client';
import { useState, useMemo } from 'react';
import { Search, User, MapPin, Users, IdCard } from 'lucide-react';
import { User as UserType } from './types/index';

const userData: UserType[] = [
  { id: 24, epicNo: 'RSO1801042', partNo: '27/271/1343', name: 'Tayde Somesh Niluti', relativeName: 'Tayde Niluti Viththal', address: 'Jagdamba Nagar', age: '35', gender: 'Male', status: 'Active', lastUpdated: '2024-01-15' },
  { id: 25, epicNo: 'RSO1890706', partNo: '27/271/1410', name: 'Phranangs Thurai : Thurai Chitrakal', relativeName: 'Photo Available', address: 'Bangkok Central', age: '28', gender: 'Female', status: 'Active', lastUpdated: '2024-01-14' },
  { id: 26, epicNo: 'RSO1893445', partNo: '27/271/1414', name: 'Phranangs Thurai : Phrachatong Chai Somsri Khaphrani', relativeName: 'Phankvicharn : Phrachatong Khaphrani', address: 'TELISIL KARYALAY PARISAR', age: '42', gender: 'Female', status: 'Pending', lastUpdated: '2024-01-13' },
  { id: 27, epicNo: 'RS01494822', partNo: '27/272/674', name: 'Tondare Lahu Krishna Pandurang Patil', relativeName: 'Laxmi Tondare', address: '3o, Maharashtra', age: '31', gender: 'Male', status: 'Active', lastUpdated: '2024-01-12' },
  { id: 28, epicNo: 'RS01494814', partNo: '27/272/675', name: 'Chhada Karam Tondare Santhu', relativeName: 'Karam Tondare', address: '4, Pune District', age: '29', gender: 'Male', status: 'Active', lastUpdated: '2024-01-11' },
  { id: 29, epicNo: 'RS01586502', partNo: '27/272/693', name: 'Kanhar Kunal Kangale', relativeName: 'Sunita Kangale', address: '4, Mumbai Sector', age: '33', gender: 'Male', status: 'Inactive', lastUpdated: '2024-01-10' },
  { id: 30, epicNo: 'KCC1064583', partNo: '27/272/828', name: 'Sapsud Khandu Kharade', relativeName: 'Sapsud Khandu Kharade', address: '9o, Rural Zone', age: '45', gender: 'Male', status: 'Active', lastUpdated: '2024-01-09' },
  { id: 31, epicNo: 'RS06270185', partNo: '27/272/829', name: 'Sapsud Jagannath Sapre', relativeName: 'Sapsud Khandu', address: '9o, Urban Area', age: '38', gender: 'Male', status: 'Active', lastUpdated: '2024-01-08' },
  { id: 32, epicNo: 'RS07506421', partNo: '27/272/865', name: 'Pansat Kasrat Dhotre', relativeName: 'Pansat Dhotre', address: '9o, Commercial Zone', age: '41', gender: 'Male', status: 'Pending', lastUpdated: '2024-01-07' },
  { id: 33, epicNo: 'RS09846288', partNo: '27/272/866', name: 'Pansat Dhotre Kashi', relativeName: 'Pansat Kashi', address: '9o, Residential Area', age: '36', gender: 'Female', status: 'Active', lastUpdated: '2024-01-06' },
  { id: 34, epicNo: 'KCC1096429', partNo: '27/272/867', name: 'Pansat Kasrat Dhotre', relativeName: 'Pansat Dhotre', address: '9o, Industrial Zone', age: '39', gender: 'Male', status: 'Active', lastUpdated: '2024-01-05' },
  { id: 35, epicNo: 'KCC1098334', partNo: '27/272/868', name: 'Chapsud Jagannath Sapre', relativeName: 'Chapsud Sapre', address: '9o, Metro City', age: '44', gender: 'Male', status: 'Inactive', lastUpdated: '2024-01-04' }
];

const statusColors: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Pending: 'bg-amber-100 text-amber-800 border-amber-200',
  Inactive: 'bg-rose-100 text-rose-800 border-rose-200'
};

const genderColors: Record<string, string> = {
  Male: 'bg-blue-100 text-blue-800',
  Female: 'bg-pink-100 text-pink-800',
  'Not Stated': 'bg-gray-100 text-gray-800'
};

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredUsers = useMemo((): UserType[] => {
    if (!searchTerm) return userData;
    
    const lowercasedSearch = searchTerm.toLowerCase();
    return userData.filter(user => 
      user.name.toLowerCase().includes(lowercasedSearch) ||
      user.epicNo.toLowerCase().includes(lowercasedSearch) ||
      user.partNo.toLowerCase().includes(lowercasedSearch) ||
      user.relativeName.toLowerCase().includes(lowercasedSearch) ||
      user.address.toLowerCase().includes(lowercasedSearch)
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            User Management
          </h1>
          <p className="text-gray-600">
            Search and view user records
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Search users by name, EPIC number, address, relative name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${genderColors[user.gender]}`}>
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 line-clamp-1">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-500">EPIC: {user.epicNo}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[user.status]}`}>
                    {user.status}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${genderColors[user.gender]}`}>
                    {user.gender}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <IdCard className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="line-clamp-1">Part: {user.partNo}</span>
                </div>
                
                {user.relativeName && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="line-clamp-1">{user.relativeName}</span>
                  </div>
                )}

                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="line-clamp-1">
                    {user.address || 'Address not specified'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                  <span>Age: {user.age || 'N/A'}</span>
                  <span>Updated: {new Date(user.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 border border-gray-200">
              <User className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm 
                  ? `No results found for "${searchTerm}". Try adjusting your search terms.`
                  : 'No users available.'
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}