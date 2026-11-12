import React, {
    useEffect,
    useState,
} from "react";

import "../../../components/common/CommonForm.css";
import "../../../utils/validation.css";

import {
    validateRequired,
} from "../../../utils/validation";

import {
    SaveButton,
    CancelButton,
    CloseButton,
} from "../../../components/buttons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchStates } from "../../../store/slices/stateSlice";
import { fetchBranches } from "../../../store/slices/branchSlice";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";


const MemberForm = ({
    data,
    onSave,
    onClose,
}) => {


    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({

        memberName: "",

        fatherHusbandName: "",

        gender: "",

        dateOfBirth: "",

        mobileNumber: "",

        address: "",

        state: "",

        district: "",

        villageCity: "",

        branchId: "",

        memberSince: "",

        occupation: "",

        kycType: "Aadhaar",

        kycNumber: "",

        nomineeName: "",

        nomineeRelation: "",

        status: "ACTIVE",

    });


    // =====================================================
    // ERRORS
    // =====================================================

    const [errors, setErrors] =
        useState({});

    const dispatch = useAppDispatch();
    const { items: states } = useAppSelector((store) => store.stateMaster);
    const { items: branches, loading: branchesLoading } = useAppSelector(
        (store) => store.branch
    );
    const { items: districtItems } = useSwaggerEntity("district");

    useEffect(() => {
        dispatch(fetchStates());
        dispatch(fetchBranches());
    }, [dispatch]);

    // =====================================================
    // EDIT
    // =====================================================

    useEffect(() => {

        if (data) {

            setFormData({

                memberName:
                    data.memberName || "",

                fatherHusbandName:
                    data.fatherHusbandName || data.fatherName || "",

                gender:
                    data.gender || "",

                dateOfBirth:
                    (data.dateOfBirth || data.dob || "").toString().slice(0, 10),

                mobileNumber:
                    data.mobileNumber || data.mobileNumber1 || "",

                address:
                    data.address || "",

                state:
                    data.stateId ?? data.state ?? "",

                district:
                    data.districtId ?? data.district ?? "",

                villageCity:
                    data.villageCity || data.city || "",

                branchId:
                    data.branchId != null && data.branchId !== ""
                        ? String(data.branchId)
                        : "",

                memberSince:
                    data.memberSince || "",

                occupation:
                    data.occupation || "",

                kycType:
                    data.kycType || "Aadhaar",

                kycNumber:
                    data.kycNumber || data.aadhaarNumber || data.panNumber || "",

                nomineeName:
                    data.nomineeName || "",

                nomineeRelation:
                    data.nomineeRelation || "",

                status:
                    data.status === true ||
                    String(data.status || "").toUpperCase() === "ACTIVE"
                        ? "ACTIVE"
                        : data.status === false ||
                          String(data.status || "").toUpperCase() === "INACTIVE"
                        ? "INACTIVE"
                        : "ACTIVE",

            });

        } else {

            setFormData((previous) => ({

                ...previous,

                memberSince:
                    new Date()
                        .toISOString()
                        .split("T")[0],

            }));

        }

    }, [data]);


    // =====================================================
    // CHANGE
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;


        setFormData((previous) => ({

            ...previous,

            [name]: value,

            ...(name === "state"
                ? {
                    district: "",
                    villageCity: "",
                }
                : {}),

        }));


        if (errors[name]) {

            setErrors((previous) => ({

                ...previous,

                [name]: "",

            }));

        }

    };


    // =====================================================
    // VALIDATION
    // =====================================================

    const validateForm = () => {

        const requiredFields = [

            {
                name: "memberName",
                label: "Member Name",
            },

            {
                name: "fatherHusbandName",
                label: "Father/Husband Name",
            },

            {
                name: "gender",
                label: "Gender",
            },

            {
                name: "dateOfBirth",
                label: "Date of Birth",
            },

            {
                name: "mobileNumber",
                label: "Mobile Number",
            },

            {
                name: "address",
                label: "Address",
            },

            {
                name: "villageCity",
                label: "Village/City",
            },

            {
                name: "kycType",
                label: "KYC Type",
            },

            {
                name: "kycNumber",
                label: "KYC Number",
            },

            {
                name: "status",
                label: "Status",
            },

        ];


        const validationErrors =
            validateRequired(
                formData,
                requiredFields
            );


        // =================================================
        // MOBILE VALIDATION
        // =================================================

        if (
            formData.mobileNumber &&
            !/^[0-9]{10}$/.test(
                formData.mobileNumber
            )
        ) {

            validationErrors.mobileNumber =
                "Mobile number must be 10 digits";

        }


        // =================================================
        // DATE VALIDATION
        // =================================================

        if (
            formData.dateOfBirth &&
            new Date(formData.dateOfBirth) >
                new Date()
        ) {

            validationErrors.dateOfBirth =
                "Date of birth cannot be future date";

        }


        // =================================================
        // KYC VALIDATION
        // =================================================

        if (
            formData.kycType === "Aadhaar" &&
            formData.kycNumber &&
            !/^[0-9]{12}$/.test(
                formData.kycNumber
            )
        ) {

            validationErrors.kycNumber =
                "Aadhaar number must be 12 digits";

        }


        if (
            formData.kycType === "PAN" &&
            formData.kycNumber &&
            !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(
                formData.kycNumber
            )
        ) {

            validationErrors.kycNumber =
                "Enter valid PAN number";

        }


        setErrors(validationErrors);


        return (
            Object.keys(validationErrors)
                .length === 0
        );

    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = (e) => {

        e.preventDefault();


        if (!validateForm()) {

            return;

        }


        onSave({

            ...formData,

            loanExist:
                data?.loanExist || "No",

            staff:
                data?.staff || "",

        });

    };


    // =====================================================
    // DISTRICTS
    // =====================================================

    const districts = districtItems.filter((item) => {
      if (!formData.state) return false;
      return String(item.stateId) === String(formData.state);
    });


    // =====================================================
    // JSX
    // =====================================================

    return (

        <div
            className="common-modal"
        >

            <div
                className="common-modal-content member-form-modal"
            >


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="common-modal-header">

                    <h2>

                        {data
                            ? "EDIT MEMBER"
                            : "ADD NEW MEMBER"
                        }

                    </h2>


                    <CloseButton
                        onClick={onClose}
                    />

                </div>


                {/* =================================================
                    FORM
                ================================================= */}

                <form
                    className="common-form member-form"
                    onSubmit={handleSubmit}
                >


                    {/* =================================================
                        PERSONAL DETAILS
                    ================================================= */}

                    <div className="member-form-section">

                        <div className="member-section-title">

                            PERSONAL DETAILS

                        </div>


                        <div className="member-form-grid">


                            {/* MEMBER ID */}

                            <div className="common-form-group">

                                <label>
                                    Member ID
                                </label>

                                <input
                                    type="text"
                                    value={
                                        data?.memberId ||
                                        "Auto"
                                    }
                                    disabled
                                />

                            </div>


                            {/* MEMBER NAME */}

                            <div className="common-form-group">

                                <label>
                                    Member Name
                                    <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="memberName"
                                    placeholder="Enter member name"
                                    value={
                                        formData.memberName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={
                                        errors.memberName
                                            ? "error-input"
                                            : ""
                                    }
                                />

                                {errors.memberName && (

                                    <small className="error-text">
                                        {errors.memberName}
                                    </small>

                                )}

                            </div>


                            {/* FATHER */}

                            <div className="common-form-group">

                                <label>
                                    Father/Husband Name
                                    <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="fatherHusbandName"
                                    placeholder="Enter father/husband name"
                                    value={
                                        formData.fatherHusbandName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={
                                        errors.fatherHusbandName
                                            ? "error-input"
                                            : ""
                                    }
                                />

                                {errors.fatherHusbandName && (

                                    <small className="error-text">
                                        {errors.fatherHusbandName}
                                    </small>

                                )}

                            </div>


                            {/* GENDER */}

                            <div className="common-form-group">

                                <label>
                                    Gender
                                    <span>*</span>
                                </label>

                                <select
                                    name="gender"
                                    value={
                                        formData.gender
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={
                                        errors.gender
                                            ? "error-input"
                                            : ""
                                    }
                                >

                                    <option value="">
                                        Select Gender
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                                {errors.gender && (

                                    <small className="error-text">
                                        {errors.gender}
                                    </small>

                                )}

                            </div>


                            {/* DOB */}

                            <div className="common-form-group">

                                <label>
                                    Date of Birth
                                    <span>*</span>
                                </label>

                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={
                                        formData.dateOfBirth
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={
                                        errors.dateOfBirth
                                            ? "error-input"
                                            : ""
                                    }
                                />

                                {errors.dateOfBirth && (

                                    <small className="error-text">
                                        {errors.dateOfBirth}
                                    </small>

                                )}

                            </div>


                            {/* MOBILE */}

                            <div className="common-form-group">

                                <label>
                                    Mobile Number
                                    <span>*</span>
                                </label>

                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    maxLength="10"
                                    placeholder="Enter 10 digit mobile number"
                                    value={
                                        formData.mobileNumber
                                    }
                                    onChange={(e) => {

                                        const value =
                                            e.target.value
                                                .replace(
                                                    /\D/g,
                                                    ""
                                                );

                                        handleChange({
                                            target: {
                                                name:
                                                    "mobileNumber",
                                                value,
                                            },
                                        });

                                    }}
                                    className={
                                        errors.mobileNumber
                                            ? "error-input"
                                            : ""
                                    }
                                />

                                {errors.mobileNumber && (

                                    <small className="error-text">
                                        {errors.mobileNumber}
                                    </small>

                                )}

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        ADDRESS
                    ================================================= */}

                    <div className="member-form-section">

                        <div className="member-section-title">

                            ADDRESS

                        </div>


                        <div className="member-form-grid">


                            {/* ADDRESS */}

                            <div className="common-form-group member-full-width">

                                <label>
                                    Address
                                    <span>*</span>
                                </label>

                                <textarea
                                    name="address"
                                    rows="3"
                                    placeholder="Enter complete address"
                                    value={
                                        formData.address
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={
                                        errors.address
                                            ? "error-input"
                                            : ""
                                    }
                                />

                                {errors.address && (

                                    <small className="error-text">
                                        {errors.address}
                                    </small>

                                )}

                            </div>


                            {/* STATE */}

                            <div className="common-form-group">

                                <label>
                                    State
                                    <span>*</span>
                                </label>

                                <select
                                    name="state"
                                    value={
                                        formData.state
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={
                                        errors.state
                                            ? "error-input"
                                            : ""
                                    }
                                >

                                    <option value="">
                                        Select State
                                    </option>

                                    {states.map((state) => {
                                        const stateId = state.stateId ?? state.id;
                                        return (
                                            <option
                                                key={stateId}
                                                value={stateId}
                                            >
                                                {state.stateName || state.name}
                                            </option>
                                        );
                                    })}

                                </select>

                                {errors.state && (

                                    <small className="error-text">
                                        {errors.state}
                                    </small>

                                )}

                            </div>


                            {/* DISTRICT */}

                            <div className="common-form-group">

                                <label>
                                    District
                                    <span>*</span>
                                </label>

                                <select
                                    name="district"
                                    value={
                                        formData.district
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={
                                        !formData.state
                                    }
                                    className={
                                        errors.district
                                            ? "error-input"
                                            : ""
                                    }
                                >

                                    <option value="">
                                        Select District
                                    </option>

                                    {districts.map((district) => {
                                        const districtId = district.id ?? district.districtId;
                                        return (
                                            <option
                                                key={districtId}
                                                value={districtId}
                                            >
                                                {district.name || district.districtName}
                                            </option>
                                        );
                                    })}

                                </select>

                                {errors.district && (

                                    <small className="error-text">
                                        {errors.district}
                                    </small>

                                )}

                            </div>


                            {/* VILLAGE */}

                            <div className="common-form-group">

                                <label>
                                    Village/City
                                    <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="villageCity"
                                    placeholder="Enter village/city"
                                    value={
                                        formData.villageCity
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={
                                        errors.villageCity
                                            ? "error-input"
                                            : ""
                                    }
                                />

                                {errors.villageCity && (

                                    <small className="error-text">
                                        {errors.villageCity}
                                    </small>

                                )}

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        MEMBERSHIP
                    ================================================= */}

                    <div className="member-form-section">

                        <div className="member-section-title">

                            MEMBERSHIP

                        </div>


                        <div className="member-form-grid">


                            {/* BRANCH */}

                            <div className="common-form-group">

                                <label>
                                    Branch
                                </label>

                                <select
                                    name="branchId"
                                    value={formData.branchId}
                                    onChange={handleChange}
                                    disabled={branchesLoading}
                                    className={
                                        errors.branchId
                                            ? "error-input"
                                            : ""
                                    }
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
                                                {branch.branchName ||
                                                    branch.name ||
                                                    `Branch ${id}`}
                                            </option>
                                        );
                                    })}
                                </select>

                                {errors.branchId && (
                                    <small className="error-text">
                                        {errors.branchId}
                                    </small>
                                )}

                            </div>


                            {/* MEMBER SINCE */}

                            <div className="common-form-group">

                                <label>
                                    Member Since
                                </label>

                                <input
                                    type="text"
                                    value={
                                        formData.memberSince ||
                                        "Auto"
                                    }
                                    disabled
                                />

                            </div>


                            {/* OCCUPATION */}

                            <div className="common-form-group">

                                <label>
                                    Occupation
                                    <span>*</span>
                                </label>

                                <select
                                    name="occupation"
                                    value={
                                        formData.occupation
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={
                                        errors.occupation
                                            ? "error-input"
                                            : ""
                                    }
                                >

                                    <option value="">
                                        Select Occupation
                                    </option>

                                    <option value="Farmer">
                                        Farmer
                                    </option>

                                    <option value="Business">
                                        Business
                                    </option>

                                    <option value="Shopkeeper">
                                        Shopkeeper
                                    </option>

                                    <option value="Tailor">
                                        Tailor
                                    </option>

                                    <option value="Labour">
                                        Labour
                                    </option>

                                    <option value="Private Job">
                                        Private Job
                                    </option>

                                    <option value="Government Job">
                                        Government Job
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                                {errors.occupation && (

                                    <small className="error-text">
                                        {errors.occupation}
                                    </small>

                                )}

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        KYC
                    ================================================= */}

                    <div className="member-form-section">

                        <div className="member-section-title">

                            KYC

                        </div>


                        <div className="member-form-grid">


                            {/* KYC TYPE */}

                            <div className="common-form-group">

                                <label>
                                    KYC Type
                                    <span>*</span>
                                </label>

                                <select
                                    name="kycType"
                                    value={
                                        formData.kycType
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="Aadhaar">
                                        Aadhaar
                                    </option>

                                    <option value="PAN">
                                        PAN
                                    </option>

                                    <option value="Voter ID">
                                        Voter ID
                                    </option>

                                    <option value="Driving License">
                                        Driving License
                                    </option>

                                </select>

                            </div>


                            {/* KYC NUMBER */}

                            <div className="common-form-group">

                                <label>
                                    KYC Number
                                    <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="kycNumber"
                                    placeholder="Enter KYC number"
                                    value={
                                        formData.kycNumber
                                    }
                                    onChange={(e) => {

                                        handleChange({
                                            target: {
                                                name:
                                                    "kycNumber",
                                                value:
                                                    formData.kycType ===
                                                    "PAN"
                                                        ? e.target.value
                                                            .toUpperCase()
                                                        : e.target.value,
                                            },
                                        });

                                    }}
                                    className={
                                        errors.kycNumber
                                            ? "error-input"
                                            : ""
                                    }
                                />

                                {errors.kycNumber && (

                                    <small className="error-text">
                                        {errors.kycNumber}
                                    </small>

                                )}

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        NOMINEE
                    ================================================= */}

                    <div className="member-form-section">

                        <div className="member-section-title">

                            NOMINEE

                        </div>


                        <div className="member-form-grid">


                            {/* NOMINEE NAME */}

                            <div className="common-form-group">

                                <label>
                                    Nominee Name
                                    <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="nomineeName"
                                    placeholder="Enter nominee name"
                                    value={
                                        formData.nomineeName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={
                                        errors.nomineeName
                                            ? "error-input"
                                            : ""
                                    }
                                />

                                {errors.nomineeName && (

                                    <small className="error-text">
                                        {errors.nomineeName}
                                    </small>

                                )}

                            </div>


                            {/* RELATION */}

                            <div className="common-form-group">

                                <label>
                                    Relation
                                    <span>*</span>
                                </label>

                                <select
                                    name="nomineeRelation"
                                    value={
                                        formData.nomineeRelation
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={
                                        errors.nomineeRelation
                                            ? "error-input"
                                            : ""
                                    }
                                >

                                    <option value="">
                                        Select Relation
                                    </option>

                                    <option value="Father">
                                        Father
                                    </option>

                                    <option value="Mother">
                                        Mother
                                    </option>

                                    <option value="Husband">
                                        Husband
                                    </option>

                                    <option value="Wife">
                                        Wife
                                    </option>

                                    <option value="Brother">
                                        Brother
                                    </option>

                                    <option value="Sister">
                                        Sister
                                    </option>

                                    <option value="Son">
                                        Son
                                    </option>

                                    <option value="Daughter">
                                        Daughter
                                    </option>

                                </select>

                                {errors.nomineeRelation && (

                                    <small className="error-text">
                                        {errors.nomineeRelation}
                                    </small>

                                )}

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        STATUS
                    ================================================= */}

                    <div className="member-form-section">

                        <div className="member-section-title">

                            STATUS

                        </div>


                        <div className="member-form-grid">


                            <div className="common-form-group">

                                <label>
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={
                                        formData.status
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="ACTIVE">
                                        Active
                                    </option>

                                    <option value="INACTIVE">
                                        Inactive
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        BUTTONS
                    ================================================= */}

                    <div className="common-form-buttons member-form-buttons">

                        <SaveButton
                            type="submit"
                            text={
                                data
                                    ? "Update"
                                    : "Save"
                            }
                        />

                        <CancelButton
                            type="button"
                            text="Cancel"
                            onClick={onClose}
                        />

                    </div>


                </form>

            </div>

        </div>

    );

};


export default MemberForm;