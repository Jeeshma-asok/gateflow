
import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { FiPlus, FiSearch, FiX } from "react-icons/fi";
import AddUserModal from "../../components/AdduserModal/AddUserModal";

import {
    PageContainer,
    PageHeader,
    PageTitle,
    PageDescription,
    AddButton,
    TableCard,
    TableToolbar,
    SearchInput,
    TableWrapper,
    UserTable,
    UserInfo,
    UserAvatar,
    UserName,
    UserEmail,
    StatusBadge,
    PaginationContainer,
    PaginationInfo,
    PaginationButtons,
    PageButton,
    EmptyMessage,
} from "./Users.style";
import { useRBACStore } from "../../store/rbacStore";
import { LayoutContext } from "../../contexts/Layoutcontext";

const initialUsers = [
    { id: 1, name: "John Smith", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Sarah Wilson", email: "sarah@example.com", role: "Manager", status: "Active" },
    { id: 3, name: "David Brown", email: "david@example.com", role: "User", status: "Inactive" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", role: "Manager", status: "Active" },
    { id: 5, name: "Michael Scott", email: "michael@example.com", role: "User", status: "Active" },
    { id: 6, name: "Robert Taylor", email: "robert@example.com", role: "User", status: "Inactive" },
    { id: 7, name: "Jessica Lee", email: "jessica@example.com", role: "Admin", status: "Active" },
    { id: 8, name: "Daniel Clark", email: "daniel@example.com", role: "Manager", status: "Active" },
];

const ITEMS_PER_PAGE = 5;

const Users = () => {
    const {setActiveNavItem} = useContext(LayoutContext)
    const {
        users,
        fetchUsers,
        deleteUser,
        toggleUserStatus,
    } = useRBACStore();

    useEffect(() => {
        fetchUsers();
        setActiveNavItem(1);
    }, [fetchUsers]);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            `${user.name} ${user.email}`
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [users, search]);

    const totalPages = Math.ceil(
        filteredUsers.length / ITEMS_PER_PAGE
    );

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleSearch = (value) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const getInitials = (name) =>
        name?.split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();


    const handleCreateUser = () => {
        setSearch("");
        setCurrentPage(1);
        setShowModal(false);
        setIsEdit(false);
        setSelectedUser(null);
    };

    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        
        try {
            await deleteUser(userId);
            toast.success("User deleted successfully");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to delete user"
            );
        }
    };
    const handleToggleStatus = async (id) => {
        try {
            const response = await toggleUserStatus(id);

            toast.success(response.message);
        } catch (error) {
            toast.error(
            error.response?.data?.message ||
            "Unable to update user status"
            );
        }
    };

    const handleUpdate = (user) => {
        setIsEdit(true);
        setSelectedUser(user);
        setShowModal(true);
    }
    return (
        <PageContainer>
            <PageHeader>
                <div>
                    <PageTitle>Users</PageTitle>
                    <PageDescription>
                        Manage and monitor your application users.
                    </PageDescription>
                </div>

                <AddButton onClick={() => setShowModal(true)}>
                    <FiPlus size={18} />
                    Add User
                </AddButton>
            </PageHeader>

            <TableCard>
                <TableToolbar>
                    <strong>All Users ({filteredUsers.length})</strong>

                    <div style={{ position: "relative" }}>
                        <FiSearch
                            style={{
                                position: "absolute",
                                left: "12px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#94a3b8",
                            }}
                        />

                        <SearchInput
                            style={{ paddingLeft: "36px" }}
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                </TableToolbar>

                <TableWrapper>
                    <UserTable>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedUsers.length > 0 ? (
                                paginatedUsers.map((user) => (
                                    <tr key={user.email}>
                                        <td>
                                            <UserInfo>
                                                <UserAvatar>
                                                    {getInitials(`${user.first_name} ${user.last_name}`)}
                                                </UserAvatar>

                                                <div>
                                                    <UserName>{`${user.first_name} ${user.last_name}`}</UserName>
                                                    <UserEmail>{user.email}</UserEmail>
                                                </div>
                                            </UserInfo>
                                        </td>

                                        <td>
                                            <ul>
                                                {user.role_details?.map((role) => (
                                                    <li>{role?.name}</li>
                                                ))}
                                            </ul>
                                            
                                        </td>

                                        <td>
                                            <StatusBadge $status={user.is_active}>
                                                {user.is_active? "Active" : "Inactive"}
                                            </StatusBadge>
                                        </td>

                                        <td className="action_field">
                                            <button
                                                className="view-btn"
                                                onClick={() => handleToggleStatus(user.id)}
                                            >
                                                Make {!user.is_active? "Active" : "Inactive"}
                                            </button>
                                            <button
                                                className="view-btn"
                                                onClick={() => handleUpdate(user)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <EmptyMessage colSpan="4">
                                        No users found.
                                    </EmptyMessage>
                                </tr>
                            )}
                        </tbody>
                    </UserTable>
                </TableWrapper>

                <PaginationContainer>
                    <PaginationInfo>
                        Showing{" "}
                        {filteredUsers.length === 0
                            ? 0
                            : (currentPage - 1) * ITEMS_PER_PAGE + 1}
                        {" - "}
                        {Math.min(
                            currentPage * ITEMS_PER_PAGE,
                            filteredUsers.length
                        )}{" "}
                        of {filteredUsers.length} users
                    </PaginationInfo>

                    <PaginationButtons>
                        <PageButton
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                        >
                            Previous
                        </PageButton>

                        {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1
                        ).map((page) => (
                            <PageButton
                                key={page}
                                $active={currentPage === page}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </PageButton>
                        ))}

                        <PageButton
                            disabled={
                                totalPages === 0 || currentPage === totalPages
                            }
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                        >
                            Next
                        </PageButton>
                    </PaginationButtons>
                </PaginationContainer>
            </TableCard>

            <AddUserModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                isEdit={isEdit}
                selectedUser={selectedUser}
                onSubmit={handleCreateUser}
            />
        </PageContainer>
    );
};

export default Users;
