import React, { useEffect, useState } from "react";

import "../../../components/common/CommonForm.css";
import "../../../utils/validation.css";
import { validateRequired } from "../../../utils/validation";
import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../../components/buttons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchBranches } from "../../../store/slices/branchSlice";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

const GroupMemberForm = ({ data, onSave, onClose }) => {
  const dispatch = useAppDispatch();
  const { items: branches, loading: branchesLoading } = useAppSelector(
    (state) => state.branch
  );
  const { items: groups } = useSwaggerEntity("group");
  const { items: members } = useSwaggerEntity("member");

  const [formData, setFormData] = useState({
    branchId: "",
    groupId: "",
    memberId: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setFormData({
        branchId:
          data.branchId != null && data.branchId !== ""
            ? String(data.branchId)
            : "",
        groupId:
          data.groupId != null && data.groupId !== ""
            ? String(data.groupId)
            : "",
        memberId:
          data.memberId != null && data.memberId !== ""
            ? String(data.memberId)
            : "",
      });
    } else {
      const defaultBranchId = branches[0]?.branchId ?? branches[0]?.id;
      setFormData({
        branchId: defaultBranchId != null ? String(defaultBranchId) : "",
        groupId: "",
        memberId: "",
      });
    }
    setErrors({});
  }, [data, branches]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateRequired(formData, [
      { name: "branchId", label: "Branch" },
      { name: "groupId", label: "Group" },
      { name: "memberId", label: "Member" },
    ]);

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const selectedGroup = groups.find(
      (item) => String(item.id) === String(formData.groupId)
    );
    const selectedMember = members.find(
      (item) =>
        String(item.memberId ?? item.id) === String(formData.memberId)
    );
    const selectedBranch = branches.find(
      (item) =>
        String(item.branchId ?? item.id) === String(formData.branchId)
    );

    onSave({
      branchId: formData.branchId,
      groupId: formData.groupId,
      memberId: formData.memberId,
      branch: selectedBranch?.branchName || selectedBranch?.name || "",
      name: selectedGroup?.groupName || selectedGroup?.name || "",
      memberName: selectedMember?.memberName || "",
    });
  };

  return (
    <div className="common-modal">
      <div className="common-modal-content group-member-form-modal">
        <div className="common-modal-header">
          <h2>{data ? "EDIT GROUP MEMBER" : "ADD NEW"}</h2>
          <CloseButton onClick={onClose} />
        </div>

        <form className="common-form group-member-form" onSubmit={handleSubmit}>
          <div className="common-form-grid">
            <div className="common-form-group">
              <label>
                Branch <span>*</span>
              </label>
              <select
                name="branchId"
                value={formData.branchId}
                onChange={handleChange}
                disabled={branchesLoading}
                className={errors.branchId ? "error-input" : ""}
              >
                <option value="">
                  {branchesLoading
                    ? "Loading branches..."
                    : branches.length
                    ? "Select Branch"
                    : "No branches available"}
                </option>
                {branches.map((branch) => {
                  const id = branch.branchId ?? branch.id;
                  return (
                    <option key={id} value={String(id)}>
                      {branch.branchName || branch.name || `Branch ${id}`}
                    </option>
                  );
                })}
              </select>
              {errors.branchId && (
                <p className="error-text">{errors.branchId}</p>
              )}
            </div>

            <div className="common-form-group">
              <label>
                Member <span>*</span>
              </label>
              <select
                name="memberId"
                value={formData.memberId}
                onChange={handleChange}
                className={errors.memberId ? "error-input" : ""}
              >
                <option value="">Select Member</option>
                {members.map((member) => {
                  const id = member.memberId ?? member.id;
                  return (
                    <option key={id} value={String(id)}>
                      {member.memberName || `Member ${id}`}
                    </option>
                  );
                })}
              </select>
              {errors.memberId && (
                <p className="error-text">{errors.memberId}</p>
              )}
            </div>

            <div className="common-form-group">
              <label>
                Group <span>*</span>
              </label>
              <select
                name="groupId"
                value={formData.groupId}
                onChange={handleChange}
                className={errors.groupId ? "error-input" : ""}
              >
                <option value="">Select Group</option>
                {groups.map((group) => (
                  <option key={group.id} value={String(group.id)}>
                    {group.groupName || group.name || `Group ${group.id}`}
                  </option>
                ))}
              </select>
              {errors.groupId && (
                <p className="error-text">{errors.groupId}</p>
              )}
            </div>
          </div>

          <div className="common-form-buttons">
            <SaveButton type="submit" text="Create" />
            <CancelButton type="button" text="Cancel" onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupMemberForm;
