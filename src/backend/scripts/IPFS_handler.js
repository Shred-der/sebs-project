const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = {JWT}

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "path/to/file.png";
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}
pinFileToIPFS()
/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5ZTA4OGQ2Ny0xYzJhLTRmZTctOTY0NC0yYmM1NDk5NmY2NjYiLCJlbWFpbCI6Im9sYW5pcGVrdW5vbGFkYXBvMTlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImM3ZDUyOWM1MDg4YzMxNDhhZjA3Iiwic2NvcGVkS2V5U2VjcmV0IjoiNzdhZWZkNzE0NTQxODEyMWQwOWIyMDJmZjExZTJkN2JhOTI4N2IzM2IyZmUyZGE2MTNhMjM0ZjdjNWJjYzBiOSIsImlhdCI6MTY5NzE3OTQ5Mn0.cJoa3sDyZr8TzA_bh9hFKzZTyd5ctpLs_TL9liug76s





https://rose-high-coral-142.mypinata.cloud
*/