import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Packet {
  id: string;
  created_at: string;
  full_name: string;
  is_active: boolean;
  is_pic: boolean;
  application: string | null; // Assuming application could be null
  case_study: string | null; // Assuming case_study could be null
  interview: string | null; // Assuming interview could be null
  email: string;
  active_case_studies: string | null; // Assuming active_case_studies could be null
  active_interviews: string | null; // Assuming active_interviews could be null
}

interface ApplicantCardProps {
  applicant: Packet;
  onViewApplication: (applicationId: string, userId: string) => void; // Add onViewApplication function prop
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({
  applicant,
  onViewApplication,
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [numCaseStudies, setNumCaseStudies] = useState<number>(0);
  //const [total, setTotal] = useState(0);
  const supabase = createClient();
  useEffect(() => {
    const fetchAvatarUrl = async () => {
      try {
        const { data, error } = await supabase
          .from('user_avatar')
          .select('avatar_url')
          .eq('user_id', applicant.id)
          .single();
        if (error) throw error;
        if (data) setAvatarUrl(data.avatar_url);
      } catch (error: any) {
        console.error('Error fetching avatar URL:', error.message);
      }
    };

    fetchAvatarUrl();
  }, [applicant.id]);
  useEffect(() => {
    const fetchNumCaseStudies = async () => {
      try {
        const { count, error } = await supabase
          .from('case_studies')
          .select('id', { count: 'exact' })
          .eq('prospect', applicant.id)
  
        if (error) throw error;
        if (count !== null) setNumCaseStudies(count);
      } catch (error : any) {
        console.error('Error fetching number of case studies:', error.message);
      }
    };
    fetchNumCaseStudies();
  }, []); // Add applicant.id as a dependency

  // useEffect(() => {
  //   const fetchTotal = async () => {
  //     try {
  //       const { data, error } = await supabase
  //         .from('users')
  //         .select('total_score')
  //         .eq('id', applicant.id);
        
  //       if (error) throw error;
  //       if (data) setTotal(data[0].total_score);
  //     } catch (error: any) {
  //       console.error('Error fetching avatar URL:', error.message);
  //     }
  //   };

  //   fetchTotal();
  // }, [applicant.id]);

  return (
    <button
      onClick={() =>
        applicant.application &&
        onViewApplication(applicant.application, applicant.id)
      }
      className="hover:scale-[1.03] transition duration-200"
    >
      <div className="bg-btn-background rounded-lg shadow-lg p-3 m-2 flex flex-col items-start">
        <div className="flex flex-row">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex text-xs items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <div className="flex flex-col text-left ml-4">
            <h3 className="font-bold text-lg">{applicant.full_name}</h3>
            <p className="text-xs">{applicant.email}</p>
            <p className="text-xs">{numCaseStudies} Case Studies</p>
          </div>
        </div>
        {/* <div className="mt-2">
          <span>Total Score: {total}</span>
        </div> */}
      </div>
    </button>
  );
};

export default ApplicantCard;
