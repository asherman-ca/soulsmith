'use client'

import { createClient } from '@/utils/supabase/client'
import { Input } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import { IconBrandGoogleFilled, IconUserCircle } from '@tabler/icons-react'

const getURL = () => {
	let url = process?.env?.NEXT_PUBLIC_SITE_URL as string
	// Make sure to include https:// when not localhost.
	url = url.includes('http') ? url : `https://${url}`
	// Make sure to including trailing /.
	url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
	return url
}

type Inputs = {
	email: string
	password: string
}

export default function Login() {
	const router = useRouter()
	const supabase = createClient()
	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<Inputs>({
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const handleSignUp: SubmitHandler<Inputs> = async (data) => {
		const { email, password } = data
		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`,
			},
		})
		if (error) {
			toast.error('Authentication failed')
		} else {
			router.refresh()
		}
	}

	const handleSignIn: SubmitHandler<Inputs> = async (data) => {
		const payload = {
			email: data.email,
			password: data.password,
		}
		const { error } = await supabase.auth.signInWithPassword(payload)
		if (error) {
			toast.error('Authentication failed')
		} else {
			router.refresh()
			router.push('/')
		}
	}

	const handleGuest = async () => {
		const payload = {
			email: 'liquifyguest@yahoo.com',
			password: 'liquifyguest',
		}
		const { error } = await supabase.auth.signInWithPassword(payload)
		if (error) {
			console.log('error', error)
			toast.error('Authentication failed')
		} else {
			router.refresh()
			router.push('/')
		}
	}

	const handleSignOut = async () => {
		await supabase.auth.signOut()
		router.refresh()
	}

	const handleGoogleSignIn = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${getURL()}auth/callback`,
			},
		})
	}

	return (
		<div className='flex justify-center px-6 pt-32 md:px-0'>
			<Link
				href='/'
				className='absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1'
				>
					<polyline points='15 18 9 12 15 6' />
				</svg>{' '}
				Back
			</Link>
			<div className='flex flex-col gap-8 rounded-md border-gray-300 p-8 md:border-1'>
				<h1 className='text-2xl font-semibold text-blue-500'>SoulSmith</h1>
				<div className='flex flex-col gap-2'>
					<h2 className='text-2xl font-semibold'>Sign in to SoulSmith</h2>
					<p>Not your device? Use a private or incognito window to sign in.</p>
				</div>
				<div className='flex flex-col gap-4'>
					<Input
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: 'Entered value does not match email format',
							},
						})}
						label='Email'
						type='email'
						// placeholder='email@domain.com'
						errorMessage={errors.email && errors.email.message}
					/>
					<Input
						{...register('password', {
							required: 'Password is required',
							minLength: {
								value: 8,
								message: 'Password must be at least 8 characters',
							},
						})}
						// placeholder='password123'
						label='Password'
						type='password'
						errorMessage={errors.password && errors.password.message}
					/>
					<div className='flex w-full gap-4'>
						<Button
							onClick={handleSubmit(handleSignIn)}
							variant='bordered'
							className='flex-1'
						>
							Sign in
						</Button>
						<Button
							onClick={handleSubmit(handleSignUp)}
							variant='bordered'
							className='flex-1'
						>
							Sign up
						</Button>
					</div>

					<div className='relative flex justify-center'>
						<p className='bg-white px-2 text-center text-sm dark:bg-black z-10'>
							OR
						</p>
						<div className='absolute left-0 top-[50%] w-full border-b-2 border-gray-300'></div>
					</div>
					<div className='flex gap-4'>
						<Button
							onClick={handleGoogleSignIn}
							className='flex-1'
							variant='bordered'
							startContent={<IconBrandGoogleFilled className='w-4 h-4' />}
						>
							<p>Sign in with Google</p>
						</Button>

						<Button
							onClick={handleGuest}
							className='flex-1'
							variant='bordered'
							startContent={<IconUserCircle className='w-4 h-4' />}
						>
							Sign in as Guest
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
