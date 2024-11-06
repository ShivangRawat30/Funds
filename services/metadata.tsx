import { create } from 'ipfs-http-client'

const createUser = async (userData: any) => {
  try {
    console.log("enter ");
    const projectId = '13835bddca17815044f7';
const projectSecret = '931a9336b49239864d0f251968029c6cfcc5852dd38dd4f15c7f43198248e383';
const auth =
'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = create({
    host: 'scarlet-naval-mackerel-880.mypinata.cloud?pinataGatewayToken=dSDh57HJ9WVigwVc4cwO2on-sY-zduF6eUBgiRih2dQw89yozDWWvtbYl9BSKXZ7',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });

    const metadata = {
        fullName: userData.fullName,
        dateOfBirth: userData.dateOfBirth,
        gender: userData.gender,
        nationality: userData.nationality,
        familyMembers: [
          {
            name: "Jane Doe",
            age: 35,
            relationship: "Spouse"
          },
          {
            name: "Sam Doe",
            age: 10,
            relationship: "Child"
          }
        ],
        address: userData.address,
        contactNumber: userData.contactNumber,
        displacementDetails: {
          reason: "Conflict",
          date: "2023-08-01",
          route: "Home to neighboring country, through land border"
        },
        legalDocuments: [
          {
            documentType: "Passport",
            documentNumber: "A12345678",
            expiryDate: "2025-12-31"
          }
        ],
        healthInfo: {
          medicalConditions: ["Diabetes"],
          vaccinationStatus: "Up to date"
        },
        education: "Bachelor's Degree in Engineering",
        skills: ["Carpentry", "Basic Plumbing"],
        languages: ["Arabic", "English"],
        vulnerabilities: "Requires regular insulin for diabetes",
        consent: true
      };
  
      // Convert the object to a JSON string
      const metadataBuffer = Buffer.from(JSON.stringify(metadata));
  
      // Add the JSON string to IPFS
      const result = await ipfs.add(JSON.stringify(metadata));
      console.log('IPFS Result:', result);
      console.log("end");
  } catch (error) {
    console.log(error)
  }
}

export {
    createUser
}
