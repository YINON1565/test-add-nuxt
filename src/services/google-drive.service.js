


function uploadFiles(myfile) {
  
    try {
      
      var dropbox = "Student Files";
      var folder, folders = DriveApp.getFoldersByName(dropbox);
      
      if (folders.hasNext()) {
        folder = folders.next();
      } else {
        folder = DriveApp.createFolder(dropbox);
      }
      
    //   var blob = form.myFile;    
      var file = folder.createFile(myfile); 
    //   var file = folder.createFile(blob); 
      file.setName('Test');
      file.setDescription("Uploaded by Yinon Eliyahu");
    //   file.setName(form.classPer + form.myName);
    //   file.setDescription("Uploaded by " + form.myName);
    //   Logger.log(form.myName);
          
      return "File uploaded successfully. You can now close this window.";
      
    } catch (error) {
      
      return error.toString();
    }
    
  }

  async function uploadImg(ev) {
    // const CLOUD_NAME = "yinon1565"
    const UPLOAD_URL = `https://www.googleapis.com/upload/drive/v3/files?uploadType=media`
    const UPLOAD_PRESET = 'ml_default';
    const formData = new FormData();
        if (ev.target) {
            formData.append('file', ev.target.files[0])
        } else {
            formData.append('file', ev)
        }
    formData.append('upload_preset', UPLOAD_PRESET); // second parameter is the upload preset

    return fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData,
            secure:true
        })
        .then(res => res.json())
        .then(res => {
            return res
        })
        .catch(err => console.error(err))
}

  export const googleDriveService = {
    uploadFiles,
    uploadImg
  }

/*

    RECEIVE FILES IN GOOGLE DRIVE
    - - - - - - - - - - - - - - - 
    
    Tutorial: www.labnol.org/awesome

    Twitter: @labnol
    
    Email: amit@labnol.org
      
*/

function doGet(e) {
    return HtmlService.createHtmlOutputFromFile('forms.html').setTitle("Google File Upload by CTRLQ.org");
  }
  
  
  function uploadFileToGoogleDrive(data, file, name, email) {
    
    try {
      
      var dropbox = "Received Files";
      var folder, folders = DriveApp.getFoldersByName(dropbox);
      
      if (folders.hasNext()) {
        folder = folders.next();
      } else {
        folder = DriveApp.createFolder(dropbox);
      }
      
      /* Credit: www.labnol.org/awesome */
      
      var contentType = data.substring(5,data.indexOf(';')),
          bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,')+7)),
          blob = Utilities.newBlob(bytes, contentType, file),
          file = folder.createFolder([name, email].join(" ")).createFile(blob);
      
      return "OK";
      
    } catch (f) {
      return f.toString();
    }
    
  }