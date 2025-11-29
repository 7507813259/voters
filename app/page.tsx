"use client";
import { useState, useMemo, useEffect } from "react";
import {
  Search,
  User,
  MapPin,
  Users,
  IdCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { User as UserType } from "./types/index";
import { userData } from "./index";

const ITEMS_PER_PAGE = 20;

const genderColors: Record<string, string> = {
  Male: "bg-blue-100 text-blue-800",
  Female: "bg-pink-100 text-pink-800",
  "Not Stated": "bg-gray-100 text-gray-800",
};

const UserCard = ({ user }: { user: UserType }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
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
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            genderColors[user.gender]
          }`}
        >
          {user.gender}
        </span>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            genderColors[user.gender]
          }`}
        >
          {user.srNo}
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
);

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset to first page on new search
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredUsers = useMemo((): UserType[] => {
    if (!debouncedSearch.trim()) return userData;

    const lowercasedSearch = debouncedSearch.toLowerCase().trim();
    return userData.filter((user) => {
      const searchableFields = [
        user.name || "",
        user.epicNo || "",
        user.partNo || "",
        user.relativeName || "",
        user.address || "",
        user.houseNo || "",
        user.age || "",
        user.gender || "",
      ].map((field) => field.toString().toLowerCase());

      return searchableFields.some((field) => field.includes(lowercasedSearch));
    });
  }, [debouncedSearch]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

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
              placeholder="Search users by name, EPIC number, address, husband name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1}-
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
            {debouncedSearch && ` for "${debouncedSearch}"`}
          </p>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border text-blue-600 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg border text-sm transition-colors ${
                    currentPage === page
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 hover:bg-gray-50 text-blue-600"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border text-blue-600 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {paginatedUsers.map((user, index) => (
            <UserCard
              key={`${user.srNo}-${user.epicNo}-${index}`}
              user={user}
            />
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
                {debouncedSearch
                  ? `No results found for "${debouncedSearch}". Try adjusting your search terms.`
                  : "No users available."}
              </p>
              {debouncedSearch && (
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
