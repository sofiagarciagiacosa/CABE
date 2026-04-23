import { useState } from "react";
import UsersHeader from "./UsersHeader";
import UsersTable from "./UsersTable";
import AddUserModal from "./AddUserModal";

function UsersSection() {
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

    const reload = () => setRefresh(!refresh);

  return (
    <div className="users-section">

      <div className="section-divider" />

      <UsersHeader onAddUser={() => setShowModal(true)} />

      <UsersTable refresh={refresh} />

      {showModal && (
        <AddUserModal
            onClose={() => setShowModal(false)}
            onCreated={reload}
        />
      )}

    </div>
  );
}

export default UsersSection;