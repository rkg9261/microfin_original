import React, { useMemo, useState } from "react";

import "./DeathMember.css";

import {
  AddButton,
  ViewButton,
} from "../../../components/buttons";

import EntriesDropdown from "../../../components/common/EntriesDropdown";

import DeathMemberForm from "./DeathMemberForm";
import DeathMemberDetails from "./DeathMemberDetails";


const DeathMember = () => {

  // =========================================================
  // STATIC DATA
  // =========================================================

  const initialData = [
    {
      id: 1,

      branch: "BRANCH M FINANCE",

      memberName: "RAJU (00003)",

      memberCode: "00003",

      deathDate: "28-08-2024",

      deathTime: "10 AM",

      deathCause: "NATURAL",

      mobile: "8569780021",

      verifiedBy: "SUNIL DAS (VNL5532)",

      staffId: "VNL5532",
    },

    {
      id: 2,

      branch: "SHREEJA GROUP",

      memberName: "MEM 2 (MEM2)",

      memberCode: "MEM2",

      deathDate: "14-06-2024",

      deathTime: "11 AM",

      deathCause: "HEART STROKE",

      mobile: "1111111",

      verifiedBy: "MANGAL (AG2)",

      staffId: "AG2",
    },
  ];


  // =========================================================
  // STATES
  // =========================================================

  const [deathMembers, setDeathMembers] =
    useState(initialData);


  const [entries, setEntries] =
    useState(10);


  const [search, setSearch] =
    useState("");


  const [branchFilter, setBranchFilter] =
    useState("");


  const [dateFilter, setDateFilter] =
    useState("");


  // Add popup

  const [showForm, setShowForm] =
    useState(false);


  // Details popup

  const [selectedMember, setSelectedMember] =
    useState(null);


  // =========================================================
  // BRANCHES
  // =========================================================

  const branches = [
    "BRANCH M FINANCE",
    "SHREEJA GROUP",
  ];


  // =========================================================
  // SEARCH + FILTER
  // =========================================================

  const filteredData = useMemo(() => {

    return deathMembers.filter((item) => {

      const searchText =
        search.toLowerCase().trim();


      const matchesSearch =
        item.memberName
          ?.toLowerCase()
          .includes(searchText) ||

        item.mobile
          ?.toLowerCase()
          .includes(searchText) ||

        item.deathCause
          ?.toLowerCase()
          .includes(searchText) ||

        item.branch
          ?.toLowerCase()
          .includes(searchText);


      const matchesBranch =
        branchFilter === "" ||
        item.branch === branchFilter;


      const matchesDate =
        dateFilter === "" ||
        item.deathDate === dateFilter;


      return (
        matchesSearch &&
        matchesBranch &&
        matchesDate
      );

    });

  }, [
    deathMembers,
    search,
    branchFilter,
    dateFilter,
  ]);


  // =========================================================
  // ADD NEW
  // =========================================================

  const handleAddNew = () => {

    setShowForm(true);

  };


  // =========================================================
  // CLOSE FORM
  // =========================================================

  const handleCloseForm = () => {

    setShowForm(false);

  };


  // =========================================================
  // SAVE MEMBER
  // =========================================================

  const handleSaveMember = (formData) => {

    const newMember = {

      id:
        deathMembers.length > 0
          ? Math.max(
              ...deathMembers.map(
                (item) => item.id
              )
            ) + 1
          : 1,

      ...formData,

    };


    setDeathMembers((prev) => [

      ...prev,

      newMember,

    ]);


    setShowForm(false);

  };


  // =========================================================
  // VIEW DETAILS
  // =========================================================

  const handleView = (member) => {

    setSelectedMember(member);

  };


  // =========================================================
  // CLOSE DETAILS
  // =========================================================

  const handleCloseDetails = () => {

    setSelectedMember(null);

  };


  // =========================================================
  // JSX
  // =========================================================

  return (

    <div className="death-member-page">


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="death-member-title">

        <h2>
          DEATH MEMBER
        </h2>

      </div>


      {/* =====================================================
          FILTER CARD
      ===================================================== */}

      <div className="death-filter-card">

        <div className="death-filter-heading">

          FILTER BY

        </div>


        <div className="death-filter-row">


          {/* BRANCH */}

          <div className="death-filter-field">

            <label>
              BRANCH
            </label>

            <select
              value={branchFilter}
              onChange={(e) =>
                setBranchFilter(
                  e.target.value
                )
              }
            >

              <option value="">
                Select Branch
              </option>

              {branches.map(
                (branch) => (

                  <option
                    key={branch}
                    value={branch}
                  >
                    {branch}
                  </option>

                )
              )}

            </select>

          </div>


          {/* DATE */}

          <div className="death-filter-field">

            <label>
              DATE
            </label>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) =>
                setDateFilter(
                  e.target.value
                )
              }
            />

          </div>


          {/* GET RECORD */}

          <button
            type="button"
            className="death-get-record"
          >
            GET RECORD
          </button>

        </div>

      </div>


      {/* =====================================================
          TABLE CARD
      ===================================================== */}

      <div className="death-table-card">


        {/* TABLE HEADER */}

        <div className="death-table-header">

          <h2>
            DEATH MEMBER LIST
          </h2>


          <AddButton
            text="Add New"
            onClick={handleAddNew}
          />

        </div>


        {/* TABLE TOP */}

        <div className="death-table-tools">


          {/* ENTRIES */}

          <EntriesDropdown
            value={entries}
            onChange={setEntries}
          />


          {/* SEARCH */}

          <div className="death-search">

            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            <span>
              🔍
            </span>

          </div>

        </div>


        {/* =================================================
            TABLE
        ================================================= */}

        <div className="common-table-wrapper">

          <table className="common-table">

            <thead>

              <tr>

                <th>
                  SR. NO.
                </th>

                <th>
                  NAME
                </th>

                <th>
                  DEATH DATE
                </th>

                <th>
                  CAUSE
                </th>

                <th>
                  MOBILE NO
                </th>

                <th>
                  VERIFIED BY
                </th>

                <th>
                  BRANCH
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

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {item.memberName}
                    </td>

                    <td>
                      {item.deathDate}
                    </td>

                    <td>
                      {item.deathCause}
                    </td>

                    <td>
                      {item.mobile}
                    </td>

                    <td>
                      {item.verifiedBy}
                    </td>

                    <td>
                      {item.branch}
                    </td>

                    <td>

                      <div className="death-action">

                        <ViewButton
                          onClick={() =>
                            handleView(item)
                          }
                        />

                      </div>

                    </td>

                  </tr>

                ))}


              {/* EMPTY */}

              {filteredData.length === 0 && (

                <tr>

                  <td
                    colSpan="8"
                    className="common-table-empty"
                  >

                    No Death Member Found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="death-table-footer">

          SHOWING 1 TO{" "}

          {Math.min(
            filteredData.length,
            entries
          )}{" "}

          OF{" "}

          {filteredData.length}{" "}

          ENTRIES


          <div className="death-pagination">

            <button>
              «
            </button>

            <button>
              PREV
            </button>

            <button className="death-page-active">
              1
            </button>

            <button>
              NEXT
            </button>

            <button>
              »
            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          ADD FORM POPUP
      ===================================================== */}

      {showForm && (

        <DeathMemberForm

          branches={branches}

          onSave={handleSaveMember}

          onClose={handleCloseForm}

        />

      )}


      {/* =====================================================
          DETAILS POPUP
      ===================================================== */}

      {selectedMember && (

        <DeathMemberDetails

          member={selectedMember}

          onClose={handleCloseDetails}

        />

      )}

    </div>

  );

};


export default DeathMember;