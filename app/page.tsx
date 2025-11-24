"use client";
import { useState, useMemo } from "react";
import { Search, User, MapPin, Users, IdCard } from "lucide-react";
import { User as UserType } from "./types/index";

const userData: UserType[] = [
  {
    "srNo": 1,
    "epicNo": "RSO8932188",
    "partNo": "27/271/30",
    "name": "Bhutekar Prizhar Santoshsing",
    "relativeName": "Bhutekar Santoshsing",
    "houseNo": "NA",
    "address": "NA",
    "age": 36,
    "gender": "Male"
  },
  {
    "srNo": 2,
    "epicNo": "RSO8931875",
    "partNo": "27/271/62",
    "name": "Gole Mahendra Devidas",
    "relativeName": "Gole Devidas",
    "houseNo": "-",
    "address": "-",
    "age": 38,
    "gender": "Male"
  },
  {
    "srNo": 3,
    "epicNo": "RSO9415175",
    "partNo": "27/271/223",
    "name": "Sabdkar Gofol Rameshwar",
    "relativeName": "Sabdkar Rameshwar",
    "houseNo": "-",
    "address": "-",
    "age": 24,
    "gender": "Male"
  },
  {
    "srNo": 4,
    "epicNo": "KCC1076025",
    "partNo": "27/271/520",
    "name": "Bhatukar Keshav Sabkur",
    "relativeName": "Bhatukar Sabkur",
    "houseNo": "73",
    "address": "73",
    "age": 43,
    "gender": "Male"
  },
  {
    "srNo": 5,
    "epicNo": "KCC1076264",
    "partNo": "27/271/524",
    "name": "Chalang Raju Kamalkishor",
    "relativeName": "Chalang Kamalkishor",
    "houseNo": "56",
    "address": "56",
    "age": 49,
    "gender": "Male"
  },
  {
    "srNo": 6,
    "epicNo": "KCC1076272",
    "partNo": "27/271/525",
    "name": "Chalang Shival Raju",
    "relativeName": "Chalang Raju",
    "houseNo": "57",
    "address": "57",
    "age": 48,
    "gender": "Female"
  },
  {
    "srNo": 7,
    "epicNo": "RSO9084393",
    "partNo": "27/271/690",
    "name": "Sabdkar Rameshwar Asharamji",
    "relativeName": "Sabdkar Asharamji",
    "houseNo": "258/5",
    "address": "258/5",
    "age": 58,
    "gender": "Male"
  },
  {
    "srNo": 8,
    "epicNo": "RSO9084401",
    "partNo": "27/271/691",
    "name": "Sabdkar Rameshwar Rameshwar",
    "relativeName": "Sabdkar Rameshwar",
    "houseNo": "258/5",
    "address": "258/5",
    "age": 48,
    "gender": "Female"
  },
  {
    "srNo": 9,
    "epicNo": "RSO9084377",
    "partNo": "27/271/884",
    "name": "Warkari Narayanrao Sudhaman",
    "relativeName": "Warkari Sudhaman",
    "houseNo": "262/5",
    "address": "262/5",
    "age": 56,
    "gender": "Male"
  },
  {
    "srNo": 10,
    "epicNo": "RSO1416346",
    "partNo": "27/271/885",
    "name": "Warkari Bhagirathi Narayanrao",
    "relativeName": "Warkari Narayanrao",
    "houseNo": "262/5",
    "address": "262/5",
    "age": 71,
    "gender": "Female"
  },
  {
    "srNo": 11,
    "epicNo": "RSO9084369",
    "partNo": "27/271/886",
    "name": "Warkari Govindrao Narayanrao",
    "relativeName": "Warkari Narayanrao",
    "houseNo": "262/5",
    "address": "262/5",
    "age": 62,
    "gender": "Male"
  },
  {
    "srNo": 12,
    "epicNo": "RSO9084385",
    "partNo": "27/271/887",
    "name": "Warkari Pushpa Govindrao",
    "relativeName": "Warkari Govindrao",
    "houseNo": "262/5",
    "address": "262/5",
    "age": 39,
    "gender": "Female"
  },
  {
    "srNo": 13,
    "epicNo": "RSO1416353",
    "partNo": "27/271/888",
    "name": "Warkari Vibhudatta Narayanrao",
    "relativeName": "Warkari Narayanrao",
    "houseNo": "262/5",
    "address": "262/5",
    "age": 42,
    "gender": "Female"
  },
  {
    "srNo": 14,
    "epicNo": "RSO1533777",
    "partNo": "27/271/1087",
    "name": "Tharoke Anjali",
    "relativeName": "Tharoke Shrikrishna",
    "houseNo": "0",
    "address": "0",
    "age": 21,
    "gender": "Female"
  },
  {
    "srNo": 15,
    "epicNo": "RSO1569532",
    "partNo": "27/271/1093",
    "name": "Sonke Prakashan",
    "relativeName": "Sonke Chango",
    "houseNo": "61",
    "address": "61",
    "age": 61,
    "gender": "Male"
  },
  {
    "srNo": 16,
    "epicNo": "RSO1569540",
    "partNo": "27/271/1094",
    "name": "Sonke Ramesh",
    "relativeName": "Sonke Abhinash",
    "houseNo": "00",
    "address": "00",
    "age": 34,
    "gender": "Female"
  },
  {
    "srNo": 17,
    "epicNo": "RSO1569557",
    "partNo": "27/271/1095",
    "name": "Sonke Anil",
    "relativeName": "Sonke Prakashan",
    "houseNo": "0",
    "address": "0",
    "age": 40,
    "gender": "Male"
  },
  {
    "srNo": 18,
    "epicNo": "RSO1608223",
    "partNo": "27/271/1113",
    "name": "Ogalekar Nilesh Sureshkanta",
    "relativeName": "Ogalekar Sureshkanta",
    "houseNo": "06",
    "address": "06",
    "age": 33,
    "gender": "Male"
  },
  {
    "srNo": 19,
    "epicNo": "RSO1533835",
    "partNo": "27/271/1142",
    "name": "Sangal Pankaj",
    "relativeName": "Sangal Raju",
    "houseNo": "67",
    "address": "67",
    "age": 43,
    "gender": "Male"
  },
  {
    "srNo": 20,
    "epicNo": "RSO1533827",
    "partNo": "27/271/1143",
    "name": "Gunde Milind",
    "relativeName": "Gunde Laxman",
    "houseNo": "75",
    "address": "75",
    "age": 54,
    "gender": "Male"
  },
  {
    "srNo": 21,
    "epicNo": "RSO1585108",
    "partNo": "27/271/1144",
    "name": "Gunde Amit",
    "relativeName": "Gunde Laxman",
    "houseNo": "52",
    "address": "52",
    "age": 23,
    "gender": "Female"
  },
  {
    "srNo": 22,
    "epicNo": "RSO1585090",
    "partNo": "27/271/1145",
    "name": "Gunde Ankita",
    "relativeName": "Gunde Laxman",
    "houseNo": "52",
    "address": "52",
    "age": 20,
    "gender": "Female"
  },
  {
    "srNo": 23,
    "epicNo": "RSO1635317",
    "partNo": "27/271/1226",
    "name": "Shinde Avinash Prabhakar",
    "relativeName": "Shinde Raghunath Chango",
    "houseNo": "G9-Krishn Nagar Tek",
    "address": "G9-Krishn Nagar Tek",
    "age": 23,
    "gender": "Female"
  },
  {
    "srNo": 24,
    "epicNo": "RSO1801042",
    "partNo": "27/271/1343",
    "name": "Tayde Somesh Niluti",
    "relativeName": "Tayde Niluti Vitthal",
    "houseNo": "Jagdamba Nagar",
    "address": "Jagdamba Nagar",
    "age": 18,
    "gender": "Male"
  }
];

