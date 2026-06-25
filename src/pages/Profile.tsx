import { useState, type FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Mail, Phone, Save } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { updateProfile } from '../services/authService';
import { setUser } from '../store/slices/authSlice';
import type { RootState, AppDispatch } from '../store';

export function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const updatedUser = await updateProfile({
        name: formData.name,
        phone: formData.phone,
        addresses: user?.addresses,
      });
      dispatch(setUser(updatedUser));
      setIsEditing(false);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to update profile';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
    setIsEditing(false);
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal information</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} leftIcon={<Save className="w-4 h-4" />}>
            Edit Profile
          </Button>
        )}
      </div>

      <Card>
        <div className="flex items-center gap-2 mb-6">
          <User className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
        </div>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4 max-w-lg">
            <Input label="Full Name" value={formData.name} onChange={(v) => handleInputChange('name', v)} required />
            <Input label="Email" type="email" value={formData.email} onChange={(v) => handleInputChange('email', v)} required disabled />
            <Input label="Phone" type="tel" value={formData.phone} onChange={(v) => handleInputChange('phone', v)} />
            <div className="flex gap-3 pt-2">
              <Button isLoading={loading}>Save Changes</Button>
              <Button variant="secondary" type="button" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 max-w-lg">
            <div>
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              <p className="font-medium text-gray-900">{user?.name || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <p className="font-medium text-gray-900">{user?.email || 'Not set'}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Phone</p>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <p className="font-medium text-gray-900">{user?.phone || 'Not set'}</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="font-medium text-gray-900">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
