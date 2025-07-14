"use client";

import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import Image from "next/image";
import { USER_ROLES } from "@/constants/userRoles";
import { UserDto } from "@/types/users/UsersDto";
import { ManageUsersService } from "@/services/ManageUsers.module";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function AdminAllUsersContent() {
  const [allUsers, setAllUsers] = useState<UserDto[]>([]);
  const [users, setUsers] = useState<UserDto[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [debouncedName] = useDebounce(name, 300);
  const [debouncedEmail] = useDebounce(email, 300);

  useEffect(() => {
    const manageUsersService = ManageUsersService();
    const fetchUsers = async () => {
      try {
        const response = await manageUsersService.getAllUsers();
        if (response.success) {
          setAllUsers(response.data);
          setUsers(response.data);
        } else {
          toast.error(getErrorMessage(response.error));
        }
      } catch {
        toast.error("Error while fetching users. Please contact support");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = allUsers.filter((u) => {
      const matchName = u.name
        .toLowerCase()
        .includes(debouncedName.toLowerCase());
      const matchEmail = u.email
        .toLowerCase()
        .includes(debouncedEmail.toLowerCase());
      return matchName && matchEmail;
    });
    setUsers(filtered);
  }, [debouncedName, debouncedEmail, allUsers]);

  const columns: ColumnDef<UserDto>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 min-w-[150px] max-w-[180px] sm:max-w-none">
            {row.original.profilePic && (
              <Image
                src={row.original.profilePic}
                alt={row.original.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <span className="truncate">{row.original.name}</span>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <span className="text-sm text-gray-700 break-words sm:whitespace-nowrap">
            {row.original.email}
          </span>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <span
            className={`px-2 py-0.5 text-xs rounded-full ${
              row.original.role.toLowerCase() === USER_ROLES.ADMIN
                ? "bg-blue-100 text-blue-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {row.original.role}
          </span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => {
          const date = row.original.createdAt
            ? new Date(row.original.createdAt)
            : null;
          return (
            <span className="text-sm text-gray-600">
              {date
                ? date.toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "Asia/Kolkata",
                  })
                : "—"}
            </span>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <main className="flex-1 py-5 px-4 pt-30">
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Users List</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              className="border-1 border-gray-400"
              placeholder="Search by name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              className="border-1 border-gray-400"
              placeholder="Search by email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <DataTable columns={columns} data={users} />
        </div>
      </main>
    </>
  );
}
