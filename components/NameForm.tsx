'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import FileDropzone from './Dropzone';
import { ApplicationFileTypes } from '@/lib/types';
import { formatTimestamp, extractFileName } from '@/utils/format';
export default function NameForm() {
  const [loading, setLoading] = useState(false);

  const debouncedSave = useCallback(
    debounce(async (applicationData) => {
      setIsSaving(true); // Indicate that saving has started
      try {
        const response = await fetch('/api/application', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(applicationData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to save application data');
        }
  
        console.log('Application data saved successfully');
        setLastSaved(new Date().toLocaleTimeString()); // Update last saved time
      } catch (error) {
        console.error('Error saving application data:', error);
      } finally {
        setIsSaving(false); // Reset saving status regardless of outcome
      }
    }, 1000),
    []
  );

  

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/application', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch application data');
        }

        const applicationObject = await response.json();
        const data = applicationObject.application;
        setApplicationId(data.id);
        setFirstName(data.name.split(' ')[0]); 
        setLastName(data.name.split(' ')[1]); 
        setPronouns(data.pronouns); 
        setPhoneNumber(data.phone_number); 
        setYearInCollege(data.year); 
        setGraduationYear(data.graduation_year || ''); 
        setGraduationQuarter(data.graduation_qtr); 
        setMajor(data.major); 
        setMinor(data.minor); 
        setCumulativeGPA(data.gpa || ''); 
        setCurrentClasses(data.classes); 
        setExtracurricularActivities(data.extracurriculars); 
        setProudAccomplishment(data.accomplishment);
        setJoinReason(data.why_akpsi);
        setLifeGoals(data.goals);
        setComfortZone(data.comfort_zone);
        setBusinessType(data.business);
        setAdditionalDetails(data.additional);
        setResumeFileUrl(data.resume);
        setCoverLetterFileUrl(data.cover_letter);
        setLastSaved(formatTimestamp(data.last_updated));

        
      } catch (error) {
        console.error('Error fetching application data:', error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);



  /**
   * States for user application forms
   */
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [applicationId, setApplicationId] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [pronouns, setPronouns] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [yearInCollege, setYearInCollege] = useState<string>('');
  const [graduationYear, setGraduationYear] = useState<string>('');
  const [graduationQuarter, setGraduationQuarter] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [minor, setMinor] = useState<string>('');
  const [cumulativeGPA, setCumulativeGPA] = useState<string>('');
  const [currentClasses, setCurrentClasses] = useState<string>('');
  const [extracurricularActivities, setExtracurricularActivities] =
    useState<string>('');
  const [proudAccomplishment, setProudAccomplishment] = useState<string>('');
  const [joinReason, setJoinReason] = useState<string>('');
  const [lifeGoals, setLifeGoals] = useState<string>('');
  const [comfortZone, setComfortZone] = useState<string>('');
  const [businessType, setBusinessType] = useState<string>('');
  const [additionalDetails, setAdditionalDetails] = useState<string>('');
  const [resumeFileUrl, setResumeFileUrl] = useState<string>('');
  const [coverLetterFileUrl, setCoverLetterFileUrl] = useState<string>('');
  

  useEffect(() => {
    if (resumeFileUrl || coverLetterFileUrl) {
      debouncedSave({
        id: applicationId,
        firstName,
        lastName,
        pronouns,
        phoneNumber,
        yearInCollege,
        graduationYear,
        graduationQuarter,
        major,
        minor,
        cumulativeGPA,
        currentClasses,
        extracurricularActivities,
        proudAccomplishment,
        joinReason,
        lifeGoals,
        comfortZone,
        businessType,
        additionalDetails,
        resumeFileUrl,
        coverLetterFileUrl,
      });
    }
  }, [resumeFileUrl, coverLetterFileUrl]);


  const handleChange =
  (setState: React.Dispatch<React.SetStateAction<string>>) =>
  (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setState(event.target.value);
    debouncedSave({
      id: applicationId,
      firstName,
      lastName,
      pronouns,
      phoneNumber,
      yearInCollege,
      graduationYear,
      graduationQuarter,
      major,
      minor,
      cumulativeGPA,
      currentClasses,
      extracurricularActivities,
      proudAccomplishment,
      joinReason,
      lifeGoals,
      comfortZone,
      businessType,
      additionalDetails,
      resumeFileUrl,
      coverLetterFileUrl,
    });
  };

  // Function to handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // You can handle form submission logic here
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Pronouns:', pronouns);
    console.log('Phone Number:', phoneNumber);
    console.log('Year in College:', yearInCollege);
    console.log('Graduation Year:', graduationYear);
    console.log('Graduation Quarter:', graduationQuarter);
    console.log('Major:', major);
    console.log('Minor:', minor);
    console.log('Cumulative GPA:', cumulativeGPA);
    console.log('Current Classes:', currentClasses);
    console.log('Extracurricular Activities:', extracurricularActivities);
    console.log('Proud Accomplishment:', proudAccomplishment);
    console.log('Join Reason:', joinReason);
    console.log('Life Goals:', lifeGoals);
    console.log('Comfort Zone:', comfortZone);
    console.log('Business Type:', businessType);
    console.log('Additional Details:', additionalDetails);
  };

  if(loading){
  <div className="text-center text-lg font-semibold text-gray-600">
    Loading application...
  </div>
  }

  return (
    <div>
      <div className="save-status text-gray-400 ">
        {isSaving ? 'Saving...' : lastSaved && `Last saved at ${lastSaved}`}
      </div>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-6"></h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            First Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            type="text"
            value={firstName}
            onChange={handleChange(setFirstName)}
            placeholder="Enter your first name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            type="text"
            value={lastName}
            onChange={handleChange(setLastName)}
            placeholder="Enter your last name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="pronouns"
          >
            Pronouns:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="pronouns"
            type="text"
            value={pronouns}
            onChange={handleChange(setPronouns)}
            placeholder="Enter your preferred pronouns"
          />
        </div>
      
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="phoneNumber"
          >
            Phone Number:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={handleChange(setPhoneNumber)}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="yearInCollege"
          >
            Year in College:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="yearInCollege"
            value={yearInCollege}
            onChange={handleChange(setYearInCollege)}
          >
            <option value="">Select Year</option>
            <option value="First Year">First Year</option>
            <option value="Second Year">Second Year</option>
            <option value="Third Year">Third Year</option>
            <option value="Fourth Year">Fourth Year</option>
            <option value="Fifth Year +">Fifth Year +</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="graduationYear"
          >
            Graduation Year:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="graduationYear"
            value={graduationYear}
            onChange={handleChange(setGraduationYear)}
          >
            <option value="">Select Year</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="graduationQuarter"
          >
            Graduation Quarter:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="graduationQuarter"
            value={graduationQuarter}
            onChange={handleChange(setGraduationQuarter)}
          >
            <option value="">Select Quarter</option>
            <option value="Fall">Fall</option>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="major"
          >
            Major:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="major"
            type="text"
            value={major}
            onChange={handleChange(setMajor)}
            placeholder="Enter your major"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="minor"
          >
            Minor:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="minor"
            type="text"
            value={minor}
            onChange={handleChange(setMinor)}
            placeholder="Enter your minor"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="cumulativeGPA"
          >
            Cumulative GPA:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
            id="cumulativeGPA"
            type="text"
            value={cumulativeGPA}
            onChange={handleChange(setCumulativeGPA)}
            placeholder="Enter your cumulative GPA"
          />
        </div>
        <div className="col-span-2 mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="currentClasses"
          >
            What classes are you currently enrolled in for this quarter? Please
            list all days and times, and include any discussion sections.
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            id="currentClasses"
            value={currentClasses}
            onChange={handleChange(setCurrentClasses)}
            placeholder="Enter your classes"
            rows={4}
          />
        </div>
        <div className="col-span-2 mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="extracurricularActivities"
          >
            Please list the extracurricular activities you are involved in for
            this quarter. (Ex: clubs, jobs, sports, etc). and how much time you
            anticipate each activity will take.
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            id="extracurricularActivities"
            value={extracurricularActivities}
            onChange={handleChange(setExtracurricularActivities)}
            placeholder="Enter your activities"
            rows={4}
          />
        </div>
        <div className="col-span-2 mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="proudAccomplishment"
          >
            What accomplishment are you most proud of (personal or
            professional)? (500 words max)
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            id="proudAccomplishment"
            value={proudAccomplishment}
            onChange={handleChange(setProudAccomplishment)}
            placeholder="Enter your accomplishment"
            rows={4}
          />
        </div>
        <div className="col-span-2 mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="joinReason"
          >
            Why do you want to join Alpha Kappa Psi? What do you seek to gain
            from this fraternity? What do you expect to be able to add to our
            community? (500 words max)
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            id="joinReason"
            value={joinReason}
            onChange={handleChange(setJoinReason)}
            placeholder="Enter your reasons"
            rows={4}
          />
        </div>
        <div className="col-span-2 mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="lifeGoals"
          >
            What are your current life goals (personal or professional) and how
            do you believe Alpha Kappa Psi will help you achieve those goals?
            (500 words max)
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            id="lifeGoals"
            value={lifeGoals}
            onChange={handleChange(setLifeGoals)}
            placeholder="Enter your goals"
            rows={4}
          />
        </div>
        <div className="col-span-2 mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="comfortZone"
          >
            Tell us about a time you went out of your comfort zone. Why did you
            decide to take this risk and what did you learn? (500 words max)
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            id="comfortZone"
            value={comfortZone}
            onChange={handleChange(setComfortZone)}
            placeholder="Enter your experience"
            rows={4}
          />
        </div>
        <div className="col-span-2 mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="businessType"
          >
            What type of business would you create if money was not a limiting
            factor? (500 words max)
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            id="businessType"
            value={businessType}
            onChange={handleChange(setBusinessType)}
            placeholder="Enter your business idea"
            rows={4}
          />
        </div>
        <div className="col-span-2 mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="additionalDetails"
          >
            Add any details about yourself that you were not able to convey with
            the questions above!
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            id="additionalDetails"
            value={additionalDetails}
            onChange={handleChange(setAdditionalDetails)}
            placeholder="Enter additional details"
            rows={4}
          />
        </div>
      </div>
      <div className="flex justify-between mb-6">
    
      </div>
      
      <div className="mb-4">
        <a
          href={resumeFileUrl ? resumeFileUrl : '#'}
          className={`text-blue-500 hover:text-blue-700 ${!resumeFileUrl && 'pointer-events-none'}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume: {resumeFileUrl ? extractFileName(resumeFileUrl) : 'Not Uploaded'}
        </a>
      </div>
      <FileDropzone setFileUrl={setResumeFileUrl} type={ApplicationFileTypes.RESUME}/>
      <div className="mb-4">
        <a
          href={coverLetterFileUrl ? coverLetterFileUrl : '#'}
          className={`text-blue-500 hover:text-blue-700 ${!coverLetterFileUrl && 'pointer-events-none'}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Cover Letter: {coverLetterFileUrl ? extractFileName(coverLetterFileUrl) : 'Not Uploaded'}
        </a>
      </div>
      <FileDropzone setFileUrl={setCoverLetterFileUrl} type={ApplicationFileTypes.COVER_LETTER} />
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline w-full"
        type="submit"
      >
        Submit
      </button>

    </form>
    </div>
  );
}