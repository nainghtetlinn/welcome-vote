'use client'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, LogIn } from 'lucide-react'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { login } from './action'
import { loginSchema, TLogin } from '@/types/login'

const Login = () => {
  const form = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: TLogin) => {
    setLoading(true)
    await login(data)
    setLoading(false)
  }

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <Form {...form}>
        <form
          className='w-full max-w-[400px]'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormInput
                    label='Email'
                    {...field}
                  />
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormInput
                    label='Password'
                    type='password'
                    {...field}
                  />
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                type='submit'
                disabled={loading}
              >
                Login{' '}
                {loading ? <Loader2 className='animate-spin' /> : <LogIn />}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}

const FormInput = ({
  label,
  ...props
}: React.ComponentProps<'input'> & { label: string }) => (
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <FormControl>
      <Input {...props} />
    </FormControl>
    <FormMessage />
  </FormItem>
)

export default Login
