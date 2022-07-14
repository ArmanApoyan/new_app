import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosImage, axiosPost } from "../../config/axios";
import { image } from "../../config/image";
import "./style.scss";

interface propsType {
  id?: number;
}

const ImageForm: React.FC<propsType> = (props) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = props;
  useEffect(() => {
    axiosPost("/getImage", id).then((res) => {
      if (res.url) {
        setUrl(res.url);
      }
      setLoading(false)
    });
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  return (
    <>
      
       
      
      { loading ? 
      <div className="loading">
        <div className="lds-ripple"><div></div><div></div></div>
      </div>
      :!url ? (
        <>
          <form
            className="imageForm"
            encType="multipart/form-data"
            onSubmit={handleSubmit(async (data) => {
              await axiosImage("/addImage", { image: data.image[0], id: id });
              axiosPost("/getImage", id).then((res) => {
                if (res.url) {
                  setUrl(res.url);
                }
              });
              reset();
            })}
          >
            <input
              type="file"
              className="imageInput"
              {...register("image", { required: true })}
            />
            <button type="submit" className="imageSubmit">
              ADD
            </button>
          </form>
        </>
      ) : (
        <img src={`${image}${url}`} alt={url} className="taskImage" />
      )}
      {/* <button onClick={()=>{throw new Error()}}>Error</button> */}
    </>
  );
};

export default ImageForm;
