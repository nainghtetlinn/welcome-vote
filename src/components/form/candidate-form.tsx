'use client'

import ProfileImage from '@/assets/profile.png'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import FormInput from './form-input'

import { TCandidate } from '@/types/candidate'
import Image from 'next/image'
import { ChangeEvent, RefObject, useImperativeHandle, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

const CandidateForm = ({
  form,
  ref,
}: {
  form: UseFormReturn<TCandidate>
  ref: RefObject<{ clearPreview: () => void } | null>
}) => {
  const [preview, setPreview] = useState<string>()

  const uploadImageToClient = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const url = URL.createObjectURL(file)
      setPreview(url)
      form.setValue('photo', file)
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      clearPreview: () => {
        setPreview(undefined)
      },
    }),
    []
  )

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name='photo'
        render={() => (
          <FormItem>
            <FormLabel>Photo</FormLabel>
            <FormControl>
              <Label
                htmlFor='photo'
                className='cursor-pointer'
              >
                <div className='border rounded-full overflow-hidden w-[100px] h-[100px]'>
                  <Image
                    src={preview ?? ProfileImage}
                    alt='Profile'
                    width={100}
                    height={100}
                    className='w-full h-full object-cover'
                  />
                </div>
                <Input
                  id='photo'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={uploadImageToClient}
                />
              </Label>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='name'
        render={({ field }) => (
          <FormInput
            label='Name'
            {...field}
          />
        )}
      />
      <FormField
        control={form.control}
        name='roll_no'
        render={({ field }) => (
          <FormInput
            label='Roll No.'
            {...field}
          />
        )}
      />

      <FormField
        control={form.control}
        name='gender'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className='flex flex-col space-y-1'
              >
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='male'
                    id='m'
                  />
                  <Label htmlFor='m'>Male</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='female'
                    id='f'
                  />
                  <Label htmlFor='f'>Female</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='bio'
        render={({ field }) => (
          <FormInput
            label='Bio (optional)'
            {...field}
          />
        )}
      />
    </Form>
  )
}

export default CandidateForm
