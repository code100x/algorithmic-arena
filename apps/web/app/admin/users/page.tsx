import React from 'react';
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/table";
import { Search, ChevronDown, Trash2 } from 'lucide-react';

const UserManagementDashboard = () => {
  const users = [
    { name: "Clifford Gislason", username: "Amelie67", email: "Yoshiko80@yahoo.com" },
    { name: "Darrin Macejkovic", username: "Josefa.Corwin", email: "Kristopher_Bernier@yahoo.com" },
    { name: "Kyle Maggio", username: "Madeline.Morar52", email: "Polly.Romaguera@hotmail.com" },
    { name: "Louise Raynor", username: "Lukas.OKeefe48", email: "Wade_Gusikowski@hotmail.com" },
    { name: "Lois Waelchi", username: "Amelia.Klocko2", email: "Dulce_Hilpert38@yahoo.com" },
    { name: "Nathan Treutel", username: "Madisyn70", email: "Wade_OKeefe75@hotmail.com" },
    { name: "Doreen Turner Sr.", username: "Aletha_Gusikowski85", email: "Frederic_Kohler@yahoo.com" },
    { name: "Chester Lueilwitz", username: "Krista77", email: "Gunnar_Considine40@gmail.com" },
    { name: "Janie Fisher", username: "Shea.Jones43", email: "Kim.Ondricka@gmail.com" },
    { name: "Sarah Hammes I", username: "Dariana_Kshlerin", email: "Rolando_Gulgowski74@yahoo.com" },
  ];

  return (
    <div className="px-28 pt-8 pb-14 min-h-screen">
      <div className="mb-4 flex justify-between items-center">
        <div>

      <div className="text-slate-50 text-[32px] font-bold leading-10">
          All Users
        </div>
        </div>


        <div className="relative w-1/3">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <Input type="text" placeholder="Search users..." className="pl-10 bg-gray-900 text-white" />
        </div>
        <Button variant="outline" className="bg-gray-900 text-white">
          Newest <ChevronDown className="ml-2" size={16} />
        </Button>

      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-center">
        <Button variant="outline" className="mx-1">&lt;</Button>
        <Button variant="outline" className="mx-1 bg-blue-600 text-white">1</Button>
        <Button variant="outline" className="mx-1">2</Button>
        <Button variant="outline" className="mx-1">...</Button>
        <Button variant="outline" className="mx-1">9</Button>
        <Button variant="outline" className="mx-1">10</Button>
        <Button variant="outline" className="mx-1">&gt;</Button>
      </div>
    </div>
  );
};

export default UserManagementDashboard;