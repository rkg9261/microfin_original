import React, { useMemo, useState } from "react";
import { useConfirm } from "../../../components/common/ConfirmModal";

import EntriesDropdown from "../../../components/common/EntriesDropdown";

import {
  FaSearch,
  FaCheck,
  FaTrash,
  FaEye,
  FaTimes,
} from "react-icons/fa";

import "./Collection.css";

const CollectionTable = ({ filters }) => {
  const confirm = useConfirm();


  // =========================================================
  // ENTRIES
  // =========================================================

  const [entries, setEntries] = useState(100);

  // =========================================================
  // SEARCH
  // =========================================================

  const [search, setSearch] = useState("");


  // =========================================================
  // COLLECTION DATA
  // =========================================================

  const [collectionData, setCollectionData] = useState([

    {
      id: 1,
      loanId: "9900",
      memberName: "SANGITA BALU KHARE",
      memberNo: "MEM-0001004",
      alias: "SANGITA BALU KHARE",
      mobile: "9529386632",
      payDate: "2026-08-19",
      amount: 1058,
      receivedBy: "ADMIN (ADM01)",
      type: "EMI",
      createdAt: "2026-08-19 15:12:37",
      ip: "149.37.52.251",
      remark: "Cash collection",
      status: "PENDING",
      branch: "SHREEJA GROUP",
    },

    {
      id: 2,
      loanId: "9912",
      memberName: "PRIYA SHARMA",
      memberNo: "MEM-0001012",
      alias: "PRIYA SHARMA",
      mobile: "9876543210",
      payDate: "2026-08-19",
      amount: 1250,
      receivedBy: "DINESH 1 (SLF015)",
      type: "EMI",
      createdAt: "2026-08-19 14:25:20",
      ip: "49.37.52.251",
      remark: "Monthly EMI",
      status: "PENDING",
      branch: "JAGATAPURA",
    },

    {
      id: 3,
      loanId: "9920",
      memberName: "RAHUL KUMAR",
      memberNo: "MEM-0001020",
      alias: "RAHUL KUMAR",
      mobile: "9876501234",
      payDate: "2026-08-18",
      amount: 850,
      receivedBy: "ADMIN (ADM01)",
      type: "EMI",
      createdAt: "2026-08-18 13:15:10",
      ip: "152.59.87.69",
      remark: "Cash received",
      status: "PENDING",
      branch: "VADODARA",
    },

  ]);


  // =========================================================
  // VIEW POPUP
  // =========================================================

  const [selectedCollection, setSelectedCollection] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);


  // =========================================================
  // FILTER DATA
  // =========================================================

  const filteredData = useMemo(() => {

    let result = [...collectionData];


    // -------------------------------------------------------
    // BRANCH
    // -------------------------------------------------------

    if (filters?.branch) {

      result = result.filter(
        (item) =>
          item.branch === filters.branch
      );

    }


    // -------------------------------------------------------
    // DATE
    // -------------------------------------------------------

    if (filters?.date) {

      result = result.filter(
        (item) =>
          item.payDate === filters.date
      );

    }


    // -------------------------------------------------------
    // STAFF
    // -------------------------------------------------------

    if (filters?.staffId) {

      if (filters.staffId === "ADM01") {

        result = result.filter(
          (item) =>
            item.receivedBy.includes("ADM01")
        );

      }

      if (filters.staffId === "SLF015") {

        result = result.filter(
          (item) =>
            item.receivedBy.includes("SLF015")
        );

      }

    }


    // -------------------------------------------------------
    // CUSTOMER
    // -------------------------------------------------------

    if (filters?.customer?.trim()) {

      const customer =
        filters.customer.toLowerCase();

      result = result.filter(
        (item) =>
          item.memberName
            .toLowerCase()
            .includes(customer)
      );

    }


    // -------------------------------------------------------
    // SEARCH
    // -------------------------------------------------------

    if (search.trim()) {

      const value =
        search.toLowerCase().trim();

      result = result.filter(
        (item) =>

          item.loanId
            .toLowerCase()
            .includes(value)

          ||

          item.memberName
            .toLowerCase()
            .includes(value)

          ||

          item.memberNo
            .toLowerCase()
            .includes(value)

          ||

          item.mobile
            .toLowerCase()
            .includes(value)

      );

    }


    return result;

  }, [
    collectionData,
    filters,
    search,
  ]);


  // =========================================================
  // TOTAL AMOUNT
  // =========================================================

  const totalAmount = filteredData.reduce(
    (total, item) =>
      total + Number(item.amount || 0),
    0
  );


  // =========================================================
  // VIEW
  // =========================================================

  const handleView = (item) => {

    setSelectedCollection(item);

    setShowDetails(true);

  };


  // =========================================================
  // CLOSE POPUP
  // =========================================================

  const closePopup = () => {

    setSelectedCollection(null);

    setShowDetails(false);

  };


  // =========================================================
  // APPROVE
  // =========================================================

  const handleApprove = async (item) => {

    const confirmed = await confirm({
      title: "Confirm Approve",
      message: `Approve collection of ₹${item.amount}?`,
      confirmText: "Approve",
      cancelText: "Cancel",
    });

    if (!confirmed) {
      return;
    }

    setCollectionData((previous) =>
      previous.map((collection) =>

        collection.id === item.id

          ? {
              ...collection,
              status: "APPROVED",
            }

          : collection
      )
    );

  };


  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (item) => {

    const confirmed = await confirm({
      title: "Confirm Delete",
      message: `Are you sure you want to delete collection of ${item.memberName}?`,
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmed) {
      return;
    }

    setCollectionData((previous) =>
      previous.filter(
        (collection) =>
          collection.id !== item.id
      )
    );

  };


  return (
    <div className="collection-list-card">


      {/* =====================================================
          LIST HEADER
      ===================================================== */}

      <div className="collection-list-header">

        <h2>
          COLLECTION LIST FOR APPROVED (₹)
        </h2>

      </div>


      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="collection-toolbar">

        <div className="collection-toolbar-left">

          <EntriesDropdown
            value={entries}
            onChange={(value) =>
              setEntries(Number(value))
            }
          />

          <strong>
            AMOUNT: ₹{totalAmount}
          </strong>

        </div>


        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="collection-search">

          <input
            type="text"
            placeholder="Search Application"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button type="button">
            <FaSearch />
          </button>

        </div>

      </div>


      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="common-table-wrapper">

        <table className="common-table">

          <thead>

            <tr>

              <th>
                SR. NO.
              </th>

              <th>
                LOAN ID
              </th>

              <th>
                MEM NAME
              </th>

              <th>
                (C/O) ALIAS
              </th>

              <th>
                MOBILE
              </th>

              <th>
                PAYDATE
              </th>

              <th>
                AMOUNT
              </th>

              <th>
                RECEIVED BY
              </th>

              <th>
                TYPE
              </th>

              <th>
                CREATED
              </th>

              <th>
                REMARK
              </th>

              <th>
                STATUS
              </th>

              <th>
                ACTION
              </th>

            </tr>

          </thead>


          <tbody>

            {filteredData
              .slice(0, entries)
              .map((item, index) => (

                <tr key={item.id}>

                  {/* SR */}

                  <td>
                    {index + 1}
                  </td>


                  {/* LOAN ID */}

                  <td>

                    <div className="collection-loan-id">

                      <span>
                        ⊙
                      </span>

                      {item.loanId}

                    </div>

                    <small>
                      {item.branch}
                    </small>

                  </td>


                  {/* MEMBER */}

                  <td>

                    <div className="collection-member-name">

                      <span className="collection-user-icon">
                        ♟
                      </span>

                      <div>

                        <strong>
                          {item.memberName}
                        </strong>

                        <small>
                          ({item.memberNo})
                        </small>

                      </div>

                    </div>

                  </td>


                  {/* ALIAS */}

                  <td>
                    {item.alias}
                  </td>


                  {/* MOBILE */}

                  <td>
                    ☎ {item.mobile}
                  </td>


                  {/* PAY DATE */}

                  <td>
                    📅 {item.payDate}
                  </td>


                  {/* AMOUNT */}

                  <td>

                    <strong className="collection-amount">
                      ₹ {item.amount}/-
                    </strong>

                    <small className="collection-cash">
                      CASH
                    </small>

                  </td>


                  {/* RECEIVED BY */}

                  <td>

                    <strong className="collection-received">
                      ⚑ {item.receivedBy}
                    </strong>

                  </td>


                  {/* TYPE */}

                  <td>
                    {item.type}
                  </td>


                  {/* CREATED */}

                  <td>

                    <div className="collection-created">

                      <span>
                        ◈ {item.createdAt}
                      </span>

                      <small>
                        ◈ {item.ip}
                      </small>

                    </div>

                  </td>


                  {/* REMARK */}

                  <td>
                    {item.remark}
                  </td>


                  {/* STATUS */}

                  <td>

                    <span
                      className={`collection-status ${
                        item.status === "APPROVED"
                          ? "approved"
                          : "pending"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>


                  {/* ACTION */}

                  <td>

                    <div className="collection-actions">

                      {/* VIEW */}

                      <button
                        type="button"
                        className="collection-view-btn"
                        title="View"
                        onClick={() =>
                          handleView(item)
                        }
                      >
                        <FaEye />
                      </button>


                      {/* APPROVE */}

                      {item.status !== "APPROVED" && (

                        <button
                          type="button"
                          className="collection-approve-btn"
                          title="Approve"
                          onClick={() =>
                            handleApprove(item)
                          }
                        >
                          <FaCheck />
                        </button>

                      )}


                      {/* DELETE */}

                      <button
                        type="button"
                        className="collection-delete-btn"
                        title="Delete"
                        onClick={() =>
                          handleDelete(item)
                        }
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}


            {/* =================================================
                NO DATA
            ================================================= */}

            {filteredData.length === 0 && (

              <tr>

                <td
                  colSpan="13"
                  className="common-table-empty"
                >
                  Showing 0 to 0 of 0 entries
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="collection-footer">

        <span>

          Showing 1 to{" "}

          {Math.min(
            filteredData.length,
            entries
          )}

          {" "}of{" "}

          {filteredData.length}

          {" "}entries

        </span>


        <div className="collection-pagination">

          <button disabled>
            PREV
          </button>

          <button className="active">
            1
          </button>

          <button disabled>
            NEXT
          </button>

        </div>

      </div>


      {/* =====================================================
          VIEW DETAILS POPUP
      ===================================================== */}

      {showDetails && selectedCollection && (

        <div
          className="collection-overlay"
          onClick={closePopup}
        >

          <div
            className="collection-details-popup"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* =================================================
                POPUP HEADER
            ================================================= */}

            <div className="collection-popup-header">

              <h2>
                COLLECTION DETAILS
              </h2>

              <button
                type="button"
                onClick={closePopup}
              >
                <FaTimes />
              </button>

            </div>


            {/* =================================================
                POPUP BODY
            ================================================= */}

            <div className="collection-popup-body">


              <div className="collection-detail-section">

                <h3>
                  MEMBER DETAILS
                </h3>

                <CollectionDetail
                  label="MEMBER NAME"
                  value={
                    selectedCollection.memberName
                  }
                />

                <CollectionDetail
                  label="MEMBER NO."
                  value={
                    selectedCollection.memberNo
                  }
                />

                <CollectionDetail
                  label="MOBILE"
                  value={
                    selectedCollection.mobile
                  }
                />

                <CollectionDetail
                  label="ALIAS"
                  value={
                    selectedCollection.alias
                  }
                />

                <CollectionDetail
                  label="BRANCH"
                  value={
                    selectedCollection.branch
                  }
                />

              </div>


              <div className="collection-detail-section">

                <h3>
                  PAYMENT DETAILS
                </h3>

                <CollectionDetail
                  label="LOAN ID"
                  value={
                    selectedCollection.loanId
                  }
                />

                <CollectionDetail
                  label="PAYMENT DATE"
                  value={
                    selectedCollection.payDate
                  }
                />

                <CollectionDetail
                  label="AMOUNT"
                  value={
                    `₹ ${selectedCollection.amount}/-`
                  }
                />

                <CollectionDetail
                  label="TYPE"
                  value={
                    selectedCollection.type
                  }
                />

                <CollectionDetail
                  label="STATUS"
                  value={
                    selectedCollection.status
                  }
                />

              </div>


              <div className="collection-detail-section">

                <h3>
                  COLLECTION INFORMATION
                </h3>

                <CollectionDetail
                  label="RECEIVED BY"
                  value={
                    selectedCollection.receivedBy
                  }
                />

                <CollectionDetail
                  label="CREATED AT"
                  value={
                    selectedCollection.createdAt
                  }
                />

                <CollectionDetail
                  label="IP ADDRESS"
                  value={
                    selectedCollection.ip
                  }
                />

                <CollectionDetail
                  label="REMARK"
                  value={
                    selectedCollection.remark
                  }
                />

              </div>

            </div>


            {/* =================================================
                POPUP FOOTER
            ================================================= */}

            <div className="collection-popup-footer">

              {selectedCollection.status !== "APPROVED" && (

                <button
                  type="button"
                  className="collection-popup-approve"
                  onClick={() => {

                    handleApprove(
                      selectedCollection
                    );

                    setSelectedCollection({
                      ...selectedCollection,
                      status: "APPROVED",
                    });

                  }}
                >
                  <FaCheck />
                  Approve
                </button>

              )}


              <button
                type="button"
                className="collection-popup-delete"
                onClick={() => {

                  handleDelete(
                    selectedCollection
                  );

                  closePopup();

                }}
              >
                <FaTrash />
                Delete
              </button>


              <button
                type="button"
                className="collection-popup-close"
                onClick={closePopup}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};


// =============================================================
// DETAIL COMPONENT
// =============================================================

const CollectionDetail = ({
  label,
  value,
}) => {

  return (
    <div className="collection-detail-row">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );

};


export default CollectionTable;