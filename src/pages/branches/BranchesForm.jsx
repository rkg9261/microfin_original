import React, {
  useEffect,
  useState,
} from "react";
import {
  createBranch,
  updateBranch,
} from "../../store/slices/branchSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchStates } from "../../store/slices/stateSlice";
import { useSwaggerEntity } from "../../store/useSwaggerEntity";
import { getCompanies, getCountries } from "../../api/branchApi";
import "./Branches.css";
import { validateRequired } from "../../utils/validation";
import "../../utils/validation.css";
import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../components/buttons";
import { toast } from "react-toastify";

const BranchesForm = ({
  onClose,
  onSave,
  editingBranch,
}) => {
  const dispatch = useAppDispatch();
  const { items: states } = useAppSelector((store) => store.stateMaster);
  const { items: districts } = useSwaggerEntity("district");
  const [countries, setCountries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [lookupsLoading, setLookupsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchStates());
  }, [dispatch]);

  useEffect(() => {
    let active = true;

    const loadLookups = async () => {
      setLookupsLoading(true);

      try {
        const [countryList, companyList] = await Promise.all([
          getCountries(),
          getCompanies(),
        ]);

        if (!active) {
          return;
        }

        setCountries(countryList);
        setCompanies(companyList);
      } catch (error) {
        if (!active) {
          return;
        }

        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to load country/company dropdowns."
        );
        setCountries([]);
        setCompanies([]);
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



  // INITIAL FORM DATA


  const initialFormData = {

    branchName: "",

    branchCode: "",

    city: "",

    pincode: "",

    address: "",

    // UI VALUES
    stateName: "",

    districtName: "",

    // API VALUES
    stateId: "",

    districtId: "",

    countryId: "",

    companyId: "",

    contactEmail: "",

    contactNumber: "",

    landlineNumber: "",

    gstinNumber: "",

    openingDate: "",

    isActive: true,

    createdBy: 1,

  };



  // STATE


  const [
    formData,
    setFormData,
  ] = useState(initialFormData);


  const [
    errors,
    setErrors,
  ] = useState({});


  const [
    saving,
    setSaving,
  ] = useState(false);



  // LOAD EDIT DATA / DEFAULT LOOKUPS


  useEffect(() => {

    if (!editingBranch) {
      const defaultCountryId = countries[0]?.id
        ? String(countries[0].id)
        : "";
      const defaultCompanyId = companies[0]?.id
        ? String(companies[0].id)
        : "";

      setFormData({
        ...initialFormData,
        countryId: defaultCountryId,
        companyId: defaultCompanyId,
      });

      setErrors({});

      return;
    }


    console.log(
      "EDIT BRANCH DATA:",
      editingBranch
    );


    setFormData({

      branchName:
        editingBranch.branchName ??
        "",

      branchCode:
        editingBranch.branchCode ??
        "",

      city:
        editingBranch.city ??
        "",

      pincode:
        editingBranch.pincode ??
        "",

      address:
        editingBranch.address ??
        "",



      stateName:
        editingBranch.stateName ??
        editingBranch.state?.stateName ??
        "",


     

      stateId:
        editingBranch.stateId ??
        editingBranch.state?.stateId ??
        "",



      districtName:
        editingBranch.districtName ??
        editingBranch.district?.districtName ??
        "",


  

      districtId:
        editingBranch.districtId ??
        editingBranch.district?.districtId ??
        "",


      countryId:
        editingBranch.countryId != null && editingBranch.countryId !== ""
          ? String(editingBranch.countryId)
          : countries[0]?.id
          ? String(countries[0].id)
          : "",

      companyId:
        editingBranch.companyId != null && editingBranch.companyId !== ""
          ? String(editingBranch.companyId)
          : companies[0]?.id
          ? String(companies[0].id)
          : "",


      contactEmail:
        editingBranch.contactEmail ??
        "",

      contactNumber:
        editingBranch.contactNumber ??
        "",

      landlineNumber:
        editingBranch.landlineNumber ??
        "",

      gstinNumber:
        editingBranch.gstinNumber ??
        "",


      openingDate:
        editingBranch.openingDate
          ? String(
              editingBranch.openingDate
            ).substring(0, 10)
          : "",


      isActive:
        editingBranch.isActive !== false,


      createdBy:
        editingBranch.createdBy ??
        1,

    });


    setErrors({});

  }, [editingBranch, countries, companies]);



  // HANDLE CHANGE


  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData(
      (previous) => ({

        ...previous,

        [name]: value,

      })
    );


    setErrors(
      (previous) => ({

        ...previous,

        [name]: "",

      })
    );

  };




  const handleStateChange = (e) => {
    const stateId = e.target.value;
    const selected = states.find(
      (state) => String(state.stateId ?? state.id) === stateId
    );

    setFormData((previous) => ({
      ...previous,
      stateId,
      stateName: selected?.stateName || "",
      districtId: "",
      districtName: "",
    }));

    setErrors((previous) => ({
      ...previous,
      stateName: "",
      districtName: "",
    }));
  };




  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    const selected = districts.find(
      (district) => String(district.id ?? district.districtId) === districtId
    );

    setFormData((previous) => ({
      ...previous,
      districtId,
      districtName: selected?.name || selected?.districtName || "",
    }));

    setErrors((previous) => ({
      ...previous,
      districtName: "",
    }));
  };



  // STATUS


  const handleStatusChange = (
    value
  ) => {

    setFormData(
      (previous) => ({

        ...previous,

        isActive: value,

      })
    );

  };



  // SUBMIT


  const handleSubmit = async (e) => {

    e.preventDefault();


  
    // VALIDATION
  

    const validation =
      validateRequired(

        formData,

        [

          {
            name: "branchName",
            label: "Branch Name",
          },

          {
            name: "branchCode",
            label: "Branch Code",
          },

          {
            name: "city",
            label: "City",
          },

          {
            name: "pincode",
            label: "Pincode",
          },

          {
            name: "stateName",
            label: "State",
          },

          {
            name: "districtName",
            label: "District",
          },

          {
            name: "openingDate",
            label: "Opening Date",
          },

          {
            name: "contactEmail",
            label: "Contact Email",
          },

          {
            name: "contactNumber",
            label: "Contact Number",
          },

          {
            name: "countryId",
            label: "Country",
          },

          {
            name: "companyId",
            label: "Company",
          },

        ]

      );


    if (
      Object.keys(validation).length > 0
    ) {

      setErrors(validation);

      return;

    }


  
    // STATE ID CHECK
  

    if (!formData.stateId) {
      setErrors({
        stateName: states.length
          ? "Please select a state."
          : "No states are available. Add a state first, then select it here.",
      });
      return;
    }

    if (!formData.districtId) {
      setErrors({
        districtName: districts.some(
          (district) => String(district.stateId) === String(formData.stateId)
        )
          ? "Please select a district."
          : "No districts are available for this state. Add a district first, then select it here.",
      });
      return;
    }


    setErrors({});


  
    // EXACT SWAGGER API BODY
  

    const branchData = {

      branchName:
        formData.branchName.trim(),

      branchCode:
        formData.branchCode.trim(),

      city:
        formData.city.trim(),

      pincode:
        formData.pincode.trim(),

      address:
        formData.address.trim() || null,

     
      // API EXPECTS STATE ID
     

      stateId: Number(formData.stateId),
       

     
      // API EXPECTS COUNTRY ID
     

      countryId: Number(formData.countryId),
       

     
      // API EXPECTS COMPANY ID
     

      companyId: formData.companyId
          ? Number(formData.companyId)
          : null,
       

     
      // API EXPECTS DISTRICT ID
     

      districtId:
        Number(formData.districtId),

      contactEmail:
        formData.contactEmail.trim(),

      contactNumber:
        formData.contactNumber.trim(),

      landlineNumber:
        formData.landlineNumber.trim() || null,

      gstinNumber:
        formData.gstinNumber.trim() || null,

      openingDate:
        formData.openingDate
          ? `${formData.openingDate}T00:00:00`
          : null,

      isActive:
        formData.isActive,

      createdBy:
        Number(formData.createdBy),

    };


  
    // EDIT ID
  

    if (editingBranch) {

      branchData.branchId =
        Number(
          editingBranch.branchId ??
          editingBranch.id
        );

    }


  
    // DEBUG
  

    console.log(
      "======================================"
    );

    console.log(
      "STATE NAME:",
      formData.stateName
    );

    console.log(
      "STATE ID:",
      formData.stateId
    );

    console.log(
      "DISTRICT NAME:",
      formData.districtName
    );

    console.log(
      "DISTRICT ID:",
      formData.districtId
    );

    console.log(
      "FINAL POST BODY:",
      branchData
    );

    console.log(
      "======================================"
    );


  
    // POST API
  

    if (!editingBranch) {

      try {

        setSaving(true);


        console.log(
          "POST /api/Branches"
        );


        const response =
          await dispatch(createBranch(
            branchData
          )).unwrap();


        console.log(
          "POST SUCCESS:",
          response
        );


         toast.success(
          "Branch created successfully!"
        );


        if (onSave) {

          await onSave(
            response,
            "POST"
          );

        }


        if (onClose) {

          onClose();

        }

      }

      catch (error) {

        console.error(
          "POST BRANCH ERROR:",
          error
        );


        console.error(
          "STATUS:",
          error.response?.status
        );


        console.error(
          "API ERROR:",
          error.response?.data
        );


        const apiError =
          error.response?.data;


         toast.error(
          apiError?.message ||
          apiError?.title ||
          error.message ||
          "Failed to create branch."
        );

      }

      finally {

        setSaving(false);

      }

      return;

    }


    // EDIT
  

    try {

      setSaving(true);

      const response =
        await dispatch(updateBranch({
          id: Number(
            editingBranch.branchId ??
            editingBranch.id
          ),
          data: branchData,
        })).unwrap();

      toast.success(
        "Branch updated successfully!"
      );

      if (onSave) {
        await onSave(response, "PUT");
      }

      if (onClose) {
        onClose();
      }

    } catch (error) {

      toast.error(
        error?.message ||
        error ||
        "Failed to update branch."
      );

    } finally {

      setSaving(false);

    }

  };



  // TITLE


  const title =
    editingBranch
      ? "Edit Branch"
      : "Add New Branch";



  // JSX


  return (

    <div className="branches-modal">

      <div className="branches-modal-content">


        {/* HEADER */}

        <div className="branches-modal-header">

          <h2>
            {title}
          </h2>


          <CloseButton
            onClick={onClose}
            disabled={saving}
          />

        </div>


        {/* FORM */}

        <form
          className="branches-form"
          onSubmit={handleSubmit}
        >


          {/* BRANCH NAME */}

          <div className="branches-form-group">

            <label>
              Branch Name *
            </label>

            <input
              type="text"
              name="branchName"
              value={
                formData.branchName
              }
              onChange={
                handleChange
              }
              disabled={saving}
              placeholder="Enter branch name"
              className={
                errors.branchName
                  ? "error-input"
                  : ""
              }
            />

            {errors.branchName && (

              <p className="error-text">
                {errors.branchName}
              </p>

            )}

          </div>


          {/* BRANCH CODE */}

          <div className="branches-form-group">

            <label>
              Branch Code *
            </label>

            <input
              type="text"
              name="branchCode"
              value={
                formData.branchCode
              }
              onChange={
                handleChange
              }
              disabled={saving}
              placeholder="Enter branch code"
              className={
                errors.branchCode
                  ? "error-input"
                  : ""
              }
            />

            {errors.branchCode && (

              <p className="error-text">
                {errors.branchCode}
              </p>

            )}

          </div>


          {/* CITY */}

          <div className="branches-form-group">

            <label>
              City *
            </label>

            <input
              type="text"
              name="city"
              value={
                formData.city
              }
              onChange={
                handleChange
              }
              disabled={saving}
              placeholder="Enter city"
              className={
                errors.city
                  ? "error-input"
                  : ""
              }
            />

            {errors.city && (

              <p className="error-text">
                {errors.city}
              </p>

            )}

          </div>


          {/* PINCODE */}

          <div className="branches-form-group">

            <label>
              Pincode *
            </label>

            <input
              type="text"
              name="pincode"
              value={
                formData.pincode
              }
              onChange={
                handleChange
              }
              disabled={saving}
              maxLength={10}
              inputMode="numeric"
              placeholder="Enter pincode"
              className={
                errors.pincode
                  ? "error-input"
                  : ""
              }
            />

            {errors.pincode && (

              <p className="error-text">
                {errors.pincode}
              </p>

            )}

          </div>


          {/* OPENING DATE */}

          <div className="branches-form-group">

            <label>
              Opening Date *
            </label>

            <input
              type="date"
              name="openingDate"
              value={
                formData.openingDate
              }
              onChange={
                handleChange
              }
              disabled={saving}
              className={
                errors.openingDate
                  ? "error-input"
                  : ""
              }
            />

            {errors.openingDate && (

              <p className="error-text">
                {errors.openingDate}
              </p>

            )}

          </div>


          {/* EMAIL */}

          <div className="branches-form-group">

            <label>
              Contact Email *
            </label>

            <input
              type="email"
              name="contactEmail"
              value={
                formData.contactEmail
              }
              onChange={
                handleChange
              }
              disabled={saving}
              placeholder="Enter email"
              className={
                errors.contactEmail
                  ? "error-input"
                  : ""
              }
            />

            {errors.contactEmail && (

              <p className="error-text">
                {errors.contactEmail}
              </p>

            )}

          </div>


          {/* ADDRESS */}

          <div className="branches-form-group">

            <label>
              Address
            </label>

            <input
              type="text"
              name="address"
              value={
                formData.address
              }
              onChange={
                handleChange
              }
              disabled={saving}
              placeholder="Enter address"
            />

          </div>


          {/* CONTACT NUMBER */}

          <div className="branches-form-group">

            <label>
              Contact Number *
            </label>

            <input
              type="text"
              name="contactNumber"
              value={
                formData.contactNumber
              }
              onChange={
                handleChange
              }
              disabled={saving}
              maxLength={20}
              inputMode="numeric"
              placeholder="Enter contact number"
              className={
                errors.contactNumber
                  ? "error-input"
                  : ""
              }
            />

            {errors.contactNumber && (

              <p className="error-text">
                {errors.contactNumber}
              </p>

            )}

          </div>


          {/* LANDLINE */}

          <div className="branches-form-group">

            <label>
              Landline Number
            </label>

            <input
              type="text"
              name="landlineNumber"
              value={
                formData.landlineNumber
              }
              onChange={
                handleChange
              }
              disabled={saving}
              placeholder="Enter landline number"
            />

          </div>


          {/* STATE */}

          <div className="branches-form-group">

            <label>
              State *
            </label>

            <select
              name="stateId"
              value={formData.stateId}
              onChange={handleStateChange}
              disabled={saving}
              className={errors.stateName ? "error-input" : ""}
            >
              <option value="">
                {states.length ? "Select state" : "No states available"}
              </option>
              {states.map((state) => {
                const stateId = state.stateId ?? state.id;
                return (
                  <option key={stateId} value={stateId}>
                    {state.stateName}
                  </option>
                );
              })}
            </select>

            {errors.stateName && (

              <p className="error-text">
                {errors.stateName}
              </p>

            )}

          </div>


          {/* DISTRICT */}

          <div className="branches-form-group">

            <label>
              District *
            </label>

            <select
              name="districtId"
              value={formData.districtId}
              onChange={handleDistrictChange}
              disabled={saving || !formData.stateId}
              className={errors.districtName ? "error-input" : ""}
            >
              <option value="">
                {formData.stateId ? "Select district" : "Select a state first"}
              </option>
              {districts
                .filter(
                  (district) =>
                    String(district.stateId) === String(formData.stateId)
                )
                .map((district) => {
                  const districtId = district.id ?? district.districtId;
                  return (
                    <option key={districtId} value={districtId}>
                      {district.name || district.districtName}
                    </option>
                  );
                })}
            </select>

            {errors.districtName && (

              <p className="error-text">
                {errors.districtName}
              </p>

            )}

          </div>


          {/* GSTIN */}

          <div className="branches-form-group">

            <label>
              GSTIN Number
            </label>

            <input
              type="text"
              name="gstinNumber"
              value={
                formData.gstinNumber
              }
              onChange={
                handleChange
              }
              disabled={saving}
              placeholder="Enter GSTIN number"
            />

          </div>


          {/* COUNTRY */}

          <div className="branches-form-group">

            <label>
              Country *
            </label>

            <select
              name="countryId"
              value={formData.countryId}
              onChange={handleChange}
              disabled={saving || lookupsLoading}
              className={
                errors.countryId
                  ? "error-input"
                  : ""
              }
            >
              <option value="">
                {lookupsLoading
                  ? "Loading countries..."
                  : countries.length
                  ? "Select country"
                  : "No countries available"}
              </option>
              {countries.map((country) => (
                <option
                  key={country.id}
                  value={String(country.id)}
                >
                  {country.name}
                </option>
              ))}
            </select>

            {errors.countryId && (
              <p className="error-text">
                {errors.countryId}
              </p>
            )}

          </div>


          {/* COMPANY */}

          <div className="branches-form-group">

            <label>
              Company *
            </label>

            <select
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              disabled={saving || lookupsLoading}
              className={
                errors.companyId
                  ? "error-input"
                  : ""
              }
            >
              <option value="">
                {lookupsLoading
                  ? "Loading companies..."
                  : companies.length
                  ? "Select company"
                  : "No companies available"}
              </option>
              {companies.map((company) => (
                <option
                  key={company.id}
                  value={String(company.id)}
                >
                  {company.name}
                </option>
              ))}
            </select>

            {errors.companyId && (
              <p className="error-text">
                {errors.companyId}
              </p>
            )}

          </div>


          {/* STATUS */}

          <div className="branches-form-group">

            <label>
              Status
            </label>

            <div className="radio-group">

              <label>

                <input
                  type="radio"
                  name="isActive"
                  checked={
                    formData.isActive === true
                  }
                  onChange={() =>
                    handleStatusChange(true)
                  }
                  disabled={saving}
                />

                Active

              </label>


              <label>

                <input
                  type="radio"
                  name="isActive"
                  checked={
                    formData.isActive === false
                  }
                  onChange={() =>
                    handleStatusChange(false)
                  }
                  disabled={saving}
                />

                Inactive

              </label>

            </div>

          </div>


          {/* BUTTONS */}

          <div className="branches-form-buttons">

            <SaveButton
              text={
                saving
                  ? "Saving..."
                  : editingBranch
                    ? "Update Branch"
                    : "Save Branch"
              }
              type="submit"
              disabled={saving}
            />


            <CancelButton
              text="Cancel"
              type="button"
              onClick={onClose}
              disabled={saving}
            />

          </div>


        </form>

      </div>

    </div>

  );

};


export default BranchesForm;