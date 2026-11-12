import React, { useEffect, useState } from "react";
import {
  CancelButton,
  CloseButton,
  SaveButton,
} from "../../../components/buttons";
import { validateRequired } from "../../../utils/validation";
import "../../../utils/validation.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchBranches } from "../../../store/slices/branchSlice";
import { fetchDesignations } from "../../../store/slices/designationSlice";
import { fetchStates } from "../../../store/slices/stateSlice";
import { getCompanies } from "../../../api/branchApi";
import { getBankMasters } from "../../../api/bankApi";
import "./Employee.css";

const todayInputDate = () => new Date().toISOString().slice(0, 10);

const toInputDate = (value) => {
  if (!value) return "";
  const raw = String(value);
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 10);
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().slice(0, 10);
};

const splitName = (fullName = "") => {
  const parts = String(fullName).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
};

const initialForm = {
  companyId: "",
  branchId: "",
  employeeCode: "",
  name: "",
  firstName: "",
  lastName: "",
  middleName: "",
  gender: "",
  fatherName: "",
  dateOfBirth: "",
  email: "",
  mobileNumber: "",
  alternateMobileNumber: "",
  designationId: "",
  staffRole: "Permanent",
  joiningDate: todayInputDate(),
  password: "",
  address: "",
  city: "",
  stateId: "",
  pincode: "",
  nameAlias: "",
  lastExperience: "",
  bankAccountNumber: "",
  ifscCode: "",
  aadhaarNumber: "",
  accountHolderName: "",
  bankBranch: "",
  panNumber: "",
  bankId: "",
  kycStatus: "PENDING",
  loginStatus: "ACTIVE",
};

