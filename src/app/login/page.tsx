'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2, LogIn } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { loginSchema, TLogin } from '@/types/login'
import { login } from './action'

const Login = () => {
  const form = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: TLogin) => {
    setLoading(true)

    const { success, message } = await login(data)
    if (!success) {
      toast.error(message)
    }

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
            <CardFooter className='flex justify-end'>
              <Button
                type='submit'
                disabled={loading}
              >
                {loading ? <Loader2 className='animate-spin' /> : <LogIn />}
                Login
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
