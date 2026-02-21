import { useState } from 'react'
import { useForm } from '@/lib/tw-mantine-form'
import { Button, Paragraph, Title } from '../ui'
import dynamic from 'next/dynamic'
const PhoneInput = dynamic(() => import('react-phone-input-2'), { ssr: false })
import 'react-phone-input-2/lib/style.css'

import { IconAsterisk } from '@tabler/icons-react'

type Props = {
  close: () => void
}

export default function EventReservationForm({ close }: Props) {
  const [countryCode, setCountryCode] = useState('254') // State for the phone number
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      courseName: ''
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    }
  })

  const handleSubmit = async (values: any) => {
    setAlert(null) // Clear previous alerts

    return values
    // always remove leading zero from phone incase included
    // const formattedPhone = values.phone.replace(/^0+/, '');
    // const data = {
    //   ...values,
    //   phone: `${countryCode}${formattedPhone}`,
    // };

    // try {
    //   const response = await fetch('/api/v3/push-lead', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ ...data }),
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     setAlert({ type: 'error', message: errorData.error || 'Failed to submit enquiry.' });
    //     return;
    //   }
    //   router.push('/enquiry-thank-you');
    // } catch (error) {
    //   setAlert({ type: 'error', message: 'An error occurred. Please try again later.' });
    // }
  }

  return (
    <div className="w-full rounded-lg bg-white p-4 sm:p-8">
      <div className="font-nexa">
        <Title label="Make Reservation" color="black" />
      </div>
      <div className="mb-8 font-proxima">
        <p className="text-gray-700" style={{ fontWeight: 600 }}>
          Kindly provide the details below
        </p>
      </div>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <div
          style={{ marginTop: 16, marginBottom: 16, paddingLeft: 8, paddingRight: 8 }}
          className="border-1 rounded-lg border-solid border-gray-200 py-2"
        >
          <div className="flex pl-2">
            <Title label="Email Address" color="black" size="1.4em" />
            <IconAsterisk size={8} className="mt-1.5 text-admiRed" />
          </div>
          <input
            className="h-11 w-full rounded-lg border border-gray-300 bg-[#f8fafc] px-3"
            placeholder="your@email.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
        </div>
        <div
          style={{ marginTop: 16, marginBottom: 16, paddingLeft: 8, paddingRight: 8 }}
          className="border-1 rounded-lg border-solid border-gray-200 py-2"
        >
          <div className="flex pl-2">
            <Title label="First Name" color="black" size="1.4em" />
            <IconAsterisk size={8} className="mt-1.5 text-admiRed" />
          </div>
          <input
            className="h-11 w-full rounded-lg border border-gray-300 bg-[#f8fafc] px-3"
            placeholder="Enter first name"
            key={form.key('firstName')}
            {...form.getInputProps('firstName')}
          />
        </div>
        <div
          style={{ marginTop: 16, marginBottom: 16, paddingLeft: 8, paddingRight: 8 }}
          className="border-1 rounded-lg border-solid border-gray-200 py-2"
        >
          <div className="flex pl-2">
            <Title label="Last Name" color="black" size="1.4em" />
            <IconAsterisk size={8} className="mt-1.5 text-admiRed" />
          </div>
          <input
            className="h-11 w-full rounded-lg border border-gray-300 bg-[#f8fafc] px-3"
            placeholder="Enter last name"
            key={form.key('lastName')}
            {...form.getInputProps('lastName')}
          />
        </div>
        <div
          style={{ marginTop: 16, marginBottom: 16 }}
          className="border-1 rounded-lg border-solid border-gray-200 px-2 py-2"
        >
          <div className="flex pl-2">
            <Title label="Phone Number" color="black" size="1.4em" />
            <IconAsterisk size={8} className="mt-1.5 text-admiRed" />
          </div>
          <div className="flex">
            <PhoneInput
              country={'ke'}
              value={countryCode}
              onChange={(value) => {
                setCountryCode(value)
              }}
              containerStyle={{
                border: 'none',
                width: 100
              }}
              inputStyle={{
                border: 'none'
              }}
              buttonStyle={{
                border: 'none',
                marginLeft: '8px'
              }}
              dropdownStyle={{
                border: 'none',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
              inputProps={{ readOnly: true }}
            />
            <input
              className="h-11 w-full grow rounded-lg border border-gray-300 bg-[#f8fafc] px-3"
              placeholder="Enter phone"
              key={form.key('phone')}
              type="number"
              {...form.getInputProps('phone')}
            />
          </div>
        </div>
        <div className="flex-end flex justify-between" style={{ marginTop: '2em' }}>
          <div className="w-fit sm:w-[160px]">
            <Button size="lg" backgroundColor="white" label="Cancel" color="admiRed" onClick={close} />
          </div>
          <div className="w-fit sm:w-[160px]">
            <Button size="lg" backgroundColor="admiRed" label="Submit" type="submit" />
          </div>
        </div>
      </form>
      {alert && (
        <div
          className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900"
          style={{ marginTop: 8, marginBottom: 8, borderColor: alert.type === 'success' ? '#339900' : '#ff9966' }}
        >
          <div className="mb-1 font-semibold">
            <Paragraph fontWeight={900}>{alert.type === 'success' ? 'Success' : 'Error'}</Paragraph>
          </div>
          <Paragraph>{alert.message}</Paragraph>
        </div>
      )}
    </div>
  )
}
