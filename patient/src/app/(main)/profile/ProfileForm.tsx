'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Patient } from '@prisma/client';
import { updateProfile } from '@/app/actions/updateProfile';
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

export default function ProfileForm({ _patient }: { _patient: Patient }) {
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

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Track success state
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      // Convert formData.dob to ISO string before sending
      const payload = {
        ...formData,
        dob: formData.dob instanceof Date ? formData.dob : undefined,
      };

      const result = await updateProfile(_patient.username, payload);


      if (result.success) {
        setIsSuccess(true); // Mark as successful
        router.refresh();
      } else {
        setError(result.error || 'An error occurred while updating the profile');
      }
    } catch (error) {
      console.error('Update Profile Error:', error);
      setError('Unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Profile</h2>
      <Card>
        <CardHeader>
          <div>
            <Label>Username</Label>
            <Input value={_patient.username} disabled />
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
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
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="dob" className="mr-2">
                Date of Birth
              </Label>
              <Button variant="outline" asChild>
                <DatePicker
                  selected={formData.dob}
                  onChange={(date: Date | null) => handleChange('dob', date)}
                  placeholderText="Select your date of birth"
                  maxDate={new Date()}
                  dateFormat="dd-MM-yyyy"
                />
              </Button>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)} required aria-label="Gender">
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              disabled={isLoading || isSuccess}
              className={`w-full ${isSuccess ? 'bg-green-500 text-xl' : ''}`}
            >
              {isLoading ? 'Updating...' : isSuccess ? 'Successfully Updated' : 'Update Profile'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Missing Date of Birth</AlertDialogTitle>
            <AlertDialogDescription>
              Please select your date of birth before proceeding.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAlert(false)}>Okay</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
