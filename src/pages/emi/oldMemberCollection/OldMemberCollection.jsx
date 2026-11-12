import React, { useState } from "react";

import OldMemberCollectionForm from "./OldMemberCollectionForm";
import OldMemberCollectionTable from "./OldMemberCollectionTable";

import "./OldMemberCollection.css";

const OldMemberCollection = () => {
  const [records, setRecords] = useState([]);

  const [selectedMember, setSelectedMember] = useState(null);

  const handleSearch = (formData) => {
    console.log("Search Data:", formData);

    // Demo data
    setRecords([]);
  };

  const handleSubmitApplication = (applicationNumber) => {
    console.log("Application Number:", applicationNumber);

    // Demo data
    setSelectedMember(null);
    setRecords([]);
  };

  return (
    <div className="old-member-collection-page">

      {/* PAGE TITLE */}
      <div className="old-member-collection-title">
        OLDMEMBERCOLLECTION
      </div>

      {/* FILTER + SINGLE MEMBER FORM */}
      <OldMemberCollectionForm
        onSearch={handleSearch}
        onSubmitApplication={handleSubmitApplication}
      />

      {/* MEMBER COLLECTION TABLE */}
      <OldMemberCollectionTable
        data={records}
        selectedMember={selectedMember}
      />

    </div>
  );
};

export default OldMemberCollection;