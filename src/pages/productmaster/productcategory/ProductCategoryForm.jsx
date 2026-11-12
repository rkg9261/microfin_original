import React, {
    useEffect,
    useState,
} from "react";
import {
  createProductCategory,
  updateProductCategory,
} from "../../../store/slices/productCategorySlice";
import { useAppDispatch } from "../../../store/hooks";
import "../../../components/common/CommonForm.css";
import "../../../utils/validation.css";
import { validateRequired } from "../../../utils/validation";
import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../../components/buttons";
import { toast } from "react-toastify";


const ProductCategoryForm = ({
    data,
    onSave,
    onClose,
}) => {
  const dispatch = useAppDispatch();


    // ============================================================
    // FORM STATE
    // ============================================================

    const [formData, setFormData] = useState({

        category: "",

        code: "",

        remark: "",

        status: "ACTIVE",

    });


    const [errors, setErrors] =
        useState({});


    const [loading, setLoading] =
        useState(false);


    // ============================================================
    // LOAD EDIT DATA
    // ============================================================

    useEffect(() => {

        if (data) {

            setFormData({

                category:
                    data.category || "",

                code:
                    data.code || "",

                remark:
                    data.remark || "",

                status:
                    data.status || "ACTIVE",

            });

        } else {

            setFormData({

                category: "",

                code: "",

                remark: "",

                status: "ACTIVE",

            });

        }

        setErrors({});

    }, [data]);


    // ============================================================
    // HANDLE CHANGE
    // ============================================================

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;


        setFormData((prev) => ({

            ...prev,

            [name]: value,

        }));


        if (errors[name]) {

            setErrors((prev) => ({

                ...prev,

                [name]: "",

            }));

        }

    };


    // ============================================================
    // SUBMIT
    // ============================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // ========================================================
        // VALIDATION
        // ========================================================

        const validationErrors =
            validateRequired(
                formData,
                [

                    {
                        name: "category",
                        label: "Category Name",
                    },

                    {
                        name: "code",
                        label: "Category Code",
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


        setErrors(validationErrors);


        if (
            Object.keys(
                validationErrors
            ).length > 0
        ) {

            return;

        }


        try {

            setLoading(true);


            let result;


            // ====================================================
            // UPDATE
            // ====================================================

            if (data) {

                const updateData = {

                    id: data.id,

                    category:
                        formData.category,

                    code:
                        formData.code,

                    remark:
                        formData.remark,

                    status:
                        formData.status,

                };


                result =
                    await dispatch(updateProductCategory({ id: data.id, data: updateData })).unwrap();


                console.log(
                    "PRODUCT CATEGORY UPDATED:",
                    result
                );


                toast.success(
                    "Product category updated successfully!"
                );

            }


            // ====================================================
            // CREATE
            // ====================================================

            else {

                const createData = {

                    category:
                        formData.category,

                    code:
                        formData.code,

                    remark:
                        formData.remark,

                    status:
                        formData.status,

                };


                result =
                    await dispatch(createProductCategory(
                        createData
                    )).unwrap();


                console.log(
                    "PRODUCT CATEGORY CREATED:",
                    result
                );


                toast.success(
                    "Product category created successfully!"
                );

            }


            // ====================================================
            // PARENT CALLBACK
            // ====================================================

            if (onSave) {

                onSave(result);

            }


            // ====================================================
            // CLOSE MODAL
            // ====================================================

            onClose();

        }

        catch (error) {

            console.error(
                "PRODUCT CATEGORY API ERROR:",
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
                "Failed to save product category."
            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="common-modal">

            <div className="common-modal-content">


                {/* ==================================================
                    MODAL HEADER
                ================================================== */}

                <div className="common-modal-header">

                    <h2>

                        {
                            data
                                ? "Edit Product Category"
                                : "Add Product Category"
                        }

                    </h2>


                    <CloseButton
                        onClick={onClose}
                    />

                </div>


                {/* ==================================================
                    FORM
                ================================================== */}

                <form
                    className="common-form"
                    onSubmit={handleSubmit}
                >

                    <div className="common-form-grid">


                        {/* ==================================================
                            CATEGORY
                        ================================================== */}

                        <div className="common-form-group">

                            <label>

                                Category Name
                                <span>*</span>

                            </label>


                            <input
                                type="text"
                                name="category"
                                value={
                                    formData.category
                                }
                                onChange={
                                    handleChange
                                }
                                className={
                                    errors.category
                                        ? "error-input"
                                        : ""
                                }
                                placeholder="Enter category name"
                            />


                            {errors.category && (

                                <p className="error-text">

                                    {
                                        errors.category
                                    }

                                </p>

                            )}

                        </div>


                        {/* ==================================================
                            CODE
                        ================================================== */}

                        <div className="common-form-group">

                            <label>

                                Category Code
                                <span>*</span>

                            </label>


                            <input
                                type="text"
                                name="code"
                                value={
                                    formData.code
                                }
                                onChange={
                                    handleChange
                                }
                                className={
                                    errors.code
                                        ? "error-input"
                                        : ""
                                }
                                placeholder="Enter category code"
                            />


                            {errors.code && (

                                <p className="error-text">

                                    {
                                        errors.code
                                    }

                                </p>

                            )}

                        </div>


                        {/* ==================================================
                            REMARK
                        ================================================== */}

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
                                className={
                                    errors.remark
                                        ? "error-input"
                                        : ""
                                }
                                placeholder="Enter remark"
                            />


                            {errors.remark && (

                                <p className="error-text">

                                    {
                                        errors.remark
                                    }

                                </p>

                            )}

                        </div>


                        {/* ==================================================
                            STATUS
                        ================================================== */}

                        <div className="common-form-group">

                            <label>

                                Status
                                <span>*</span>

                            </label>


                            <div className="status-radio-group">


                                {/* ACTIVE */}

                                <label className="status-radio-label">

                                    <input
                                        type="radio"
                                        name="status"
                                        value="ACTIVE"
                                        checked={
                                            formData.status ===
                                            "ACTIVE"
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                    <span>
                                        Active
                                    </span>

                                </label>


                                {/* INACTIVE */}

                                <label className="status-radio-label">

                                    <input
                                        type="radio"
                                        name="status"
                                        value="INACTIVE"
                                        checked={
                                            formData.status ===
                                            "INACTIVE"
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                    <span>
                                        Inactive
                                    </span>

                                </label>


                            </div>


                            {errors.status && (

                                <p className="error-text">

                                    {
                                        errors.status
                                    }

                                </p>

                            )}

                        </div>


                    </div>


                    {/* ==================================================
                        BUTTONS
                    ================================================== */}

                    <div className="common-form-buttons">

                        <SaveButton
                            type="submit"
                            text="Save"
                            disabled={loading}
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


export default ProductCategoryForm;