const EmployeeForm = ({ data, onClose, onSave, loading }) => {
  const dispatch = useAppDispatch();
  const { items: branches, loading: branchesLoading } = useAppSelector(
    (state) => state.branch
  );
  const { items: designations, loading: designationsLoading } = useAppSelector(
    (state) => state.designation
  );
  const { items: states, loading: statesLoading } = useAppSelector(
    (state) => state.stateMaster
  );

  const [companies, setCompanies] = useState([]);
  const [banks, setBanks] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchDesignations());
    dispatch(fetchStates());

    let active = true;
    Promise.all([getCompanies(), getBankMasters().catch(() => [])]).then(
      ([companyList, bankList]) => {
        if (!active) return;
        setCompanies(companyList || []);
        setBanks(Array.isArray(bankList) ? bankList : []);
      }
    );

    return () => {
      active = false;
    };
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const fullName =
        data.name ||
        [data.firstName, data.middleName, data.lastName].filter(Boolean).join(" ");

      setFormData({
        ...initialForm,
        companyId: data.companyId != null ? String(data.companyId) : "",
        branchId: data.branchId != null ? String(data.branchId) : "",
        employeeCode: data.employeeCode || "",
        name: fullName,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        middleName: data.middleName || data.nameAlias || "",
        gender: data.gender || "",
        fatherName: data.fatherName || "",
        dateOfBirth: toInputDate(data.dateOfBirth),
        email: data.email || "",
        mobileNumber: data.mobileNumber || "",
        alternateMobileNumber: data.alternateMobileNumber || "",
        designationId:
          data.designationId != null ? String(data.designationId) : "",
        staffRole: data.employmentType || data.staffRole || "Permanent",
        joiningDate: toInputDate(data.joiningDate || data.doj) || todayInputDate(),
        password: "",
        address: data.address || "",
        city: data.city || "",
        stateId: data.stateId != null ? String(data.stateId) : "",
        pincode: data.pincode || "",
        nameAlias: data.middleName || data.nameAlias || "",
        lastExperience: data.lastExperience || "",
        bankAccountNumber: data.bankAccountNumber || "",
        ifscCode: data.ifscCode || "",
        aadhaarNumber: data.aadhaarNumber || "",
        accountHolderName: data.accountHolderName || "",
        bankBranch: data.bankBranch || "",
        panNumber: data.panNumber || "",
        bankId: data.bankId != null ? String(data.bankId) : "",
        kycStatus: String(data.kycStatus || data.employmentStatus || "PENDING").toUpperCase(),
        loginStatus: data.isActive === false ? "INACTIVE" : "ACTIVE",
      });
    } else {
      const defaultBranchId = branches[0]?.branchId ?? branches[0]?.id;
      const defaultCompanyId = companies[0]?.id ?? companies[0]?.companyId ?? 1;
      const defaultDesignationId =
        designations[0]?.designationId ?? designations[0]?.id;

      setFormData({
        ...initialForm,
        companyId: defaultCompanyId != null ? String(defaultCompanyId) : "1",
        branchId: defaultBranchId != null ? String(defaultBranchId) : "",
        designationId:
          defaultDesignationId != null ? String(defaultDesignationId) : "",
        employeeCode: `EMP${Date.now().toString().slice(-6)}`,
        joiningDate: todayInputDate(),
      });
    }
    setErrors({});
  }, [data, branches, companies, designations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "name") {
        const parts = splitName(value);
        next.firstName = parts.firstName;
        next.lastName = parts.lastName;
      }
      if (name === "nameAlias") {
        next.middleName = value;
      }
      return next;
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validateRequired(formData, [
      { name: "branchId", label: "Branch" },
      { name: "name", label: "Name" },
      { name: "gender", label: "Gender" },
      { name: "fatherName", label: "Father Name" },
      { name: "dateOfBirth", label: "DOB Date" },
      { name: "email", label: "Contact Email" },
      { name: "mobileNumber", label: "Contact Number 1" },
      { name: "designationId", label: "Designation" },
      { name: "staffRole", label: "Staff Role" },
      { name: "joiningDate", label: "Joining Date" },
      { name: "address", label: "Address" },
      { name: "city", label: "City" },
      { name: "stateId", label: "State" },
      { name: "pincode", label: "Pincode" },
    ]);

    if (!data && !formData.password) {
      validation.password = "Password is required";
    }

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    const payload = {
      ...formData,
      firstName: formData.firstName || splitName(formData.name).firstName,
      lastName: formData.lastName || splitName(formData.name).lastName,
      middleName: formData.nameAlias || formData.middleName || null,
      employmentType: formData.staffRole,
      employmentStatus: formData.kycStatus,
      isActive: formData.loginStatus === "ACTIVE",
    };

    onSave(payload);
  };

  return (
    <div className="employee-modal">
      <div className="employee-modal-content">
        <div className="employee-modal-header">
          <h2>{data ? "EDIT EMPLOYEE" : "ADD NEW EMPLOYEE"}</h2>
          <CloseButton onClick={onClose} />
        </div>

        <form className="employee-form" onSubmit={handleSubmit}>
          <div className="employee-form-grid">
            <div className="employee-form-group">
              <label>Branch <span>*</span></label>
              <select
                name="branchId"
                value={formData.branchId}
                onChange={handleChange}
                disabled={branchesLoading}
                className={errors.branchId ? "error-input" : ""}
              >
                <option value="">
                  {branchesLoading ? "Loading branches..." : "Select Company Branch"}
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
              {errors.branchId && <p className="error-text">{errors.branchId}</p>}
            </div>

            <div className="employee-form-group">
              <label>Contact Number 1 <span>*</span></label>
              <input
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className={errors.mobileNumber ? "error-input" : ""}
              />
              {errors.mobileNumber && (
                <p className="error-text">{errors.mobileNumber}</p>
              )}
            </div>

            <div className="employee-form-group">
              <label>Address <span>*</span></label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                className={errors.address ? "error-input" : ""}
              />
              {errors.address && <p className="error-text">{errors.address}</p>}
            </div>

            <div className="employee-form-group">
              <label>Name <span>*</span></label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Employee Name"
                className={errors.name ? "error-input" : ""}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            <div className="employee-form-group">
              <label>Contact Number 2</label>
              <input
                name="alternateMobileNumber"
                value={formData.alternateMobileNumber}
                onChange={handleChange}
                placeholder="Enter alternate number"
              />
            </div>

            <div className="employee-form-group">
              <label>City <span>*</span></label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter Employee city"
                className={errors.city ? "error-input" : ""}
              />
              {errors.city && <p className="error-text">{errors.city}</p>}
            </div>

            <div className="employee-form-group">
              <label>Select Gender <span>*</span></label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={errors.gender ? "error-input" : ""}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="error-text">{errors.gender}</p>}
            </div>

            <div className="employee-form-group">
              <label>Designation <span>*</span></label>
              <select
                name="designationId"
                value={formData.designationId}
                onChange={handleChange}
                disabled={designationsLoading}
                className={errors.designationId ? "error-input" : ""}
              >
                <option value="">
                  {designationsLoading
                    ? "Loading designations..."
                    : "Select Designation"}
                </option>
                {designations.map((item) => {
                  const id = item.designationId ?? item.id;
                  return (
                    <option key={id} value={String(id)}>
                      {item.designationName || item.name || `Designation ${id}`}
                    </option>
                  );
                })}
              </select>
              {errors.designationId && (
                <p className="error-text">{errors.designationId}</p>
              )}
            </div>

            <div className="employee-form-group">
              <label>Select State <span>*</span></label>
              <select
                name="stateId"
                value={formData.stateId}
                onChange={handleChange}
                disabled={statesLoading}
                className={errors.stateId ? "error-input" : ""}
              >
                <option value="">
                  {statesLoading ? "Loading states..." : "Select State"}
                </option>
                {states.map((item) => {
                  const id = item.stateId ?? item.id;
                  return (
                    <option key={id} value={String(id)}>
                      {item.stateName || item.name || `State ${id}`}
                    </option>
                  );
                })}
              </select>
              {errors.stateId && <p className="error-text">{errors.stateId}</p>}
            </div>

            <div className="employee-form-group">
              <label>Father Name <span>*</span></label>
              <input
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="Enter fatherName"
                className={errors.fatherName ? "error-input" : ""}
              />
              {errors.fatherName && (
                <p className="error-text">{errors.fatherName}</p>
              )}
            </div>

            <div className="employee-form-group">
              <label>Staff Role <span>*</span></label>
              <select
                name="staffRole"
                value={formData.staffRole}
                onChange={handleChange}
                className={errors.staffRole ? "error-input" : ""}
              >
                <option value="">Select Role</option>
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
                <option value="Intern">Intern</option>
                <option value="Agent">Agent</option>
              </select>
              {errors.staffRole && (
                <p className="error-text">{errors.staffRole}</p>
              )}
            </div>

            <div className="employee-form-group">
              <label>Pincode <span>*</span></label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter Employee pincode"
                className={errors.pincode ? "error-input" : ""}
              />
              {errors.pincode && <p className="error-text">{errors.pincode}</p>}
            </div>

            <div className="employee-form-group">
              <label>DOB Date <span>*</span></label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={errors.dateOfBirth ? "error-input" : ""}
              />
              {errors.dateOfBirth && (
                <p className="error-text">{errors.dateOfBirth}</p>
              )}
            </div>

            <div className="employee-form-group">
              <label>Joining Date <span>*</span></label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className={errors.joiningDate ? "error-input" : ""}
              />
              {errors.joiningDate && (
                <p className="error-text">{errors.joiningDate}</p>
              )}
            </div>

            <div className="employee-form-group">
              <label>Name Alias</label>
              <input
                name="nameAlias"
                value={formData.nameAlias}
                onChange={handleChange}
                placeholder="Enter Employee Name"
              />
            </div>

            <div className="employee-form-group">
              <label>Contact Email <span>*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className={errors.email ? "error-input" : ""}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="employee-form-group">
              <label>Password {!data && <span>*</span>}</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className={errors.password ? "error-input" : ""}
              />
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>

            <div className="employee-form-group">
              <label>Last Experience</label>
              <input
                name="lastExperience"
                value={formData.lastExperience}
                onChange={handleChange}
                placeholder="Enter Last Experience"
              />
            </div>

            <div className="employee-form-group">
              <label>KYC Status</label>
              <select
                name="kycStatus"
                value={formData.kycStatus}
                onChange={handleChange}
              >
                <option value="PENDING">Pending</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>

            <div className="employee-form-group">
              <label>Login Status</label>
              <select
                name="loginStatus"
                value={formData.loginStatus}
                onChange={handleChange}
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>

            <div className="employee-form-group">
              <label>Employee Code</label>
              <input
                name="employeeCode"
                value={formData.employeeCode}
                onChange={handleChange}
                placeholder="Employee code"
              />
            </div>

            <h3 className="employee-section-title">BANK DETAILS</h3>

            <div className="employee-form-group">
              <label>Bank Account Number</label>
              <input
                name="bankAccountNumber"
                value={formData.bankAccountNumber}
                onChange={handleChange}
                placeholder="Enter Employee accountNumber"
              />
            </div>

            <div className="employee-form-group">
              <label>IFSC Code</label>
              <input
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                placeholder="Enter Employee ifsc"
              />
            </div>

            <div className="employee-form-group">
              <label>Aadhar No</label>
              <input
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleChange}
                placeholder="Enter Employee aadhar"
              />
            </div>

            <div className="employee-form-group">
              <label>Account Holder Name</label>
              <input
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                placeholder="Enter Employee accountHolderName"
              />
            </div>

            <div className="employee-form-group">
              <label>Bank Branch</label>
              <input
                name="bankBranch"
                value={formData.bankBranch}
                onChange={handleChange}
                placeholder="Enter Employee bank_branch"
              />
            </div>

            <div className="employee-form-group">
              <label>Pancard Number</label>
              <input
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                placeholder="Enter Employee pancard number"
              />
            </div>

            <div className="employee-form-group">
              <label>Bank Name</label>
              <select
                name="bankId"
                value={formData.bankId}
                onChange={handleChange}
              >
                <option value="">Select Bank</option>
                {banks.map((bank) => {
                  const id = bank.bankId ?? bank.id;
                  return (
                    <option key={id} value={String(id)}>
                      {bank.bankName || bank.name || `Bank ${id}`}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="employee-form-buttons">
            <SaveButton text={loading ? "Saving..." : "Save"} type="submit" />
            <CancelButton text="Cancel" type="button" onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
