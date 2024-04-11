'use server';
import { ProspectInterview } from '@/lib/types';
import { createClient } from '@/utils/supabase/server';

export async function getUsers() {
  const supabase = createClient();

  let isPIC = false;
  let usersData = [];
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from('users')
      .select('is_pic')
      .eq('id', user.id)
      .single();
    isPIC = data?.is_pic;
  }

  if (isPIC) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('is_active', false)
      .eq('is_pic', false)
      .eq('cased', true)
      .order('full_name', { ascending: true });
    if (error) {
      console.error(error);
    } else {
      usersData = data;
      console.log(usersData);
    }
  }

  return usersData;
}

export async function getDelibsUsers() {
  const supabase = createClient();

  // First, fetch all prospect_ids from the delibs table
  const { data: delibsData, error: delibsError } = await supabase
    .from('delibs')
    .select('prospect_id');

  if (delibsError) {
    console.error("Error fetching delibs' prospect_ids:", delibsError);
    return [];
  }

  // Extract prospect_ids from the delibsData
  const prospectIds = delibsData.map((delib) => delib.prospect_id);

  if (prospectIds.length === 0) {
    console.log('No prospects found in delibs.');
    return [];
  }

  // Fetch users based on the prospectIds from the users table
  const { data: usersData, error: usersError } = await supabase
    .from('users')
    .select('*')
    .in('id', prospectIds); // Use the 'in' filter to get users whose id is in the prospectIds array

  if (usersError) {
    console.error('Error fetching users data:', usersError);
    return [];
  }

  console.log(usersData);
  return usersData;
}

export async function getIsPIC() {
  const supabase = createClient();

  let isPIC = false;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from('users')
      .select('is_pic')
      .eq('id', user.id)
      .single();
    isPIC = data?.is_pic;
  }

  return isPIC;
}

export async function getIsActive() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const { data, error } = await supabase
      .from('users')
      .select('is_active, is_pic') // Select both is_active and is_pic
      .eq('id', user.id)
      .single();
    return data?.is_active || data?.is_pic;
  }
  return false;
}

export async function getApplication(applicationID: string) {
  const supabase = createClient();

  if (!applicationID) {
    console.error('Application ID is required.');
    return null;
  }

  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('id', applicationID)
    .single(); // Assuming you expect a single record for a unique application ID

  if (error) {
    console.error('Error fetching application:', error.message);
    return null;
  }
  console.log(data);
  // If no error and data is fetched successfully, return the application data
  return data;
}

export async function getCases(prospectID: string | null) {
  const supabase = createClient();

  if (!prospectID) {
    console.error('Application ID is required.');
    return null;
  }

  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('prospect', prospectID);

  if (error) {
    console.error('Error fetching application:', error.message);
    return null;
  }
  console.log(data);
  // If no error and data is fetched successfully, return the application data
  return data;
}

export async function getInterviews(prospectID: string | null) {
  const supabase = createClient();

  if (!prospectID) {
    console.error('Application ID is required.');
    return null;
  }

  const { data, error } = await supabase
    .from('interviews')
    .select('*')
    .eq('prospect_id', prospectID);

  if (error) {
    console.error('Error fetching interviews:', error.message);
    return null;
  }
  console.log(data);
  // If no error and data is fetched successfully, return the application data
  return data;
}

export async function getInterviewProspects(): Promise<
  ProspectInterview[] | null
> {
  const supabase = createClient();
  let hasPerms = false;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // Adjust the query to check for either is_pic or is_active being true
    const { data, error } = await supabase
      .from('users')
      .select('is_pic, is_active') // Select both is_pic and is_active
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error checking permissions:', error.message);
      return null; // Handle error appropriately
    }

    // Set hasPerms to true if is_pic is true OR is_active is true
    if (data?.is_pic || data?.is_active) {
      hasPerms = true;
    }
  }
  // First, check if the current user is active

  // If the user is active, proceed to fetch interview prospects
  if (hasPerms) {
    const { data, error } = await supabase
      .from('users')
      .select('full_name, email, id')
      .eq('is_active', false)
      .eq('is_pic', false);

    if (error) {
      console.error('Error fetching interview prospects:', error.message);
      return null;
    }
    return data;
  }
  return null;
}
