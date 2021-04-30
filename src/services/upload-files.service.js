import http from "../http-common";

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);
    const requestOptions = {
      method: 'POST',
      
      body:formData
  };

    return fetch("http://localhost:8080/upload/upload", requestOptions);
    // return http.post("/upload/upload", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   onUploadProgress,
    // });
  }

  getFiles() {
    return http.get("/files");
  }
}

export default new UploadFilesService();