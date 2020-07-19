<template>
  <div class="oauth2callback">
    <input type="file" @input="onInput" />
  </div>
</template>

<script>
import { utilService } from "../services/util.service";
import httpService from "../services/http.service";
import '../services/api'
const {gapi}= window;

export default {
  name: "oauth2callback",
  data() {
    return {
      access_token: null,
      media: {}
    };
  },
  created() {
    this.access_token = utilService.getParameterByName(
      "access_token",
      this.$route.fullPath
    );
    console.log(httpService);

    // this.trySampleRequest()
    // this.trySampleRequest2()
    // this.revokeAccess();
  },
  methods: {
    async onInput(ev) {
      if (ev.target.files[0]) {
        this.insertFile(ev.target.files[0]);
            // await this.createFile(ev.target.files[0]);
            // setTimeout(() => {
            //   console.log(this.media, "this.media");
            // //   httpService.post(
            // //     `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id`
            //     // `https://www.googleapis.com/upload/drive/v3/files?uploadType=${this.media}&access_token=${this.access_token}`
            // //   );
            // }, 500);
      }
      //   this.trySampleRequest();
    },
    async trySampleRequest() {
      const res = await httpService.get(
        `about?fields=user&access_token=${this.access_token}`
      );
      console.log(res, "res");
    },
    async trySampleRequest2() {
      var fileContent = "sample text"; // As a sample, upload a text file.
      var file = new Blob([fileContent], { type: "text/plain" });
      var metadata = {
        name: "sampleName", // Filename at Google Drive
        mimeType: "text/plain", // mimeType at Google Drive
        parents: ["### folder ID ###"] // Folder ID at Google Drive
      };

      var form = new FormData();
      form.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" })
      );
      form.append("file", file);

      var xhr = new XMLHttpRequest();
      xhr.open(
        "post",
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id"
      );
      xhr.setRequestHeader("Authorization", "Bearer " + this.access_token);
      xhr.responseType = "json";
      xhr.onload = () => {
        console.log(xhr.response.id); // Retrieve uploaded file ID.
      };
      xhr.send(form);
    },
    async createFile(myFile) {
      console.log(myFile, "myFile");
      var reader = new FileReader();
      reader.onload = e => {
        this.media = {
          mimeType: myFile.type,
          body: e.target.result
        };
        console.log(btoa(reader.result), 'btoa(reader.result)');
      };
      reader.readAsDataURL(myFile);
    },
    // trySampleRequest(type, req) {
    //   var xhr = new XMLHttpRequest();
    //   xhr.open(
    //     "GET",
    //     "https://www.googleapis.com/drive/v3/about?fields=user&" +
    //       "access_token=" +
    //       this.access_token
    //   );
    //   xhr.onreadystatechange = function(e) {
    //     console.log(xhr.response);
    //   };
    //   xhr.send(null);
    // },
    revokeAccess() {
      // Google's OAuth 2.0 endpoint for revoking access tokens.
      var revokeTokenEndpoint = "https://oauth2.googleapis.com/revoke";

      // Create <form> element to use to POST data to the OAuth 2.0 endpoint.
      var form = document.createElement("form");
      form.setAttribute("method", "post");
      form.setAttribute("action", revokeTokenEndpoint);

      // Add access token to the form so it is set as value of 'token' parameter.
      // This corresponds to the sample curl request, where the URL is:
      //      https://oauth2.googleapis.com/revoke?token={token}
      var tokenField = document.createElement("input");
      tokenField.setAttribute("type", "hidden");
      tokenField.setAttribute("name", "token");
      tokenField.setAttribute("value", this.access_token);
      form.appendChild(tokenField);

      // Add form to page and submit it to actually revoke the token.
      document.body.appendChild(form);
      form.submit();
    },
    insertFile(fileData) {
      const boundary = "-------314159265358979323846";
      const delimiter = "\r\n--" + boundary + "\r\n";
      const close_delim = "\r\n--" + boundary + "--";

      var reader = new FileReader();
      reader.readAsBinaryString(fileData);
      reader.onload = async e=> {
        var contentType = fileData.type || "application/octet-stream";
        var metadata = {
          title: fileData.fileName,
          mimeType: contentType
        };

        var base64Data = btoa(reader.result);
        var multipartRequestBody =
          delimiter +
          "Content-Type: application/json\r\n\r\n" +
          JSON.stringify(metadata) +
          delimiter +
          "Content-Type: " +
          contentType +
          "\r\n" +
          "Content-Transfer-Encoding: base64\r\n" +
          "\r\n" +
          base64Data +
          close_delim;

        // httpService.post(
        //   `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&Content-Type=${multipartRequestBody}&Content-Type=multipart/mixed;boundary=${boundary}`
        //   // `https://www.googleapis.com/upload/drive/v3/files?uploadType=${this.media}&access_token=${this.access_token}`
        // );
        var request = await gapi.client.request({
            'path': '/upload/drive/v2/files',
            'method': 'POST',
            'params': {'uploadType': 'multipart'},
            'headers': {
              'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
            },
            'body': multipartRequestBody});
        if (!callback) {
          callback = function(file) {
            console.log(file)
          };
        }
        request.execute(callback);
      };
    }
    //   insertFile(fileData, callback) {
  }
};
</script>