'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Patient } from '@prisma/client';
import { updateProfile } from '@/app/actions/updateProfile';
import { updateEmergencyContacts } from '@/app/actions/updateEmergencyContacts';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  address: string;
  dob: Date | null;
}

interface EmergencyContact {
  id?: number;
  name: string;
  relationship: string;
  phoneNumber: string;
}

export default function ProfileForm({
  _patient,
  _contacts,
}: {
  _patient: Patient;
  _contacts: EmergencyContact[];
}) {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    firstName: _patient.firstName || '',
    lastName: _patient.lastName || '',
    email: _patient.email || '',
    phoneNumber: _patient.phoneNumber || '',
    gender: _patient.gender || '',
    address: _patient.address || '',
    dob: _patient.dob ? new Date(_patient.dob) : null,
  });

  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(_contacts);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (name: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (index: number, field: keyof EmergencyContact, value: string) => {
    setEmergencyContacts((prevContacts) =>
      prevContacts.map((contact, i) => (i === index ? { ...contact, [field]: value } : contact))
    );
  };

  const addContact = () => {
    setEmergencyContacts((prevContacts) => [
      ...prevContacts,
      { name: '', relationship: '', phoneNumber: '' },
    ]);
  };

  const removeContact = (index: number) => {
    setEmergencyContacts((prevContacts) => prevContacts.filter((_, i) => i !== index));
  };

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone: string) => /^\+?[1-9]\d{1,14}$/.test(phone);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.dob) {
      setShowAlert(true);
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError('Please provide a valid email address.');
      return;
    }

    if (!isValidPhone(formData.phoneNumber)) {
      setError('Please provide a valid phone number.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Ensure patientId is being passed
      const payload = { ...formData, dob: formData.dob };

      // Assuming _patient.id is the correct patient identifier
      const profileResult = await updateProfile(_patient.username, payload);
      const contactsResult = await updateEmergencyContacts(_patient.username, emergencyContacts);

      if (profileResult.success && contactsResult.success) {
        setIsSuccess(true);
        router.refresh();
      } else {
        setError('An error occurred while updating your profile or contacts.');
      }
    } catch (err) {
      console.error('Update Error:', err);
      setError('Unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Profile</h2>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Username</Label>
              <Input value={_patient.username} disabled />
            </div>
          </CardContent>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <DatePicker
                selected={formData.dob}
                onChange={(date) => handleChange('dob', date)}
                placeholderText="Select your date of birth"
                maxDate={new Date()}
                dateFormat="dd-MM-yyyy"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)} required aria-label="Gender">
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                type="text"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                type="text"
                id="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Emergency Contacts</h2>
          </CardHeader>
          <CardContent>
            <div className='grid grid-flow-row gap-2'>
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="grid grid-flow-col gap-2">
                  <div>
                    <Label>Name</Label>
                    <Input
                      type="text"
                      value={contact.name}
                      onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label>Relationship</Label>
                    <Input
                      type="text"
                      value={contact.relationship}
                      onChange={(e) => handleContactChange(index, 'relationship', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      type="text"
                      value={contact.phoneNumber}
                      onChange={(e) => handleContactChange(index, 'phoneNumber', e.target.value)}
                      required
                    />
                  </div>
                  <Button variant='destructive' type="button" onClick={() => removeContact(index)}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <br />
            <Button type="button" onClick={addContact}>
              Add Emergency Contact
            </Button>
          </CardContent>
        </Card>
        <Button
          type="submit"
          disabled={isLoading || isSuccess}
          className={`w-full ${isSuccess ? 'bg-green-500 text-xl' : ''}`}
        >
          {isLoading ? 'Updating...' : isSuccess ? 'Successfully Updated' : 'Update Profile'}
        </Button>

        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Missing Date of Birth</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              Please provide your date of birth before submitting the form.
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setShowAlert(false)}>Close</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>


    </div>
  );
}
