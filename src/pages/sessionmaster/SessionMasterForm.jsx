import React, {
    useEffect,
    useState,
} from "react";
import {
  createSession,
  updateSession,
} from "../../store/slices/sessionMasterSlice";
import { useAppDispatch } from "../../store/hooks";
import "../../components/common/CommonForm.css";
import "../../utils/validation.css";
import { validateRequired } from "../../utils/validation";
import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../components/buttons";
import { toast } from "react-toastify";


const SessionMasterForm = ({
    data,
    onSave,
    onClose,
}) => {
  const dispatch = useAppDispatch();


  
    // FORM STATE
  

    const [formData, setFormData] =
        useState({

            session: "",

            startDate: "",

            endDate: "",

            startYear: "",

            endYear: "",

            remark: "",

            status: "ACTIVE",

        });


    const [errors, setErrors] =
        useState({});


    const [loading, setLoading] =
        useState(false);


  
    // FORMAT DATE FOR INPUT
  

    const formatDateForInput = (date) => {

        if (!date) {
            return "";
        }

        return String(date).split("T")[0];

    };


  
    // LOAD EDIT DATA
  

    useEffect(() => {

        if (data) {

            setFormData({

                session:
                    data.session || "",

                startDate:
                    formatDateForInput(
                        data.startDate
                    ),

                endDate:
                    formatDateForInput(
                        data.endDate
                    ),

                startYear:
                    data.startYear ??
                    "",

                endYear:
                    data.endYear ??
                    "",

                remark:
                    data.remark || "",

                status:
                    data.status ||
                    "ACTIVE",

            });

        } else {

            setFormData({

                session: "",

                startDate: "",

                endDate: "",

                startYear: "",

                endYear: "",

                remark: "",

                status: "ACTIVE",

            });

        }

        setErrors({});

    }, [data]);


  
    // HANDLE CHANGE
  

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;


        setFormData((prev) => ({

            ...prev,

            [name]: value,

        }));


        setErrors((prev) => ({

            ...prev,

            [name]: "",

        }));

    };


  
    // SUBMIT FORM
  

    const handleSubmit = async (e) => {

        e.preventDefault();


      
        // VALIDATION
      

        const validationErrors =
            validateRequired(
                formData,
                [

                    {
                        name: "session",
                        label: "Session",
                    },

                    {
                        name: "startDate",
                        label: "Start Date",
                    },

                    {
                        name: "endDate",
                        label: "End Date",
                    },

                    {
                        name: "startYear",
                        label: "Start Year",
                    },

                    {
                        name: "endYear",
                        label: "End Year",
                    },

                    {
                        name: "remark",
                        label: "Remark",
                    },

                    {
                        name: "status",
                        label: "Status",
                    },

                ]
            );


        if (
            Object.keys(
                validationErrors
            ).length > 0
        ) {

            setErrors(
                validationErrors
            );

            return;

        }


      
        // DATE VALIDATION
      

        if (
            new Date(formData.startDate) >=
            new Date(formData.endDate)
        ) {

            toast.error(
                "End Date must be greater than Start Date."
            );

            return;

        }


      
        // YEAR VALIDATION
      

        if (
            Number(formData.startYear) >=
            Number(formData.endYear)
        ) {

            toast.error(
                "End Year must be greater than Start Year."
            );

            return;

        }


        try {

            setLoading(true);


            let result;


           
            // UPDATE
           

            if (data) {

                const updateData = {

                    id: data.id,

                    session:
                        formData.session,

                    startDate:
                        formData.startDate,

                    endDate:
                        formData.endDate,

                    startYear:
                        Number(
                            formData.startYear
                        ),

                    endYear:
                        Number(
                            formData.endYear
                        ),

                    remark:
                        formData.remark,

                    status:
                        formData.status,

                };


                result =
                    await dispatch(updateSession({ id: data.id, data: updateData })).unwrap();


                console.log(
                    "SESSION UPDATED:",
                    result
                );


                toast.success(
                    "Session updated successfully!"
                );

            }


           
            // CREATE
           

            else {

                const createData = {

                    session:
                        formData.session,

                    startDate:
                        formData.startDate,

                    endDate:
                        formData.endDate,

                    startYear:
                        Number(
                            formData.startYear
                        ),

                    endYear:
                        Number(
                            formData.endYear
                        ),

                    remark:
                        formData.remark,

                    status:
                        formData.status,

                };


                result =
                    await dispatch(createSession(
                        createData
                    )).unwrap();


                console.log(
                    "SESSION CREATED:",
                    result
                );


                toast.success(
                    "Session created successfully!"
                );

            }


           
            // SEND RESULT TO PARENT
           

            if (onSave) {

                onSave(result);

            }


           
            // CLOSE MODAL
           

            onClose();

        }

        catch (error) {

            console.error(
                "SESSION API ERROR:",
                error
            );


            if (error.response) {

                console.error(
                    "STATUS:",
                    error.response.status
                );

                console.error(
                    "DATA:",
                    error.response.data
                );

            }


            toast.error(
                error?.response?.data?.message ||
                "Failed to save session."
            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="common-modal">

            <div className="common-modal-content">


                {/* HEADER  */}
                   
              

                <div className="common-modal-header">

                    <h2>

                        {
                            data
                                ? "Edit Session"
                                : "Add New"
                        }

                    </h2>


                    <CloseButton
                        onClick={onClose}
                    />

                </div>


                {/*
                    FORM
                */}

                <form
                    className="common-form"
                    onSubmit={handleSubmit}
                >


                    <div className="common-form-grid">


                        {/* SESSION */}

                        <div className="common-form-group">

                            <label>

                                Session
                                <span>*</span>

                            </label>


                            <input
                                type="text"
                                name="session"
                                value={
                                    formData.session
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="2026-2027"
                                className={
                                    errors.session
                                        ? "error-input"
                                        : ""
                                }
                            />


                            {errors.session && (

                                <p className="error-text">

                                    {
                                        errors.session
                                    }

                                </p>

                            )}

                        </div>


                        {/* START YEAR */}

                        <div className="common-form-group">

                            <label>

                                Start Year
                                <span>*</span>

                            </label>


                            <input
                                type="number"
                                name="startYear"
                                value={
                                    formData.startYear
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="2026"
                                className={
                                    errors.startYear
                                        ? "error-input"
                                        : ""
                                }
                            />


                            {errors.startYear && (

                                <p className="error-text">

                                    {
                                        errors.startYear
                                    }

                                </p>

                            )}

                        </div>


                        {/* START DATE */}

                        <div className="common-form-group">

                            <label>

                                Start Date
                                <span>*</span>

                            </label>


                            <input
                                type="date"
                                name="startDate"
                                value={
                                    formData.startDate
                                }
                                onChange={
                                    handleChange
                                }
                                className={
                                    errors.startDate
                                        ? "error-input"
                                        : ""
                                }
                            />


                            {errors.startDate && (

                                <p className="error-text">

                                    {
                                        errors.startDate
                                    }

                                </p>

                            )}

                        </div>


                        {/* END YEAR */}

                        <div className="common-form-group">

                            <label>

                                End Year
                                <span>*</span>

                            </label>


                            <input
                                type="number"
                                name="endYear"
                                value={
                                    formData.endYear
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="2027"
                                className={
                                    errors.endYear
                                        ? "error-input"
                                        : ""
                                }
                            />


                            {errors.endYear && (

                                <p className="error-text">

                                    {
                                        errors.endYear
                                    }

                                </p>

                            )}

                        </div>


                        {/* END DATE */}

                        <div className="common-form-group">

                            <label>

                                End Date
                                <span>*</span>

                            </label>


                            <input
                                type="date"
                                name="endDate"
                                value={
                                    formData.endDate
                                }
                                onChange={
                                    handleChange
                                }
                                className={
                                    errors.endDate
                                        ? "error-input"
                                        : ""
                                }
                            />


                            {errors.endDate && (

                                <p className="error-text">

                                    {
                                        errors.endDate
                                    }

                                </p>

                            )}

                        </div>


                        {/* STATUS */}

                        <div className="common-form-group">

                            <label>

                                Select Status
                                <span>*</span>

                            </label>


                            <select
                                name="status"
                                value={
                                    formData.status
                                }
                                onChange={
                                    handleChange
                                }
                                className={
                                    errors.status
                                        ? "error-input"
                                        : ""
                                }
                            >

                                <option value="">

                                    Select Status

                                </option>


                                <option value="ACTIVE">

                                    ACTIVE

                                </option>


                                <option value="INACTIVE">

                                    INACTIVE

                                </option>

                            </select>


                            {errors.status && (

                                <p className="error-text">

                                    {
                                        errors.status
                                    }

                                </p>

                            )}

                        </div>


                        {/* REMARK */}

                        <div className="common-form-group">

                            <label>

                                Remark
                                <span>*</span>

                            </label>


                            <input
                                type="text"
                                name="remark"
                                value={
                                    formData.remark
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter Remark"
                                className={
                                    errors.remark
                                        ? "error-input"
                                        : ""
                                }
                            />


                            {errors.remark && (

                                <p className="error-text">

                                    {
                                        errors.remark
                                    }

                                </p>

                            )}

                        </div>


                    </div>


                    {/*
                        BUTTONS
                    */}

                    <div className="common-form-buttons">

                        <SaveButton
                            type="submit"
                            disabled={loading}
                        />


                        <CancelButton
                            type="button"
                            onClick={onClose}
                        />

                    </div>


                </form>

            </div>

        </div>

    );

};


export default SessionMasterForm;