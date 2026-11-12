import React, { useState } from "react";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

import GroupEmiCollectionForm from "./GroupEmiCollectionForm";
import GroupEmiCollectionTable from "./GroupEmiCollectionTable";
import PaymentCollectionForm from "./PaymentCollectionForm";
import MemberCollectionTable from "./MemberCollectionTable";

import "./GroupEmiCollection.css";

const GroupEmiCollection = () => {
  const [filters, setFilters] = useState({
    date: "",
    paymentStatus: "Unpaid",
    branch: "",
    group: "",
  });

  const [selectedMember, setSelectedMember] = useState(null);

  const [memberCollections, setMemberCollections] = useState([]);

  const { items: members, remove } = useSwaggerEntity("groupEmiCollection");


  const handleFilterChange = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleGetRecord = () => {
    console.log("Group EMI filters:", filters);
  };

  const handleCollectPayment = (member) => {
    setSelectedMember(member);
  };

  const handleClosePayment = () => {
    setSelectedMember(null);
  };

  const handleSavePayment = (paymentData) => {
    const newPayment = {
      id: Date.now(),

      paymentDate: paymentData.paymentDate,

      amount: paymentData.amount,

      receivedBy: "ADMIN",

      paymentMode: paymentData.ledgerAccount,

      status: "PAID",

      memberName: selectedMember.memberName,

      memberCode: selectedMember.memberCode,

      loanApplication: selectedMember.loanApplication,

      group: selectedMember.group,
    };

    setMemberCollections((previous) => [
      ...previous,
      newPayment,
    ]);

    setSelectedMember(null);
  };

  return (
    <div className="group-emi-collection-page">

      {/* PAGE HEADER */}

      <div className="group-emi-collection-header">

        <h2>GROUPEMICOLLECTION</h2>

        <div className="group-emi-collection-breadcrumb">
          <span>Dashboard</span>
          <span>›</span>
          <strong>GROUPEMICOLLECTION</strong>
        </div>

      </div>

      {/* FILTER */}

      <GroupEmiCollectionForm
        filters={filters}
        onChange={handleFilterChange}
        onGetRecord={handleGetRecord}
      />

      {/* MEMBER LIST */}

      <GroupEmiCollectionTable
        data={members}
        onCollectPayment={handleCollectPayment}
      />

      {/* MEMBER COLLECTION */}

      <MemberCollectionTable
        data={memberCollections}
      />

      {/* PAYMENT POPUP */}

      {selectedMember && (
        <PaymentCollectionForm
          member={selectedMember}
          onClose={handleClosePayment}
          onSave={handleSavePayment}
        />
      )}

    </div>
  );
};

export default GroupEmiCollection;