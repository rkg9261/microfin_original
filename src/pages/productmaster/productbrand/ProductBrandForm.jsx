import React, {
    useEffect,
    useState,
} from "react";
import {
  createProductBrand,
  updateProductBrand,
} from "../../../store/slices/productBrandSlice";
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


const ProductBrandForm = ({
    data,
    onSave,
    onClose,
}) => {
  const dispatch = useAppDispatch();



   
    // FORM STATE
   

    const [formData, setFormData] =
        useState({

            brand: "",

            code: "",

            remark: "",

            status: "ACTIVE",

        });


   
    // ERROR STATE
   

    const [errors, setErrors] = useState({});
       


   
    // LOADING STATE
   

    const [loading, setLoading] =  useState(false);
      


   
    // LOAD EDIT DATA
   

    useEffect(() => {

        if (data) {

            setFormData({

                brand:
                    data.brand || "",

                code:
                    data.code || "",

                remark:
                    data.remark || "",

                status:
                    data.status || "ACTIVE",

            });

        } else {

            setFormData({

                brand: "",

                code: "",

                remark: "",

                status: "ACTIVE",

            });

        }

        setErrors({});

    }, [data]);


   
    // HANDLE INPUT CHANGE
   

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


   
    // HANDLE SUBMIT
    // POST / PUT
   

    const handleSubmit = async (e) => {

        e.preventDefault();


        
        // VALIDATION
        

        const validationErrors =
            validateRequired(
                formData,
                [

                    {
                        name: "brand",
                        label: "Brand Name",
                    },

                    {
                        name: "code",
                        label: "Brand Code",
                    },

                    {
                        name: "remark",
                        label: "Remark",
                    },

                ]
            );


        setErrors(validationErrors);


        if (
            Object.keys(validationErrors)
                .length > 0
        ) {

            return;

        }


        
        // API CALL
        

        try {

            setLoading(true);


            let result;


          
            // UPDATE
          

            if (data) {

                result =
                    await dispatch(updateProductBrand({ id: data.id, data: {

                            id: data.id,

                            brand:
                                formData.brand,

                            code:
                                formData.code,

                            remark:
                                formData.remark,

                            status:
                                formData.status,

                        } })).unwrap();


                console.log(
                    "PRODUCT BRAND UPDATED:",
                    result
                );


                toast.success(
                    "Product Brand updated successfully!"
                );

            }


          
            // CREATE
          

            else {

                result =
                    await dispatch(createProductBrand(
                        {

                            brand:
                                formData.brand,

                            code:
                                formData.code,

                            remark:
                                formData.remark,

                            status:
                                formData.status,

                        }
                    )).unwrap();


                console.log(
                    "PRODUCT BRAND CREATED:",
                    result
                );


                toast.success(
                    "Product Brand created successfully!"
                );

            }


        

            if (onSave) {

                onSave(result);

            }


         
            // CLOSE MODAL
         

            onClose();

        }

        catch (error) {

            console.error(
                "PRODUCT BRAND API ERROR:",
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
                "Failed to save Product Brand."
            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="common-modal">

            <div className="common-modal-content">


                {/*  HEADER  */}
                   
               

                <div className="common-modal-header">

                    <h2>

                        {data
                            ? "Edit Product Brand"
                            : "Add New"}

                    </h2>


                    <CloseButton
                        onClick={onClose}
                    />

                </div>


                {/* FORM*/} 
                 
                   

                <form
                    className="common-form"
                    onSubmit={handleSubmit}
                >


                    <div className="common-form-grid">


                        {/*  BRAND NAME*/}
                           
                         

                        <div className="common-form-group">

                            <label>

                                Brand Name
                                <span>*</span>

                            </label>


                            <input
                                type="text"
                                name="brand"
                                value={
                                    formData.brand
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter Brand Name"
                                className={
                                    errors.brand
                                        ? "error-input"
                                        : ""
                                }
                            />


                            {errors.brand && (

                                <p className="error-text">

                                    {errors.brand}

                                </p>

                            )}

                        </div>


                        {/*  REMARK*/}
                         
                           

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

                                    {errors.remark}

                                </p>

                            )}

                        </div>


                        {/*  BRAND CODE*/}
                           
                         

                        <div className="common-form-group">

                            <label>

                                Brand Code
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
                                placeholder="Enter Brand Code"
                                className={
                                    errors.code
                                        ? "error-input"
                                        : ""
                                }
                            />


                            {errors.code && (

                                <p className="error-text">

                                    {errors.code}

                                </p>

                            )}

                        </div>


                        {/* STATUS*/}
                         
                            

                        <div className="common-form-group">

                            <label>

                                Status

                            </label>


                            <div className="radio-group">


                                <label>

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

                                    Active

                                </label>


                                <label>

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

                                    Inactive

                                </label>


                            </div>

                        </div>


                    </div>


                    {/* BUTTONS */}
                        
                    

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


export default ProductBrandForm;