'use client';
import React from 'react';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';
import { useSearchParams } from 'next/navigation';
import { createGoogleAuthorizationURL } from '@/actions/auth.action';
import { toast } from '../ui/use-toast';

export const Social = () => {
	const searchParams = useSearchParams();

	const handleGoogleSignIn = async () => {
		const res = await createGoogleAuthorizationURL();
		if (res.error) {
			toast({
				variant: 'destructive',
				description: res.error,
			});
		} else if (res.success) {
			window.location.href = res.data.toString();
		}
	};
	return (
		<div className=" w-full flex gap-x-2 items-center">
			<Button
				size="lg"
				variant="outline"
				onClick={handleGoogleSignIn}
				className=" w-full"
			>
				<FcGoogle className=" w-6 h-6" />
			</Button>
		</div>
	);
};