const genderColors: Record<string, string> = {
  Male: "bg-blue-100 text-blue-800",
  Female: "bg-pink-100 text-pink-800",
  "Not Stated": "bg-gray-100 text-gray-800",
};

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredUsers = useMemo((): UserType[] => {
    if (!searchTerm) return userData;

    const lowercasedSearch = searchTerm.toLowerCase();
    return userData.filter(
      (user) =>
        user?.name?.toLowerCase().includes(lowercasedSearch) ||
        user?.epicNo?.toLowerCase().includes(lowercasedSearch) ||
        user?.partNo?.toLowerCase().includes(lowercasedSearch) ||
        user?.relativeName?.toLowerCase().includes(lowercasedSearch) ||
        user?.address?.toLowerCase().includes(lowercasedSearch)
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
          <p className="text-gray-600">Search and view user records</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Search users by name, EPIC number, address, relative name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""}{" "}
            found
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.srNo}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl ${genderColors[user.gender]}`}
                  >
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
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${genderColors[user.gender]}`}
                  >
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
                    {user.address || "Address not specified"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                  <span>Age: {user.age || "N/A"}</span>
                  <span>House No: {user.houseNo}</span>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No users found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm
                  ? `No results found for "${searchTerm}". Try adjusting your search terms.`
                  : "No users available."}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
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