import React, { useState } from "react";

import NewMemberCollectionForm from "./NewMemberCollectionForm";
import NewMemberCollectionTable from "./NewMemberCollectionTable";

import "./NewMemberCollection.css";

const NewMemberCollection = () => {
  const [records, setRecords] = useState([]);

  const handleSearch = (formData) => {
    console.log("Search:", formData);

    // Demo data
    // Replace this later with your API response
    setRecords([]);
  };

  return (
    <div className="new-member-collection-page">

      {/* PAGE TITLE */}
      <div className="new-member-page-title">
        NEW MEMBER COLLECTION
      </div>

      {/* SEARCH FORM */}
      <NewMemberCollectionForm
        onSearch={handleSearch}
      />

      {/* TABLE */}
      <NewMemberCollectionTable
        data={records}
      />

    </div>
  );
};

export default NewMemberCollection;