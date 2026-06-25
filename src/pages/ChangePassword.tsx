import { useState, type FormEvent } from 'react';
import { Lock, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { changePassword } from '../services/authService';

export function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      await changePassword(formData.currentPassword, formData.newPassword);
      setSuccess(true);
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to change password';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Change Password</h1>
        <p className="text-gray-600 mt-1">Update your account password</p>
      </div>

      <Card className="max-w-lg">
        <div className="flex items-center gap-2 mb-6">
          <Lock className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
        </div>

        {success && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 mb-4">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm">Password updated successfully.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={formData.currentPassword}
            onChange={(v) => setFormData({ ...formData, currentPassword: v })}
            required
          />
          <Input
            label="New Password"
            type="password"
            value={formData.newPassword}
            onChange={(v) => setFormData({ ...formData, newPassword: v })}
            required
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(v) => setFormData({ ...formData, confirmPassword: v })}
            required
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" isLoading={loading}>
            Update Password
          </Button>
        </form>
      </Card>
    </div>
  );
}
