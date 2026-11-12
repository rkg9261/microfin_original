import React, { useEffect, useState } from "react";

import "./LoanPlan.css";

import {  validateRequired,} from "../../utils/validation";
import "../../utils/validation.css";
import {toast} from "react-toastify";

import {
  CloseButton,
  SaveButton,
  CalculateEmiButton,
  CancelButton,
} from "../../components/buttons";

import { useAppDispatch } from "../../store/hooks";
import {
  createLoanPlan,
  updateLoanPlan,
} from "../../store/slices/loanPlanSlice";
import {
  getInsuranceTypes,
  getLoanTypes,
  getRecoveryTypes,
} from "../../api/loanplanApi";

const LoanPlanForm = ({
  onClose,
  onSaveSuccess,
  initialData,
}) => {
  const dispatch = useAppDispatch();

  const [loanTypes, setLoanTypes] = useState([]);
  const [recoveryTypes, setRecoveryTypes] = useState([]);
  const [insuranceTypes, setInsuranceTypes] = useState([]);
  const [lookupsLoading, setLookupsLoading] = useState(true);

  const defaultFormData = {
    id: 0,
    loanTypeId: "",
    planName: "",
    numberOfEMI: "",
    recoveryTypeId: "",
    planAmount: "",
    paidAmount: "",
    holidayExclude: false,
    gstChargeInclude: false,
    fileChargeInclude: false,
    fileCharge: "",
    processingFeeInclude: false,
    processingFeePercentage: "",
    processingFeeAmount: "",
    insuranceChargeInclude: false,
    insuranceTypeId: "",
    insuranceAmount: "",
    status: true,
    createdAt: null,
    updatedAt: null,
    createdBy: 0,
    updatedBy: null,
  };


  
  // STATE
  

  const [formData, setFormData] = useState(
    defaultFormData
  );

  const [errors, setErrors] = useState({});

  const [saving, setSaving] = useState(false);


  
  // EDIT MODE
  

  const isEditMode = Boolean(
    initialData?.id
  );

  const resolveLookupId = (options, id, name) => {
    if (id !== null && id !== undefined && id !== "") {
      return String(id);
    }

    if (!name) {
      return "";
    }

    const match = options.find(
      (item) =>
        String(item.name).toLowerCase() === String(name).toLowerCase()
    );

    return match ? String(match.id) : "";
  };

  useEffect(() => {
    let active = true;

    const loadLookups = async () => {
      setLookupsLoading(true);

      try {
        const [loanTypeList, recoveryTypeList, insuranceTypeList] =
          await Promise.all([
            getLoanTypes(),
            getRecoveryTypes(),
            getInsuranceTypes(),
          ]);

        if (!active) {
          return;
        }

        setLoanTypes(loanTypeList);
        setRecoveryTypes(recoveryTypeList);
        setInsuranceTypes(insuranceTypeList);
      } catch (error) {
        if (!active) {
          return;
        }

        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to load loan plan dropdowns."
        );
        setLoanTypes([]);
        setRecoveryTypes([]);
        setInsuranceTypes([]);
      } finally {
        if (active) {
          setLookupsLoading(false);
        }
      }
    };

    loadLookups();

    return () => {
      active = false;
    };
  }, []);


  
  // LOAD EXISTING DATA
  

  useEffect(() => {

    if (!initialData) {

      setFormData({
        ...defaultFormData,
      });

      setErrors({});

      return;
    }

    const loanTypeId = resolveLookupId(
      loanTypes,
      initialData.loanTypeId,
      initialData.loanType
    );

    const recoveryTypeId = resolveLookupId(
      recoveryTypes,
      initialData.recoveryTypeId,
      initialData.recoveryType
    );

    const insuranceTypeId = resolveLookupId(
      insuranceTypes,
      initialData.insuranceTypeId,
      initialData.insuranceFeeType || initialData.insuranceType
    );

    setFormData({
      id: initialData.id ?? 0,
      loanTypeId,
      planName: initialData.planName ?? "",
      planAmount: initialData.planAmount ?? "",
      paidAmount: initialData.paidAmount ?? "",
      numberOfEMI: initialData.numberOfEMI ?? initialData.numberOfEmi ?? "",
      recoveryTypeId,
      holidayExclude: Boolean(initialData.holidayExclude),
      gstChargeInclude: Boolean(initialData.gstChargeInclude),
      fileChargeInclude: Boolean(initialData.fileChargeInclude),
      fileCharge: initialData.fileCharge ?? "",
      processingFeeInclude: Boolean(
        initialData.processingFeeInclude ?? initialData.processingFeeChargeInclude
      ),
      processingFeePercentage: initialData.processingFeePercentage ?? "",
      processingFeeAmount: initialData.processingFeeAmount ?? "",
      insuranceChargeInclude: Boolean(
        initialData.insuranceChargeInclude ?? initialData.insuranceFeeChargeInclude
      ),
      insuranceTypeId,
      insuranceAmount:
        initialData.insuranceAmount ?? initialData.insuranceFeeAmount ?? "",
      status:
        initialData.status === true ||
        String(initialData.status).toLowerCase() === "active",
      createdAt: initialData.createdAt ?? null,
      updatedAt: initialData.updatedAt ?? null,
      createdBy: initialData.createdBy ?? 0,
      updatedBy: initialData.updatedBy ?? null,
    });


    setErrors({});

  }, [initialData, loanTypes, recoveryTypes, insuranceTypes]);


  
  // HANDLE CHANGE
  

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;


    setFormData((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));


    setErrors((prev) => ({
      ...prev,

      [name]: "",
    }));

  };


  
  // VALIDATION
  

  const validateForm = () => {

    const validation = validateRequired(
      formData,
      [

        {
          name: "loanTypeId",
          label: "Loan Type",
        },

        {
          name: "planName",
          label: "Plan Name",
        },

        {
          name: "planAmount",
          label: "Plan Amount",
        },

        {
          name: "paidAmount",
          label: "Paid Amount",
        },

        {
          name: "numberOfEMI",
          label: "Number Of EMI",
        },

        {
          name: "recoveryTypeId",
          label: "Recovery Type",
        },

        {
          name: "fileCharge",
          label: "File Charge",
        },

        {
          name: "processingFeePercentage",
          label: "Processing Fee (%)",
        },

        {
          name: "processingFeeAmount",
          label: "Processing Fee Amount",
        },

        {
          name: "insuranceTypeId",
          label: "Insurance Type",
        },

        {
          name: "insuranceAmount",
          label: "Insurance Amount",
        },

      ]
    );


    setErrors(validation);


    return Object.keys(validation).length === 0;

  };


  
  

  const createPayload = () => ({
    id: isEditMode ? Number(formData.id) : 0,
    loanTypeId: Number(formData.loanTypeId),
    planName: formData.planName,
    numberOfEMI: Number(formData.numberOfEMI || 0),
    recoveryTypeId: Number(formData.recoveryTypeId),
    planAmount: Number(formData.planAmount || 0),
    paidAmount: Number(formData.paidAmount || 0),
    holidayExclude: Boolean(formData.holidayExclude),
    gstChargeInclude: Boolean(formData.gstChargeInclude),
    fileChargeInclude: Boolean(formData.fileChargeInclude),
    fileCharge: Number(formData.fileCharge || 0),
    processingFeeInclude: Boolean(formData.processingFeeInclude),
    processingFeePercentage: Number(formData.processingFeePercentage || 0),
    processingFeeAmount: Number(formData.processingFeeAmount || 0),
    insuranceChargeInclude: Boolean(formData.insuranceChargeInclude),
    insuranceTypeId: formData.insuranceTypeId
      ? Number(formData.insuranceTypeId)
      : null,
    insuranceAmount: Number(formData.insuranceAmount || 0),
    status: Boolean(formData.status),
    createdAt: formData.createdAt || new Date().toISOString(),
    updatedAt: isEditMode ? new Date().toISOString() : null,
    createdBy: Number(formData.createdBy || 0),
    updatedBy: isEditMode ? 0 : null,
  });

  
  // SAVE
  

  const handleSave = async () => {

   
    // VALIDATE
   

    if (!validateForm()) {

      return;

    }


    try {

      setSaving(true);


      // API BODY

      const payload =
        createPayload();


      // CONSOLE API BODY

      console.log(
        "=========================================="
      );

      console.log(
        isEditMode
          ? "PUT - UPDATE LOAN PLAN"
          : "POST - CREATE LOAN PLAN"
      );

      console.log(
        "API BODY:"
      );

      console.log(
        JSON.stringify(
          payload,
          null,
          2
        )
      );

      console.log(
        "=========================================="
      );


      let response;


      // UPDATE

      if (isEditMode) {

        console.log(
          "Updating ID:",
          formData.id
        );


        response = await dispatch(
          updateLoanPlan({
            id: Number(formData.id),
            data: payload,
          })
        ).unwrap();


        console.log(
          "UPDATE RESPONSE:"
        );

        console.log(
          response
        );


        toast.success( "Loan Plan Updated Successfully");
       }  

      // CREATE

      else {

        response = await dispatch(createLoanPlan(payload)).unwrap();


        console.log(
          "CREATE RESPONSE:"
        );

        console.log(
          response
        );


        toast.success( "Loan Plan Saved Successfully" );

      }


      // REFRESH TABLE

      if (onSaveSuccess) {

        await onSaveSuccess(
          response
        );

      }

    } catch (error) {

      console.error(
        "=========================================="
      );

      console.error(
        "LOAN PLAN SAVE ERROR"
      );

      console.error(
        error
      );

      console.error(
        "STATUS:",
        error.response?.status
      );

      console.error(
        "ERROR DATA:",
        error.response?.data
      );

      console.error(
        "=========================================="
      );


      toast.error(
        (typeof error === "string" && error) ||
        error?.response?.data?.message ||
        error?.response?.data?.title ||
        "Failed to save Loan Plan."
      );

    } finally {

      setSaving(false);

    }

  };


  
  // CALCULATE EMI
  

  const handleCalculateEmi = () => {

    const planAmount =
      Number(
        formData.planAmount || 0
      );

    const paidAmount =
      Number(
        formData.paidAmount || 0
      );

    const emiCount =
      Number(
        formData.numberOfEMI || 0
      );


    if (
      planAmount <= 0 ||
      paidAmount <= 0 ||
      emiCount <= 0
    ) {

      toast.error(
        "Please enter Plan Amount, Paid Amount and Number Of EMI."
      );

      return;

    }


    const emi =
      paidAmount / emiCount;


    toast.success(
      `EMI Amount: ₹${emi.toFixed(2)}`
    );

  };


  
  // JSX
  

  return (

    <div className="loan-plan-modal">

      <div className="loan-plan-modal-content">


        {/* =================================================
            HEADER
        ================================================== */}

        <div className="loan-plan-modal-header">

          <h2>

            {isEditMode
              ? "Edit Loan Plan"
              : "Add Loan Plan"}

          </h2>


          <CloseButton
            onClick={onClose}
          />

        </div>


        {/* =================================================
            FORM
        ================================================== */}

        <div className="loan-plan-form">


          {/* =================================================
              LOAN TYPE
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Loan Type *
            </label>

            <select
              name="loanTypeId"
              value={formData.loanTypeId}
              onChange={handleChange}
              disabled={lookupsLoading}
            >

              <option value="">
                {lookupsLoading ? "Loading Loan Types..." : "Select Loan Type"}
              </option>

              {loanTypes.map((item) => (
                <option key={item.id} value={String(item.id)}>
                  {item.name}
                </option>
              ))}

            </select>

            {errors.loanTypeId && (
              <p className="error-text">
                {errors.loanTypeId}
              </p>
            )}

          </div>


          {/* =================================================
              PLAN NAME
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Plan Name *
            </label>

            <input
              type="text"
              name="planName"
              placeholder="Enter Plan Name"
              value={formData.planName}
              onChange={handleChange}
            />

            {errors.planName && (
              <p className="error-text">
                {errors.planName}
              </p>
            )}

          </div>


          {/* =================================================
              NUMBER OF EMI
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Number Of EMI *
            </label>

            <input
              type="number"
              name="numberOfEMI"
              placeholder="Enter Number Of EMI"
              value={formData.numberOfEMI}
              onChange={handleChange}
              min="1"
            />

            {errors.numberOfEMI && (
              <p className="error-text">
                {errors.numberOfEMI}
              </p>
            )}

          </div>


          {/* =================================================
              RECOVERY TYPE
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Recovery Type *
            </label>

            <select
              name="recoveryTypeId"
              value={formData.recoveryTypeId}
              onChange={handleChange}
              disabled={lookupsLoading}
            >

              <option value="">
                {lookupsLoading
                  ? "Loading Recovery Types..."
                  : "Select Recovery Type"}
              </option>

              {recoveryTypes.map((item) => (
                <option key={item.id} value={String(item.id)}>
                  {item.name}
                </option>
              ))}

            </select>

            {errors.recoveryTypeId && (
              <p className="error-text">
                {errors.recoveryTypeId}
              </p>
            )}

          </div>


          {/* =================================================
              PLAN AMOUNT
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Plan Amount *
            </label>

            <input
              type="number"
              name="planAmount"
              placeholder="Enter Plan Amount"
              value={formData.planAmount}
              onChange={handleChange}
              min="0"
              step="0.01"
            />

            {errors.planAmount && (
              <p className="error-text">
                {errors.planAmount}
              </p>
            )}

          </div>


          {/* =================================================
              PAID AMOUNT
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Paid Amount *
            </label>

            <input
              type="number"
              name="paidAmount"
              placeholder="Enter Paid Amount"
              value={formData.paidAmount}
              onChange={handleChange}
              min="0"
              step="0.01"
            />

            {errors.paidAmount && (
              <p className="error-text">
                {errors.paidAmount}
              </p>
            )}

          </div>


          {/* =================================================
              HOLIDAY EXCLUDE
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Holiday Exclude
            </label>

            <select
              name="holidayExclude"
              value={
                formData.holidayExclude
                  ? "Yes"
                  : "No"
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  holidayExclude:
                    e.target.value === "Yes",
                }))
              }
            >

              <option value="No">
                No
              </option>

              <option value="Yes">
                Yes
              </option>

            </select>

          </div>


          {/* =================================================
              GST CHARGE INCLUDE
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              GST Charge Include
            </label>

            <select
              name="gstChargeInclude"
              value={
                formData.gstChargeInclude
                  ? "Yes"
                  : "No"
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  gstChargeInclude:
                    e.target.value === "Yes",
                }))
              }
            >

              <option value="No">
                No
              </option>

              <option value="Yes">
                Yes
              </option>

            </select>

          </div>


          {/* =================================================
              FILE CHARGE INCLUDE
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              File Charge Include
            </label>

            <select
              name="fileChargeInclude"
              value={
                formData.fileChargeInclude
                  ? "Yes"
                  : "No"
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  fileChargeInclude:
                    e.target.value === "Yes",
                }))
              }
            >

              <option value="No">
                No
              </option>

              <option value="Yes">
                Yes
              </option>

            </select>

          </div>


          {/* =================================================
              FILE CHARGE
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              File Charge *
            </label>

            <input
              type="number"
              name="fileCharge"
              placeholder="Enter File Charge"
              value={formData.fileCharge}
              onChange={handleChange}
              min="0"
              step="0.01"
            />

            {errors.fileCharge && (
              <p className="error-text">
                {errors.fileCharge}
              </p>
            )}

          </div>


          {/* =================================================
              PROCESSING FEE INCLUDE
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Processing Fee Include
            </label>

            <select
              name="processingFeeInclude"
              value={
                formData.processingFeeInclude
                  ? "Yes"
                  : "No"
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  processingFeeInclude:
                    e.target.value === "Yes",
                }))
              }
            >

              <option value="No">
                No
              </option>

              <option value="Yes">
                Yes
              </option>

            </select>

          </div>


          {/* =================================================
              PROCESSING FEE %
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Processing Fee (%) *
            </label>

            <input
              type="number"
              name="processingFeePercentage"
              placeholder="Enter Processing Fee %"
              value={
                formData.processingFeePercentage
              }
              onChange={handleChange}
              min="0"
              step="0.01"
            />

            {errors.processingFeePercentage && (
              <p className="error-text">
                {errors.processingFeePercentage}
              </p>
            )}

          </div>


          {/* =================================================
              PROCESSING FEE AMOUNT
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Processing Fee Amount *
            </label>

            <input
              type="number"
              name="processingFeeAmount"
              placeholder="Enter Processing Fee Amount"
              value={
                formData.processingFeeAmount
              }
              onChange={handleChange}
              min="0"
              step="0.01"
            />

            {errors.processingFeeAmount && (
              <p className="error-text">
                {errors.processingFeeAmount}
              </p>
            )}

          </div>


          {/* =================================================
              INSURANCE INCLUDE
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Insurance Charge Include
            </label>

            <select
              name="insuranceChargeInclude"
              value={
                formData.insuranceChargeInclude
                  ? "Yes"
                  : "No"
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  insuranceChargeInclude:
                    e.target.value === "Yes",
                }))
              }
            >

              <option value="No">
                No
              </option>

              <option value="Yes">
                Yes
              </option>

            </select>

          </div>


          {/* =================================================
              INSURANCE TYPE
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Insurance Type *
            </label>

            <select
              name="insuranceTypeId"
              value={formData.insuranceTypeId}
              onChange={handleChange}
              disabled={lookupsLoading}
            >

              <option value="">
                {lookupsLoading
                  ? "Loading Insurance Types..."
                  : "Select Insurance Type"}
              </option>

              {insuranceTypes.map((item) => (
                <option key={item.id} value={String(item.id)}>
                  {item.name}
                </option>
              ))}

            </select>

            {errors.insuranceTypeId && (
              <p className="error-text">
                {errors.insuranceTypeId}
              </p>
            )}

          </div>


          {/* =================================================
              INSURANCE AMOUNT
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Insurance Amount *
            </label>

            <input
              type="number"
              name="insuranceAmount"
              placeholder="Enter Insurance Amount"
              value={formData.insuranceAmount}
              onChange={handleChange}
              min="0"
              step="0.01"
            />

            {errors.insuranceAmount && (
              <p className="error-text">
                {errors.insuranceAmount}
              </p>
            )}

          </div>


          {/* =================================================
              STATUS
          ================================================== */}

          <div className="loan-plan-form-group">

            <label>
              Status
            </label>

            <select
              name="status"
              value={formData.status ? "true" : "false"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value === "true",
                }))
              }
            >

              <option value="true">
                Active
              </option>

              <option value="false">
                Inactive
              </option>

            </select>

          </div>

        </div>


        {/* =================================================
            BUTTONS
        ================================================== */}

        <div className="loan-plan-form-buttons">

          <SaveButton
            onClick={handleSave}
            disabled={saving}
          />

          <CalculateEmiButton
            onClick={handleCalculateEmi}
            disabled={saving}
          />

          <CancelButton
            onClick={onClose}
            disabled={saving}
          />

        </div>

      </div>

    </div>

  );

};


export default LoanPlanForm;