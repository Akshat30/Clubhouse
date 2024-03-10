import DeployButton from '@/components/DeployButton';
import React, { useEffect, useState } from 'react';
import AuthButton from '@/components/AuthButton';
import { createClient } from '@/utils/supabase/server';
import FetchDataSteps from '@/components/tutorial/FetchDataSteps';
import Header from '@/components/Header';
import { redirect } from 'next/navigation';
import NextLinkButton from '../../components/NextLinkButton';
import { User } from '@supabase/supabase-js'; // Ensure you import the User type

export default async function ProtectedPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect('/');
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <div className="flex flex-col">
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center mt-12">
            Application
          </p>
          <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
        </div>
      </div>
    </div>
  );
}
