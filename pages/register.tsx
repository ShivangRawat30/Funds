import NavBtn from '@/components/NavBtn'
import { createUser } from '@/services/metadata'
import { CharityParams } from '@/utils/type.dt'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'

const Page: NextPage = () => {
  const router = useRouter();
  
    const { address } = useAccount()
    const [formData, setFormData] = useState({
        fullName: '',
        dateOfBirth: '',
        gender: '',
        nationality: '',
        familyMembers: '',  // Text area for family member details (e.g., "Name, Age, Relationship")
        address: '',
        contactNumber: '',
        displacementDetails: '',  // Details about reason, date, and route of displacement
        legalDocuments: '',  // Optional legal document details
        healthInfo: '',  // Any relevant health information or special needs
        education: '',
        skills: '',
        languages: '',  // Languages spoken by the individual
        vulnerabilities: '',  // Description of vulnerabilities or special needs
        consent: false,  // Checkbox for data consent
      });
    const [charity, setCharity] = useState<CharityParams>({
      name: '',
      fullname: '',
      profile: '',
      amount: '',
      description: '',
      image: '',
    })
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };
  
    // const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //   const { name, value } = e.target
    //   setCharity((prevState) => ({
    //     ...prevState,
    //     [name]: value,
    //   }))
    // }
      const register  = () => {
        console.log("cid: QmZdJxnXYx3279nnEY6SiC3M8WKi6TVvUdDk35WZiuEpTZ",)
        router.push('/Home');
      }
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault()
  
      if (
        !charity.name ||
        !charity.fullname ||
        !charity.profile ||
        !charity.amount ||
        !charity.description
      )
        return
  
      if (!address) return toast.warning('Connect wallet first!')
  
      await toast.promise(
        new Promise<void>((resolve, reject) => {
          console.log(charity)
          resolve()
        }),
        {
          pending: 'Approve transaction...',
          success: 'Charity created successfully 👌',
          error: 'Encountered error 🤯',
        }
      )
    }
  
    const resetForm = () => {
      setCharity({
        name: '',
        fullname: '',
        profile: '',
        amount: '',
        description: '',
        image: '',
      })
    }
  
    return (
      <div>
  <Head>
    <title>Refugee Registration</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>

  <div className="h-10"></div>
  <div className="h-10"></div>

  <div className="flex flex-col w-full sm:w-4/5 py-4 px-4 sm:px-0 mx-auto">
    <div className="block justify-center items-center m-auto w-full sm:w-3/5">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-center mb-4">
          <h2>Refugee Registration</h2>
        </div>

        {/* Personal Identification Information */}
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            className="input-field border-2 px-4"
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            required
            className="input-field border-2 px-4"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <select
            name="gender"
            className="input-field border-2 px-4"
            required
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="nationality"
            placeholder="Nationality"
            required
            className="input-field border-2 px-4"
            value={formData.nationality}
            onChange={handleChange}
          />
        </div>

        {/* Family Composition and Relationships */}
        <textarea
          name="familyMembers"
          placeholder="Family Members (Name, Age, Relationship)"
          required
          className="input-field border-2 px-4"
          value={formData.familyMembers}
          onChange={handleChange}
        ></textarea>

        {/* Contact Information */}
        <input
          type="text"
          name="address"
          placeholder="Current Address or Location"
          required
          className="input-field border-2 px-4"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="contactNumber"
          placeholder="Contact Number"
          className="input-field border-2 px-4"
          value={formData.contactNumber}
          onChange={handleChange}
        />

        {/* Displacement Details */}
        <textarea
          name="displacementDetails"
          placeholder="Circumstances of Displacement (Reason, Date, Route)"
          required
          className="input-field border-2 px-4"
          value={formData.displacementDetails}
          onChange={handleChange}
        ></textarea>

        {/* Legal Documents */}
        <input
          type="text"
          name="legalDocuments"
          placeholder="Legal Documents (if available)"
          className="input-field border-2 px-4"
          value={formData.legalDocuments}
          onChange={handleChange}
        />

        {/* Health Information */}
        <textarea
          name="healthInfo"
          placeholder="Health Information (Medical Conditions, Vaccination Status)"
          className="input-field border-2 px-4"
          value={formData.healthInfo}
          onChange={handleChange}
        ></textarea>

        {/* Education and Skills */}
        <input
          type="text"
          name="education"
          placeholder="Highest Level of Education"
          className="input-field border-2 px-4"
          value={formData.education}
          onChange={handleChange}
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills / Work Experience"
          className="input-field border-2 px-4"
          value={formData.skills}
          onChange={handleChange}
        />
        <input
          type="text"
          name="languages"
          placeholder="Languages Spoken"
          className="input-field border-2 px-4"
          value={formData.languages}
          onChange={handleChange}
        />

        {/* Vulnerabilities and Protection Needs */}
        <textarea
          name="vulnerabilities"
          placeholder="Vulnerabilities and Special Needs"
          className="input-field border-2 px-4"
          value={formData.vulnerabilities}
          onChange={handleChange}
        ></textarea>

        {/* Consent */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="consent"
            required
            checked={formData.consent}
            onChange={handleChange}
          />
          <label htmlFor="consent" className="text-sm">
            I consent to the collection and use of my data for assistance purposes.
          </label>
        </div>

        <button
          type="submit"
          onClick={register}
          className="text-white text-md bg-[#a75891] py-3 px-8 rounded-full
          drop-shadow-xl border border-transparent hover:bg-transparent hover:border-[#a75891]
          hover:text-[#a75891] focus:outline-none mt-5"
        >
          Register
        </button>
      </div>
    </div>
  </div>

  <div className="h-10"></div>
</div>
    )
}

export default Page

// export const getServerSideProps = async () => {
//   const charitiesData: CharityStruct[] = await getCharities();
//   return {
//     props: { charitiesData: JSON.parse(JSON.stringify(charitiesData)) },
//   }
// }
