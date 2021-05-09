import http from "../http-common";

class UploadFilesService {
  
  upload(file) {
    let formData = new FormData();

    formData.append("file", file);
    const requestOptions = {
      method: 'POST',
      body:formData
  };
    return fetch("http://localhost:8080/upload/upload", requestOptions).then(res => res.json()).then(json => json);
   
  }

  getFiles() {
    return http.get("/files");
  }
}

export default new UploadFilesService();