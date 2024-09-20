"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import { Search, ChevronDown } from 'lucide-react';
import UsersTable from '../../../components/Admin/UsersTable';
import PaginationComponent from '../../../components/Pagination';

const UserManagementDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  const users = [
      { name: "Clifford", username: "Amelie67", email: "Yoshiko80@yahoo.com" },
      { name: "Darrin", username: "Josefa.Corwin", email: "Kristopher_Bernier@yahoo.com" },
      { name: "Kyle", username: "Madeline.Morar52", email: "Polly.Romaguera@hotmail.com" },
      { name: "Louise Raynor", username: "Lukas.OKeefe48", email: "Wade_Gusikowski@hotmail.com" },
      { name: "Lois", username: "Amelia.Klocko2", email: "Dulce_Hilpert38@yahoo.com" },
      { name: "Treutel", username: "Madisyn70", email: "Wade_OKeefe75@hotmail.com" },
      { name: "Dor Sr.", username: "Aletha_Gusikowski85", email: "Frederic_Kohler@yahoo.com" },
      { name: "Lueilwitz", username: "Krista77", email: "Gunnar_Considine40@gmail.com" },
      { name: "Janie Fisher", username: "Shea.Jones43", email: "Kim.Ondricka@gmail.com" },
      { name: "Sarah I", username: "Dariana_Kshlerin", email: "Rolando_Gulgowski74@yahoo.com" },
      { name: "Zachary", username: "Zach67", email: "zachary@example.com" },
      { name: "Emily", username: "Emmy28", email: "emily@yahoo.com" },
      { name: "Henry", username: "Henry89", email: "henry@outlook.com" },
      { name: "Julia", username: "Jules88", email: "julia@gmail.com" },
      { name: "Michael", username: "MikeSmith", email: "michael@hotmail.com" },
      { name: "Alice", username: "Ally24", email: "alice@gmail.com" },
      { name: "David", username: "Davie29", email: "david@yahoo.com" },
      { name: "Karen", username: "KareBear", email: "karen@example.com" },
      { name: "John", username: "Johnny123", email: "john@gmail.com" },
      { name: "Samantha", username: "SammyGirl", email: "samantha@hotmail.com" },
      { name: "Paul", username: "PaulieP", email: "paul@example.com" },
  ];

  const totalPages = Math.ceil(users.length / itemsPerPage);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Adjust delay as needed
    
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchTerm]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="px-28 pt-8 pb-14 min-h-screen">
      <div className="text-slate-50 text-[32px] font-bold leading-10 mb-6">
        All Users
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="relative w-1/3 mb-6">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <Input
            type="text"
            placeholder="Search users..."
            className="pl-10 bg-gray-900 text-white w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button variant="outline" className="bg-gray-900 text-white">
          Newest <ChevronDown className="ml-2" size={16} />
        </Button>
      </div>

      <UsersTable users={currentUsers} />

      <div className="mt-4 flex justify-center">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default UserManagementDashboard;
