import React from "react";
import { useDropzone } from "react-dropzone";

function DropzoneComp(props) {
  const { setPetImage } = props;
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: "image/jpeg, image/png",
    });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <section className="container d-flex p-2 flex-column justify-content-center align-items-center">
      <div {...getRootProps({ className: "dropzone w-100" })}>
        <input {...getInputProps(setPetImage(acceptedFiles[0]))} />
        <div className="d-flex flex-column justify-content-center align-items-center ">
          <p>Drag 'n' drop some files here, or click to select files</p>
          <em>(Only *.jpeg and *.png images will be accepted)</em>
          <div>(-ONLY CUTE PETS ALLOWED!-)</div>
          <div>(--jk, there is not such a thing not-cute-pet--)</div>
        </div>
      </div>
      <aside className="mt-3">
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  );
}

export default DropzoneComp;
