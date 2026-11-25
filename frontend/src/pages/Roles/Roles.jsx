
import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { FiPlus, FiSearch, FiX } from "react-icons/fi";
import AddRoleModal from "../../components/AddRoleModal/AddRoleModal";

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
    StatusBadge,
    PaginationContainer,
    PaginationInfo,
    PaginationButtons,
    PageButton,
    EmptyMessage,
} from "../Users/Users.style";
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

const Roles = () => {
    const {setActiveNavItem} = useContext(LayoutContext)
    const {
        roles,
        fetchRoles,
        deleteRole,
    } = useRBACStore();

    useEffect(() => {
        fetchRoles();
        setActiveNavItem(2);
    }, [fetchRoles]);
    
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    const filteredroles = useMemo(() => {
        return roles.filter((role) =>
            `${role.name} ${role.email}`
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [roles, search]);

    const totalPages = Math.ceil(
        filteredroles.length / ITEMS_PER_PAGE
    );

    const paginatedroles = filteredroles.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleSearch = (value) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handleCreaterole = () => {
        setSearch("");
        setCurrentPage(1);
        setShowModal(false);
        setIsEdit(false);
        setSelectedRole(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this role?")) return;

        try {
            await deleteRole(id);
            toast.success("Role deleted successfully");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to delete role"
            );
        }
    };

    const handleUpdate = (role) => {
        setIsEdit(true);
        setSelectedRole(role);
        setShowModal(true);
    }
    return (
        <PageContainer>
            <PageHeader>
                <div>
                    <PageTitle>Roles</PageTitle>
                    <PageDescription>
                        Manage and monitor your application roles.
                    </PageDescription>
                </div>

                <AddButton onClick={() => setShowModal(true)}>
                    <FiPlus size={18} />
                    Add Role
                </AddButton>
            </PageHeader>

            <TableCard>
                <TableToolbar>
                    <strong>All roles ({filteredroles.length})</strong>

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
                            placeholder="Search roles..."
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                </TableToolbar>

                <TableWrapper>
                    <UserTable>
                        <thead>
                            <tr>
                                <th>Role</th>
                                <th>Policies</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedroles.length > 0 ? (
                                paginatedroles.map((role) => (
                                    <tr key={role.name}>
                                        <td>{role.name}</td>

                                        <td>
                                            <ul>
                                                {role.policy_details?.map((policy) => (
                                                    <li>{policy?.name}</li>
                                                ))}
                                            </ul>
                                        </td>

                                        <td>
                                            <StatusBadge $status={role.is_active}>
                                                {role.is_active ? 'Active' : "Inactive"}
                                            </StatusBadge>
                                        </td>

                                        <td className="action_field">
                                            <button
                                                className="view-btn"
                                                onClick={() => handleUpdate(role)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(role.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <EmptyMessage colSpan="4">
                                        No roles found.
                                    </EmptyMessage>
                                </tr>
                            )}
                        </tbody>
                    </UserTable>
                </TableWrapper>

                <PaginationContainer>
                    <PaginationInfo>
                        Showing{" "}
                        {filteredroles.length === 0
                            ? 0
                            : (currentPage - 1) * ITEMS_PER_PAGE + 1}
                        {" - "}
                        {Math.min(
                            currentPage * ITEMS_PER_PAGE,
                            filteredroles.length
                        )}{" "}
                        of {filteredroles.length} roles
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

            <AddRoleModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleCreaterole}
                isEdit={isEdit}
                selectedRole={selectedRole}
            />
        </PageContainer>
    );
};

export default Roles;
